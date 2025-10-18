import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  Loader,
  Music,
  Download,
  User
} from 'lucide-react';
import StripePaymentForm from './StripePaymentForm';

// Configuration Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_votre_cle');

// Produits Ghost Remix Pack
const GHOST_PRODUCTS = {
  'pack-house': {
    id: 'pack-house',
    name: 'Pack House Premium',
    description: '15 tracks House + stems + samples',
    price: 15,
    image: null,
    files: ['15 tracks WAV', '15 stems', '20 samples exclusifs'],
    preview: '/previews/house-preview.mp3'
  },
  'pack-afro': {
    id: 'pack-afro',
    name: 'Pack Afro Vibes',
    description: '12 tracks Afro + percussion loops',
    price: 18,
    image: null, 
    files: ['12 tracks WAV', 'Percussion loops', 'Vocal chops'],
    preview: '/previews/afro-preview.mp3'
  },
  'pack-rap': {
    id: 'pack-rap',
    name: 'Pack Rap FR',
    description: '10 instrumentales Rap français',
    price: 20,
    image: null,
    files: ['10 instrumentales WAV', 'MIDI files', 'Drum kits'],
    preview: '/previews/rap-preview.mp3'
  },
  'pack-complet': {
    id: 'pack-complet',
    name: 'Pack Complet Ghost',
    description: 'Tous les packs + bonus exclusifs',
    price: 45,
    originalPrice: 53,
    image: null,
    files: ['37+ tracks WAV', 'Tous les stems', '50+ samples', 'Bonus exclusifs'],
    preview: '/previews/complet-preview.mp3'
  }
};

interface CartItem {
  productId: string;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
}

