/**
 * 🧪 TEST EMAIL ZIMBRA OVH
 * 
 * Ce script teste la connexion SMTP et l'envoi d'emails
 * via votre compte Zimbra OVH
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Configuration du transporteur
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'ssl0.ovh.net',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // STARTTLS
  auth: {
    user: process.env.SENDGRID_FROM_EMAIL || 'contact@ghostremixpack.com',
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false // Accepter les certificats auto-signés
  }
});

/**
 * Fonction de test principale
 */
async function testEmailZimbra() {
  console.log('🧪 TEST EMAIL ZIMBRA OVH');
  console.log('='.repeat(50));
  console.log('');

  // Afficher la configuration
  console.log('📋 Configuration :');
  console.log(`   Host: ${transporter.options.host}`);
  console.log(`   Port: ${transporter.options.port}`);
  console.log(`   User: ${transporter.options.auth.user}`);
  console.log(`   Secure: ${transporter.options.secure}`);
  console.log('');

  // ÉTAPE 1 : Vérifier la connexion SMTP
  console.log('🔍 ÉTAPE 1 : Vérification de la connexion SMTP...');
  try {
    await transporter.verify();
    console.log('✅ Connexion SMTP réussie !');
    console.log('');
  } catch (error) {
    console.error('❌ Échec de la connexion SMTP');
    console.error('   Erreur:', error.message);
    console.log('');
    console.log('💡 Solutions possibles :');
    console.log('   1. Vérifiez votre mot de passe OVH');
    console.log('   2. Vérifiez que le port 587 n\'est pas bloqué');
    console.log('   3. Vérifiez votre connexion internet');
    console.log('   4. Contactez OVH si le problème persiste');
    process.exit(1);
  }

  // ÉTAPE 2 : Envoyer un email de test
  console.log('📧 ÉTAPE 2 : Envoi d\'un email de test...');
  
  const testEmail = {
    from: `"Ghost Remix Pack" <${transporter.options.auth.user}>`,
    to: process.env.TEST_EMAIL || 'votre@email.com', // Changez cette adresse
    subject: '🧪 Test Email Zimbra OVH - Ghost Remix Pack',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">🎉 Test Réussi !</h1>
        </div>
        <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Félicitations ! Votre système d'email Zimbra OVH fonctionne correctement.
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="margin: 0 0 10px 0; color: #667eea;">📊 Informations de test :</h3>
            <ul style="margin: 0; padding-left: 20px; color: #666;">
              <li>Serveur SMTP : ${transporter.options.host}</li>
              <li>Port : ${transporter.options.port}</li>
              <li>Date : ${new Date().toLocaleString('fr-FR')}</li>
            </ul>
          </div>
          <p style="font-size: 14px; color: #666; margin-top: 20px;">
            Cet email a été envoyé depuis votre backend Ghost Remix Pack.
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>Ghost Remix Pack © 2025 - Tous droits réservés</p>
        </div>
      </div>
    `,
    text: `
Test Email Zimbra OVH - Ghost Remix Pack

Félicitations ! Votre système d'email Zimbra OVH fonctionne correctement.

Informations de test :
- Serveur SMTP : ${transporter.options.host}
- Port : ${transporter.options.port}
- Date : ${new Date().toLocaleString('fr-FR')}

Cet email a été envoyé depuis votre backend Ghost Remix Pack.

---
Ghost Remix Pack © 2025
    `
  };

  try {
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Email envoyé avec succès !');
    console.log('');
    console.log('📊 Détails de l\'envoi :');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}`);
    console.log('');
  } catch (error) {
    console.error('❌ Échec de l\'envoi de l\'email');
    console.error('   Erreur:', error.message);
    console.log('');
    console.log('💡 Solutions possibles :');
    console.log('   1. Vérifiez l\'adresse email de destination');
    console.log('   2. Vérifiez votre quota d\'envoi OVH');
    console.log('   3. Vérifiez les logs OVH');
    process.exit(1);
  }

  // ÉTAPE 3 : Résumé
  console.log('✨ ÉTAPE 3 : Résumé');
  console.log('='.repeat(50));
  console.log('');
  console.log('✅ Tous les tests sont passés avec succès !');
  console.log('');
  console.log('🎯 Prochaines étapes :');
  console.log('   1. Vérifiez votre boîte mail (et spam)');
  console.log('   2. Testez les emails de paiement');
  console.log('   3. Testez les emails de contact');
  console.log('   4. Testez la newsletter');
  console.log('');
  console.log('🚀 Votre système d\'email Zimbra OVH est opérationnel !');
  console.log('');
}

// Lancer le test
testEmailZimbra().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});
