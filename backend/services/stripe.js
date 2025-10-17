import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

// Mode démo si clés de démonstration
const isDemoMode = process.env.DEMO_MODE === 'true' || 
                   process.env.STRIPE_SECRET_KEY.includes('demo') ||
                   !process.env.STRIPE_SECRET_KEY.startsWith('sk_test_');

let stripe;
if (isDemoMode) {
  console.log('⚠️  Mode démonstration Stripe activé');
  // Simuler Stripe en mode démo
  stripe = {
    checkout: {
      sessions: {
        create: async (data) => ({
          id: 'cs_demo_' + Date.now(),
          url: `${process.env.FRONTEND_URL}/demo-checkout?amount=${data.line_items[0].price_data.unit_amount}`
        }),
        retrieve: async (id) => ({
          id,
          payment_status: 'paid',
          customer_details: { email: 'demo@example.com' },
          metadata: { product_id: 'demo_product' }
        })
      }
    },
    webhooks: {
      constructEvent: (payload, signature, secret) => ({
        type: 'checkout.session.completed',
        data: { object: { id: 'demo_session', customer_details: { email: 'demo@example.com' } } }
      })
    }
  };
} else {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  console.log('✅ Stripe configuré avec vraies clés');
}

// Produits Ghost Remix Pack
const PRODUCTS = {
  trap_pack: {
    name: "Pack Trap Beats Premium",
    description: "10 beats trap professionnels + stems + presets",
    price: 2999, // 29.99€
    files: ["trap_beats_pack.zip", "trap_stems.zip", "serum_presets.zip"],
    image: "/images/trap-pack.jpg"
  },
  hiphop_pack: {
    name: "Pack Hip-Hop Exclusif", 
    description: "15 beats hip-hop + bonus loops + guide mixing",
    price: 3999, // 39.99€
    files: ["hiphop_beats_pack.zip", "bonus_loops.zip", "mixing_guide.pdf"],
    image: "/images/hiphop-pack.jpg"
  },
  drill_pack: {
    name: "Pack Drill Intense",
    description: "8 beats drill + presets + samples exclusifs",
    price: 2499, // 24.99€
    files: ["drill_beats_pack.zip", "drill_presets.zip", "exclusive_samples.zip"],
    image: "/images/drill-pack.jpg"
  },
  mega_pack: {
    name: "Mega Pack Complet",
    description: "TOUS les packs + bonus exclusifs + masterclass",
    price: 7999, // 79.99€
    files: ["all_packs_complete.zip", "exclusive_bonus.zip", "masterclass_video.mp4"],
    image: "/images/mega-pack.jpg"
  }
};

// Types de licences
const LICENSES = {
  basic: {
    name: "Licence Basique",
    description: "Usage personnel et streaming (jusqu'à 100k streams)",
    multiplier: 1
  },
  premium: {
    name: "Licence Premium",
    description: "Usage commercial + radio + TV (streams illimités)",
    multiplier: 2
  },
  exclusive: {
    name: "Licence Exclusive", 
    description: "Droits exclusifs complets + stems + crédits",
    multiplier: 5
  }
};

export class StripeService {
  constructor() {
    this.stripe = stripe;
    this.isDemoMode = isDemoMode;
  }

