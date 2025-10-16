#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const log = console.log;

log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
log(chalk.blue.bold('║     🧪 TESTS AUTOMATIQUES - GHOST REMIX PACK             ║'));
log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

const backendUrl = process.env.RAILWAY_PUBLIC_DOMAIN 
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : 'http://localhost:3001';

const tests = [
  {
    name: 'Santé de l\'API',
    test: async () => {
      const response = await fetch(`${backendUrl}/api/health`);
      const data = await response.json();
      
      if (response.ok && data.status === 'ok') {
        return { success: true, message: 'API fonctionnelle' };
      }
      return { success: false, message: 'API non fonctionnelle' };
    }
  },
  {
    name: 'Configuration Stripe',
    test: async () => {
      if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PUBLISHABLE_KEY) {
        return { success: true, message: 'Stripe configuré' };
      }
      return { success: false, message: 'Stripe non configuré' };
    }
  },
  {
    name: 'Configuration Firebase',
    test: async () => {
      if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CREDENTIALS) {
        try {
          const creds = JSON.parse(process.env.FIREBASE_CREDENTIALS);
          if (creds.project_id) {
            return { success: true, message: 'Firebase configuré' };
          }
        } catch {
          return { success: false, message: 'Credentials Firebase invalides' };
        }
      }
      return { success: false, message: 'Firebase non configuré' };
    }
  },
  {
    name: 'Configuration SendGrid',
    test: async () => {
      if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
        return { success: true, message: 'SendGrid configuré' };
      }
      return { success: false, message: 'SendGrid non configuré' };
    }
  }
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  const spinner = ora(test.name).start();
  
  try {
    const result = await test.test();
    
    if (result.success) {
      spinner.succeed(`${test.name} - ${result.message}`);
      passed++;
    } else {
      spinner.fail(`${test.name} - ${result.message}`);
      failed++;
    }
  } catch (error) {
    spinner.fail(`${test.name} - Erreur: ${error.message}`);
    failed++;
  }
}

log('\n' + chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
log(chalk.green(`✅ Tests réussis : ${passed}`));
if (failed > 0) {
  log(chalk.red(`❌ Tests échoués : ${failed}`));
}
log(chalk.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

if (failed === 0) {
  log(chalk.green.bold('🎉 Tous les tests sont passés !\n'));
} else {
  log(chalk.yellow.bold('⚠️  Certains tests ont échoué\n'));
  process.exit(1);
}

