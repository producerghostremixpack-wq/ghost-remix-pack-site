import React, { useState } from 'react';
import { Mail, Gift, Zap, Star, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterResult {
  success: boolean;
  message: string;
  errorType?: 'invalid' | 'duplicate' | 'server';
  mode?: string;
  preview_user_email?: string;
  preview_admin_notification?: string;
}

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<NewsletterResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    // Validation côté client
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();

    if (!emailRegex.test(cleanEmail)) {
      setResult({
        success: false,
        message: 'Format d\'email invalide',
        errorType: 'invalid'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';
      
      const response = await fetch(`${apiUrl}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          email: cleanEmail,
          name: name.trim() || 'Ghost Fan',
          message: 'Inscription depuis le formulaire newsletter du site Ghost Remix Pack',
          source: 'website-newsletter-form'
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: data.message || '✅ Inscription confirmée ! Email envoyé depuis contact@ghostremixpack.com',
          mode: data.mode,
          preview_user_email: data.preview_user_email,
          preview_admin_notification: data.preview_admin_notification
        });
        
        // Reset form on success
        setEmail('');
        setName('');
      } else {
        setResult({
          success: false,
          message: data.error || data.message || 'Une erreur est survenue',
          errorType: data.error?.includes('existe') ? 'duplicate' : 'server'
        });
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      setResult({
        success: false,
        message: 'Erreur de connexion. Vérifiez votre connexion et réessayez.',
        errorType: 'server'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bg-card border border-neon-violet/20 rounded-2xl p-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-violet/5 to-neon-cyan/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-neon-violet/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-neon-violet/20 rounded-xl">
              <Mail className="text-neon-violet" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-text-primary">Newsletter Ghost</h2>
          </div>
          <p className="text-text-secondary max-w-md mx-auto">
            Recevez les derniers packs exclusifs, avant-premières et offres spéciales directement dans votre boîte mail !
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-neon-violet/10 rounded-lg">
            <Gift className="text-neon-violet flex-shrink-0" size={20} />
            <span className="text-sm text-text-secondary">Packs gratuits exclusifs</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-neon-cyan/10 rounded-lg">
            <Zap className="text-neon-cyan flex-shrink-0" size={20} />
            <span className="text-sm text-text-secondary">Avant-premières</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-neon-violet/10 rounded-lg">
            <Star className="text-neon-violet flex-shrink-0" size={20} />
            <span className="text-sm text-text-secondary">Codes promo VIP</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom (optionnel)"
              className="w-full bg-bg-primary border border-neon-violet/30 rounded-xl px-4 py-3 text-text-primary placeholder-text-secondary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Email field */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="w-full bg-bg-primary border border-neon-violet/30 rounded-xl px-4 py-3 text-text-primary placeholder-text-secondary focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-neon-violet to-neon-cyan text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-neon-violet/30 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neon-violet focus:ring-offset-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" size={20} />
                Inscription...
              </>
            ) : (
              <>
                <Mail size={20} />
                S'inscrire à la newsletter
              </>
            )}
          </button>
        </form>

        {/* Result message */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 p-4 rounded-xl border flex items-start gap-3 ${
                result.success
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              {result.success ? (
                <CheckCircle className="flex-shrink-0 mt-0.5" size={18} />
              ) : (
                <AlertCircle className="flex-shrink-0 mt-0.5" size={18} />
              )}
              <div className="flex-1">
                <p className="font-medium">{result.message}</p>
                {result.mode && (
                  <p className="text-xs mt-1 opacity-75">Mode : {result.mode}</p>
                )}
                {result.success && (result.preview_user_email || result.preview_admin_notification) && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium">📧 Emails de test générés :</p>
                    {result.preview_user_email && (
                      <a 
                        href={result.preview_user_email} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-xs text-blue-400 hover:text-blue-300 underline break-all"
                      >
                        👤 Voir email utilisateur
                      </a>
                    )}
                    {result.preview_admin_notification && (
                      <a 
                        href={result.preview_admin_notification} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-xs text-blue-400 hover:text-blue-300 underline break-all"
                      >
                        🔔 Voir notification admin
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-secondary">
            📧 Emails envoyés depuis <strong>contact@ghostremixpack.com</strong>
          </p>
          <p className="text-xs text-text-secondary/70 mt-1">
            Désinscription possible à tout moment • Pas de spam garanti
          </p>
        </div>
      </div>
    </div>
  );
}