  // Créer une session de checkout
  async createCheckoutSession(productId, licenseType = 'basic', customerData = {}) {
    try {
      const product = PRODUCTS[productId];
      const license = LICENSES[licenseType];
      
      if (!product) {
        throw new Error(`Produit non trouvé: ${productId}`);
      }
      
      if (!license) {
        throw new Error(`Licence non trouvée: ${licenseType}`);
      }

      const finalPrice = product.price * license.multiplier;
      
      if (this.isDemoMode) {
        console.log(`🎭 [DEMO] Session créée pour ${product.name} - ${finalPrice/100}€`);
        return {
          id: 'cs_demo_' + Date.now(),
          url: `${process.env.FRONTEND_URL}/demo-checkout?product=${productId}&license=${licenseType}&amount=${finalPrice}`
        };
      }

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: process.env.STRIPE_CURRENCY || 'eur',
            product_data: {
              name: `${product.name} - ${license.name}`,
              description: `${product.description}\n\n📜 ${license.description}`,
              images: product.image ? [`${process.env.FRONTEND_URL}${product.image}`] : []
            },
            unit_amount: finalPrice
          },
          quantity: 1
        }],
        mode: 'payment',
        success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.STRIPE_CANCEL_URL,
        customer_email: customerData.email,
        metadata: {
          product_id: productId,
          license_type: licenseType,
          customer_name: customerData.name || '',
          files: JSON.stringify(product.files)
        },
        allow_promotion_codes: true,
        billing_address_collection: 'required'
      });

      console.log(`✅ Session Stripe créée: ${session.id}`);
      return session;
      
    } catch (error) {
      console.error('❌ Erreur création session Stripe:', error);
      throw error;
    }
  }

  // Récupérer une session
  async getSession(sessionId) {
    try {
      if (this.isDemoMode) {
        return {
          id: sessionId,
          payment_status: 'paid',
          customer_details: { email: 'demo@example.com' },
          metadata: { product_id: 'demo_product' }
        };
      }
      return await this.stripe.checkout.sessions.retrieve(sessionId);
    } catch (error) {
      console.error('❌ Erreur récupération session:', error);
      throw error;
    }
  }

  // Gérer les webhooks
  async handleWebhook(payload, signature) {
    try {
      let event;
      
      if (this.isDemoMode) {
        console.log('🎭 [DEMO] Webhook simulé');
        event = {
          type: 'checkout.session.completed',
          data: { 
            object: { 
              id: 'demo_session',
              customer_details: { email: 'demo@example.com' },
              metadata: { product_id: 'trap_pack', license_type: 'basic' }
            } 
          }
        };
      } else {
        event = this.stripe.webhooks.constructEvent(
          payload,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      }

      console.log(`📡 Webhook reçu: ${event.type}`);

      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleSuccessfulPayment(event.data.object);
          break;
        case 'payment_intent.succeeded':
          console.log('💳 Paiement réussi:', event.data.object.id);
          break;
        case 'payment_intent.payment_failed':
          await this.handleFailedPayment(event.data.object);
          break;
        default:
          console.log(`⚠️ Événement non géré: ${event.type}`);
      }

      return { received: true };
      
    } catch (error) {
      console.error('❌ Erreur webhook:', error);
      throw error;
    }
  }

  // Gérer un paiement réussi
  async handleSuccessfulPayment(session) {
    try {
      console.log('🎉 Paiement réussi pour la session:', session.id);
      
      const { product_id, license_type, files } = session.metadata || {};
      const customerEmail = session.customer_details?.email || 'demo@example.com';
      
      if (this.isDemoMode) {
        console.log('🎭 [DEMO] Livraison simulée');
        console.log(`📧 Email simulé envoyé à: ${customerEmail}`);
        console.log(`🎵 Produit simulé: ${product_id} (${license_type})`);
        return { success: true, mode: 'demo' };
      }
      
      // Ici vous pouvez :
      // 1. Envoyer l'email de confirmation avec les liens de téléchargement
      // 2. Créer les liens de téléchargement temporaires
      // 3. Enregistrer la vente en base de données
      // 4. Envoyer les fichiers par email
      
      console.log(`📧 Livraison à envoyer à: ${customerEmail}`);
      console.log(`🎵 Produit: ${product_id} (${license_type})`);
      console.log(`📁 Fichiers: ${files}`);
      
      return {
        success: true,
        customer: customerEmail,
        product: product_id,
        license: license_type
      };
      
    } catch (error) {
      console.error('❌ Erreur traitement paiement:', error);
      throw error;
    }
  }

  // Gérer un paiement échoué
  async handleFailedPayment(paymentIntent) {
    console.log('❌ Paiement échoué:', paymentIntent.id);
    // Ici vous pouvez envoyer un email de notification d'échec
  }

  // Obtenir les produits disponibles
  getProducts() {
    return PRODUCTS;
  }

  // Obtenir les licences disponibles
  getLicenses() {
    return LICENSES;
  }
}

export default new StripeService();
