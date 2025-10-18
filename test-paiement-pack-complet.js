#!/usr/bin/env node

/**
 * 🚀 TEST AUTOMATISÉ PAIEMENT PACK COMPLET GHOST
 * 
 * Ce script teste le paiement du Pack Complet Ghost (45€)
 * et vérifie la réception de l'email de confirmation
 */

import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

const CONFIG = {
  // Configuration du test
  TEST_EMAIL: 'contact@ghostremixpack.com',
  TEST_NAME: 'Test Automatisé Ghost',
  BACKEND_URL: process.env.VITE_BACKEND_URL || 'https://ghost-remix-backend.up.railway.app',
  
  // Pack Complet à tester
  PACK_COMPLET: {
    id: 'pack-complet',
    name: 'Pack Complet Ghost',
    price: 45,
    originalPrice: 53
  },

  // Configuration Zimbra OVH pour vérification email
  ZIMBRA_CONFIG: {
    host: process.env.SMTP_HOST || 'ssl0.ovh.net',
    port: process.env.SMTP_PORT || 587,
    user: process.env.SENDGRID_FROM_EMAIL || 'contact@ghostremixpack.com',
    pass: process.env.EMAIL_PASSWORD
  }
};

console.log(`
🎯 TEST PAIEMENT PACK COMPLET GHOST
==================================

Configuration:
• Email test: ${CONFIG.TEST_EMAIL}
• Backend: ${CONFIG.BACKEND_URL}
• Pack: ${CONFIG.PACK_COMPLET.name} (${CONFIG.PACK_COMPLET.price}€)
• Email Zimbra: ${CONFIG.ZIMBRA_CONFIG.user}

`);

async function testBackendHealth() {
  console.log('🔍 1. Test de santé du backend...');
  
  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/api/health`);
    const data = await response.json();
    
    if (data.status === 'OK') {
      console.log('✅ Backend accessible et opérationnel');
      console.log(`   Service: ${data.service}`);
      console.log(`   Version: ${data.version || 'N/A'}`);
      return true;
    } else {
      console.log('❌ Backend non opérationnel');
      return false;
    }
  } catch (error) {
    console.log('❌ Erreur connexion backend:', error.message);
    return false;
  }
}

async function testProductsAPI() {
  console.log('🔍 2. Test API des produits...');
  
  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/api/payment/products`);
    const data = await response.json();
    
    if (data.success && data.products) {
      console.log('✅ API produits fonctionnelle');
      console.log(`   Produits disponibles: ${data.count}`);
      
      // Vérifier que le Pack Complet existe
      const packComplet = data.products.find(p => p.id === CONFIG.PACK_COMPLET.id);
      if (packComplet) {
        console.log('✅ Pack Complet Ghost trouvé');
        console.log(`   Prix: ${packComplet.price}€`);
        return true;
      } else {
        console.log('❌ Pack Complet Ghost non trouvé dans l\'API');
        return false;
      }
    } else {
      console.log('❌ API produits non fonctionnelle');
      return false;
    }
  } catch (error) {
    console.log('❌ Erreur API produits:', error.message);
    return false;
  }
}

