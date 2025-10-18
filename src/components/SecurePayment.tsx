import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  Loader,
  ExternalLink,
  Star,
  Download,
  Music,
  Zap
} from 'lucide-react';

// Configuration Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_votre_cle');

// Produits Ghost Remix Pack
const GHOST_PRODUCTS = {
  'pack-house': {
    id: 'pack-house',
    name: 'Pack House Premium',
    price: 15,
    description: '15 tracks House + stems + samples exclusifs',
    features: ['15 tracks WAV HD', 'Stems séparés', '20 samples bonus'],
    image: null
  },
  'pack-afro': {
    id: 'pack-afro',
    name: 'Pack Afro Vibes', 
    price: 18,
    description: '12 tracks Afro + percussion loops uniques',
    features: ['12 tracks Afro WAV', 'Percussion loops', 'Vocal chops'],
    image: null
  },
  'pack-rap': {
    id: 'pack-rap',
    name: 'Pack Rap FR',
    price: 20,
    description: '10 instrumentales Rap français + MIDI',
    features: ['10 instrumentales WAV', 'Fichiers MIDI', 'Drum kits'],
    image: null
  },
  'pack-complet': {
    id: 'pack-complet',
    name: 'Pack Complet Ghost',
    price: 45,
    originalPrice: 53,
    description: 'Tous les packs + bonus exclusifs (Économie 8€)',
    features: ['37+ tracks WAV', 'Tous les stems', '50+ samples', 'Bonus exclusifs'],
    originalPrice: 53,
    image: null,
    isPopular: true
  }
};

interface SecurePaymentProps {
  className?: string;
}

