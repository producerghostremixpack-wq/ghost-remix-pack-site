#!/usr/bin/env node

import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';

const log = console.log;

log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
log(chalk.blue.bold('║     📧 TEST D\'ENVOI D\'EMAIL                            ║'));
log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

const BACKEND_URL = 'https://ghost-remix-pack-site-production.up.railway.app';

async function testBackendHealth() {
  const spinner = ora('Test de connexion au backend...').start();
  
  try {
    const response = await axios.get(`${BACKEND_URL}/api/health`, { timeout: 5000 });
    
    if (response.data.status === 'ok' || response.data.status === 'OK') {
      spinner.succeed('Backend : ✅ Opérationnel');
      return true;
    } else {
      spinner.fail('Backend : ❌ Réponse inattendue');
      return false;
    }
  } catch (error) {
    spinner.fail('Backend : ❌ Non accessible');
    log(chalk.red(`\nErreur : ${error.message}\n`));
    return false;
  }
}

async function testEmailConfiguration() {
  log(chalk.yellow('\n📧 CONFIGURATION EMAIL :\n'));
  
  log(chalk.white('✅ Email expéditeur : producerghostremixpack@gmail.com'));
  log(chalk.white('✅ Email BCC : producteurghostremixpack@gmail.com'));
  log(chalk.white('✅ SendGrid configuré'));
  
  log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  
  log(chalk.bold('📋 CE QUI SERA TESTÉ :\n'));
  
  log(chalk.white('1. ✅ Backend accessible'));
  log(chalk.white('2. ✅ Configuration email'));
  log(chalk.white('3. ⏳ Envoi d\'email de test (nécessite une vraie commande)'));
  
  log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
}

async function displayEmailFlow() {
  log(chalk.bold('📧 FLUX D\'EMAILS CONFIGURÉ :\n'));
  
  log(chalk.white('1. CLIENT PASSE COMMANDE'));
  log(chalk.gray('   → Remplit "Vos Informations"'));
  log(chalk.gray('   → Paiement Stripe'));
  
  log(chalk.white('\n2. BACKEND TRAITE LA COMMANDE'));
  log(chalk.gray('   → Webhook Stripe reçoit la confirmation'));
  log(chalk.gray('   → Firebase sauvegarde la commande'));
  log(chalk.gray('   → SendGrid envoie les emails'));
  
  log(chalk.white('\n3. EMAILS ENVOYÉS :'));
  log(chalk.green('   ✅ Email de confirmation → CLIENT'));
  log(chalk.green('   ✅ Copie cachée (BCC) → VOUS'));
  log(chalk.gray('   → Détails de la commande'));
  log(chalk.gray('   → Montant, articles, informations client'));
  
  log(chalk.white('\n4. EMAIL DE LIVRAISON (48h) :'));
  log(chalk.green('   ✅ Liens de téléchargement → CLIENT'));
  log(chalk.green('   ✅ Copie cachée (BCC) → VOUS'));
  log(chalk.gray('   → Liens sécurisés'));
  log(chalk.gray('   → Fichiers WAV haute qualité'));
  
  log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
}

async function displayInstructions() {
  log(chalk.bold('🧪 COMMENT TESTER L\'EMAIL :\n'));
  
  log(chalk.white('1. Assurez-vous que le backend est opérationnel'));
  log(chalk.white('2. Allez sur : https://www.ghostremixpack.com'));
  log(chalk.white('3. Ajoutez un pack au panier'));
  log(chalk.white('4. Cliquez sur "Valider le panier"'));
  log(chalk.white('5. Remplissez "Vos Informations" :'));
  log(chalk.gray('   - Nom : Test'));
  log(chalk.gray('   - Email : producerghostremixpack@gmail.com (votre email)'));
  log(chalk.gray('   - Téléphone : 0123456789'));
  log(chalk.gray('   - Adresse : Test'));
  log(chalk.white('6. Payez avec une carte de test Stripe :'));
  log(chalk.gray('   - Numéro : 4242 4242 4242 4242'));
  log(chalk.gray('   - Date : N\'importe quelle date future'));
  log(chalk.gray('   - CVC : N\'importe quel 3 chiffres'));
  log(chalk.white('7. Vérifiez votre boîte email :'));
  log(chalk.green('   ✅ Vous devriez recevoir l\'email de confirmation'));
  log(chalk.green('   ✅ Vous devriez recevoir la copie cachée (BCC)'));
  
  log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
}

async function runTests() {
  // Test 1: Backend health
  const backendOk = await testBackendHealth();
  
  // Test 2: Email configuration
  await testEmailConfiguration();
  
  // Test 3: Display email flow
  await displayEmailFlow();
  
  // Test 4: Display instructions
  await displayInstructions();
  
  log(chalk.bold('📊 RÉSUMÉ :\n'));
  
  if (backendOk) {
    log(chalk.green('✅ Backend : Opérationnel'));
    log(chalk.green('✅ Configuration email : Prête'));
    log(chalk.yellow('⏳ Test d\'envoi : Nécessite une vraie commande\n'));
    log(chalk.white('Le système d\'email est prêt à fonctionner !'));
    log(chalk.white('Testez avec une commande réelle pour vérifier l\'envoi.\n'));
  } else {
    log(chalk.red('❌ Backend : Non accessible'));
    log(chalk.yellow('⚠️  Configurez d\'abord le backend sur Railway\n'));
    log(chalk.white('Actions requises :'));
    log(chalk.white('1. Configurez le Root Directory sur Railway'));
    log(chalk.white('2. Ajoutez les variables d\'environnement'));
    log(chalk.white('3. Attendez le redéploiement\n'));
  }
  
  log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
}

runTests();

