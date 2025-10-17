#!/usr/bin/env node

/**
 * Script de test pour la newsletter SendGrid
 * Usage: node test-newsletter-sendgrid.cjs [email]
 */

require('dotenv').config();

const testNewsletter = async () => {
  console.log('\n🧪 TEST NEWSLETTER SENDGRID\n');

  // Vérifier les variables d'environnement
  console.log('📋 Vérification de la configuration...');
  
  const requiredVars = [
    'SENDGRID_API_KEY',
    'SENDGRID_FROM_EMAIL',
    'FRONTEND_URL'
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Variables manquantes:', missing.join(', '));
    console.log('\n💡 Ajoutez ces variables dans votre fichier .env :');
    missing.forEach(varName => {
      console.log(`${varName}=votre_valeur_ici`);
    });
    process.exit(1);
  }

  console.log('✅ Configuration OK');
  console.log(`📧 Email d'envoi: ${process.env.SENDGRID_FROM_EMAIL}`);
  console.log(`🌐 URL frontend: ${process.env.FRONTEND_URL}`);

  // Tester SendGrid
  try {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    console.log('\n📡 Test de connexion SendGrid...');
    
    // Email de test
    const testEmail = process.argv[2] || 'test@example.com';
    
    console.log(`📮 Envoi d'un email de test à: ${testEmail}`);
    
    const msg = {
      to: testEmail,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: process.env.SENDGRID_FROM_NAME || 'Ghost Remix Pack'
      },
      subject: '🧪 Test Newsletter - Ghost Remix Pack',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background: #1a1a1a; color: #ffffff; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #2a2a2a; padding: 30px; border-radius: 0 0 10px 10px; }
            .success { color: #00D9FF; font-size: 48px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎵 Ghost Remix Pack</h1>
              <p>Test Newsletter SendGrid</p>
            </div>
            <div class="content">
              <div class="success" style="text-align: center;">✅</div>
              <h2>Test réussi !</h2>
              <p>Votre configuration SendGrid fonctionne parfaitement.</p>
              <p>La newsletter est prête à être utilisée !</p>
              <hr style="border: 1px solid #444; margin: 20px 0;">
              <p style="font-size: 12px; color: #888;">
                Ceci est un email de test automatique.<br>
                Timestamp: ${new Date().toISOString()}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Ghost Remix Pack - Test Newsletter
        
        ✅ Test réussi !
        
        Votre configuration SendGrid fonctionne parfaitement.
        La newsletter est prête à être utilisée !
        
        Timestamp: ${new Date().toISOString()}
      `
    };

    await sgMail.send(msg);
    
    console.log('✅ Email de test envoyé avec succès !');
    console.log('\n🎯 Prochaines étapes :');
    console.log('1. Vérifiez votre boîte mail');
    console.log('2. Testez l\'inscription sur votre site');
    console.log('3. Vérifiez les emails de confirmation');
    console.log('\n🚀 La newsletter SendGrid est opérationnelle !');

  } catch (error) {
    console.error('\n❌ Erreur SendGrid:', error.message);
    
    if (error.code === 401) {
      console.log('\n💡 Solutions possibles :');
      console.log('- Vérifiez votre clé API SendGrid');
      console.log('- Assurez-vous que la clé a les permissions Mail Send');
    } else if (error.code === 403) {
      console.log('\n💡 Solutions possibles :');
      console.log('- Vérifiez l\'authentification de votre domaine');
      console.log('- Utilisez un email vérifié comme expéditeur');
    }
    
    process.exit(1);
  }
};

// Test de l'API locale
const testLocalAPI = async () => {
  console.log('\n🌐 Test de l\'API locale...');
  
  try {
    const response = await fetch('http://localhost:3001/api/health');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API locale accessible');
      console.log(`📡 Status: ${data.status}`);
    } else {
      console.log('⚠️ API locale non accessible (serveur arrêté ?)');
    }
  } catch (error) {
    console.log('⚠️ API locale non accessible (serveur arrêté ?)');
  }
};

// Exécution
const main = async () => {
  await testNewsletter();
  await testLocalAPI();
  
  console.log('\n📚 Documentation complète dans :');
  console.log('- CONFIGURATION-SENDGRID-NEWSLETTER.md');
  console.log('\n🎉 Test terminé !');
};

main().catch(console.error);
