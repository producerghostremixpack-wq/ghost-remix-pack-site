import { useState, FormEvent } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// TypeScript interface for component props
interface TestNewsletterExampleProps {
  className?: string;
  onSubscribe?: (email: string) => void;
}

/**
 * TestNewsletterExample Component
 * 
 * Demonstrates proper newsletter integration following Ghost Remix Pack guidelines:
 * - TypeScript strict typing
 * - Form validation
 * - API integration with Zimbra OVH backend
 * - Error handling
 * - Loading states
 * - Environment variables usage
 * 
 * @example
 * <TestNewsletterExample 
 *   onSubscribe={(email) => console.log('Subscribed:', email)} 
 * />
 */
export default function TestNewsletterExample({ 
  className = '',
  onSubscribe
}: TestNewsletterExampleProps) {
  // State management with proper TypeScript types
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  /**
   * Validate email format
   * @param email - Email address to validate
   * @returns boolean indicating if email is valid
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Handle form submission
   * Subscribes user to newsletter via backend API
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Reset error states
    setError(null);
    setEmailError(null);

    // Validate email
    if (!email) {
      setEmailError('Veuillez entrer une adresse email');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Format d\'email invalide');
      return;
    }

    try {
      setLoading(true);

      // Get backend URL from environment variable
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';

      // Subscribe to newsletter
      const response = await fetch(`${backendUrl}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Handle API errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to subscribe to newsletter');
      }

      const data = await response.json();
      console.log('✅ Newsletter subscription successful:', data);

      // Success state
      setSuccess(true);
      setEmail('');

      // Call optional callback
      if (onSubscribe) {
        onSubscribe(email);
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      // Proper error handling with TypeScript
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('❌ Newsletter error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-gradient-to-br from-neon-blue/10 to-neon-green/10 rounded-2xl p-8 border border-neon-blue/20 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-green mb-4">
          <Mail className="text-white" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Newsletter Ghost Remix Pack
        </h3>
        <p className="text-gray-400">
          Recevez les dernières actualités et offres exclusives
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-start gap-3 animate-fadeIn">
          <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-green-400 font-semibold">Inscription réussie !</p>
            <p className="text-green-300 text-sm mt-1">
              Vous recevrez bientôt un email de confirmation via Zimbra OVH
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-red-400 font-semibold">Erreur d'inscription</p>
            <p className="text-red-300 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Newsletter Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-300 mb-2">
            Adresse email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="text-gray-500" size={20} />
            </div>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              disabled={loading || success}
              className={`
                w-full pl-12 pr-4 py-3 rounded-lg
                bg-gray-800/50 border
                ${emailError ? 'border-red-500' : 'border-gray-700'}
                text-white placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-neon-blue
                focus:border-transparent
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300
              `}
            />
          </div>
          {emailError && (
            <p className="mt-2 text-sm text-red-400">{emailError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || success}
          className={`
            w-full py-3 px-6 rounded-lg font-bold
            bg-gradient-to-r from-neon-blue to-neon-green
            text-white shadow-lg shadow-neon-blue/50
            hover:shadow-xl hover:shadow-neon-blue/70
            hover:scale-105
            active:scale-95
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            flex items-center justify-center gap-3
          `}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Inscription en cours...</span>
            </>
          ) : success ? (
            <>
              <CheckCircle size={20} />
              <span>Inscrit !</span>
            </>
          ) : (
            <>
              <Mail size={20} />
              <span>S'inscrire à la newsletter</span>
            </>
          )}
        </button>
      </form>

      {/* Privacy Notice */}
      <p className="mt-6 text-xs text-gray-500 text-center">
        En vous inscrivant, vous acceptez de recevoir des emails de Ghost Remix Pack.
        <br />
        Nous respectons votre vie privée et ne partageons jamais vos données.
      </p>

      {/* Backend Info */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-xs text-gray-600 text-center">
          Backend: <span className="text-neon-blue font-mono text-xs">
            {import.meta.env.VITE_BACKEND_URL || 'Not configured'}
          </span>
        </p>
      </div>
    </div>
  );
}
