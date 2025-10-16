import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // TODO: Intégrer avec Supabase ou service de newsletter
    // Pour l'instant, simulation
    setTimeout(() => {
      if (email && email.includes('@')) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titre */}
        <h4 className="text-text-primary font-semibold text-lg flex items-center justify-center gap-2">
          <Mail className="text-neon-violet" size={20} />
          Newsletter Ghost Remix
        </h4>
        
        <p className="text-text-secondary text-sm text-center">
          Soyez alerté des nouveaux packs exclusifs avant tout le monde
        </p>

        {/* Formulaire */}
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            disabled={status === 'sending' || status === 'success'}
            className="flex-1 bg-bg-card border border-neon-violet/30 rounded-full px-4 py-2 text-text-primary text-sm focus:border-neon-violet focus:outline-none focus:ring-2 focus:ring-neon-violet/50 transition-all disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            size="sm"
            className="whitespace-nowrap"
          >
            {status === 'sending' ? 'Envoi...' : status === 'success' ? '✓ Inscrit' : "S'inscrire"}
          </Button>
        </div>

        {/* Message de succès */}
        {status === 'success' && (
          <div className="flex items-center justify-center gap-2 text-neon-cyan text-sm animate-fade-in">
            <CheckCircle size={16} />
            <span>Inscription confirmée ! 🎉</span>
          </div>
        )}

        {/* Message d'erreur */}
        {status === 'error' && (
          <div className="text-red-400 text-sm text-center animate-fade-in">
            ❌ Email invalide, réessayez
          </div>
        )}
      </form>
    </div>
  );
}

