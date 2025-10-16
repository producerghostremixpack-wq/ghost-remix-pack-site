#!/usr/bin/env node

import fs from 'fs';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';

const log = console.log;

log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
log(chalk.blue.bold('║     🚀 DÉPLOIEMENT AUTOMATIQUE - RAILWAY                  ║'));
log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

// Vérifier que .env existe
if (!fs.existsSync('.env')) {
  log(chalk.red.bold('❌ Fichier .env introuvable !'));
  log(chalk.yellow('💡 Lancez d\'abord : npm run setup\n'));
  process.exit(1);
}

const steps = [
  {
    name: '📦 Installation des dépendances',
    command: 'cd ../backend && npm install',
    optional: false
  },
  {
    name: '🔍 Validation de la configuration',
    command: 'node validate.js',
    optional: false
  },
  {
    name: '🚂 Connexion à Railway',
    command: 'railway login',
    optional: false
  },
  {
    name: '📤 Déploiement sur Railway',
    command: 'railway up',
    optional: false
  },
  {
    name: '🧪 Tests automatiques',
    command: 'node test.js',
    optional: true
  }
];

let success = true;

for (const step of steps) {
  const spinner = ora(step.name).start();
  
  try {
    execSync(step.command, { stdio: 'inherit' });
    spinner.succeed(step.name);
  } catch (error) {
    if (step.optional) {
      spinner.warn(`${step.name} - Échec (optionnel)`);
    } else {
      spinner.fail(step.name);
      success = false;
      break;
    }
  }
}

if (success) {
  log(chalk.green.bold('\n✅ Déploiement réussi !\n'));
  log(chalk.blue('📊 Prochaines étapes :\n'));
  log(chalk.white('   1. npm run monitor     - Dashboard monitoring'));
  log(chalk.white('   2. npm run webhook     - Configurer webhook Stripe'));
  log(chalk.white('   3. Vérifier votre backend sur Railway\n'));
} else {
  log(chalk.red.bold('\n❌ Déploiement échoué\n'));
  log(chalk.yellow('💡 Consultez les logs ci-dessus pour plus de détails\n'));
  process.exit(1);
}

