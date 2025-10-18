import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Music, 
  Share2,
  Twitter,
  Instagram,
  Copy,
  ExternalLink
} from 'lucide-react';

interface OrderDetails {
  id: string;
  customerEmail: string;
  total: number;
  status: string;
  items: Array<{
    name: string;
    downloadUrl?: string;
  }>;
}

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails(sessionId);
    }
  }, [sessionId]);

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
      
      const response = await fetch(`${backendUrl}/api/checkout/session/${sessionId}`);
      const data = await response.json();
      
      if (data.success) {
        setOrderDetails(data.session);
      } else {
        setError('Impossible de récupérer les détails de votre commande');
      }
    } catch (err) {
      console.error('Erreur récupération commande:', err);
      setError('Erreur lors de la récupération de votre commande');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Vous pourriez ajouter une notification toast ici
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-violet mx-auto mb-4"></div>
          <p className="text-text-secondary">Récupération de votre commande...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6">
          <div className="text-red-400 mb-4">
            <AlertCircle className="mx-auto mb-2" size={48} />
            <h2 className="text-xl font-bold">Erreur</h2>
          </div>
          <p className="text-text-secondary mb-4">{error}</p>
          <Link 
            to="/" 
            className="inline-block bg-gradient-to-r from-neon-violet to-neon-cyan text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <CheckCircle className="mx-auto text-white" size={64} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-4"
          >
            🎉 Paiement Confirmé !
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/90"
          >
            Félicitations ! Vos packs Ghost Remix sont prêts à télécharger
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Colonne gauche - Détails commande */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <OrderConfirmation orderDetails={orderDetails} />
          </motion.div>

          {/* Colonne droite - Téléchargements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <DownloadSection orderDetails={orderDetails} />
          </motion.div>

        </div>

        {/* Section partage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <ShareSection />
        </motion.div>

        {/* Section suivante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <NextSteps />
        </motion.div>
      </div>
    </div>
  );
}

function OrderConfirmation({ orderDetails }: { orderDetails: OrderDetails | null }) {
  return (
    <div className="bg-bg-card border border-green-500/20 rounded-xl p-6">
      <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
        <CheckCircle className="text-green-400" size={20} />
        Détails de votre commande
      </h2>

      {orderDetails && (
        <div className="space-y-4">
          <div className="bg-green-500/10 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Commande #</span>
                <p className="font-mono text-text-primary">{orderDetails.id}</p>
              </div>
              <div>
                <span className="text-text-secondary">Montant</span>
                <p className="font-bold text-lg text-green-400">{orderDetails.total}€</p>
              </div>
              <div className="col-span-2">
                <span className="text-text-secondary">Email de confirmation</span>
                <p className="text-text-primary">{orderDetails.customerEmail}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-2">Articles commandés :</h3>
            <div className="space-y-2">
              {orderDetails.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-bg-primary/50 rounded-lg">
                  <Music className="text-neon-violet flex-shrink-0" size={20} />
                  <span className="text-text-primary">{item.name}</span>
                  <Download className="text-neon-cyan ml-auto" size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Mail className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="font-semibold text-blue-400">Email de confirmation envoyé</h4>
            <p className="text-sm text-text-secondary mt-1">
              Vous allez recevoir un email avec tous les détails de votre commande et vos liens de téléchargement dans les prochaines minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadSection({ orderDetails }: { orderDetails: OrderDetails | null }) {
  return (
    <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6">
      <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
        <Download className="text-neon-violet" size={20} />
        Vos Téléchargements
      </h2>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-neon-violet/10 to-neon-cyan/10 p-4 rounded-lg border border-neon-violet/20">
          <h3 className="font-semibold text-text-primary mb-2">📥 Téléchargement immédiat</h3>
          <p className="text-sm text-text-secondary mb-3">
            Vos liens de téléchargement sont disponibles dans l'email de confirmation. 
            Ils resteront actifs pendant 30 jours.
          </p>
          
          {/* Boutons de téléchargement simulés */}
          <div className="space-y-2">
            <button className="w-full bg-gradient-to-r from-neon-violet to-neon-cyan text-white p-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Download size={18} />
              Télécharger Pack House (47 MB)
            </button>
            <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Download size={18} />
              Télécharger Pack Afro (52 MB)
            </button>
          </div>
        </div>

        <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
          <h4 className="font-semibold text-yellow-400 mb-2">💡 Conseils d'utilisation</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Formats inclus : WAV, MIDI, stems séparés</li>
            <li>• Compatible : FL Studio, Ableton, Logic Pro...</li>
            <li>• License : Usage commercial autorisé</li>
            <li>• Support : Répondez à l'email pour toute question</li>
          </ul>
        </div>

        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
          <h4 className="font-semibold text-purple-400 mb-2">🎁 Bonus inclus</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• 20 samples exclusifs Ghost Remix</li>
            <li>• Presets Serum/Massive</li>
            <li>• Guide de mixage PDF</li>
            <li>• Accès Discord VIP producteurs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ShareSection() {
  const shareText = "Je viens de récupérer des packs incroyables sur Ghost Remix Pack ! 🎵🔥";
  const shareUrl = "https://www.ghostremixpack.com";

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnInstagram = () => {
    // Instagram ne permet pas le partage direct, on copie juste le texte
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6">
      <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
        <Share2 className="text-neon-violet" size={20} />
        Partagez votre expérience
      </h2>

      <p className="text-text-secondary mb-4">
        Vous êtes satisfait de vos achats ? Partagez Ghost Remix Pack avec vos amis producteurs !
      </p>

      <div className="flex gap-3">
        <button
          onClick={shareOnTwitter}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Twitter size={18} />
          Twitter
        </button>
        <button
          onClick={shareOnInstagram}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Instagram size={18} />
          Instagram
        </button>
        <button
          onClick={copyLink}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Copy size={18} />
          Copier lien
        </button>
      </div>
    </div>
  );
}

function NextSteps() {
  return (
    <div className="bg-bg-card border border-neon-violet/20 rounded-xl p-6">
      <h2 className="text-xl font-bold text-text-primary mb-4">🚀 Et maintenant ?</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-neon-violet/10 to-purple-500/10 rounded-lg">
          <Music className="mx-auto text-neon-violet mb-2" size={24} />
          <h3 className="font-semibold text-text-primary mb-1">Créez</h3>
          <p className="text-sm text-text-secondary">
            Utilisez vos nouveaux packs pour créer des hits
          </p>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-neon-cyan/10 to-blue-500/10 rounded-lg">
          <Share2 className="mx-auto text-neon-cyan mb-2" size={24} />
          <h3 className="font-semibold text-text-primary mb-1">Partagez</h3>
          <p className="text-sm text-text-secondary">
            Montrez vos créations sur les réseaux
          </p>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
          <ExternalLink className="mx-auto text-green-400 mb-2" size={24} />
          <h3 className="font-semibold text-text-primary mb-1">Découvrez</h3>
          <p className="text-sm text-text-secondary">
            <Link to="/" className="text-neon-violet hover:underline">
              Explorez nos autres packs
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link 
          to="/"
          className="inline-block bg-gradient-to-r from-neon-violet to-neon-cyan text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-neon-violet/30 transition-all"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