// Composant principal Checkout
export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: ''
  });

  // Charger panier depuis localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('ghostRemixCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Calculer total
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = GHOST_PRODUCTS[item.productId as keyof typeof GHOST_PRODUCTS];
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-gradient-to-r from-neon-violet to-neon-cyan p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Music className="text-white" size={32} />
            Checkout Ghost Remix Pack
          </h1>
          <p className="text-white/80 mt-2">Finalisez votre commande et recevez vos packs immédiatement</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Colonne gauche - Résumé commande */}
          <div className="space-y-6">
            <OrderSummary cart={cart} total={calculateTotal()} />
            <CustomerForm 
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
            />
          </div>

          {/* Colonne droite - Paiement */}
          <div>
            <Elements stripe={stripePromise}>
              <PaymentForm 
                cart={cart}
                customerInfo={customerInfo}
                total={calculateTotal()}
              />
            </Elements>
            
            {/* Nouveau formulaire de paiement intégré */}
            {cart.length > 0 && (
              <div className="mt-8">
                <StripePaymentForm
                  amount={calculateTotal()}
                  productName={`${cart.length} produit(s) - Ghost Remix Pack`}
                  productId="checkout-cart"
                  onSuccess={(paymentIntent) => {
                    console.log('✅ Paiement réussi:', paymentIntent);
                    // Rediriger vers la page de succès
                    window.location.href = `/success-stripe?payment_intent=${paymentIntent.id}`;
                  }}
                  onError={(error) => {
                    console.error('❌ Erreur paiement:', error);
                  }}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// Composant Résumé de commande
function OrderSummary({ cart, total }: { cart: CartItem[], total: number }) {
  return (
    <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6">
      <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
        <Music className="text-neon-violet" size={20} />
        Votre Commande
      </h2>

      <div className="space-y-4">
        {cart.map((item) => {
          const product = GHOST_PRODUCTS[item.productId as keyof typeof GHOST_PRODUCTS];
          if (!product) return null;

          return (
            <div key={item.productId} className="flex items-center gap-4 p-4 bg-bg-primary/50 rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-violet to-neon-cyan rounded-lg flex items-center justify-center">
                <Music className="text-white" size={24} />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">{product.name}</h3>
                <p className="text-text-secondary text-sm">{product.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Download className="text-neon-cyan" size={14} />
                  <span className="text-xs text-text-secondary">{product.files[0]}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg text-text-primary">{product.price}€</div>
                {'originalPrice' in product && product.originalPrice && (
                  <div className="text-sm text-text-secondary line-through">{product.originalPrice}€</div>
                )}
                <div className="text-xs text-neon-violet">Qté: {item.quantity}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-neon-violet/20 mt-6 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-text-primary">Total</span>
          <span className="text-2xl font-bold text-neon-violet">{total}€</span>
        </div>
        <p className="text-xs text-text-secondary mt-1">
          Paiement sécurisé • Téléchargement immédiat
        </p>
      </div>
    </div>
  );
}

// Composant Informations client
function CustomerForm({ 
  customerInfo, 
  setCustomerInfo 
}: { 
  customerInfo: CustomerInfo,
  setCustomerInfo: (info: CustomerInfo) => void 
}) {
  return (
    <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6">
      <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
        <User className="text-neon-violet" size={20} />
        Vos Informations
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            required
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            className="w-full bg-bg-primary border border-neon-violet/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 outline-none transition-all"
            placeholder="Votre nom et prénom"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            className="w-full bg-bg-primary border border-neon-violet/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 outline-none transition-all"
            placeholder="votre@email.com"
          />
          <p className="text-xs text-text-secondary mt-1">
            Vos liens de téléchargement seront envoyés à cette adresse
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Téléphone (optionnel)
          </label>
          <input
            type="tel"
            value={customerInfo.phone || ''}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            className="w-full bg-bg-primary border border-neon-violet/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 outline-none transition-all"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>
    </div>
  );
}

// Composant Formulaire de paiement
function PaymentForm({ 
  cart, 
  customerInfo, 
  total 
}: { 
  cart: CartItem[], 
  customerInfo: CustomerInfo, 
  total: number 
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !customerInfo.name || !customerInfo.email) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Créer la session de checkout
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
      
      const response = await fetch(`${backendUrl}/api/checkout/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity
          })),
          customer: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone
          }
        }),
      });

      const { url, error } = await response.json();
      
      if (error) {
        throw new Error(error);
      }

      // Rediriger vers Stripe Checkout
      if (url) {
        window.location.href = url;
      }

    } catch (error) {
      console.error('Erreur paiement:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Erreur lors du paiement');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6">
      <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
        <CreditCard className="text-neon-violet" size={20} />
        Paiement Sécurisé
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Sécurité badges */}
        <div className="flex items-center justify-center gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <Shield className="text-green-400" size={20} />
          <span className="text-sm text-green-400 font-medium">Paiement sécurisé par Stripe</span>
          <Lock className="text-green-400" size={16} />
        </div>

        {/* Résumé final */}
        <div className="bg-gradient-to-r from-neon-violet/10 to-neon-cyan/10 p-4 rounded-lg border border-neon-violet/20">
          <div className="flex justify-between items-center">
            <span className="text-text-primary font-medium">Total à payer :</span>
            <span className="text-2xl font-bold text-neon-violet">{total}€</span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            TVA incluse • Téléchargement immédiat après paiement
          </p>
        </div>

        {/* Message d'erreur */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
            >
              <AlertCircle size={18} />
              <span className="text-sm">{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton de paiement */}
        <button
          type="submit"
          disabled={!stripe || isProcessing || total === 0 || !customerInfo.name || !customerInfo.email}
          className="w-full bg-gradient-to-r from-neon-violet to-neon-cyan text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-neon-violet/30 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader className="animate-spin" size={20} />
              Traitement...
            </>
          ) : (
            <>
              <Lock size={20} />
              Payer {total}€ maintenant
            </>
          )}
        </button>

        {/* Garanties */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-green-400">
            <CheckCircle size={16} />
            <span className="text-sm">Téléchargement immédiat</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-green-400">
            <CheckCircle size={16} />
            <span className="text-sm">Garantie satisfait ou remboursé 30 jours</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-green-400">
            <CheckCircle size={16} />
            <span className="text-sm">Support client professionnel</span>
          </div>
        </div>

        <p className="text-xs text-text-secondary text-center">
          En procédant au paiement, vous acceptez nos{' '}
          <a href="/mentions-legales" className="text-neon-violet hover:underline">
            conditions générales de vente
          </a>
        </p>

      </form>
    </div>
  );
}

