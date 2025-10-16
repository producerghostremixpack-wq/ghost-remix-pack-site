#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const log = console.log;

log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
log(chalk.blue.bold('║     ✔️  VALIDATION DE LA CONFIGURATION                   ║'));
log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

const validations = [
  {
    name: 'Fichier .env',
    check: () => fs.existsSync('.env'),
    message: 'Fichier .env trouvé'
  },
  {
    name: 'Stripe Secret Key',
    check: () => process.env.STRIPE_SECRET_KEY && 
                 (process.env.STRIPE_SECRET_KEY.startsWith('sk_test_') || 
                  process.env.STRIPE_SECRET_KEY.startsWith('sk_live_')),
    message: 'Clé secrète Stripe valide'
  },
  {
    name: 'Stripe Publishable Key',
    check: () => process.env.STRIPE_PUBLISHABLE_KEY && 
                 (process.env.STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_') || 
                  process.env.STRIPE_PUBLISHABLE_KEY.startsWith('pk_live_')),
    message: 'Clé publique Stripe valide'
  },
  {
    name: 'Firebase Project ID',
    check: () => process.env.FIREBASE_PROJECT_ID && 
                 process.env.FIREBASE_PROJECT_ID.length > 0,
    message: 'Project ID Firebase valide'
  },
  {
    name: 'Firebase Credentials',
    check: () => {
      if (!process.env.FIREBASE_CREDENTIALS) return false;
      try {
        const creds = JSON.parse(process.env.FIREBASE_CREDENTIALS);
        return creds.project_id && creds.private_key && creds.client_email;
      } catch {
        return false;
      }
    },
    message: 'Credentials Firebase valides'
  },
  {
    name: 'SendGrid API Key',
    check: () => process.env.SENDGRID_API_KEY && 
                 process.env.SENDGRID_API_KEY.startsWith('SG.'),
    message: 'Clé API SendGrid valide'
  },
  {
    name: 'SendGrid Email',
    check: () => process.env.SENDGRID_FROM_EMAIL && 
                 /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.SENDGRID_FROM_EMAIL),
    message: 'Email SendGrid valide'
  },
  {
    name: 'Frontend URL',
    check: () => process.env.FRONTEND_URL && 
                 (process.env.FRONTEND_URL.startsWith('http://') || 
                  process.env.FRONTEND_URL.startsWith('https://')),
    message: 'URL frontend valide'
  }
];

let passed = 0;
let failed = 0;

for (const validation of validations) {
  const spinner = ora(validation.name).start();
  
  if (validation.check()) {
    spinner.succeed(`${validation.name} - ${validation.message}`);
    passed++;
  } else {
    spinner.fail(`${validation.name} - Invalide`);
    failed++;
  }
}

log('\n' + chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
log(chalk.green(`✅ Validations réussies : ${passed}`));
if (failed > 0) {
  log(chalk.red(`❌ Validations échouées : ${failed}`));
}
log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

if (failed === 0) {
  log(chalk.green.bold('🎉 Configuration valide ! Prêt pour le déploiement.\n'));
} else {
  log(chalk.yellow.bold('⚠️  Certaines validations ont échoué\n'));
  log(chalk.white('💡 Lancez : npm run setup\n'));
  process.exit(1);
}

