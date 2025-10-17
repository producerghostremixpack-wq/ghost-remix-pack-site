// Service email en mode test - ne plante pas sans SendGrid

export async function sendOrderConfirmation(orderData, customerData) {
  console.log('📧 [TEST MODE] Email de confirmation envoyé à:', customerData.email);
  console.log('📦 Commande:', orderData.orderId);
  return Promise.resolve({ success: true, mode: 'test' });
}

export async function sendDeliveryEmail(orderData, customerData, downloadLinks) {
  console.log('📧 [TEST MODE] Email de livraison envoyé à:', customerData.email);
  console.log('🔗 Liens:', downloadLinks.length);
  return Promise.resolve({ success: true, mode: 'test' });
}

export async function sendContactEmail(contactData) {
  console.log('📧 [TEST MODE] Email de contact reçu de:', contactData.email);
  console.log('📝 Sujet:', contactData.subject);
  console.log('💬 Message:', contactData.message);
  return Promise.resolve({ success: true, mode: 'test' });
}

export default {
  send: () => Promise.resolve({ success: true, mode: 'test' })
};
