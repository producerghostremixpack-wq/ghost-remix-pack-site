#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import ora from 'ora';

const log = console.log;

// Validation functions
const validateStripeKey = (key, type) => {
  if (type === 'secret') {
    return key.startsWith('sk_test_') || key.startsWith('sk_live_');
  }
  if (type === 'publishable') {
    return key.startsWith('pk_test_') || key.startsWith('pk_live_');
  }
  return false;
};

const validateSendGridKey = (key) => {
  return key.startsWith('SG.');
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateJSON = (json) => {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
};

log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
log(chalk.blue.bold('║     🚀 CONFIGURATION AUTOMATIQUE - GHOST REMIX PACK      ║'));
log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

const questions = [
  {
    type: 'input',
    name: 'stripeSecretKey',
    message: 'Clé secrète Stripe (sk_test_...) :',
    validate: (input) => {
      if (!validateStripeKey(input, 'secret')) {
        return 'Format invalide. Doit commencer par sk_test_ ou sk_live_';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'stripePublishableKey',
    message: 'Clé publique Stripe (pk_test_...) :',
    validate: (input) => {
      if (!validateStripeKey(input, 'publishable')) {
        return 'Format invalide. Doit commencer par pk_test_ ou pk_live_';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'firebaseProjectId',
    message: 'Firebase Project ID :',
    default: 'ghost-remix-pack',
    validate: (input) => {
      if (!input || input.trim().length === 0) {
        return 'Le Project ID ne peut pas être vide';
      }
      return true;
    }
  },
  {
    type: 'editor',
    name: 'firebaseCredentials',
    message: 'Firebase Credentials JSON (ouvre un éditeur) :',
    validate: (input) => {
      if (!validateJSON(input)) {
        return 'Format JSON invalide';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'sendgridApiKey',
    message: 'Clé API SendGrid (SG.xxx...) :',
    validate: (input) => {
      if (!validateSendGridKey(input)) {
        return 'Format invalide. Doit commencer par SG.';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'sendgridFromEmail',
    message: 'Email expéditeur SendGrid :',
    validate: (input) => {
      if (!validateEmail(input)) {
        return 'Format email invalide';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'frontendUrl',
    message: 'URL du frontend :',
    default: 'https://www.ghostremixpack.com',
    validate: (input) => {
      if (!input.startsWith('http://') && !input.startsWith('https://')) {
        return 'L\'URL doit commencer par http:// ou https://';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'railwayToken',
    message: 'Railway Token API (optionnel, pour déploiement auto) :',
    required: false
  }
];

const spinner = ora('Configuration en cours...').start();

try {
  const answers = await inquirer.prompt(questions);
  
  spinner.succeed('Configuration récupérée !');
  
  // Créer le fichier .env
  const envContent = `# Configuration Ghost Remix Pack Backend
# Généré automatiquement le ${new Date().toISOString()}

# Stripe
STRIPE_SECRET_KEY=${answers.stripeSecretKey}
STRIPE_PUBLISHABLE_KEY=${answers.stripePublishableKey}
STRIPE_WEBHOOK_SECRET=whsec_PLACEHOLDER

# Firebase
FIREBASE_PROJECT_ID=${answers.firebaseProjectId}
FIREBASE_CREDENTIALS='${answers.firebaseCredentials}'

# SendGrid
SENDGRID_API_KEY=${answers.sendgridApiKey}
SENDGRID_FROM_EMAIL=${answers.sendgridFromEmail}

# Application
PORT=3001
NODE_ENV=production
FRONTEND_URL=${answers.frontendUrl}

# Railway
${answers.railwayToken ? `RAILWAY_TOKEN=${answers.railwayToken}` : '# RAILWAY_TOKEN=your-token-here'}
`;

  fs.writeFileSync('.env', envContent);
  
  log(chalk.green.bold('\n✅ Configuration sauvegardée dans .env\n'));
  log(chalk.yellow('⚠️  Important : Ne commitez JAMAIS le fichier .env sur GitHub !\n'));
  log(chalk.blue('📝 Prochaines étapes :\n'));
  log(chalk.white('   1. npm run deploy:auto  - Déploiement automatique'));
  log(chalk.white('   2. npm run test        - Tests automatiques'));
  log(chalk.white('   3. npm run monitor     - Dashboard monitoring\n'));
  
} catch (error) {
  spinner.fail('Erreur lors de la configuration');
  log(chalk.red.bold('\n❌ Erreur :'), error.message);
  process.exit(1);
}

