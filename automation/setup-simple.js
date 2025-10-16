#!/usr/bin/env node

import fs from 'fs';
import chalk from 'chalk';
import readline from 'readline';

const log = console.log;

log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
log(chalk.blue.bold('║     🚀 CONFIGURATION SIMPLE - GHOST REMIX PACK          ║'));
log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

try {
  log(chalk.yellow('📝 Entrez vos clés API (ou appuyez sur Entrée pour utiliser les valeurs par défaut)\n'));
  
  const stripeSecret = await question('Clé secrète Stripe (sk_test_...) : ');
  const stripePublishable = await question('Clé publique Stripe (pk_test_...) : ');
  const firebaseProjectId = await question('Firebase Project ID (ghost-remix-pack) : ') || 'ghost-remix-pack';
  const sendgridApiKey = await question('Clé API SendGrid (SG.xxx...) : ');
  const sendgridEmail = await question('Email SendGrid : ');
  const frontendUrl = await question('URL Frontend (https://www.ghostremixpack.com) : ') || 'https://www.ghostremixpack.com';
  
  log(chalk.yellow('\n📝 Firebase Credentials JSON :'));
  log(chalk.gray('Ouvrez votre fichier JSON Firebase et collez TOUT le contenu ci-dessous'));
  log(chalk.gray('(Appuyez sur Entrée deux fois quand c\'est terminé)\n'));
  
  let firebaseCredentials = '';
  let emptyLines = 0;
  
  while (true) {
    const line = await question('');
    if (line === '') {
      emptyLines++;
      if (emptyLines === 2) break;
    } else {
      emptyLines = 0;
      firebaseCredentials += line + '\n';
    }
  }
  
  rl.close();
  
  // Créer le fichier .env
  const envContent = `# Configuration Ghost Remix Pack Backend
# Généré automatiquement le ${new Date().toISOString()}

# Stripe
STRIPE_SECRET_KEY=${stripeSecret}
STRIPE_PUBLISHABLE_KEY=${stripePublishable}
STRIPE_WEBHOOK_SECRET=whsec_PLACEHOLDER

# Firebase
FIREBASE_PROJECT_ID=${firebaseProjectId}
FIREBASE_CREDENTIALS='${firebaseCredentials.trim()}'

# SendGrid
SENDGRID_API_KEY=${sendgridApiKey}
SENDGRID_FROM_EMAIL=${sendgridEmail}

# Application
PORT=3001
NODE_ENV=production
FRONTEND_URL=${frontendUrl}
`;

  fs.writeFileSync('.env', envContent);
  
  log(chalk.green.bold('\n✅ Configuration sauvegardée dans .env\n'));
  log(chalk.yellow('⚠️  Important : Ne commitez JAMAIS le fichier .env sur GitHub !\n'));
  log(chalk.blue('📝 Prochaines étapes :\n'));
  log(chalk.white('   1. npm run validate  - Valider la configuration'));
  log(chalk.white('   2. npm run deploy    - Déployer sur Railway'));
  log(chalk.white('   3. npm run monitor   - Dashboard monitoring\n'));
  
} catch (error) {
  log(chalk.red.bold('\n❌ Erreur :'), error.message);
  process.exit(1);
}

