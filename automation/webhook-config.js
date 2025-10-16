#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import dotenv from 'dotenv';

dotenv.config();

const log = console.log;

log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
log(chalk.blue.bold('║     🔗 CONFIGURATION WEBHOOK STRIPE                     ║'));
log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

const questions = [
  {
    type: 'input',
    name: 'backendUrl',
    message: 'URL du backend (ex: https://votre-app.onrender.com) :',
    default: process.env.RAILWAY_PUBLIC_DOMAIN 
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : '',
    validate: (input) => {
      if (!input.startsWith('http://') && !input.startsWith('https://')) {
        return 'L\'URL doit commencer par http:// ou https://';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'webhookSecret',
    message: 'Stripe Webhook Secret (whsec_...) :',
    validate: (input) => {
      if (!input.startsWith('whsec_')) {
        return 'Le secret doit commencer par whsec_';
      }
      return true;
    }
  }
];

const spinner = ora('Configuration du webhook...').start();

try {
  const answers = await inquirer.prompt(questions);
  
  spinner.succeed('Configuration récupérée !');
  
  log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  log(chalk.bold('📋 CONFIGURATION WEBHOOK STRIPE\n'));
  log(chalk.white(`Endpoint URL : ${answers.backendUrl}/api/webhook`));
  log(chalk.white(`Webhook Secret : ${answers.webhookSecret}\n`));
  log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  
  log(chalk.yellow.bold('⚠️  ACTIONS MANUELLES REQUISES :\n'));
  log(chalk.white('1. Allez sur : https://dashboard.stripe.com/test/webhooks'));
  log(chalk.white('2. Cliquez sur "Add endpoint"'));
  log(chalk.white(`3. Endpoint URL : ${answers.backendUrl}/api/webhook`));
  log(chalk.white('4. Sélectionnez les événements :'));
  log(chalk.white('   - checkout.session.completed'));
  log(chalk.white('   - payment_intent.succeeded'));
  log(chalk.white('   - payment_intent.payment_failed'));
  log(chalk.white('5. Cliquez sur "Add endpoint"'));
  log(chalk.white('6. Copiez le "Signing secret"'));
  log(chalk.white('7. Ajoutez-le dans votre .env :'));
  log(chalk.white(`   STRIPE_WEBHOOK_SECRET=${answers.webhookSecret}\n`));
  
  log(chalk.green.bold('✅ Webhook configuré !\n'));
  
} catch (error) {
  spinner.fail('Erreur lors de la configuration');
  log(chalk.red.bold('\n❌ Erreur :'), error.message);
  process.exit(1);
}

