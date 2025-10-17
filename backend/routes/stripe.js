import express from 'express';
import stripeService from '../services/stripe.js';

const router = express.Router();

// Créer une session de checkout
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { productId, licenseType = 'basic', customerData = {} } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID requis' });
    }

    const session = await stripeService.createCheckoutSession(
      productId, 
      licenseType, 
      customerData
    );

    res.json({ sessionId: session.id, url: session.url });
    
  } catch (error) {
    console.error('❌ Erreur création session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Récupérer une session
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripeService.getSession(sessionId);
    
    res.json(session);
    
  } catch (error) {
    console.error('❌ Erreur récupération session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'];
    
    await stripeService.handleWebhook(req.body, signature);
    
    res.json({ received: true });
    
  } catch (error) {
    console.error('❌ Erreur webhook:', error);
    res.status(400).json({ error: error.message });
  }
});

// Obtenir les produits disponibles
router.get('/products', (req, res) => {
  try {
    const products = stripeService.getProducts();
    const licenses = stripeService.getLicenses();
    
    res.json({ products, licenses });
    
  } catch (error) {
    console.error('❌ Erreur récupération produits:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test Stripe (développement uniquement)
router.get('/test', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Test non disponible en production' });
  }
  
  res.json({
    message: '🧪 Stripe configuré et fonctionnel !',
    mode: stripeService.isDemoMode ? 'demo' : 'live',
    products: Object.keys(stripeService.getProducts()),
    licenses: Object.keys(stripeService.getLicenses()),
    webhook_url: `${process.env.BACKEND_URL}/api/stripe/webhook`
  });
});

export default router;
