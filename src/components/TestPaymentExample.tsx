import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// TypeScript interface for component props
interface TestPaymentExampleProps {
  productId?: string;
  productName?: string;
  price?: number;
  className?: string;
}

// Stripe promise initialization
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

/**
 * TestPaymentExample Component
 * 
 * Demonstrates proper Stripe integration following Ghost Remix Pack guidelines:
 * - TypeScript strict typing
 * - Tailwind CSS styling
 * - Error handling
 * - Loading states
 * - Environment variables usage
 * 
 * @example
 * <TestPaymentExample 
 *   productId="pack-complet" 
 *   productName="Pack Complet Ghost" 
 *   price={29900} 
 * />
 */
export default function TestPaymentExample({ 
  productId = 'pack-complet',
  productName = 'Pack Complet Ghost',
  price = 29900,
  className = ''
}: TestPaymentExampleProps) {
  // State management with proper TypeScript types
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  /**
   * Handle checkout process
   * Creates Stripe Checkout Session and redirects user
   */
  const handleCheckout = async (): Promise<void> => {
    try {
      // Reset states
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Get backend URL from environment variable
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app';

      // Create checkout session
      const response = await fetch(`${backendUrl}/api/payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          productName,
          price,
        }),
      });

      // Handle API errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Rediriger vers la page de checkout Stripe
      window.location.href = data.url;

      setSuccess(true);
    } catch (err) {
      // Proper error handling with TypeScript
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('❌ Checkout error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Format price for display (convert cents to euros)
  const formatPrice = (cents: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  return (
    <div className={`bg-gradient-to-br from-neon-violet/10 to-neon-blue/10 rounded-2xl p-8 border border-neon-violet/20 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          {productName}
        </h3>
        <p className="text-3xl font-extrabold bg-gradient-to-r from-neon-violet to-neon-blue bg-clip-text text-transparent">
          {formatPrice(price)}
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-red-400 font-semibold">Erreur de paiement</p>
            <p className="text-red-300 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Success Display */}
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-start gap-3 animate-fadeIn">
          <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-green-400 font-semibold">Redirection en cours...</p>
            <p className="text-green-300 text-sm mt-1">
              Vous allez être redirigé vers Stripe Checkout
            </p>
          </div>
        </div>
      )}

      {/* Payment Button */}
      <button
        onClick={handleCheckout}
        disabled={loading || success}
        className={`
          w-full py-4 px-6 rounded-xl font-bold text-lg
          bg-gradient-to-r from-neon-violet to-neon-blue
          text-white shadow-lg shadow-neon-violet/50
          hover:shadow-xl hover:shadow-neon-violet/70
          hover:scale-105
          active:scale-95
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          flex items-center justify-center gap-3
        `}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            <span>Chargement...</span>
          </>
        ) : success ? (
          <>
            <CheckCircle size={24} />
            <span>Redirection...</span>
          </>
        ) : (
          <>
            <CreditCard size={24} />
            <span>Payer avec Stripe</span>
          </>
        )}
      </button>

      {/* Security Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Paiement sécurisé par Stripe</span>
      </div>

      {/* Product Info */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-sm text-gray-600 text-center">
          Product ID: <span className="text-neon-violet font-mono">{productId}</span>
        </p>
      </div>
    </div>
  );
}
