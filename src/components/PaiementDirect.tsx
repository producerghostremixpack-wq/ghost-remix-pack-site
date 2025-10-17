import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Lock, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface PaiementDirectProps {
  montant: number;
  description: string;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function PaiementDirect({ 
  montant, 
  description, 
  onSuccess, 
  onError,
  className = ""
}: PaiementDirectProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  // Style pour l'élément carte Stripe
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        fontFamily: 'Poppins, Arial, sans-serif',
        color: '#F5F5F7',
        backgroundColor: '#141420',
        '::placeholder': {
          color: '#B0B0C0',
        },
        iconColor: '#9B5CF6',
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
    },
    hidePostalCode: false,
  };

  // Créer Payment Intent
  const createPaymentIntent = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
      const response = await fetch(`${backendUrl}/api/payment/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          amount: Math.round(montant * 100), // Convertir en centimes
          currency: 'eur',
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.clientSecret) {
        setClientSecret(data.clientSecret);
        return data.clientSecret;
      } else {
        throw new Error(data.error || 'Erreur lors de la création du paiement');
      }
    } catch (error) {
      console.error('Erreur Payment Intent:', error);
      throw error;
    }
  };

  // Traiter le paiement
  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Stripe non initialisé. Veuillez recharger la page.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setErrorMessage('Élément carte non trouvé.');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('idle');
    setErrorMessage('');

    try {
      // Créer Payment Intent si pas déjà fait
      const secret = clientSecret || await createPaymentIntent();

      // Confirmer le paiement
      const { error, paymentIntent } = await stripe.confirmCardPayment(secret, {
        payment_method: {
          card: card,
          billing_details: {
            name: 'Client Ghost Remix Pack',
          },
        },
      });

      if (error) {
        setPaymentStatus('error');
        setErrorMessage(error.message || 'Une erreur est survenue lors du paiement.');
        onError?.(error.message || 'Erreur de paiement');
      } else if (paymentIntent?.status === 'succeeded') {
        setPaymentStatus('success');
        onSuccess?.(paymentIntent);
        
        // Envoyer email de confirmation
        await sendConfirmationEmail(paymentIntent);
      }
    } catch (error) {
      console.error('Erreur paiement:', error);
      setPaymentStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
      setErrorMessage(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  // Envoyer email de confirmation
  const sendConfirmationEmail = async (paymentIntent: any) => {
    try {
      const backendUrl = import.meta.env.VITE_CONTACT_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
      await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          name: 'Client Ghost Remix Pack',
          email: 'client@example.com', // À remplacer par l'email du client
          subject: `Confirmation de paiement - ${description}`,
          message: `Paiement confirmé pour ${description}. Montant: ${montant}€. ID: ${paymentIntent.id}`,
          source: 'paiement-direct',
          paymentId: paymentIntent.id,
          amount: montant,
        }),
      });
    } catch (error) {
      console.log('Email confirmation non envoyé:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-bg-card rounded-xl p-6 border border-neon-violet/20 shadow-neon-light ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CreditCard className="text-neon-violet" size={24} />
          <h3 className="text-xl font-bold text-text-primary">Paiement Sécurisé</h3>
          <Shield className="text-neon-cyan" size={20} />
        </div>
        <p className="text-text-secondary text-sm">{description}</p>
        <div className="text-2xl font-bold text-neon-violet mt-2">{montant.toFixed(2)}€</div>
      </div>

      {/* Formulaire de paiement */}
      <form onSubmit={handlePayment} className="space-y-4">
        
        {/* Élément carte Stripe */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            <Lock className="inline mr-2" size={16} />
            Informations de carte bancaire
          </label>
          <div className="p-4 bg-bg-primary border border-neon-violet/30 rounded-lg">
            <CardElement options={cardElementOptions} />
          </div>
          <p className="text-xs text-text-secondary flex items-center gap-1">
            <Shield size={12} />
            Sécurisé par Stripe - Vos données sont chiffrées
          </p>
        </div>

        {/* Messages de statut */}
        {paymentStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30"
          >
            <AlertCircle size={20} />
            <span className="text-sm">{errorMessage}</span>
          </motion.div>
        )}

        {paymentStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30"
          >
            <CheckCircle size={20} />
            <span className="text-sm">Paiement réussi ! Merci pour votre achat.</span>
          </motion.div>
        )}

        {/* Bouton de paiement */}
        <motion.button
          type="submit"
          disabled={!stripe || isProcessing || paymentStatus === 'success'}
          className="w-full bg-gradient-to-r from-neon-violet to-neon-cyan text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-neon-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isProcessing ? (
            <>
              <Loader size={20} className="animate-spin" />
              Traitement...
            </>
          ) : paymentStatus === 'success' ? (
            <>
              <CheckCircle size={20} />
              Paiement réussi
            </>
          ) : (
            <>
              <CreditCard size={20} />
              Payer {montant.toFixed(2)}€
            </>
          )}
        </motion.button>

        {/* Informations de sécurité */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs text-text-secondary">
            <div className="flex items-center gap-1">
              <Shield size={12} />
              SSL Sécurisé
            </div>
            <div className="flex items-center gap-1">
              <Lock size={12} />
              Données chiffrées
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle size={12} />
              PCI DSS
            </div>
          </div>
          <p className="text-xs text-text-secondary">
            Paiement sécurisé par Stripe. Nous ne stockons pas vos informations bancaires.
          </p>
        </div>

        {/* Cartes acceptées */}
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-2">Cartes acceptées :</p>
          <div className="flex items-center justify-center gap-2 opacity-70">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjIwIiByeD0iMyIgZmlsbD0iIzAwNTFBNSIvPgo8cGF0aCBkPSJNMTEuNTUgMTMuNzVIMTAuNDVMOS45NSA2LjI1SDExLjA1TDExLjU1IDEzLjc1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+" alt="Visa" />
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjIwIiByeD0iMyIgZmlsbD0iI0VCMDAxQiIvPgo8Y2lyY2xlIGN4PSIxMSIgY3k9IjEwIiByPSI1IiBmaWxsPSIjRkY1RjAwIi8+CjxjaXJjbGUgY3g9IjE5IiBjeT0iMTAiIHI9IjUiIGZpbGw9IiNGRkY1RjAiLz4KPC9zdmc+" alt="MasterCard" />
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjIwIiByeD0iMyIgZmlsbD0iIzAwNjFBNyIvPgo8cGF0aCBkPSJNMTUgNkMxOC4zIDE2IDcuNyAxNiAxMSA2SDE1WiIgZmlsbD0iI0ZGRiIvPgo8L3N2Zz4=" alt="American Express" />
          </div>
        </div>
      </form>
    </motion.div>
  );
}

// Composant wrapper avec Elements provider
export function PaiementDirectWrapper(props: Omit<PaiementDirectProps, 'stripe' | 'elements'>) {
  return (
    <PaiementDirect {...props} />
  );
}

