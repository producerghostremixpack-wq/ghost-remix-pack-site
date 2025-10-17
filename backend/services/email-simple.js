// Service email simplifié - fonctionne toujours

const sendEmail = async (emailData) => {
  console.log('📧 [SIMULATION] Email envoyé:');
  console.log('   À:', emailData.to || emailData.email);
  console.log('   Sujet:', emailData.subject);
  console.log('   ✅ Email simulé avec succès');
  return { success: true, messageId: 'sim_' + Date.now() };
};

export async function sendOrderConfirmation(orderData, customerData) {
  return await sendEmail({
    to: customerData.email,
    subject: `Commande confirmée #${orderData.orderId}`,
    type: 'order_confirmation'
  });
}

export async function sendDeliveryEmail(orderData, customerData, downloadLinks) {
  return await sendEmail({
    to: customerData.email,
    subject: `Vos packs sont prêts #${orderData.orderId}`,
    type: 'delivery'
  });
}

export async function sendContactEmail(contactData) {
  return await sendEmail({
    to: 'contact@ghostremixpack.com',
    subject: `Contact: ${contactData.subject}`,
    from: contactData.email,
    type: 'contact'
  });
}

export default {
  send: sendEmail
};
