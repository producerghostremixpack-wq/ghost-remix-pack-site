import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Mail, User, Lock, Loader, ExternalLink } from 'lucide-react';

interface QuickBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  price: number;
  originalPrice?: number;
  description: string;
}

export default function QuickBuyModal({
  isOpen,
  onClose,
  productId,
  productName,
  price,
  originalPrice,
  description
}: QuickBuyModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuickBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
      
      const response = await fetch(`${backendUrl}/api/payment/quick-buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          email,
          name: name || 'Client Ghost'
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.url) {
        // Redirection vers Stripe
        window.location.href = data.url;
      } else {
        throw new Error('URL de paiement non reçue');
      }

    } catch (error) {
      console.error('Erreur achat rapide:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de l\'achat');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-bg-card border border-neon-violet/30 rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  Achat Rapide
                </h2>
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Produit */}
              <div className="bg-gradient-to-r from-neon-violet/10 to-neon-cyan/10 border border-neon-violet/20 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-text-primary mb-2">{productName}</h3>
                <p className="text-sm text-text-secondary mb-3">{description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-neon-violet">{price}€</span>
                    {originalPrice && originalPrice > price && (
                      <>
                        <span className="text-lg line-through text-text-secondary">{originalPrice}€</span>
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                          -{originalPrice - price}€
                        </span>
                      </>
                    )}
                  </div>
                  <CreditCard className="text-neon-cyan" size={20} />
                </div>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleQuickBuy} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    <Mail className="inline mr-2" size={16} />
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-bg-primary border border-neon-violet/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 outline-none transition-all"
                    placeholder="votre@email.com"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    Vos liens de téléchargement seront envoyés à cette adresse
                  </p>
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    <User className="inline mr-2" size={16} />
                    Nom (optionnel)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-bg-primary border border-neon-violet/30 rounded-lg px-4 py-3 text-text-primary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 outline-none transition-all"
                    placeholder="Votre nom"
                  />
                </div>

                {/* Erreur */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Sécurité */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-center gap-2 text-green-400">
                  <Lock size={16} />
                  <span className="text-sm">Paiement 100% sécurisé par Stripe</span>
                </div>

                {/* Bouton */}
                <button
                  type="submit"
                  disabled={!email || isLoading}
                  className="w-full bg-gradient-to-r from-neon-violet to-neon-cyan text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-neon-violet/30 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Redirection...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Payer {price}€ avec Stripe
                      <ExternalLink size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* Info */}
              <p className="text-xs text-text-secondary text-center mt-4">
                Vous serez redirigé vers Stripe pour finaliser le paiement sécurisé
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

