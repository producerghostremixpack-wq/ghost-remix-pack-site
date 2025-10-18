import { useState, FormEvent } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Shield
} from 'lucide-react';

// Configuration Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// Interface pour les props
interface StripePaymentFormProps {
  amount: number;
  productName: string;
  productId: string;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

/**
 * Composant de formulaire de paiement Stripe intégré
 * Permet de payer directement sur le site sans redirection
 */
export default function StripePaymentForm({
  amount,
  productName,
  productId,
  onSuccess,
  onError,
  className = ''
}: StripePaymentFormProps) {
  return (
    <div className={`bg-gradient-to-br from-neon-violet/10 to-neon-blue/10 rounded-2xl p-8 border border-neon-violet/20 ${className}`}>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          amount={amount}
          productName={productName}
          productId={productId}
          onSuccess={onSuccess}
          onError={onError}
        />
      </Elements>
    </div>
  );
}

/**
 * Formulaire de paiement avec Stripe Elements
 */
function CheckoutForm({
  amount,
  productName,
  productId,
  onSuccess,
  onError
}: Omit<StripePaymentFormProps, 'className'>) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: ''
  });

  /**
   * Gestion de la soumission du formulaire
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validation
    if (!customerInfo.email || !customerInfo.name) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Créer un Payment Intent côté serveur
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
      
      const response = await fetch(`${backendUrl}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convertir en centimes
          currency: 'eur',
          productId,
          productName,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création du paiement');
      }

      const { clientSecret } = await response.json();

      // 2. Confirmer le paiement avec Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Élément de carte non trouvé');
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: customerInfo.name,
              email: customerInfo.email,
            },
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message || 'Erreur lors du paiement');
      }

      // 3. Succès
      if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        console.log('✅ Paiement réussi:', paymentIntent);
        
        if (onSuccess) {
          onSuccess(paymentIntent);
        }

        // Envoyer l'email de confirmation (optionnel)
        await sendConfirmationEmail(paymentIntent);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      console.error('❌ Erreur paiement:', errorMessage);
      setError(errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Envoyer l'email de confirmation
   */
  const sendConfirmationEmail = async (paymentIntent: any) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
      
      await fetch(`${backendUrl}/api/payment/send-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          productName,
          amount
        }),
      });
    } catch (err) {
      console.error('Erreur envoi email:', err);
    }
  };

  // Format du prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-neon-violet to-neon-blue mb-4">
          <Lock className="text-white" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Paiement Sécurisé
        </h3>
        <p className="text-gray-600">
          {productName}
        </p>
        <div className="text-3xl font-extrabold bg-gradient-to-r from-neon-violet to-neon-blue bg-clip-text text-transparent mt-2">
          {formatPrice(amount)}
        </div>
      </div>

      {/* Succès */}
      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-green-500/20 border border-green-500 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <CheckCircle className="text-green-500 flex-shrink-0" size={32} />
            <div>
              <h4 className="text-green-400 font-bold text-lg mb-2">
                Paiement réussi !
              </h4>
              <p className="text-green-300 text-sm">
                Votre paiement a été traité avec succès. Vous recevrez un email de confirmation dans quelques instants.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Formulaire */}
      {!success && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations client */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder="Jean Dupont"
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-violet focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                placeholder="votre@email.com"
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-violet focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>
          </div>

          {/* Carte bancaire */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Informations de carte bancaire *
            </label>
            <div className="p-4 rounded-lg bg-white border border-gray-300">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Bouton de paiement */}
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white shadow-lg shadow-neon-violet/50 hover:shadow-xl hover:shadow-neon-violet/70 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span>Traitement en cours...</span>
              </>
            ) : (
              <>
                <CreditCard size={24} />
                <span>Payer {formatPrice(amount)}</span>
              </>
            )}
          </button>

          {/* Sécurité */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield size={16} />
            <span>Paiement sécurisé par Stripe • SSL/TLS</span>
          </div>
        </form>
      )}
    </div>
  );
}
