import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  Lock, 
  ExternalLink,
  Zap,
  CheckCircle,
  Star
} from 'lucide-react';
import PaymentButton, { PaymentButtonComplet } from './PaymentButton';
import QuickBuyModal from './QuickBuyModal';

export default function PaymentSection() {
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);
  
  const paymentMethods = [
    {
      title: "Paiement Intégré",
      description: "Formulaire de paiement sécurisé directement sur le site",
      icon: <CreditCard className="text-neon-violet" size={24} />,
      features: ["Formulaire sécurisé", "Stripe Elements", "Pas de redirection"],
      buttonText: "Payer sur le site",
      buttonAction: () => document.getElementById('secure-payment')?.scrollIntoView({ behavior: 'smooth' }),
      variant: "primary" as const
    },
    {
      title: "Paiement Rapide", 
      description: "Modal d'achat rapide avec juste votre email",
      icon: <Zap className="text-neon-cyan" size={24} />,
      features: ["Super rapide", "Juste email + nom", "Modal élégante"],
      buttonText: "Achat Express",
      buttonAction: () => setIsQuickBuyOpen(true),
      variant: "secondary" as const
    },
    {
      title: "Redirection Stripe",
      description: "Redirection vers la page de paiement officielle Stripe",
      icon: <ExternalLink className="text-purple-400" size={24} />,
      features: ["Page Stripe officielle", "Maximum sécurité", "Interface familière"],
      buttonText: "Aller sur Stripe",
      buttonAction: () => window.location.href = '/paiement-direct',
      variant: "ghost" as const
    }
  ];

  return (
    <div className="bg-bg-primary py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-6 py-3 mb-6">
            <Shield className="text-green-400" size={20} />
            <span className="text-green-400 font-semibold">Paiements 100% Sécurisés</span>
            <Lock className="text-green-400" size={16} />
          </div>

          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Choisissez Votre Mode de Paiement
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Plusieurs options de paiement sécurisé pour votre confort. 
            Tous les paiements sont protégés par Stripe avec chiffrement SSL.
          </p>
        </motion.div>

        {/* Pack Complet en évidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-2xl p-8 mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Star className="fill-current" size={16} />
            OFFRE SPÉCIALE
            <Star className="fill-current" size={16} />
          </div>
          
          <h3 className="text-3xl font-bold text-text-primary mb-4">Pack Complet Ghost</h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Tous les packs Ghost + bonus exclusifs. Plus de 37 tracks, stems séparés, 
            et 50+ samples premium pour créer vos hits.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-5xl font-bold text-yellow-500">45€</span>
            <div>
              <span className="text-2xl line-through text-text-secondary">53€</span>
              <div className="bg-green-500 text-white text-sm px-2 py-1 rounded-full">Économie 8€</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-text-secondary">
              <CheckCircle className="text-green-400" size={16} />
              Pack House (15 tracks)
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <CheckCircle className="text-green-400" size={16} />
              Pack Afro (12 tracks)
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <CheckCircle className="text-green-400" size={16} />
              Pack Rap FR (10 tracks)
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <CheckCircle className="text-green-400" size={16} />
              Tous les stems séparés
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <CheckCircle className="text-green-400" size={16} />
              50+ samples exclusifs
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <CheckCircle className="text-green-400" size={16} />
              Licence commerciale
            </div>
          </div>
        </motion.div>

        {/* Options de paiement */}
        <div className="grid md:grid-cols-3 gap-8">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-bg-card border border-neon-violet/20 rounded-2xl p-8 text-center hover:border-neon-violet/40 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-neon-violet/20 to-neon-cyan/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                {method.icon}
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3">
                {method.title}
              </h3>
              
              <p className="text-text-secondary mb-6">
                {method.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {method.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center justify-center gap-2 text-sm text-text-secondary">
                    <CheckCircle className="text-green-400" size={14} />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Bouton Pack Complet */}
              <div className="space-y-3">
                <PaymentButtonComplet
                  variant={method.variant}
                  size="md"
                  className="w-full"
                  onSuccess={() => console.log(`Paiement initié via ${method.title}`)}
                />
                
                <button
                  onClick={method.buttonAction}
                  className="w-full text-neon-violet hover:text-neon-cyan transition-colors text-sm font-semibold"
                >
                  {method.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sécurité & Garanties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Sécurité & Garanties</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <Shield className="text-green-400 mx-auto mb-2" size={24} />
              <h4 className="font-semibold text-text-primary mb-1">Stripe Secure</h4>
              <p className="text-xs text-text-secondary">Chiffrement SSL 256-bit</p>
            </div>
            
            <div>
              <CheckCircle className="text-green-400 mx-auto mb-2" size={24} />
              <h4 className="font-semibold text-text-primary mb-1">Téléchargement Immédiat</h4>
              <p className="text-xs text-text-secondary">Liens envoyés par email</p>
            </div>
            
            <div>
              <Lock className="text-green-400 mx-auto mb-2" size={24} />
              <h4 className="font-semibold text-text-primary mb-1">Données Protégées</h4>
              <p className="text-xs text-text-secondary">Aucune donnée stockée</p>
            </div>
            
            <div>
              <Star className="text-green-400 mx-auto mb-2" size={24} />
              <h4 className="font-semibold text-text-primary mb-1">Satisfait ou Remboursé</h4>
              <p className="text-xs text-text-secondary">Garantie 30 jours</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal Quick Buy */}
      <QuickBuyModal
        isOpen={isQuickBuyOpen}
        onClose={() => setIsQuickBuyOpen(false)}
        productId="pack-complet"
        productName="Pack Complet Ghost"
        price={45}
        originalPrice={53}
        description="Tous les packs + bonus exclusifs (Économie 8€)"
      />
    </div>
  );
}

