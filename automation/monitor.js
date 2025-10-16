#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const log = console.log;

log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
log(chalk.blue.bold('║     📊 DASHBOARD MONITORING - GHOST REMIX PACK           ║'));
log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

const backendUrl = process.env.RAILWAY_PUBLIC_DOMAIN 
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : 'http://localhost:3001';

const displayStatus = async () => {
  const spinner = ora('Vérification du statut...').start();
  
  try {
    const response = await fetch(`${backendUrl}/api/health`);
    const data = await response.json();
    
    spinner.succeed('Backend connecté !');
    
    log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
    
    // Statut général
    log(chalk.bold('📊 STATUT GÉNÉRAL'));
    log(chalk.green('  ✅ Backend : En ligne'));
    log(chalk.green(`  🌐 URL : ${backendUrl}`));
    log(chalk.green(`  ⏰ Dernière vérification : ${new Date().toLocaleString()}`));
    
    log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
    
    // Services
    log(chalk.bold('🔌 SERVICES'));
    
    // Stripe
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PUBLISHABLE_KEY) {
      log(chalk.green('  ✅ Stripe : Configuré'));
    } else {
      log(chalk.red('  ❌ Stripe : Non configuré'));
    }
    
    // Firebase
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CREDENTIALS) {
      log(chalk.green('  ✅ Firebase : Configuré'));
      log(chalk.gray(`     Project ID : ${process.env.FIREBASE_PROJECT_ID}`));
    } else {
      log(chalk.red('  ❌ Firebase : Non configuré'));
    }
    
    // SendGrid
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
      log(chalk.green('  ✅ SendGrid : Configuré'));
      log(chalk.gray(`     Email : ${process.env.SENDGRID_FROM_EMAIL}`));
    } else {
      log(chalk.red('  ❌ SendGrid : Non configuré'));
    }
    
    log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
    
    // Actions
    log(chalk.bold('🎯 ACTIONS DISPONIBLES'));
    log(chalk.white('  npm run test      - Lancer les tests'));
    log(chalk.white('  npm run webhook   - Configurer webhook Stripe'));
    log(chalk.white('  npm run validate  - Valider la configuration'));
    
    log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
    
    log(chalk.green.bold('✨ Dashboard actif - Ctrl+C pour quitter\n'));
    
  } catch (error) {
    spinner.fail('Backend inaccessible');
    log(chalk.red.bold('\n❌ Impossible de se connecter au backend\n'));
    log(chalk.yellow('💡 Vérifiez que le backend est bien déployé sur Railway\n'));
    process.exit(1);
  }
};

// Afficher le dashboard
await displayStatus();

// Rafraîchir toutes les 30 secondes
setInterval(async () => {
  console.clear();
  await displayStatus();
}, 30000);