export default function SecurePayment({ className = '' }: SecurePaymentProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>('pack-complet');

  return (
    <div className={`bg-bg-secondary py-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-6 py-3 mb-6">
            <Shield className="text-green-400" size={24} />
            <span className="text-green-400 font-semibold">Paiement 100% Sécurisé</span>
            <Lock className="text-green-400" size={20} />
          </div>
          
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Achat Sécurisé Stripe
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Paiement direct sécurisé par Stripe. Aucune donnée bancaire n'est stockée sur nos serveurs. 
            Conformité PCI DSS Level 1 garantie.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Colonne gauche - Sélection produit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <Music className="text-neon-violet" size={24} />
              Choisissez votre Pack
            </h3>
            
            <div className="space-y-4">
              {Object.values(GHOST_PRODUCTS).map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedProduct === product.id
                      ? 'border-neon-violet bg-neon-violet/5' 
                      : 'border-gray-600 hover:border-neon-violet/50'
                  }`}
                  onClick={() => setSelectedProduct(product.id)}
                >
                  {/* Badge populaire */}
                  {product.isPopular && (
                    <div className="absolute -top-3 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      🏆 LE PLUS POPULAIRE
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Image produit */}
                    <div className="w-16 h-16 bg-gradient-to-br from-neon-violet/20 to-neon-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Music className="text-neon-violet" size={24} />
                    </div>

                    {/* Informations produit */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-text-primary">{product.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-neon-violet">{product.price}€</span>
                          {product.originalPrice && (
                            <span className="text-sm line-through text-text-secondary">{product.originalPrice}€</span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-text-secondary text-sm mb-3">{product.description}</p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, idx) => (
                          <span key={idx} className="text-xs bg-neon-violet/10 text-neon-violet px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Radio button */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedProduct === product.id 
                        ? 'border-neon-violet bg-neon-violet' 
                        : 'border-gray-600'
                    }`}>
                      {selectedProduct === product.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Garanties */}
            <div className="mt-8 bg-bg-card border border-green-500/20 rounded-xl p-6">
              <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle size={20} />
                Garanties Incluses
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-text-secondary">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                  Téléchargement immédiat après paiement
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                  Licence commerciale incluse
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                  Satisfait ou remboursé 30 jours
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                  Support client premium
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite - Formulaire de paiement */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Elements stripe={stripePromise}>
              <PaymentForm selectedProduct={selectedProduct} />
            </Elements>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Composant formulaire de paiement
function PaymentForm({ selectedProduct }: { selectedProduct: string }) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const product = GHOST_PRODUCTS[selectedProduct as keyof typeof GHOST_PRODUCTS];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !customerInfo.email || !customerInfo.name) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Option 1: Paiement direct avec Stripe Elements (sur le site)
      // Créer Payment Intent
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
      
      const response = await fetch(`${backendUrl}/api/payment/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: selectedProduct,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name
        }),
      });

      const { clientSecret, error } = await response.json();
      
      if (error) {
        throw new Error(error);
      }

      // Confirmer le paiement
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Élément carte non trouvé');
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
          },
        }
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('success');
        
        // Confirmer côté serveur
        await fetch(`${backendUrl}/api/payment/confirm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id
          }),
        });
      }

    } catch (error) {
      console.error('Erreur paiement:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Erreur lors du paiement');
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Styles pour Stripe Elements
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#F5F5F7',
        backgroundColor: '#141420',
        '::placeholder': {
          color: '#B0B0C0',
        },
        iconColor: '#9B5CF6',
      },
      invalid: {
        color: '#ff4757',
        iconColor: '#ff4757',
      },
    },
  };

  if (paymentStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-500/10 border-2 border-green-500/30 rounded-2xl p-8 text-center"
      >
        <CheckCircle className="mx-auto text-green-400 mb-4" size={64} />
        <h3 className="text-2xl font-bold text-green-400 mb-4">Paiement Confirmé !</h3>
        <p className="text-text-secondary mb-6">
          Votre paiement pour <strong>{product.name}</strong> a été traité avec succès.
          Vous allez recevoir un email avec vos liens de téléchargement.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-neon-violet to-neon-cyan text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Nouvel Achat
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-bg-primary border border-neon-violet text-neon-violet px-6 py-3 rounded-xl font-semibold hover:bg-neon-violet hover:text-white transition-all"
          >
            Retour Accueil
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-bg-card border border-neon-violet/20 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-text-primary">Paiement Sécurisé</h3>
        <div className="flex items-center gap-2 text-green-400">
          <Shield size={20} />
          <span className="text-sm font-semibold">Stripe</span>
        </div>
      </div>

      {/* Résumé commande */}
      <div className="bg-gradient-to-r from-neon-violet/10 to-neon-cyan/10 border border-neon-violet/20 rounded-xl p-6 mb-6">
        <h4 className="font-bold text-text-primary mb-2">Votre Commande</h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-primary font-semibold">{product.name}</p>
            <p className="text-text-secondary text-sm">{product.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-neon-violet">{product.price}€</div>
            {product.originalPrice && (
              <div className="text-sm line-through text-text-secondary">{product.originalPrice}€</div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations client */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
              className="w-full bg-bg-primary border border-neon-violet/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 outline-none transition-all"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              required
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              className="w-full bg-bg-primary border border-neon-violet/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 outline-none transition-all"
              placeholder="Votre nom et prénom"
            />
          </div>
        </div>

        {/* Carte bancaire */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Informations Carte *
          </label>
          <div className="bg-bg-primary border border-neon-violet/30 rounded-lg p-4 focus-within:border-neon-violet focus-within:ring-2 focus-within:ring-neon-violet/20 transition-all">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {/* Message d'erreur */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
            >
              <AlertCircle size={18} />
              <span className="text-sm">{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sécurité info */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3 text-green-400">
            <Lock size={18} />
            <div>
              <p className="font-semibold text-sm">Paiement 100% sécurisé</p>
              <p className="text-xs opacity-90">Vos données sont chiffrées et protégées par Stripe</p>
            </div>
          </div>
        </div>

        {/* Bouton de paiement */}
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-gradient-to-r from-neon-violet to-neon-cyan text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-neon-violet/30 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader className="animate-spin" size={20} />
              Traitement en cours...
            </>
          ) : (
            <>
              <Lock size={20} />
              Payer {product.price}€ maintenant
            </>
          )}
        </button>

        {/* Alternatives */}
        <div className="text-center">
          <p className="text-text-secondary text-sm mb-3">Vous préférez être redirigé vers Stripe ?</p>
          <button
            type="button"
            onClick={() => {
              // Redirection vers système de paiement direct
              window.location.href = `/paiement-direct?product=${selectedProduct}`;
            }}
            className="text-neon-violet hover:text-neon-cyan transition-colors text-sm font-semibold flex items-center gap-2 mx-auto"
          >
            <ExternalLink size={16} />
            Paiement via Stripe Checkout
          </button>
        </div>
      </form>
    </div>
  );
}

