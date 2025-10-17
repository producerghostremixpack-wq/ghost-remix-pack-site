#!/usr/bin/env node

/**
 * Script de test pour l'email contact@ghostremixpack.com
 * Teste l'envoi d'email depuis le site
 */

const nodemailer = require('nodemailer');

// Configuration
const config = {
  // Configuration SendGrid (si disponible)
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  
  // Email de test
  from: process.env.SENDGRID_FROM_EMAIL || 'contact@ghostremixpack.com',
  to: 'contact@ghostremixpack.com',
  subject: 'Test Email - Ghost Remix Pack',
  
  // Configuration SMTP OVH
  smtp: {
    host: 'ssl0.ovh.net',
    port: 465,
    secure: true,
    auth: {
      user: 'contact@ghostremixpack.com',
      pass: process.env.OVH_EMAIL_PASSWORD || ''
    }
  }
};

// Fonction pour afficher les messages
function log(message, type = 'info') {
  const colors = {
    success: '\x1b[32m', // Vert
    error: '\x1b[31m',   // Rouge
    warning: '\x1b[33m', // Jaune
    info: '\x1b[36m',    // Cyan
    title: '\x1b[1m\x1b[36m', // Gras Cyan
    reset: '\x1b[0m'
  };
  
  const color = colors[type] || colors.info;
  console.log(`${color}${message}${colors.reset}`);
}

// Fonction principale de test
async function testEmail() {
  log('\n╔════════════════════════════════════════════════════════╗', 'title');
  log('║  TEST EMAIL - Ghost Remix Pack                         ║', 'title');
  log('╚════════════════════════════════════════════════════════╝', 'title');
  
  log('\n📧 Configuration:', 'info');
  log(`   - De : ${config.from}`, 'info');
  log(`   - À : ${config.to}`, 'info');
  log(`   - Sujet : ${config.subject}`, 'info');
  
  // Vérifier si SendGrid est configuré
  if (config.sendgridApiKey) {
    log('\n✅ SendGrid détecté - Utilisation de SendGrid', 'success');
    await testWithSendGrid();
  } else {
    log('\n⚠️  SendGrid non configuré - Tentative avec SMTP OVH', 'warning');
    await testWithSMTP();
  }
}

