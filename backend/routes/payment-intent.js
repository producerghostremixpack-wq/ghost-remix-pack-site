import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

// Initialiser Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_votre_cle');

/**
 * Créer un Payment Intent pour un paiement direct
 * POST /api/payment/create-payment-intent
 */
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur', productId, productName, customerEmail, customerName } = req.body;

    // Validation
    if (!amount || !productId || !customerEmail) {
      return res.status(400).json({
        success: false,
        error: 'Montant, produit et email client requis'
      });
    }

    console.log('💰 Création Payment Intent:', {
      amount,
      currency,
      productId,
      productName,
      customerEmail
    });

    // Créer le Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // En centimes
      currency,
      metadata: {
        productId,
        productName,
        customerEmail,
        customerName: customerName || 'Non spécifié'
      },
      description: `Achat: ${productName}`,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('✅ Payment Intent créé:', paymentIntent.id);

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('❌ Erreur création Payment Intent:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors de la création du paiement'
    });
  }
});

/**
 * Envoyer l'email de confirmation après paiement
 * POST /api/payment/send-confirmation
 */
router.post('/send-confirmation', async (req, res) => {
  try {
    const { paymentIntentId, customerEmail, customerName, productName, amount } = req.body;

    // Validation
    if (!paymentIntentId || !customerEmail) {
      return res.status(400).json({
        success: false,
        error: 'Payment Intent ID et email client requis'
      });
    }

    console.log('📧 Envoi email de confirmation:', {
      paymentIntentId,
      customerEmail,
      productName
    });

    // Récupérer les détails du Payment Intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Préparer l'email
    const emailSubject = '✅ Paiement confirmé - Ghost Remix Pack';
    const emailBody = `
      <h2>🎉 Merci pour votre achat !</h2>
      
      <p>Bonjour ${customerName || 'Cher client'},</p>
      
      <p>Votre paiement a été traité avec succès.</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>Détails de la commande</h3>
        <p><strong>Produit:</strong> ${productName}</p>
        <p><strong>Montant:</strong> €${(amount / 100).toFixed(2)}</p>
        <p><strong>ID de paiement:</strong> ${paymentIntentId}</p>
        <p><strong>Statut:</strong> ${paymentIntent.status}</p>
      </div>
      
      <p>Vous recevrez vos fichiers de téléchargement dans un email séparé.</p>
      
      <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
      
      <p>Cordialement,<br>
      <strong>L'équipe Ghost Remix Pack</strong></p>
    `;

    // Ici, vous pouvez envoyer l'email via votre service d'email
    // Pour l'instant, on simule juste l'envoi
    console.log('✅ Email de confirmation préparé pour:', customerEmail);

    res.json({
      success: true,
      message: 'Email de confirmation envoyé',
      paymentIntentId
    });

  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors de l\'envoi de l\'email'
    });
  }
});

/**
 * Webhook pour les événements Stripe
 * POST /api/payment/webhook
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('❌ Erreur webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer les événements
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('✅ Paiement réussi:', paymentIntent.id);
      // Ici, vous pouvez ajouter votre logique métier
      break;
    
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('❌ Paiement échoué:', failedPayment.id);
      break;
    
    default:
      console.log(`Événement non géré: ${event.type}`);
  }

  res.json({ received: true });
});

export default router;
