import React, { useState, useEffect } from 'react';
import { Mail, Gift, Zap, Star, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface NewsletterProps {
  className?: string;
  variant?: 'default' | 'compact' | 'sidebar' | 'popup';
  showGifts?: boolean;
  autoFocus?: boolean;
}

interface SubscriptionResult {
  success: boolean;
  message: string;
  errorType?: 'invalid' | 'duplicate' | 'server';
}

const Newsletter: React.FC<NewsletterProps> = ({ 
  className = '', 
  variant = 'default',
  showGifts = true,
  autoFocus = false
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SubscriptionResult | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Auto-focus sur l'input si demandé
  useEffect(() => {
    if (autoFocus) {
      const input = document.getElementById('newsletter-email');
      if (input) {
        setTimeout(() => input.focus(), 100);
      }
    }
  }, [autoFocus]);

  // Réinitialiser le résultat après 5 secondes
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setResult(null);
        if (result.success) {
          setShowSuccess(false);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setResult({
        success: false,
        message: 'Veuillez entrer votre email',
        errorType: 'invalid'
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data: SubscriptionResult = await response.json();
      
      setResult(data);
      
      if (data.success) {
        setShowSuccess(true);
        setEmail(''); // Vider le champ si succès
        
        // Analytics (optionnel)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'newsletter_subscribe', {
            event_category: 'engagement',
            event_label: 'newsletter',
            value: 1
          });
        }
      }

    } catch (error) {
      console.error('❌ Erreur inscription newsletter:', error);
      setResult({
        success: false,
        message: 'Erreur de connexion. Veuillez réessayer.',
        errorType: 'server'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'p-4 bg-gray-800/50 rounded-lg';
      case 'sidebar':
        return 'p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/20';
      case 'popup':
        return 'p-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700';
      default:
        return 'p-8 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/30';
    }
  };

  const gifts = [
    { icon: <Gift className="w-5 h-5" />, text: "3 loops trap exclusifs", value: "15€" },
    { icon: <Star className="w-5 h-5" />, text: "Code promo -10%", value: "Immédiat" },
    { icon: <Zap className="w-5 h-5" />, text: "Guide production PDF", value: "20 pages" },
    { icon: <Mail className="w-5 h-5" />, text: "Accès prioritaire", value: "VIP" }
  ];

  if (showSuccess && result?.success) {
    return (
      <div className={`${getVariantClasses()} ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            🎉 Inscription réussie !
          </h3>
          <p className="text-gray-300 mb-4">
            {result.message}
          </p>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">
              📧 Vérifiez votre boîte mail (et vos spams) pour confirmer votre inscription et recevoir vos cadeaux !
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${getVariantClasses()} ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <Mail className="w-6 h-6 text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Newsletter Exclusive
        </h3>
        <p className="text-gray-300">
          Rejoignez +1000 producteurs et recevez vos cadeaux de bienvenue
        </p>
      </div>

      {/* Cadeaux */}
      {showGifts && variant !== 'compact' && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {gifts.map((gift, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-purple-400">
                  {gift.icon}
                </div>
                <span className="text-sm font-medium text-white">
                  {gift.text}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Valeur: {gift.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            disabled={isLoading}
            required
          />
          {email && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Inscription...
            </>
          ) : (
            <>
              <Gift className="w-5 h-5" />
              Recevoir mes cadeaux gratuits
            </>
          )}
        </button>
      </form>

      {/* Message de résultat */}
      {result && !result.success && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300 text-sm">
            {result.message}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          🔒 Vos données sont protégées. Pas de spam, désinscription en 1 clic.
        </p>
        {variant !== 'compact' && (
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Double opt-in
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              RGPD compliant
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Désinscription facile
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
