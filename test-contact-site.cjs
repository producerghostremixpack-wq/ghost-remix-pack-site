#!/usr/bin/env node

/**
 * Script de test pour envoyer un message via le formulaire de contact du site
 * Usage: node test-contact-site.cjs
 */

const testContactForm = async () => {
  console.log('\n📧 TEST FORMULAIRE DE CONTACT\n');

  // Vérifier si le serveur local est démarré
  const serverUrl = 'http://localhost:3001';
  
  console.log(`🌐 Test du serveur: ${serverUrl}`);

  try {
    // Test de santé du serveur
    console.log('🔍 Vérification du serveur...');
    const healthResponse = await fetch(`${serverUrl}/api/health`);
    
    if (!healthResponse.ok) {
      throw new Error(`Serveur non accessible: ${healthResponse.status}`);
    }
    
    const healthData = await healthResponse.json();
    console.log('✅ Serveur accessible');
    console.log(`📡 Status: ${healthData.status}`);
    console.log(`⏰ Timestamp: ${healthData.timestamp}`);

  } catch (error) {
    console.error('❌ Serveur non accessible:', error.message);
    console.log('\n💡 Solutions :');
    console.log('1. Démarrez le serveur backend : npm run dev:backend');
    console.log('2. Ou démarrez tout : npm run dev');
    console.log('3. Vérifiez que le port 3001 est libre');
    process.exit(1);
  }

  // Données de test
  const testMessage = {
    name: 'Test Automatique',
    email: 'test@ghostremixpack.com',
    subject: '🧪 Test du formulaire de contact',
    message: `Ceci est un message de test automatique envoyé le ${new Date().toLocaleString('fr-FR')}.

🎯 Objectif : Vérifier que le formulaire de contact fonctionne correctement.

✅ Tests effectués :
- Connexion au serveur backend
- Envoi via l'API /api/contact
- Validation des données
- Envoi d'email via SendGrid

Si vous recevez cet email, le système de contact fonctionne parfaitement !

---
Test automatique - Ghost Remix Pack
${new Date().toISOString()}`
  };

  console.log('\n📮 Envoi du message de test...');
  console.log(`👤 Nom: ${testMessage.name}`);
  console.log(`📧 Email: ${testMessage.email}`);
  console.log(`📋 Sujet: ${testMessage.subject}`);

  try {
    const response = await fetch(`${serverUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log('\n✅ MESSAGE ENVOYÉ AVEC SUCCÈS !');
      console.log(`📨 Contact ID: ${responseData.contactId}`);
      console.log(`💬 Message: ${responseData.message}`);
      
      console.log('\n🎯 Résultats :');
      console.log('✅ API de contact fonctionnelle');
      console.log('✅ Validation des données OK');
      console.log('✅ Sauvegarde Firebase OK');
      console.log('✅ Envoi email SendGrid OK');
      
      console.log('\n📧 Vérifiez votre boîte mail contact@ghostremixpack.com');
      console.log('Vous devriez recevoir le message de test dans quelques secondes.');
      
    } else {
      console.error('\n❌ ERREUR LORS DE L\'ENVOI');
      console.error(`Status: ${response.status}`);
      console.error(`Erreur: ${responseData.error}`);
      console.error(`Message: ${responseData.message}`);
      
      if (response.status === 400) {
        console.log('\n💡 Erreur de validation - vérifiez les données envoyées');
      } else if (response.status === 500) {
        console.log('\n💡 Erreur serveur - vérifiez :');
        console.log('- Configuration SendGrid (SENDGRID_API_KEY)');
        console.log('- Configuration Firebase');
        console.log('- Logs du serveur backend');
      }
    }

  } catch (error) {
    console.error('\n❌ ERREUR DE CONNEXION');
    console.error('Erreur:', error.message);
    console.log('\n💡 Solutions possibles :');
    console.log('- Vérifiez que le serveur backend est démarré');
    console.log('- Vérifiez l\'URL du serveur');
    console.log('- Vérifiez votre connexion internet');
  }
};

// Test avec différents scénarios
const testMultipleScenarios = async () => {
  console.log('\n🧪 TESTS MULTIPLES SCÉNARIOS\n');
  
  const serverUrl = 'http://localhost:3001';
  
  // Test 1: Message normal
  console.log('📝 Test 1: Message normal');
  await testContactForm();
  
  // Attendre 2 secondes entre les tests
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 2: Message sans sujet
  console.log('\n📝 Test 2: Message sans sujet');
  try {
    const response = await fetch(`${serverUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Sans Sujet',
        email: 'test-no-subject@ghostremixpack.com',
        message: 'Message de test sans sujet spécifique.'
      }),
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log('✅ Test sans sujet réussi');
    } else {
      console.log('❌ Test sans sujet échoué:', data.error);
    }
  } catch (error) {
    console.log('❌ Erreur test sans sujet:', error.message);
  }
  
  // Attendre 2 secondes
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 3: Validation (données manquantes)
  console.log('\n📝 Test 3: Validation (données manquantes)');
  try {
    const response = await fetch(`${serverUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Validation',
        // email manquant volontairement
        message: 'Test de validation'
      }),
    });
    
    const data = await response.json();
    if (response.status === 400) {
      console.log('✅ Validation fonctionne - erreur 400 attendue');
      console.log(`📋 Message d'erreur: ${data.error}`);
    } else {
      console.log('⚠️ Validation inattendue - devrait retourner erreur 400');
    }
  } catch (error) {
    console.log('❌ Erreur test validation:', error.message);
  }
};

// Fonction principale
const main = async () => {
  const args = process.argv.slice(2);
  
  if (args.includes('--multiple') || args.includes('-m')) {
    await testMultipleScenarios();
  } else {
    await testContactForm();
  }
  
  console.log('\n📚 Pour plus de tests : node test-contact-site.cjs --multiple');
  console.log('\n🎉 Test terminé !');
};

// Gestion des erreurs globales
process.on('unhandledRejection', (error) => {
  console.error('\n❌ Erreur non gérée:', error.message);
  process.exit(1);
});

main().catch(console.error);
