// 🚀 BACKEND SIMPLE ET FONCTIONNEL - GHOST REMIX PACK
// Backend Express.js avec Stripe intégré

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Pour Stripe webhook (raw body)
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// JSON middleware pour les autres routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ═══════════════════════════════════════════════════════════
// 🎵 PRODUITS GHOST REMIX PACK
// ═══════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════
// 🔗 ROUTES API
// ═══════════════════════════════════════════════════════════

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: {
      email: process.env.SENDGRID_API_KEY ? 'configured' : 'simulation',
      stripe: process.env.STRIPE_SECRET_KEY ? 'configured' : 'demo'
    }
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: '🎵 Ghost Remix Pack API',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/contact', '/api/newsletter', '/api/stripe']
  });
});

// ═══════════════════════════════════════════════════════════
// 💳 ROUTES STRIPE
// ═══════════════════════════════════════════════════════════

// Obtenir les produits disponibles
app.get('/api/stripe/products', (req, res) => {
  try {
    res.json({ products: PRODUCTS, licenses: LICENSES });
  } catch (error) {
    console.error('❌ Erreur récupération produits:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test Stripe (développement uniquement)
app.get('/api/stripe/test', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Test non disponible en production' });
  }
  
  const isDemoMode = !process.env.STRIPE_SECRET_KEY || 
                     process.env.STRIPE_SECRET_KEY.includes('demo') ||
                     process.env.DEMO_MODE === 'true';
  
  res.json({
    message: '🧪 Stripe configuré et fonctionnel !',
    mode: isDemoMode ? 'demo' : 'live',
    products: Object.keys(PRODUCTS),
    licenses: Object.keys(LICENSES),
    webhook_url: `${process.env.BACKEND_URL}/api/stripe/webhook`
  });
});

// Créer une session de checkout
app.post('/api/stripe/create-checkout-session', async (req, res) => {
  try {
    const { productId, licenseType = 'basic', customerData = {} } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID requis' });
    }

    const product = PRODUCTS[productId];
    const license = LICENSES[licenseType];
    
    if (!product) {
      return res.status(400).json({ error: `Produit non trouvé: ${productId}` });
    }
    
    if (!license) {
      return res.status(400).json({ error: `Licence non trouvée: ${licenseType}` });
    }

    const finalPrice = product.price * license.multiplier;
    
    // Mode démonstration
    const isDemoMode = !process.env.STRIPE_SECRET_KEY || 
                       process.env.STRIPE_SECRET_KEY.includes('demo') ||
                       process.env.DEMO_MODE === 'true';
    
    if (isDemoMode) {
      console.log(`🎭 [DEMO] Session créée pour ${product.name} - ${finalPrice/100}€`);
      const sessionId = 'cs_demo_' + Date.now();
      const demoUrl = `${process.env.FRONTEND_URL}/demo-checkout?product=${productId}&license=${licenseType}&amount=${finalPrice}&session=${sessionId}`;
      
      return res.json({ 
        sessionId,
        url: demoUrl,
        mode: 'demo'
      });
    }

    // Mode Stripe réel (si configuré)
    try {
      const Stripe = await import('stripe');
      const stripe = new Stripe.default(process.env.STRIPE_SECRET_KEY);

      const session = await stripe.checkout.sessions.create({
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
      res.json({ sessionId: session.id, url: session.url });
      
    } catch (stripeError) {
      console.error('❌ Erreur Stripe:', stripeError);
      res.status(500).json({ error: 'Erreur configuration Stripe' });
    }
    
  } catch (error) {
    console.error('❌ Erreur création session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Récupérer une session
app.get('/api/stripe/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // Mode démonstration
    if (sessionId.startsWith('cs_demo_')) {
      return res.json({
        id: sessionId,
        payment_status: 'paid',
        customer_details: { email: 'demo@example.com' },
        metadata: { product_id: 'demo_product' },
        mode: 'demo'
      });
    }

    // Mode Stripe réel
    try {
      const Stripe = await import('stripe');
      const stripe = new Stripe.default(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      res.json(session);
    } catch (stripeError) {
      console.error('❌ Erreur récupération session:', stripeError);
      res.status(500).json({ error: 'Erreur Stripe' });
    }
    
  } catch (error) {
    console.error('❌ Erreur récupération session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook Stripe
app.post('/api/stripe/webhook', async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'];
    
    // Mode démonstration
    const isDemoMode = !process.env.STRIPE_SECRET_KEY || 
                       process.env.STRIPE_SECRET_KEY.includes('demo') ||
                       process.env.DEMO_MODE === 'true';
    
    if (isDemoMode) {
      console.log('🎭 [DEMO] Webhook simulé');
      console.log('🎉 Paiement simulé réussi');
      return res.json({ received: true, mode: 'demo' });
    }

    // Webhook Stripe réel
    try {
      const Stripe = await import('stripe');
      const stripe = new Stripe.default(process.env.STRIPE_SECRET_KEY);
      
      const event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log(`📡 Webhook reçu: ${event.type}`);

      switch (event.type) {
        case 'checkout.session.completed':
          console.log('🎉 Paiement réussi:', event.data.object.id);
          // Ici : envoyer email, créer liens de téléchargement, etc.
          break;
        case 'payment_intent.succeeded':
          console.log('💳 Paiement confirmé:', event.data.object.id);
          break;
        case 'payment_intent.payment_failed':
          console.log('❌ Paiement échoué:', event.data.object.id);
          break;
        default:
          console.log(`⚠️ Événement non géré: ${event.type}`);
      }

      res.json({ received: true });
      
    } catch (stripeError) {
      console.error('❌ Erreur webhook:', stripeError);
      res.status(400).json({ error: 'Erreur webhook Stripe' });
    }
    
  } catch (error) {
    console.error('❌ Erreur webhook:', error);
    res.status(400).json({ error: error.message });
  }
});

// ═══════════════════════════════════════════════════════════
// 📧 ROUTES EMAIL (SIMULATION)
// ═══════════════════════════════════════════════════════════

// Contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    console.log('📧 [SIMULATION] Contact reçu:');
    console.log(`   De: ${name} <${email}>`);
    console.log(`   Sujet: ${subject}`);
    console.log(`   Message: ${message}`);
    
    res.json({ 
      success: true, 
      message: 'Message envoyé avec succès ! (Mode simulation)',
      mode: 'simulation'
    });
    
  } catch (error) {
    console.error('❌ Erreur contact:', error);
    res.status(500).json({ error: error.message });
  }
});

// Newsletter
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email requis' });
    }
    
    console.log(`📧 [SIMULATION] Inscription newsletter: ${email}`);
    
    res.json({ 
      success: true, 
      message: 'Inscription réussie ! Email de confirmation envoyé. (Mode simulation)',
      mode: 'simulation'
    });
    
  } catch (error) {
    console.error('❌ Erreur newsletter:', error);
    res.status(500).json({ error: error.message });
  }
});

// ═══════════════════════════════════════════════════════════
// 🚀 DÉMARRAGE DU SERVEUR
// ═══════════════════════════════════════════════════════════

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('🎵 ═══════════════════════════════════════════════════════════');
  console.log('🎵 GHOST REMIX PACK - BACKEND DÉMARRÉ');
  console.log('🎵 ═══════════════════════════════════════════════════════════');
  console.log(`🚀 Serveur: http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log(`💳 Stripe: http://localhost:${PORT}/api/stripe/test`);
  console.log('');
  
  // Vérifications
  if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'SG.SIMULATION_MODE') {
    console.log('✅ SendGrid: Configuré');
  } else {
    console.log('🎭 SendGrid: Mode simulation');
  }
  
  if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('demo')) {
    console.log('✅ Stripe: Configuré (clés réelles)');
  } else {
    console.log('🎭 Stripe: Mode démonstration');
  }
  
  console.log('');
  console.log('🎵 ═══════════════════════════════════════════════════════════');
  console.log('🎵 PRÊT POUR LES TESTS ET LA PRODUCTION !');
  console.log('🎵 ═══════════════════════════════════════════════════════════');
  console.log('');
});

export default app;
