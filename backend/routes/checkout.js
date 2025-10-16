import express from 'express';
import { createCheckoutSession } from '../services/stripe.js';

const router = express.Router();

/**
 * POST /api/checkout/create-session
 * Créer une session Stripe Checkout
 */
router.post('/create-session', async (req, res) => {
  try {
    const { cart, customer } = req.body;

    // Validation
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ 
        error: 'Le panier est vide ou invalide' 
      });
    }

    if (!customer || !customer.email || !customer.name) {
      return res.status(400).json({ 
        error: 'Informations client manquantes' 
      });
    }

    console.log('📦 Création session Stripe pour:', customer.email);
    console.log('🛒 Articles:', cart.length);

    // Créer la session Stripe
    const sessionUrl = await createCheckoutSession(
      cart, 
      customer.email,
      {
        customerName: customer.name,
        customerPhone: customer.phone || '',
        customerAddress: customer.address || '',
      }
    );

    res.json({ 
      success: true,
      url: sessionUrl,
      message: 'Session Stripe créée avec succès'
    });

  } catch (error) {
    console.error('❌ Erreur création session:', error.message);
    res.status(500).json({ 
      error: 'Erreur lors de la création de la session de paiement',
      message: error.message 
    });
  }
});

/**
 * GET /api/checkout/session/:sessionId
 * Récupérer les détails d'une session
 */
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await getSessionDetails(sessionId);

    res.json({ 
      success: true,
      session: {
        id: session.id,
        status: session.payment_status,
        email: session.customer_email,
        total: session.amount_total / 100,
      }
    });

  } catch (error) {
    console.error('❌ Erreur récupération session:', error.message);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération de la session',
      message: error.message 
    });
  }
});

export default router;







