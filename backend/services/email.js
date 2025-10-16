import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

// Configuration SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid configuré');
} else {
  console.warn('⚠️  SENDGRID_API_KEY manquante dans .env');
}

/**
 * Envoyer l'email de confirmation de commande
 * @param {Object} orderData - Données de la commande
 * @param {Object} customerData - Données du client
 */
export async function sendOrderConfirmation(orderData, customerData) {
  const { cart, total, orderId } = orderData;
  const { email, name } = customerData;

  const itemsList = cart.map(item => 
    `- ${item.product.name} (${item.quantity}x) - ${item.product.price}`
  ).join('\n');

  const msg = {
    to: email,
    bcc: 'producteurghostremixpack@gmail.com', // Copie cachée pour le propriétaire
    from: process.env.SENDGRID_FROM_EMAIL || 'producerghostremixpack@gmail.com',
    subject: `✅ Commande Confirmée #${orderId.slice(0, 8)} - Ghost Remix Pack`,
    text: `
Bonjour ${name},

Merci pour votre commande Ghost Remix Pack !

📦 COMMANDE #${orderId.slice(0, 8)}

Packs commandés :
${itemsList}

💰 TOTAL : ${total}€

🎵 LIVRAISON
Vos packs seront livrés sous 48h maximum par email au format WAV haute qualité.

📧 Vous recevrez un second email avec les liens de téléchargement sécurisés.

🔒 RAPPEL
Tous les remixes sont livrés sous licence anonyme.
Vous gardez 100% des droits d'exploitation.

Merci de votre confiance !

L'équipe Ghost Remix Pack
producerghostremixpack@gmail.com
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #0B0B0F; color: #F5F5F7; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #141420; border-radius: 12px; padding: 30px; border: 1px solid #9B5CF6; }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { color: #9B5CF6; font-size: 28px; margin: 0; }
    .order-id { background: #9B5CF6; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 20px 0; }
    .items { background: #0B0B0F; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .item { padding: 10px 0; border-bottom: 1px solid #333; }
    .item:last-child { border-bottom: none; }
    .total { font-size: 32px; color: #9B5CF6; text-align: center; margin: 20px 0; font-weight: bold; }
    .info-box { background: #9B5CF6; background: linear-gradient(135deg, #9B5CF6, #00E5FF); padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Commande Confirmée !</h1>
      <div class="order-id">Commande #${orderId.slice(0, 8)}</div>
    </div>

    <p>Bonjour <strong>${name}</strong>,</p>
    <p>Merci pour votre commande Ghost Remix Pack !</p>

    <div class="items">
      <h3 style="color: #9B5CF6; margin-top: 0;">📦 Packs Commandés</h3>
      ${cart.map(item => `
        <div class="item">
          <strong>${item.product.name}</strong> (${item.quantity}x)<br/>
          <span style="color: #888;">${item.product.description}</span><br/>
          <span style="color: #00E5FF;">${item.product.price}</span>
        </div>
      `).join('')}
    </div>

    <div class="total">
      💰 TOTAL : ${total}€
    </div>

    <div class="info-box">
      <h3 style="color: white; margin-top: 0;">🎵 Livraison sous 48h</h3>
      <p style="color: white; margin: 0;">
        Vos packs seront livrés par email au format <strong>WAV haute qualité</strong>.<br/>
        Vous recevrez un second email avec les liens de téléchargement sécurisés.
      </p>
    </div>

    <p><strong>🔒 Rappel Important</strong></p>
    <ul style="color: #B0B0C0;">
      <li>Tous les remixes sont livrés sous licence anonyme</li>
      <li>Vous gardez 100% des droits d'exploitation</li>
      <li>Utilisation libre et confidentielle</li>
    </ul>

    <p style="text-align: center; margin-top: 30px;">
      Merci de votre confiance !<br/>
      <strong style="color: #9B5CF6;">L'équipe Ghost Remix Pack</strong>
    </p>

    <div class="footer">
      © 2025 Ghost Remix Pack — Remixes d'exception, signature anonyme<br/>
      producerghostremixpack@gmail.com
    </div>
  </div>
</body>
</html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email de confirmation envoyé à ${email}`);
  } catch (error) {
    console.error('❌ Erreur envoi email:', error.message);
    throw error;
  }
}

/**
 * Envoyer l'email de livraison avec les liens de téléchargement
 * @param {Object} orderData - Données de la commande
 * @param {Object} customerData - Données du client
 * @param {Array} downloadLinks - Liens de téléchargement sécurisés
 */
