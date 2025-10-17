import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader, Gift, Download, ShoppingBag, Users } from 'lucide-react';

const NewsletterConfirm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  useEffect(() => {
    const confirmSubscription = async () => {
      if (!email || !token) {
        setResult({
          success: false,
          message: 'Lien de confirmation invalide. Paramètres manquants.'
        });
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/newsletter/confirm?email=${encodeURIComponent(email)}&token=${token}`);
        const data = await response.json();
        
        setResult(data);

        // Analytics si succès
        if (data.success && typeof gtag !== 'undefined') {
          gtag('event', 'newsletter_confirm', {
            event_category: 'engagement',
            event_label: 'newsletter_confirmation',
            value: 1
          });
        }

      } catch (error) {
        console.error('❌ Erreur confirmation newsletter:', error);
        setResult({
          success: false,
          message: 'Erreur de connexion. Veuillez réessayer plus tard.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    confirmSubscription();
  }, [email, token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Confirmation en cours...
          </h1>
          <p className="text-gray-400">
            Nous vérifions votre inscription à la newsletter.
          </p>
        </div>
      </div>
    );
  }

  if (!result?.success) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Erreur de confirmation
          </h1>
          <p className="text-gray-400 mb-6">
            {result?.message || 'Une erreur est survenue lors de la confirmation.'}
          </p>
          <div className="space-y-3">
            <Link
              to="/newsletter"
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Réessayer l'inscription
            </Link>
            <Link
              to="/"
              className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl p-8 max-w-2xl w-full border border-purple-500/30">
        
        {/* Header de succès */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            🎉 Inscription confirmée !
          </h1>
          <p className="text-gray-300 text-lg">
            Bienvenue dans la famille Ghost Remix Pack !
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Email confirmé : <span className="text-purple-400">{email}</span>
          </p>
        </div>

        {/* Cadeaux de bienvenue */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Gift className="w-6 h-6 text-purple-400" />
            Vos cadeaux arrivent par email !
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Download className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">3 Loops Trap Exclusifs</span>
              </div>
              <p className="text-sm text-gray-400">
                Téléchargement immédiat • Valeur 15€
              </p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingBag className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-white">Code Promo -10%</span>
              </div>
              <p className="text-sm text-gray-400">
                Utilisable immédiatement • 30 jours
              </p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Download className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-white">Guide PDF Pro</span>
              </div>
              <p className="text-sm text-gray-400">
                "Produire comme un pro" • 20 pages
              </p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-orange-400" />
                <span className="font-semibold text-white">Accès VIP</span>
              </div>
              <p className="text-sm text-gray-400">
                Nouveautés en avant-première
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-300 mb-2">
            📧 Prochaines étapes :
          </h3>
          <ol className="text-sm text-blue-200 space-y-1">
            <li>1. Vérifiez votre boîte mail (et vos spams)</li>
            <li>2. Téléchargez vos cadeaux de bienvenue</li>
            <li>3. Explorez notre catalogue de packs</li>
            <li>4. Utilisez votre code promo sur votre premier achat</li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/products"
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all text-center flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Découvrir nos packs
          </Link>
          <Link
            to="/"
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
          >
            Retour à l'accueil
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            Vous recevrez nos newsletters avec les dernières nouveautés, conseils et offres exclusives.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Désinscription possible à tout moment en 1 clic.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterConfirm;
