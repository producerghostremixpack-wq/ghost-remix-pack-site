#!/usr/bin/env node

import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';
import Table from 'cli-table3';
import fs from 'fs';
import { execSync } from 'child_process';

const log = console.log;

const BACKEND_URL = 'https://ghost-remix-pack-site-production.up.railway.app';
const FRONTEND_URL = 'https://www.ghostremixpack.com';

log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
log(chalk.blue.bold('║     🔍 DIAGNOSTIC AUTOMATIQUE RAILWAY                     ║'));
log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

const diagnostics = {
  backend: { status: 'unknown', issues: [] },
  frontend: { status: 'unknown', issues: [] },
  firebase: { status: 'unknown', issues: [] },
  stripe: { status: 'unknown', issues: [] },
  sendgrid: { status: 'unknown', issues: [] },
  server: { status: 'unknown', issues: [] }
};

async function checkBackend() {
  const spinner = ora('Vérification du backend...').start();
  
  try {
    const response = await axios.get(`${BACKEND_URL}/api/health`, { timeout: 5000 });
    
    if (response.data.status === 'ok') {
      spinner.succeed('Backend : ✅ Opérationnel');
      diagnostics.backend.status = 'ok';
      return true;
    } else {
      spinner.fail('Backend : ❌ Erreur de réponse');
      diagnostics.backend.issues.push('Réponse inattendue de l\'API');
      diagnostics.backend.status = 'error';
      return false;
    }
  } catch (error) {
    spinner.fail('Backend : ❌ Non accessible');
    
    if (error.code === 'ECONNREFUSED') {
      diagnostics.backend.issues.push('Connexion refusée - Le serveur ne démarre pas');
    } else if (error.code === 'ETIMEDOUT') {
      diagnostics.backend.issues.push('Timeout - Le serveur met trop de temps à répondre');
    } else if (error.response?.status === 502) {
      diagnostics.backend.issues.push('502 Bad Gateway - Application failed to respond');
    } else {
      diagnostics.backend.issues.push(`Erreur : ${error.message}`);
    }
    
    diagnostics.backend.status = 'error';
    return false;
  }
}

async function checkFrontend() {
  const spinner = ora('Vérification du frontend...').start();
  
  try {
    const response = await axios.get(FRONTEND_URL, { timeout: 5000 });
    
    if (response.status === 200) {
      spinner.succeed('Frontend : ✅ Opérationnel');
      diagnostics.frontend.status = 'ok';
      return true;
    } else {
      spinner.fail('Frontend : ❌ Erreur');
      diagnostics.frontend.issues.push(`Status code : ${response.status}`);
      diagnostics.frontend.status = 'error';
      return false;
    }
  } catch (error) {
    spinner.fail('Frontend : ❌ Non accessible');
    diagnostics.frontend.issues.push(error.message);
    diagnostics.frontend.status = 'error';
    return false;
  }
}

