/**
 * Configuration Stripe
 * 
 * IMPORTANT : Remplacez la clé publique Stripe ci-dessous
 * par votre vraie clé depuis : https://dashboard.stripe.com/test/apikeys
 */

// 🔑 Clé publique Stripe (CONFIGURÉE ✅)
// Compte: acct_1SHjdhH8jTnKrV0h
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_51SHjdhH8jTnKrV0h58QolNENI96haMoYD3NNvuetzURrqoRElLXx4EmzgDlO70AEI1pmN9dYiCriCdeG1lYdLEN100y8DUaDyZ';

// 🌐 URL du Backend API
export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// 🔗 URLs de Redirection
export const SUCCESS_URL = `${window.location.origin}/success`;
export const CANCEL_URL = `${window.location.origin}/cart`;

// 📊 Mode (test ou production)
export const IS_TEST_MODE = STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_');

// ℹ️ Info
export const STRIPE_ACCOUNT_ID = 'acct_1SHjdhH8jTnKrV0h';

/**
 * Vérifier si Stripe est configuré
 */
export function isStripeConfigured(): boolean {
  // Vérifier que la clé est définie et semble valide
  return STRIPE_PUBLISHABLE_KEY.length > 30 && STRIPE_PUBLISHABLE_KEY.startsWith('pk_');
}

/**
 * Obtenir le message de configuration
 */
export function getConfigMessage(): string {
  if (!isStripeConfigured()) {
    return '⚠️ Stripe non configuré. Allez sur https://dashboard.stripe.com/test/apikeys';
  }
  return IS_TEST_MODE ? '🧪 Mode Test' : '🟢 Mode Production';
}

