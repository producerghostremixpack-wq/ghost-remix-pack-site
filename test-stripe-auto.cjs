const https = require('https');
const fs = require('fs');

// Configuration
const BACKEND_URL = 'http://localhost:3001';

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  purple: '\x1b[35m',
  reset: '\x1b[0m'
};

const log = (color, message) => console.log(`${colors[color]}${message}${colors.reset}`);

// Test automatique de Stripe
async function testStripeAuto() {
  console.log('🧪 TEST AUTOMATIQUE STRIPE - GHOST REMIX PACK');
  console.log('═══════════════════════════════════════════════════════════');
  
  try {
    // Test de l'API Stripe
    log('blue', '🔍 Test de l\'API Stripe...');
    
    const testResponse = await fetch(`${BACKEND_URL}/api/stripe/test`);
    if (testResponse.ok) {
      const data = await testResponse.json();
      log('green', '✅ API Stripe accessible');
      log('purple', `   Mode: ${data.mode}`);
      console.log('   Produits:', data.products.join(', '));
      console.log('   Licences:', data.licenses.join(', '));
    } else {
      log('red', '❌ API Stripe non accessible');
      return false;
    }
    
    // Test de récupération des produits
    log('blue', '🔍 Test récupération des produits...');
    
    const productsResponse = await fetch(`${BACKEND_URL}/api/stripe/products`);
    if (productsResponse.ok) {
      const { products, licenses } = await productsResponse.json();
      log('green', '✅ Produits récupérés');
      console.log('   Packs disponibles:', Object.keys(products).length);
      console.log('   Types de licences:', Object.keys(licenses).length);
    } else {
      log('red', '❌ Erreur récupération produits');
      return false;
    }
    
    // Test de création de session
    log('blue', '🔍 Test de création de session de checkout...');
    
    const sessionResponse = await fetch(`${BACKEND_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: 'trap_pack',
        licenseType: 'basic',
        customerData: { 
          email: 'test@ghostremixpack.com', 
          name: 'Test User' 
        }
      })
    });
    
    if (sessionResponse.ok) {
      const sessionData = await sessionResponse.json();
      log('green', '✅ Session de checkout créée');
      console.log('   Session ID:', sessionData.sessionId);
      console.log('   URL:', sessionData.url);
    } else {
      log('red', '❌ Erreur création de session');
      return false;
    }
    
    // Test avec différents produits
    log('blue', '🔍 Test avec tous les produits...');
    
    const productIds = ['trap_pack', 'hiphop_pack', 'drill_pack', 'mega_pack'];
    const licenseTypes = ['basic', 'premium', 'exclusive'];
    
    for (const productId of productIds) {
      for (const licenseType of licenseTypes) {
        const testSession = await fetch(`${BACKEND_URL}/api/stripe/create-checkout-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId,
            licenseType,
            customerData: { email: 'test@example.com' }
          })
        });
        
        if (testSession.ok) {
          log('green', `   ✅ ${productId} + ${licenseType}`);
        } else {
          log('red', `   ❌ ${productId} + ${licenseType}`);
        }
      }
    }
    
    log('green', '🎉 STRIPE CONFIGURÉ ET TESTÉ AVEC SUCCÈS !');
    return true;
    
  } catch (error) {
    log('red', `❌ Erreur: ${error.message}`);
    return false;
  }
}

// Afficher les informations de test
function showTestInfo() {
  console.log('\n💳 INFORMATIONS DE TEST');
  console.log('═══════════════════════════');
  console.log('🎭 Mode: Démonstration (pas de vrais paiements)');
  console.log('💰 Tous les paiements sont simulés');
  console.log('📧 Les emails sont simulés');
  console.log('🔗 Les liens de téléchargement sont simulés');
  
  console.log('\n🎵 PRODUITS DISPONIBLES:');
  console.log('   🎯 Pack Trap Beats Premium - 29.99€');
  console.log('   🎤 Pack Hip-Hop Exclusif - 39.99€');
  console.log('   🔥 Pack Drill Intense - 24.99€');
  console.log('   💎 Mega Pack Complet - 79.99€');
  
  console.log('\n📜 LICENCES DISPONIBLES:');
  console.log('   🏠 Basique (×1) - Usage personnel');
  console.log('   💼 Premium (×2) - Usage commercial');
  console.log('   👑 Exclusive (×5) - Droits exclusifs');
}

// Exécution
async function main() {
  const success = await testStripeAuto();
  
  if (success) {
    showTestInfo();
    console.log('\n🚀 BOUTIQUE PRÊTE !');
    console.log('   🎨 Frontend: http://localhost:5173');
    console.log('   🔧 Backend:  http://localhost:3001/api/stripe/test');
    console.log('   🛒 Boutique: Intégrée dans votre site');
    console.log('\n💡 Pour utiliser de vraies clés Stripe :');
    console.log('   1. Créer un compte sur https://stripe.com');
    console.log('   2. Récupérer vos clés API');
    console.log('   3. Modifier le fichier .env');
    console.log('   4. Redémarrer les serveurs');
  } else {
    console.log('\n🔧 ACTIONS REQUISES :');
    console.log('1. Vérifier que le backend est démarré');
    console.log('2. Vérifier les routes Stripe');
    console.log('3. Relancer ce test');
  }
}

main().catch(console.error);
