#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';

const log = console.log;

log(chalk.blue.bold('\n╔═══════════════════════════════════════════════════════════╗'));
log(chalk.blue.bold('║     🔧 RÉPARATION AUTOMATIQUE RAILWAY                     ║'));
log(chalk.blue.bold('╚═══════════════════════════════════════════════════════════╝\n'));

async function fixFirebaseCredentials() {
  const spinner = ora('Correction des credentials Firebase...').start();
  
  try {
    const envPath = '../automation/.env';
    
    if (!fs.existsSync(envPath)) {
      spinner.fail('Fichier .env introuvable');
      return false;
    }
    
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Vérifier si FIREBASE_CREDENTIALS existe
    if (!envContent.includes('FIREBASE_CREDENTIALS')) {
      spinner.fail('FIREBASE_CREDENTIALS non trouvé');
      return false;
    }
    
    // Extraire et valider le JSON
    const match = envContent.match(/FIREBASE_CREDENTIALS=(.+)/);
    if (match) {
      const credentials = match[1].trim();
      
      try {
        const parsed = JSON.parse(credentials);
        spinner.succeed('Credentials Firebase valides');
        return true;
      } catch (e) {
        spinner.warn('Credentials JSON invalide, tentative de correction...');
        
        // Tenter de corriger le JSON
        const cleaned = credentials.replace(/\\n/g, '\n');
        
        try {
          JSON.parse(cleaned);
          envContent = envContent.replace(
            /FIREBASE_CREDENTIALS=.+/,
            `FIREBASE_CREDENTIALS=${cleaned}`
          );
          fs.writeFileSync(envPath, envContent);
          spinner.succeed('Credentials Firebase corrigés');
          return true;
        } catch (e2) {
          spinner.fail('Impossible de corriger automatiquement');
          return false;
        }
      }
    }
    
    spinner.succeed('Firebase OK');
    return true;
    
  } catch (error) {
    spinner.fail('Erreur lors de la correction');
    return false;
  }
}

async function fixServerConfig() {
  const spinner = ora('Correction de la configuration serveur...').start();
  
  try {
    const packageJsonPath = '../backend/package.json';
    
    if (!fs.existsSync(packageJsonPath)) {
      spinner.fail('package.json introuvable');
      return false;
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Vérifier et ajouter les scripts manquants
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    
    if (!packageJson.scripts.start) {
      packageJson.scripts.start = 'node server.js';
      spinner.info('Script "start" ajouté');
    }
    
    if (!packageJson.scripts.dev) {
      packageJson.scripts.dev = 'nodemon server.js';
    }
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    spinner.succeed('Configuration serveur corrigée');
    return true;
    
  } catch (error) {
    spinner.fail('Erreur lors de la correction');
    return false;
  }
}

async function fixEnvVariables() {
  const spinner = ora('Correction des variables d\'environnement...').start();
  
  try {
    const envPath = '../automation/.env';
    
    if (!fs.existsSync(envPath)) {
      spinner.fail('Fichier .env introuvable');
      return false;
    }
    
    let envContent = fs.readFileSync(envPath, 'utf8');
    let modified = false;
    
    // Vérifier et corriger le PORT
    if (!envContent.includes('PORT=')) {
      envContent += '\nPORT=3001\n';
      modified = true;
    }
    
    // Vérifier et corriger NODE_ENV
    if (!envContent.includes('NODE_ENV=')) {
      envContent += '\nNODE_ENV=production\n';
      modified = true;
    }
    
    // Vérifier et corriger FRONTEND_URL
    if (!envContent.includes('FRONTEND_URL=')) {
      envContent += '\nFRONTEND_URL=https://www.ghostremixpack.com\n';
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(envPath, envContent);
      spinner.succeed('Variables d\'environnement corrigées');
      return true;
    } else {
      spinner.succeed('Variables d\'environnement OK');
      return true;
    }
    
  } catch (error) {
    spinner.fail('Erreur lors de la correction');
    return false;
  }
}

async function generateRailwayConfig() {
  const spinner = ora('Génération de la configuration Railway...').start();
  
  try {
    const railwayJson = {
      "$schema": "https://railway.app/railway.schema.json",
      "build": {
        "builder": "NIXPACKS",
        "buildCommand": "cd backend && npm install"
      },
      "deploy": {
        "startCommand": "cd backend && node server.js",
        "restartPolicyType": "ON_FAILURE",
        "restartPolicyMaxRetries": 10
      }
    };
    
    const railwayJsonPath = '../railway.json';
    fs.writeFileSync(railwayJsonPath, JSON.stringify(railwayJson, null, 2));
    
    spinner.succeed('Configuration Railway générée');
    return true;
    
  } catch (error) {
    spinner.fail('Erreur lors de la génération');
    return false;
  }
}

async function runAutoFix() {
  log(chalk.yellow('🔧 DÉMARRAGE DE LA RÉPARATION AUTOMATIQUE\n'));
  
  const fixes = [
    { name: 'Variables d\'environnement', fn: fixEnvVariables },
    { name: 'Configuration serveur', fn: fixServerConfig },
    { name: 'Credentials Firebase', fn: fixFirebaseCredentials },
    { name: 'Configuration Railway', fn: generateRailwayConfig }
  ];
  
  let successCount = 0;
  
  for (const fix of fixes) {
    const result = await fix.fn();
    if (result) successCount++;
  }
  
  log(chalk.blue('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  
  if (successCount === fixes.length) {
    log(chalk.green.bold('✅ TOUTES LES RÉPARATIONS RÉUSSIES !\n'));
    log(chalk.white('Prochaines étapes :'));
    log(chalk.cyan('  1. git add .'));
    log(chalk.cyan('  2. git commit -m "fix: Configuration corrigée automatiquement"'));
    log(chalk.cyan('  3. git push'));
    log(chalk.cyan('  4. Railway redéploiera automatiquement\n'));
  } else {
    log(chalk.yellow.bold(`⚠️  ${successCount}/${fixes.length} réparations réussies\n`));
    log(chalk.white('Certaines corrections nécessitent une intervention manuelle.\n'));
  }
}

runAutoFix();