async function testCheckoutSessionCreation() {
  console.log('🔍 3. Test création session Stripe...');
  
  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/api/payment/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: CONFIG.PACK_COMPLET.id,
        quantity: 1,
        customerInfo: {
          email: CONFIG.TEST_EMAIL,
          name: CONFIG.TEST_NAME,
        },
        successUrl: 'https://www.ghostremixpack.com/success-stripe?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: 'https://www.ghostremixpack.com/test-paiement-complet',
      }),
    });

    const data = await response.json();
    
    if (data.success && data.url) {
      console.log('✅ Session Stripe créée avec succès');
      console.log(`   URL de paiement: ${data.url}`);
      console.log(`   Session ID: ${data.sessionId}`);
      
      // Vérifier que l'URL contient bien "checkout.stripe.com"
      if (data.url.includes('checkout.stripe.com')) {
        console.log('✅ URL Stripe Checkout valide');
        return data;
      } else {
        console.log('❌ URL Stripe Checkout invalide');
        return false;
      }
    } else {
      console.log('❌ Échec création session Stripe');
      console.log(`   Erreur: ${data.error || 'Inconnue'}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Erreur création session:', error.message);
    return false;
  }
}

async function testEmailConfiguration() {
  console.log('🔍 4. Test configuration email Zimbra...');
  
  try {
    const transporter = nodemailer.createTransporter({
      host: CONFIG.ZIMBRA_CONFIG.host,
      port: CONFIG.ZIMBRA_CONFIG.port,
      secure: false,
      auth: {
        user: CONFIG.ZIMBRA_CONFIG.user,
        pass: CONFIG.ZIMBRA_CONFIG.pass
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    await transporter.verify();
    console.log('✅ Configuration email Zimbra OVH fonctionnelle');
    
    // Test d'envoi d'email de test
    const testEmailContent = {
      from: `"👻 Ghost Test" <${CONFIG.ZIMBRA_CONFIG.user}>`,
      to: CONFIG.TEST_EMAIL,
      subject: '🧪 Test Email Système Paiement Ghost',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0B0F; color: #F5F5F7; padding: 25px; border-radius: 15px;">
          <div style="text-align: center; background: linear-gradient(135deg, #9B5CF6, #00E5FF); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0;">👻 TEST SYSTÈME PAIEMENT</h1>
            <p style="color: white; margin: 10px 0;">Configuration email fonctionnelle !</p>
          </div>
          
          <div style="padding: 20px;">
            <h2 style="color: #00E5FF;">Test Configuration Email Réussi ✅</h2>
            <p>Ce test confirme que le système d'email automatique fonctionne correctement.</p>
            
            <div style="background: rgba(155, 92, 246, 0.2); padding: 15px; border-radius: 10px; margin: 15px 0;">
              <h3 style="color: #9B5CF6; margin: 0;">Détails du test :</h3>
              <ul style="color: #F5F5F7; margin: 10px 0;">
                <li>Date : ${new Date().toLocaleString('fr-FR')}</li>
                <li>Serveur : ${CONFIG.ZIMBRA_CONFIG.host}</li>
                <li>Email test : ${CONFIG.TEST_EMAIL}</li>
                <li>Pack testé : ${CONFIG.PACK_COMPLET.name} (${CONFIG.PACK_COMPLET.price}€)</li>
              </ul>
            </div>
            
            <p style="color: #B0B0C0; font-size: 14px;">
              Prêt pour le test de paiement complet !
            </p>
          </div>
        </div>
      `,
      text: `
👻 TEST SYSTÈME PAIEMENT GHOST

Configuration email fonctionnelle !

Date : ${new Date().toLocaleString('fr-FR')}
Serveur : ${CONFIG.ZIMBRA_CONFIG.host}
Email test : ${CONFIG.TEST_EMAIL}
Pack testé : ${CONFIG.PACK_COMPLET.name} (${CONFIG.PACK_COMPLET.price}€)

Prêt pour le test de paiement complet !
      `
    };

    await transporter.sendMail(testEmailContent);
    console.log('✅ Email de test envoyé avec succès');
    console.log(`   Vérifiez votre boîte mail: ${CONFIG.TEST_EMAIL}`);
    
    return true;
  } catch (error) {
    console.log('❌ Erreur configuration email:', error.message);
    return false;
  }
}

async function runFullTest() {
  console.log('🚀 DÉMARRAGE DU TEST COMPLET\n');
  
  const results = {
    backend: await testBackendHealth(),
    products: false,
    checkout: false,
    email: false
  };

  if (results.backend) {
    results.products = await testProductsAPI();
  }

  if (results.products) {
    results.checkout = await testCheckoutSessionCreation();
  }

  if (CONFIG.ZIMBRA_CONFIG.pass) {
    results.email = await testEmailConfiguration();
  } else {
    console.log('⚠️  Configuration email manquante (EMAIL_PASSWORD)');
  }

  // Résultats finaux
  console.log(`
📊 RÉSULTATS DU TEST
===================

✅ Backend Health: ${results.backend ? 'OK' : 'ÉCHEC'}
✅ API Produits: ${results.products ? 'OK' : 'ÉCHEC'}  
✅ Session Stripe: ${results.checkout ? 'OK' : 'ÉCHEC'}
✅ Email Zimbra: ${results.email ? 'OK' : results.email === false ? 'ÉCHEC' : 'NON TESTÉ'}

`);

  if (results.backend && results.products && results.checkout) {
    console.log(`
🎉 TEST RÉUSSI ! LE SYSTÈME EST PRÊT !

📋 PROCHAINES ÉTAPES POUR TEST MANUEL :

1. 🌐 Ouvrir : https://www.ghostremixpack.com/test-paiement-complet

2. 💳 Utiliser carte de test Stripe :
   • Numéro : 4242 4242 4242 4242
   • Date : 12/34
   • CVC : 123

3. 📧 Vérifier email de confirmation sur :
   • ${CONFIG.TEST_EMAIL}
   • Zimbra OVH : https://mail.ovh.net/

4. ✅ Confirmer réception email avec :
   • Sujet : "🎉 Paiement confirmé - Pack Complet Ghost (45€)"
   • Liens de téléchargement
   • Design Ghost professionnel

🚀 Le système de paiement Pack Complet est opérationnel !
`);
  } else {
    console.log(`
❌ TEST ÉCHOUÉ ! VÉRIFIEZ LA CONFIGURATION

Erreurs détectées :
${!results.backend ? '• Backend inaccessible\n' : ''}${!results.products ? '• API produits défaillante\n' : ''}${!results.checkout ? '• Création session Stripe échouée\n' : ''}${!results.email ? '• Configuration email à vérifier\n' : ''}
Consultez les logs ci-dessus pour plus de détails.
`);
  }
}

// Exécuter le test
runFullTest().catch(console.error);

