#!/usr/bin/env node

/**
 * Test direct de SendGrid avec votre clé API
 */

const sgMail = require('@sendgrid/mail');

// Configuration avec votre clé
sgMail.setApiKey('SG.ZPUSF4D77STXDDK8X7HDQCWB');

const testSendGrid = async () => {
  console.log('\n🧪 TEST DIRECT SENDGRID');
  console.log('═'.repeat(50));
  console.log('🔑 Clé API: SG.ZPUSF4D77STXDDK8X7HDQCWB');
  console.log('📧 De: contact@ghostremixpack.com');
  console.log('📧 Vers: test@example.com');
  console.log('');

  const msg = {
    to: 'test@example.com',
    from: {
      email: 'contact@ghostremixpack.com',
      name: 'Ghost Remix Pack'
    },
    subject: '🎵 Test SendGrid - Ghost Remix Pack',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #1a1a1a; color: #ffffff; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #2a2a2a; padding: 30px; border-radius: 10px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px; margin-bottom: 20px; }
          .success { color: #00D9FF; font-size: 48px; margin-bottom: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎵 Ghost Remix Pack</h1>
            <p>Test SendGrid Réussi !</p>
          </div>
          <div class="success">✅</div>
          <h2>Félicitations !</h2>
          <p>Votre configuration SendGrid fonctionne parfaitement !</p>
          <p><strong>Clé API :</strong> SG.ZPUSF4D77STXDDK8X7HDQCWB</p>
          <p><strong>Email :</strong> contact@ghostremixpack.com</p>
          <p><strong>Timestamp :</strong> ${new Date().toISOString()}</p>
          <hr style="border: 1px solid #444; margin: 20px 0;">
          <p>🎉 Votre newsletter et formulaire de contact sont maintenant opérationnels !</p>
        </div>
      </body>
      </html>
    `,
    text: `
      Ghost Remix Pack - Test SendGrid Réussi !
      
      Félicitations ! Votre configuration SendGrid fonctionne parfaitement !
      
      Clé API : SG.ZPUSF4D77STXDDK8X7HDQCWB
      Email : contact@ghostremixpack.com
      Timestamp : ${new Date().toISOString()}
      
      🎉 Votre newsletter et formulaire de contact sont maintenant opérationnels !
    `
  };

  try {
    console.log('📤 Envoi de l\'email de test...');
    await sgMail.send(msg);
    
    console.log('✅ EMAIL ENVOYÉ AVEC SUCCÈS !');
    console.log('');
    console.log('🎉 SENDGRID EST PARFAITEMENT CONFIGURÉ !');
    console.log('');
    console.log('📊 Résultats :');
    console.log('✅ Clé API : Valide');
    console.log('✅ Authentification : OK');
    console.log('✅ Envoi d\'email : Réussi');
    console.log('✅ Email expéditeur : Accepté');
    console.log('');
    console.log('🎯 Prochaines étapes :');
    console.log('1. Créez le fichier .env avec votre clé');
    console.log('2. Redémarrez le backend');
    console.log('3. Testez la newsletter et le contact');
    console.log('4. Configurez les DNS dans OVH');
    
  } catch (error) {
    console.error('❌ ERREUR SENDGRID :');
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    
    if (error.code === 401) {
      console.log('');
      console.log('💡 SOLUTIONS :');
      console.log('- Vérifiez que la clé API est correcte');
      console.log('- Vérifiez que la clé a les permissions Mail Send');
      console.log('- Vérifiez que votre compte SendGrid est activé');
    } else if (error.code === 403) {
      console.log('');
      console.log('💡 SOLUTIONS :');
      console.log('- Vérifiez l\'authentification de votre domaine');
      console.log('- Utilisez un email vérifié comme expéditeur');
    }
  }
  
  console.log('');
  console.log('═'.repeat(50));
  console.log('🔧 Configuration à ajouter dans .env :');
  console.log('SENDGRID_API_KEY=SG.ZPUSF4D77STXDDK8X7HDQCWB');
  console.log('SENDGRID_FROM_EMAIL=contact@ghostremixpack.com');
  console.log('SENDGRID_FROM_NAME="Ghost Remix Pack"');
  console.log('═'.repeat(50));
};

testSendGrid().catch(console.error);
