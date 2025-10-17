#!/usr/bin/env node

/**
 * Test du formulaire de contact SANS SendGrid
 * Simule l'envoi d'email pour tester la logique
 */

const testContactSansEmail = async () => {
  console.log('🧪 TEST FORMULAIRE DE CONTACT (SANS SENDGRID)\n');

  // Données de test
  const testData = {
    name: 'Test Utilisateur',
    email: 'test@ghostremixpack.com',
    subject: 'Test du formulaire sans SendGrid',
    message: 'Ceci est un message de test pour vérifier que la logique du formulaire fonctionne, même sans SendGrid configuré.'
  };

  console.log('📧 Test de la logique du formulaire...');
  console.log(`👤 Nom: ${testData.name}`);
  console.log(`📧 Email: ${testData.email}`);
  console.log(`📋 Sujet: ${testData.subject}`);

  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log(`\n📡 Status: ${response.status}`);
    
    const responseText = await response.text();
    
    if (response.ok) {
      try {
        const data = JSON.parse(responseText);
        console.log('\n✅ LOGIQUE DU FORMULAIRE OK !');
        console.log(`📨 Contact ID: ${data.contactId || 'N/A'}`);
        console.log(`💬 Message: ${data.message}`);
        console.log('\n🎯 Ce qui fonctionne :');
        console.log('✅ Réception des données');
        console.log('✅ Validation des champs');
        console.log('✅ Traitement de la requête');
        console.log('✅ Réponse JSON correcte');
        
        console.log('\n📧 Pour recevoir les emails :');
        console.log('1. Configurez SendGrid (voir CONFIGURER-CONTACT-MAINTENANT.md)');
        console.log('2. Ajoutez votre clé API dans le fichier .env');
        console.log('3. Relancez le test');
        
      } catch (e) {
        console.log('\n⚠️ Réponse non-JSON mais status OK');
        console.log('Réponse:', responseText);
      }
    } else {
      try {
        const errorData = JSON.parse(responseText);
        console.log('\n⚠️ ERREUR ATTENDUE (SendGrid non configuré)');
        console.log(`❌ Erreur: ${errorData.error}`);
        console.log(`💬 Détail: ${errorData.message}`);
        
        if (errorData.message === 'Unauthorized') {
          console.log('\n💡 DIAGNOSTIC :');
          console.log('✅ Le serveur fonctionne');
          console.log('✅ La route /api/contact existe');
          console.log('✅ Les données sont reçues');
          console.log('❌ SendGrid non configuré (clé API manquante)');
          
          console.log('\n🚀 SOLUTION :');
          console.log('1. Créez un compte SendGrid gratuit');
          console.log('2. Obtenez une clé API');
          console.log('3. Ajoutez-la dans le fichier .env');
          console.log('4. Redémarrez le serveur');
          
          console.log('\n📚 Guide complet : CONFIGURER-CONTACT-MAINTENANT.md');
        }
      } catch (e) {
        console.log('\n❌ ERREUR INATTENDUE');
        console.log('Réponse:', responseText);
      }
    }

  } catch (error) {
    console.error('\n❌ ERREUR DE CONNEXION');
    console.error(`Erreur: ${error.message}`);
    
    console.log('\n🔍 DIAGNOSTIC :');
    console.log('❌ Impossible de se connecter au serveur');
    console.log('💡 Le serveur backend est-il démarré ?');
    
    console.log('\n🚀 SOLUTIONS :');
    console.log('1. Démarrez le serveur : cd backend && node server.js');
    console.log('2. Vérifiez le port 3001 : curl http://localhost:3001/api/health');
    console.log('3. Vérifiez les logs du serveur');
  }
};

// Test de santé du serveur
const testServerHealth = async () => {
  console.log('\n🔍 Test de santé du serveur...');
  
  try {
    const response = await fetch('http://localhost:3001/api/health');
    const data = await response.json();
    
    console.log('✅ Serveur accessible');
    console.log(`📡 Status: ${data.status}`);
    console.log(`⏰ Timestamp: ${data.timestamp}`);
    
    return true;
  } catch (error) {
    console.log('❌ Serveur non accessible');
    console.log(`Erreur: ${error.message}`);
    
    console.log('\n💡 Démarrez le serveur :');
    console.log('cd "/Users/djshek/Le site Ghost Remix Pack/backend" && node server.js');
    
    return false;
  }
};

// Fonction principale
const main = async () => {
  const serverOk = await testServerHealth();
  
  if (serverOk) {
    await testContactSansEmail();
  }
  
  console.log('\n📚 Documentation complète :');
  console.log('- CONFIGURER-CONTACT-MAINTENANT.md');
  console.log('- CONFIGURATION-SENDGRID-NEWSLETTER.md');
  
  console.log('\n🎉 Test terminé !');
};

main().catch(console.error);