export async function sendDeliveryEmail(orderData, customerData, downloadLinks) {
  const { cart, orderId } = orderData;
  const { email, name } = customerData;

  const linksList = downloadLinks.map((link, idx) => 
    `${idx + 1}. ${link.packName}\n   🔗 ${link.url}\n   ⏱️  Valide 48h`
  ).join('\n\n');

  const msg = {
    to: email,
    bcc: 'producteurghostremixpack@gmail.com', // Copie cachée pour le propriétaire
    from: process.env.SENDGRID_FROM_EMAIL || 'producerghostremixpack@gmail.com',
    subject: `🎵 Vos Packs Ghost Remix Sont Prêts ! #${orderId.slice(0, 8)}`,
    text: `
Bonjour ${name},

Vos packs Ghost Remix Pack sont prêts à télécharger !

📦 COMMANDE #${orderId.slice(0, 8)}

🎵 LIENS DE TÉLÉCHARGEMENT (Valides 48h)

${linksList}

⚠️  IMPORTANT
- Les liens expirent dans 48 heures
- Téléchargez vos fichiers WAV immédiatement
- Fichiers haute qualité 24-bit
- Conservez-les en lieu sûr

💯 UTILISATION
- 100% des droits d'exploitation
- Utilisation libre et confidentielle
- Licence anonyme

Besoin d'aide ? Répondez à cet email.

L'équipe Ghost Remix Pack
producerghostremixpack@gmail.com
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #0B0B0F; color: #F5F5F7; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #141420; border-radius: 12px; padding: 30px; border: 1px solid #00E5FF; }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { color: #00E5FF; font-size: 28px; margin: 0; }
    .download-box { background: linear-gradient(135deg, #9B5CF6, #00E5FF); padding: 25px; border-radius: 12px; margin: 25px 0; }
    .download-link { background: white; color: #141420; padding: 15px; border-radius: 8px; margin: 10px 0; display: block; text-decoration: none; font-weight: bold; text-align: center; }
    .download-link:hover { background: #00E5FF; color: white; }
    .warning { background: #ff6b6b; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎵 Vos Packs Sont Prêts !</h1>
    </div>

    <p>Bonjour <strong>${name}</strong>,</p>
    <p>Vos packs Ghost Remix Pack sont disponibles au téléchargement !</p>

    <div class="download-box">
      <h3 style="color: white; margin-top: 0;">📥 Télécharger Vos Packs</h3>
      ${downloadLinks.map(link => `
        <a href="${link.url}" class="download-link">
          📦 ${link.packName} (WAV Haute Qualité)
        </a>
      `).join('')}
    </div>

    <div class="warning">
      <strong>⚠️ IMPORTANT</strong><br/>
      Les liens expirent dans <strong>48 heures</strong>.<br/>
      Téléchargez vos fichiers immédiatement et conservez-les en lieu sûr.
    </div>

    <p><strong>💯 Droits & Utilisation</strong></p>
    <ul style="color: #B0B0C0;">
      <li>100% des droits d'exploitation</li>
      <li>Licence anonyme</li>
      <li>Utilisation libre et confidentielle</li>
      <li>Fichiers WAV 24-bit haute qualité</li>
    </ul>

    <p style="text-align: center; margin-top: 30px;">
      <strong style="color: #00E5FF;">Bon Mix ! 🎧</strong><br/>
      L'équipe Ghost Remix Pack
    </p>

    <div class="footer">
      © 2025 Ghost Remix Pack<br/>
      Besoin d'aide ? producerghostremixpack@gmail.com
    </div>
  </div>
</body>
</html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email de livraison envoyé à ${email}`);
  } catch (error) {
    console.error('❌ Erreur envoi email de livraison:', error.message);
    throw error;
  }
}

/**
 * Envoyer un email de contact
 * @param {Object} contactData - Données du contact
 */
export async function sendContactEmail(contactData) {
  const { name, email, subject, message } = contactData;

  const msg = {
    to: 'producerghostremixpack@gmail.com', // Vous recevez l'email
    from: 'producerghostremixpack@gmail.com',
    replyTo: email, // L'email du visiteur pour répondre directement
    subject: `📧 Nouveau message de contact - ${subject || 'Contact'}`,
    text: `
Nouveau message de contact reçu !

👤 Nom : ${name}
📧 Email : ${email}
📋 Sujet : ${subject || 'Contact'}
📝 Message :
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pour répondre, cliquez simplement sur "Répondre" dans votre client email.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ghost Remix Pack - Contact Form
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #0B0B0F; color: #F5F5F7; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #141420; border-radius: 12px; padding: 30px; border: 1px solid #9B5CF6; }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { color: #9B5CF6; font-size: 24px; margin: 0; }
    .info-box { background: #0B0B0F; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9B5CF6; }
    .info-row { margin: 10px 0; }
    .info-label { color: #9B5CF6; font-weight: bold; display: inline-block; width: 100px; }
    .message-box { background: #0B0B0F; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #9B5CF6; }
    .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
    .button { background: linear-gradient(135deg, #9B5CF6, #00E5FF); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 Nouveau Message de Contact</h1>
    </div>

    <div class="info-box">
      <div class="info-row">
        <span class="info-label">👤 Nom :</span>
        <span>${name}</span>
      </div>
      <div class="info-row">
        <span class="info-label">📧 Email :</span>
        <span>${email}</span>
      </div>
      <div class="info-row">
        <span class="info-label">📋 Sujet :</span>
        <span>${subject || 'Contact'}</span>
      </div>
    </div>

    <div class="message-box">
      <h3 style="color: #9B5CF6; margin-top: 0;">📝 Message :</h3>
      <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
    </div>

    <div style="text-align: center;">
      <a href="mailto:${email}?subject=Re: ${subject || 'Contact'}" class="button">
        ✉️ Répondre à ${name}
      </a>
    </div>

    <div class="footer">
      Pour répondre, cliquez simplement sur "Répondre" dans votre client email.<br/>
      L'email de réponse sera envoyé à : ${email}
    </div>
  </div>
</body>
</html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email de contact envoyé à producerghostremixpack@gmail.com`);
  } catch (error) {
    console.error('❌ Erreur envoi email de contact:', error.message);
    throw error;
  }
}

export default sgMail;







