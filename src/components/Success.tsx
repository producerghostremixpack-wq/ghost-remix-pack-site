import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function Success() {
  const [sessionData, setSessionData] = useState<any>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    // Récupérer l'ID de session depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      // Appeler l'API pour récupérer les détails de la session
      fetch(`http://localhost:3001/api/checkout/session/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSessionData(data.session);
            // Vider le panier
            clearCart();
          }
        })
        .catch(err => console.error('Erreur récupération session:', err));
    }
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-bg-primary text-white font-poppins flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-2xl"
      >
        {/* Icône de succès */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        >
          <CheckCircle size={120} className="mx-auto mb-8 text-green-500" />
        </motion.div>

        {/* Titre */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold mb-6 text-text-primary"
          style={{
            textShadow: '0 0 20px rgba(34, 197, 94, 0.6)',
          }}
        >
          🎉 Paiement Réussi !
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-text-secondary text-lg mb-4">
            Merci pour votre commande Ghost Remix Pack !
          </p>

          {sessionData && (
            <div className="bg-bg-card border border-green-500/30 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Mail className="text-green-500" size={24} />
                <p className="text-text-primary">
                  Un email de confirmation a été envoyé à<br/>
                  <strong className="text-green-500">{sessionData.email}</strong>
                </p>
              </div>
              
              <div className="text-center text-text-secondary text-sm">
                <p className="mb-2">💰 Montant payé : <strong className="text-neon-violet">{sessionData.total}€</strong></p>
                <p>🎵 Vos packs seront livrés sous <strong>48h maximum</strong></p>
              </div>
            </div>
          )}

          <div className="bg-neon-violet/10 border border-neon-violet/30 rounded-lg p-6 text-left">
            <h3 className="text-neon-violet font-bold mb-3 text-center">📦 Prochaines Étapes</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Paiement validé et sécurisé par Stripe</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-violet mt-1">📧</span>
                <span>Email de confirmation envoyé immédiatement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-cyan mt-1">⏱️</span>
                <span>Vos packs seront préparés dans les prochaines heures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-violet mt-1">🎵</span>
                <span>Vous recevrez un second email avec les liens de téléchargement (fichiers WAV haute qualité)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">💯</span>
                <span>100% des droits d'exploitation vous reviennent</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Boutons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-neon-violet to-neon-cyan glow-violet hover:scale-105"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour à l'Accueil
          </Button>

          <Button
            onClick={() => window.location.href = '/contact'}
            variant="outline"
            className="border-neon-violet/30 hover:bg-neon-violet/10"
          >
            Besoin d'aide ?
          </Button>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-text-secondary text-xs mt-8"
        >
          En cas de problème, contactez-nous : <a href="mailto:contact@ghostremixpack.com" className="text-neon-violet hover:underline">contact@ghostremixpack.com</a>
        </motion.p>
      </motion.div>
    </div>
  );
}







