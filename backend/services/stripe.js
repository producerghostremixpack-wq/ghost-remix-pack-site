import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

// Initialisation de Stripe avec votre clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

/**
 * Créer une session Stripe Checkout
 * @param {Array} cartItems - Articles du panier
 * @param {String} customerEmail - Email du client
 * @param {Object} metadata - Métadonnées de la commande
 * @returns {String} URL de la session Checkout
 */
export async function createCheckoutSession(cartItems, customerEmail, metadata) {
  try {
    // Créer les line items pour Stripe
    const lineItems = cartItems.map(item => {
      // Extraire le prix numérique
      const priceMatch = item.product.price.match(/\d+/);
      const priceInCents = priceMatch ? parseInt(priceMatch[0]) * 100 : 20000; // 200€ par défaut

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.product.name,
            description: item.product.description,
            metadata: {
              category: item.product.category,
              productId: item.product.id,
            },
          },
          unit_amount: priceInCents, // Prix en centimes
        },
        quantity: item.quantity,
      };
    });

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL,
      customer_email: customerEmail,
      metadata: {
        ...metadata,
        cartItemsCount: cartItems.length,
        orderDate: new Date().toISOString(),
      },
      // Options additionnelles
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC'], // Pays francophones
      },
    });

    console.log('✅ Session Stripe créée:', session.id);
    return session.url; // URL de redirection vers Stripe Checkout
    
  } catch (error) {
    console.error('❌ Erreur Stripe:', error.message);
    throw new Error(`Erreur lors de la création de la session Stripe: ${error.message}`);
  }
}

/**
 * Récupérer les détails d'une session Stripe
 * @param {String} sessionId - ID de la session
 * @returns {Object} Détails de la session
 */
export async function getSessionDetails(sessionId) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error('❌ Erreur récupération session:', error.message);
    throw error;
  }
}

export default stripe;