// Test avec SendGrid
async function testWithSendGrid() {
  try {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(config.sendgridApiKey);
    
    const msg = {
      to: config.to,
      from: config.from,
      subject: config.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎵 Ghost Remix Pack</h1>
              <p>Test d'envoi d'email</p>
            </div>
            <div class="content">
              <h2>✅ Email de test envoyé avec succès !</h2>
              <p>Bonjour,</p>
              <p>Ceci est un email de test pour vérifier que votre boîte mail <strong>contact@ghostremixpack.com</strong> fonctionne correctement.</p>
              <p>Si vous recevez cet email, cela signifie que :</p>
              <ul>
                <li>✅ Votre adresse email est bien configurée</li>
                <li>✅ SendGrid est correctement configuré</li>
                <li>✅ Les emails peuvent être envoyés depuis votre site</li>
              </ul>
              <p>Date et heure : ${new Date().toLocaleString('fr-FR')}</p>
              <p>Cordialement,<br><strong>L'équipe Ghost Remix Pack</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 Ghost Remix Pack - Tous droits réservés</p>
              <p>contact@ghostremixpack.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Ghost Remix Pack - Test d'envoi d'email
        
        Bonjour,
        
        Ceci est un email de test pour vérifier que votre boîte mail contact@ghostremixpack.com fonctionne correctement.
        
        Si vous recevez cet email, cela signifie que :
        - Votre adresse email est bien configurée
        - SendGrid est correctement configuré
        - Les emails peuvent être envoyés depuis votre site
        
        Date et heure : ${new Date().toLocaleString('fr-FR')}
        
        Cordialement,
        L'équipe Ghost Remix Pack
        
        © 2025 Ghost Remix Pack - Tous droits réservés
        contact@ghostremixpack.com
      `
    };
    
    log('\n📤 Envoi de l\'email en cours...', 'info');
    await sgMail.send(msg);
    
    log('\n✅ Email envoyé avec succès via SendGrid !', 'success');
    log(`   - Destinataire : ${config.to}`, 'success');
    log(`   - Expéditeur : ${config.from}`, 'success');
    log(`   - Sujet : ${config.subject}`, 'success');
    
    log('\n📬 Vérifiez votre boîte mail :', 'info');
    log(`   - OVH Mail : https://www.ovh.com/mail/`, 'info');
    log(`   - Ou votre client email configuré`, 'info');
    
  } catch (error) {
    log('\n❌ Erreur lors de l\'envoi via SendGrid :', 'error');
    log(`   ${error.message}`, 'error');
    
    if (error.response) {
      log('\n📋 Détails de l\'erreur :', 'error');
      log(JSON.stringify(error.response.body, null, 2), 'error');
    }
    
    // Essayer avec SMTP en fallback
    log('\n⚠️  Tentative avec SMTP OVH...', 'warning');
    await testWithSMTP();
  }
}

// Test avec SMTP OVH
async function testWithSMTP() {
  try {
    if (!config.smtp.auth.pass) {
      log('\n❌ Mot de passe OVH non configuré', 'error');
      log('   Définissez la variable d\'environnement OVH_EMAIL_PASSWORD', 'error');
      log('   Exemple : export OVH_EMAIL_PASSWORD="votre_mot_de_passe"', 'error');
      log('\n💡 Solution :', 'warning');
      log('   1. Ouvrez un terminal', 'warning');
      log('   2. Tapez : export OVH_EMAIL_PASSWORD="votre_mot_de_passe"', 'warning');
      log('   3. Relancez : node test-email-contact.cjs', 'warning');
      return;
    }
    
    log('\n📤 Création du transporteur SMTP...', 'info');
    const transporter = nodemailer.createTransport(config.smtp);
    
    log('📤 Envoi de l\'email en cours...', 'info');
    
    const info = await transporter.sendMail({
      from: config.from,
      to: config.to,
      subject: config.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎵 Ghost Remix Pack</h1>
              <p>Test d'envoi d'email</p>
            </div>
            <div class="content">
              <h2>✅ Email de test envoyé avec succès !</h2>
              <p>Bonjour,</p>
              <p>Ceci est un email de test pour vérifier que votre boîte mail <strong>contact@ghostremixpack.com</strong> fonctionne correctement.</p>
              <p>Si vous recevez cet email, cela signifie que :</p>
              <ul>
                <li>✅ Votre adresse email est bien configurée</li>
                <li>✅ SMTP OVH fonctionne correctement</li>
                <li>✅ Les emails peuvent être envoyés depuis votre site</li>
              </ul>
              <p>Date et heure : ${new Date().toLocaleString('fr-FR')}</p>
              <p>Cordialement,<br><strong>L'équipe Ghost Remix Pack</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 Ghost Remix Pack - Tous droits réservés</p>
              <p>contact@ghostremixpack.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Ghost Remix Pack - Test d'envoi d'email
        
        Bonjour,
        
        Ceci est un email de test pour vérifier que votre boîte mail contact@ghostremixpack.com fonctionne correctement.
        
        Si vous recevez cet email, cela signifie que :
        - Votre adresse email est bien configurée
        - SMTP OVH fonctionne correctement
        - Les emails peuvent être envoyés depuis votre site
        
        Date et heure : ${new Date().toLocaleString('fr-FR')}
        
        Cordialement,
        L'équipe Ghost Remix Pack
        
        © 2025 Ghost Remix Pack - Tous droits réservés
        contact@ghostremixpack.com
      `
    });
    
    log('\n✅ Email envoyé avec succès via SMTP OVH !', 'success');
    log(`   - Destinataire : ${config.to}`, 'success');
    log(`   - Expéditeur : ${config.from}`, 'success');
    log(`   - Sujet : ${config.subject}`, 'success');
    log(`   - Message ID : ${info.messageId}`, 'success');
    
    log('\n📬 Vérifiez votre boîte mail :', 'info');
    log(`   - OVH Mail : https://www.ovh.com/mail/`, 'info');
    log(`   - Ou votre client email configuré`, 'info');
    
  } catch (error) {
    log('\n❌ Erreur lors de l\'envoi via SMTP OVH :', 'error');
    log(`   ${error.message}`, 'error');
    
    log('\n💡 Solutions possibles :', 'warning');
    log('   1. Vérifiez que le mot de passe est correct', 'warning');
    log('   2. Vérifiez que l\'email est bien créé dans OVH', 'warning');
    log('   3. Vérifiez les paramètres SMTP :', 'warning');
    log('      - Serveur : ssl0.ovh.net', 'warning');
    log('      - Port : 465', 'warning');
    log('      - SSL/TLS : Activé', 'warning');
  }
}

// Exécuter le test
testEmail().catch(error => {
  log('\n❌ Erreur fatale :', 'error');
  log(error.message, 'error');
  process.exit(1);
});