async function checkFirebase() {
  const spinner = ora('Vérification de Firebase...').start();
  
  try {
    const envPath = '../automation/.env';
    
    if (!fs.existsSync(envPath)) {
      spinner.fail('Firebase : ❌ Fichier .env introuvable');
      diagnostics.firebase.issues.push('Fichier .env manquant');
      diagnostics.firebase.status = 'error';
      return false;
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    if (!envContent.includes('FIREBASE_PROJECT_ID')) {
      spinner.fail('Firebase : ❌ FIREBASE_PROJECT_ID manquant');
      diagnostics.firebase.issues.push('Variable FIREBASE_PROJECT_ID manquante');
      diagnostics.firebase.status = 'error';
      return false;
    }
    
    if (!envContent.includes('FIREBASE_CREDENTIALS')) {
      spinner.fail('Firebase : ❌ FIREBASE_CREDENTIALS manquant');
      diagnostics.firebase.issues.push('Variable FIREBASE_CREDENTIALS manquante');
      diagnostics.firebase.status = 'error';
      return false;
    }
    
    // Vérifier que les credentials sont un JSON valide
    const credentialsMatch = envContent.match(/FIREBASE_CREDENTIALS=(.+)/);
    if (credentialsMatch) {
      try {
        const credentials = credentialsMatch[1].trim();
        JSON.parse(credentials);
        spinner.succeed('Firebase : ✅ Configuration valide');
        diagnostics.firebase.status = 'ok';
        return true;
      } catch (e) {
        spinner.fail('Firebase : ❌ Credentials JSON invalide');
        diagnostics.firebase.issues.push('Format JSON invalide dans FIREBASE_CREDENTIALS');
        diagnostics.firebase.status = 'error';
        return false;
      }
    }
    
    spinner.succeed('Firebase : ✅ Configuration valide');
    diagnostics.firebase.status = 'ok';
    return true;
    
  } catch (error) {
    spinner.fail('Firebase : ❌ Erreur de vérification');
    diagnostics.firebase.issues.push(error.message);
    diagnostics.firebase.status = 'error';
    return false;
  }
}

async function checkStripe() {
  const spinner = ora('Vérification de Stripe...').start();
  
  try {
    const envPath = '../automation/.env';
    
    if (!fs.existsSync(envPath)) {
      spinner.fail('Stripe : ❌ Fichier .env introuvable');
      diagnostics.stripe.issues.push('Fichier .env manquant');
      diagnostics.stripe.status = 'error';
      return false;
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    if (!envContent.includes('STRIPE_SECRET_KEY')) {
      spinner.fail('Stripe : ❌ STRIPE_SECRET_KEY manquant');
      diagnostics.stripe.issues.push('Variable STRIPE_SECRET_KEY manquante');
      diagnostics.stripe.status = 'error';
      return false;
    }
    
    if (!envContent.includes('STRIPE_PUBLISHABLE_KEY')) {
      spinner.fail('Stripe : ❌ STRIPE_PUBLISHABLE_KEY manquant');
      diagnostics.stripe.issues.push('Variable STRIPE_PUBLISHABLE_KEY manquante');
      diagnostics.stripe.status = 'error';
      return false;
    }
    
    // Vérifier le format des clés
    const secretKeyMatch = envContent.match(/STRIPE_SECRET_KEY=(.+)/);
    if (secretKeyMatch && !secretKeyMatch[1].startsWith('sk_')) {
      spinner.fail('Stripe : ❌ Format de clé secrète invalide');
      diagnostics.stripe.issues.push('STRIPE_SECRET_KEY doit commencer par sk_');
      diagnostics.stripe.status = 'error';
      return false;
    }
    
    spinner.succeed('Stripe : ✅ Configuration valide');
    diagnostics.stripe.status = 'ok';
    return true;
    
  } catch (error) {
    spinner.fail('Stripe : ❌ Erreur de vérification');
    diagnostics.stripe.issues.push(error.message);
    diagnostics.stripe.status = 'error';
    return false;
  }
}

async function checkSendGrid() {
  const spinner = ora('Vérification de SendGrid...').start();
  
  try {
    const envPath = '../automation/.env';
    
    if (!fs.existsSync(envPath)) {
      spinner.fail('SendGrid : ❌ Fichier .env introuvable');
      diagnostics.sendgrid.issues.push('Fichier .env manquant');
      diagnostics.sendgrid.status = 'error';
      return false;
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    if (!envContent.includes('SENDGRID_API_KEY')) {
      spinner.fail('SendGrid : ❌ SENDGRID_API_KEY manquant');
      diagnostics.sendgrid.issues.push('Variable SENDGRID_API_KEY manquante');
      diagnostics.sendgrid.status = 'error';
      return false;
    }
    
    // Vérifier le format de la clé
    const apiKeyMatch = envContent.match(/SENDGRID_API_KEY=(.+)/);
    if (apiKeyMatch && !apiKeyMatch[1].startsWith('SG.')) {
      spinner.fail('SendGrid : ❌ Format de clé API invalide');
      diagnostics.sendgrid.issues.push('SENDGRID_API_KEY doit commencer par SG.');
      diagnostics.sendgrid.status = 'error';
      return false;
    }
    
    spinner.succeed('SendGrid : ✅ Configuration valide');
    diagnostics.sendgrid.status = 'ok';
    return true;
    
  } catch (error) {
    spinner.fail('SendGrid : ❌ Erreur de vérification');
    diagnostics.sendgrid.issues.push(error.message);
    diagnostics.sendgrid.status = 'error';
    return false;
  }
}

async function checkServerConfig() {
  const spinner = ora('Vérification de la configuration serveur...').start();
  
  try {
    const packageJsonPath = '../backend/package.json';
    
    if (!fs.existsSync(packageJsonPath)) {
      spinner.fail('Serveur : ❌ package.json introuvable');
      diagnostics.server.issues.push('Fichier package.json manquant dans /backend');
      diagnostics.server.status = 'error';
      return false;
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    if (!packageJson.scripts || !packageJson.scripts.start) {
      spinner.fail('Serveur : ❌ Script start manquant');
      diagnostics.server.issues.push('Script "start" manquant dans package.json');
      diagnostics.server.status = 'error';
      return false;
    }
    
    spinner.succeed('Serveur : ✅ Configuration valide');
    diagnostics.server.status = 'ok';
    return true;
    
  } catch (error) {
    spinner.fail('Serveur : ❌ Erreur de vérification');
    diagnostics.server.issues.push(error.message);
    diagnostics.server.status = 'error';
    return false;
  }
}

function displayResults() {
  log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  
  const table = new Table({
    head: ['Service', 'Statut', 'Problèmes'],
    colWidths: [20, 15, 50]
  });
  
  Object.keys(diagnostics).forEach(key => {
    const diag = diagnostics[key];
    const status = diag.status === 'ok' 
      ? chalk.green('✅ OK') 
      : chalk.red('❌ ERREUR');
    
    const issues = diag.issues.length > 0 
      ? diag.issues.join(', ') 
      : chalk.gray('Aucun');
    
    table.push([key.toUpperCase(), status, issues]);
  });
  
  log(chalk.bold('📊 RÉSULTATS DU DIAGNOSTIC\n'));
  log(table.toString());
  
  log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  
  // Recommandations
  const hasErrors = Object.values(diagnostics).some(d => d.status === 'error');
  
  if (hasErrors) {
    log(chalk.yellow.bold('⚠️  PROBLÈMES DÉTECTÉS\n'));
    log(chalk.white('Pour réparer automatiquement, lancez :'));
    log(chalk.cyan('  npm run fix\n'));
  } else {
    log(chalk.green.bold('✅ TOUS LES SERVICES SONT OPÉRATIONNELS\n'));
  }
}

async function runDiagnostics() {
  await checkBackend();
  await checkFrontend();
  await checkFirebase();
  await checkStripe();
  await checkSendGrid();
  await checkServerConfig();
  
  displayResults();
}

runDiagnostics();

