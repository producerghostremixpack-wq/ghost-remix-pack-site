#!/usr/bin/env node

/**
 * Test simple du formulaire de contact
 */

const testContact = async () => {
  console.log('🧪 TEST SIMPLE FORMULAIRE DE CONTACT\n');

  // Données de test
  const testData = {
    name: 'Test Utilisateur',
    email: 'test@ghostremixpack.com',
    subject: 'Test du formulaire',
    message: 'Ceci est un message de test envoyé automatiquement pour vérifier que le formulaire de contact fonctionne correctement.'
  };

  console.log('📧 Envoi du message de test...');
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
    console.log(`📡 Status Text: ${response.statusText}`);

    const responseText = await response.text();
    console.log(`\n📄 Réponse brute:`);
    console.log(responseText);

    if (response.ok) {
      try {
        const data = JSON.parse(responseText);
        console.log('\n✅ MESSAGE ENVOYÉ AVEC SUCCÈS !');
        console.log(`📨 Contact ID: ${data.contactId}`);
        console.log(`💬 Message: ${data.message}`);
      } catch (e) {
        console.log('\n⚠️ Réponse non-JSON mais status OK');
      }
    } else {
      console.log('\n❌ ERREUR LORS DE L\'ENVOI');
      if (response.status === 404) {
        console.log('💡 Route /api/contact non trouvée - vérifiez que le serveur backend est démarré');
      }
    }

  } catch (error) {
    console.error('\n❌ ERREUR DE CONNEXION');
    console.error(`Erreur: ${error.message}`);
    console.log('\n💡 Le serveur backend est-il démarré sur le port 3001 ?');
  }
};

testContact().catch(console.error);
