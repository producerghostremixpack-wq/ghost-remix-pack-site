import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Zap, 
  ShoppingCart, 
  Music, 
  ExternalLink,
  Play,
  Download,
  Star,
  Users,
  Clock
} from 'lucide-react';
import PaymentButton, { 
  PaymentButtonHouse, 
  PaymentButtonAfro, 
  PaymentButtonRap, 
  PaymentButtonComplet 
} from './PaymentButton';
import QuickBuyModal from './QuickBuyModal';

export default function DirectPaymentDemo() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);

  const products = [
    {
      id: 'pack-house',
      name: 'Pack House Premium',
      price: 15,
      description: '15 tracks House + stems + samples exclusifs',
      image: null,
      features: ['15 tracks WAV HD', 'Stems séparés', '20 samples bonus', 'Licence commerciale'],
      preview: '/audio/house-preview.mp3',
      rating: 4.8,
      sales: 1247,
      duration: '2h 15min'
    },
    {
      id: 'pack-afro',
      name: 'Pack Afro Vibes',
      price: 18,
      description: '12 tracks Afro + percussion loops uniques',
      image: null,
      features: ['12 tracks Afro WAV', 'Percussion loops', 'Vocal chops', 'Instruments traditionnels'],
      preview: '/audio/afro-preview.mp3',
      rating: 4.9,
      sales: 892,
      duration: '1h 45min'
    },
    {
      id: 'pack-rap',
      name: 'Pack Rap FR',
      price: 20,
      description: '10 instrumentales Rap français + MIDI',
      image: null,
      features: ['10 instrumentales WAV', 'Fichiers MIDI', 'Drum kits', 'Samples français'],
      preview: '/audio/rap-preview.mp3',
      rating: 4.7,
      sales: 1569,
      duration: '1h 30min'
    },
    {
      id: 'pack-complet',
      name: 'Pack Complet Ghost',
      price: 45,
      originalPrice: 53,
      description: 'Tous les packs + bonus exclusifs (Économie 8€)',
      image: null,
      features: ['37+ tracks WAV', 'Tous les stems', '50+ samples', 'Bonus exclusifs', '3 packs inclus'],
      preview: '/audio/complet-preview.mp3',
      rating: 5.0,
      sales: 2341,
      duration: '5h 30min',
      isPopular: true
    }
  ];

  const openQuickBuy = (product: any) => {
    setSelectedProduct(product);
    setIsQuickBuyOpen(true);
  };

  const closeQuickBuy = () => {
    setIsQuickBuyOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-gradient-to-r from-neon-violet to-neon-cyan py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <CreditCard className="text-white" size={48} />
              <h1 className="text-5xl font-bold text-white">
                Paiement Direct Stripe
              </h1>
              <ExternalLink className="text-white" size={48} />
            </div>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Système de paiement direct avec redirection automatique vers Stripe Checkout. 
              Sécurisé, rapide et optimisé pour vos packs musicaux Ghost.
            </p>

            <div className="flex justify-center gap-4 text-sm">
              <div className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                <Zap className="text-white" size={16} />
                <span className="text-white">Paiement instantané</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                <ShoppingCart className="text-white" size={16} />
                <span className="text-white">Redirection Stripe</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                <Download className="text-white" size={16} />
                <span className="text-white">Téléchargement immédiat</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Styles de boutons de paiement */}
      <div className="py-16 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Styles de Boutons de Paiement
            </h2>
            <p className="text-text-secondary">
              Différentes variantes pour s'adapter à votre design
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Bouton Primary */}
            <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-text-primary mb-4">Style Primary</h3>
              <PaymentButtonHouse variant="primary" size="md" />
            </div>

            {/* Bouton Secondary */}
            <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-text-primary mb-4">Style Secondary</h3>
              <PaymentButtonAfro variant="secondary" size="md" />
            </div>

            {/* Bouton Ghost */}
            <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-text-primary mb-4">Style Ghost</h3>
              <PaymentButtonRap variant="ghost" size="md" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Taille Small */}
            <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-text-primary mb-4">Taille Small</h3>
              <PaymentButton
                productId="pack-house"
                productName="Pack House"
                price={15}
                size="sm"
                variant="primary"
              />
            </div>

            {/* Taille Medium */}
            <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-text-primary mb-4">Taille Medium</h3>
              <PaymentButton
                productId="pack-afro"
                productName="Pack Afro"
                price={18}
                size="md"
                variant="primary"
              />
            </div>

            {/* Taille Large */}
            <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-text-primary mb-4">Taille Large</h3>
              <PaymentButton
                productId="pack-complet"
                productName="Pack Complet"
                price={45}
                originalPrice={53}
                size="lg"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Catalogue avec boutons intégrés */}
      <div className="py-20 bg-bg-primary">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Catalogue avec Paiement Direct
            </h2>
            <p className="text-xl text-text-secondary">
              Chaque produit avec son bouton de paiement intégré
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-bg-card border border-neon-violet/20 rounded-2xl overflow-hidden hover:border-neon-violet/40 transition-all duration-300"
              >
                {/* Badge populaire */}
                {product.isPopular && (
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-4 py-2 text-center">
                    🔥 LE PLUS POPULAIRE 🔥
                  </div>
                )}

                {/* Image produit */}
                <div className="relative h-48 bg-gradient-to-br from-neon-violet/20 to-neon-cyan/20 flex items-center justify-center">
                  <Music className="text-neon-violet" size={64} />
                  <button className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all">
                    <Play size={16} />
                  </button>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-2">
                        {product.name}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {product.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-400 mb-1">
                        <Star className="fill-current" size={14} />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      <div className="text-xs text-text-secondary">
                        {product.sales} ventes
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-1">
                      <Music size={14} />
                      <span>{product.features[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{product.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{product.sales}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                          <div className="w-1 h-1 bg-neon-violet rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prix et boutons */}
                  <div className="space-y-3">
                    {/* Prix */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-neon-violet">{product.price}€</span>
                        {product.originalPrice && (
                          <span className="text-lg line-through text-text-secondary">{product.originalPrice}€</span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Économie {product.originalPrice - product.price}€
                        </div>
                      )}
                    </div>

                    {/* Boutons de paiement */}
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <PaymentButton
                          productId={product.id}
                          productName={product.name}
                          price={product.price}
                          originalPrice={product.originalPrice}
                          description={product.description}
                          size="md"
                          variant="primary"
                          className="w-full"
                        />
                      </div>
                      <button
                        onClick={() => openQuickBuy(product)}
                        className="bg-gradient-to-r from-neon-cyan to-purple-500 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all"
                        title="Achat rapide"
                      >
                        <Zap size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="py-16 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Fonctionnalités du Système de Paiement
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-neon-violet to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Redirection Stripe
              </h3>
              <p className="text-text-secondary">
                Redirection automatique vers Stripe Checkout pour un paiement sécurisé
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-neon-cyan to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Achat Rapide
              </h3>
              <p className="text-text-secondary">
                Modal d'achat rapide avec juste email et redirection immédiate
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Téléchargement Auto
              </h3>
              <p className="text-text-secondary">
                Emails automatiques avec liens de téléchargement après paiement
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Achat Rapide */}
      {selectedProduct && (
        <QuickBuyModal
          isOpen={isQuickBuyOpen}
          onClose={closeQuickBuy}
          productId={selectedProduct.id}
          productName={selectedProduct.name}
          price={selectedProduct.price}
          originalPrice={selectedProduct.originalPrice}
          description={selectedProduct.description}
        />
      )}
    </div>
  );
}

