import express from 'express';
import stripe from '../services/stripe.js';
import { saveOrder, saveCustomer, updateDeliveryStatus } from '../services/firebase.js';
import { sendOrderConfirmation, sendDeliveryEmail } from '../services/email.js';

const router = express.Router();

/**
 * POST /api/webhook
 * Webhook Stripe pour traiter les événements de paiement
 */
router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Vérifier la signature du webhook
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Erreur signature webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Traiter l'événement
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;

    case 'payment_intent.succeeded':
      console.log('✅ Paiement réussi:', event.data.object.id);
      break;

    case 'payment_intent.payment_failed':
      console.log('❌ Paiement échoué:', event.data.object.id);
      break;

    default:
      console.log(`⚪ Événement non traité: ${event.type}`);
  }

  res.json({ received: true });
});

/**
 * Traiter une commande complétée
 */
async function handleCheckoutCompleted(session) {
  try {
    console.log('🎉 Paiement confirmé pour session:', session.id);

    // Récupérer les line items de la session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // Construire les données de commande
    const orderData = {
      sessionId: session.id,
      customerEmail: session.customer_email,
      total: session.amount_total / 100,
      currency: session.currency,
      paymentStatus: session.payment_status,
      cart: lineItems.data.map(item => ({
        name: item.description,
        quantity: item.quantity,
        price: item.amount_total / 100,
      })),
      metadata: session.metadata,
    };

    // Données client
    const customerData = {
      email: session.customer_email,
      name: session.metadata.customerName || 'Client',
      phone: session.metadata.customerPhone || '',
      address: session.metadata.customerAddress || '',
      // Adresse de livraison Stripe
      shipping: session.shipping_details || null,
    };

    // 1. Sauvegarder le client
    const customerId = await saveCustomer(customerData);
    console.log('✅ Client sauvegardé:', customerId);

    // 2. Sauvegarder la commande
    const orderId = await saveOrder({
      ...orderData,
      customerId,
    });
    console.log('✅ Commande sauvegardée:', orderId);

    // 3. Envoyer l'email de confirmation
    await sendOrderConfirmation(
      { ...orderData, orderId }, 
      customerData
    );
    console.log('✅ Email de confirmation envoyé');

    // 4. TODO: Générer les liens de téléchargement et envoyer l'email de livraison
    // (à implémenter avec AWS S3 ou Cloudinary)
    // const downloadLinks = await generateDownloadLinks(orderData.cart);
    // await sendDeliveryEmail(orderData, customerData, downloadLinks);
    
    // 5. Mettre à jour le statut
    await updateDeliveryStatus(orderId, 'sent');
    console.log('✅ Statut mis à jour: sent');

  } catch (error) {
    console.error('❌ Erreur traitement commande:', error.message);
    // En production, vous devriez avoir un système d'alerte ici
  }
}

export default router;







