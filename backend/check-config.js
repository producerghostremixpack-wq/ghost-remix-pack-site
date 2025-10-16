#!/usr/bin/env node

/**
 * Script de vérification de la configuration
 * Vérifie que toutes les variables d'environnement sont configurées
 */

import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

console.log(`
╔═══════════════════════════════════════════════════════════╗
║  🔍 Vérification de la Configuration                      ║
║  Ghost Remix Pack Backend                                 ║
╚═══════════════════════════════════════════════════════════╝
`);

let allOk = true;

// Vérifier Stripe
console.log('🔒 STRIPE');
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_VOTRE_CLE_TEST_ICI') {
  console.log('  ✅ STRIPE_SECRET_KEY configurée');
  if (process.env.STRIPE_SECRET_KEY.startsWith('sk_test_VOTRE_CLE_TEST_ICI')) {
    console.log('  ℹ️  Mode TEST (utilisez sk_live_VOTRE_CLE_LIVE_ICI pour la production)');
  } else if (process.env.STRIPE_SECRET_KEY.startsWith('sk_live_VOTRE_CLE_LIVE_ICI')) {
    console.log('  ⚠️  Mode PRODUCTION (utilisez sk_test_VOTRE_CLE_TEST_ICI pour tester)');
  }
} else {
  console.log('  ❌ STRIPE_SECRET_KEY manquante');
  console.log('  📍 Allez sur: https://dashboard.stripe.com/test/apikeys');
  allOk = false;
}

if (process.env.STRIPE_PUBLISHABLE_KEY && process.env.STRIPE_PUBLISHABLE_KEY !== 'pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI') {
  console.log('  ✅ STRIPE_PUBLISHABLE_KEY configurée');
} else {
  console.log('  ❌ STRIPE_PUBLISHABLE_KEY manquante');
  console.log('  📍 Allez sur: https://dashboard.stripe.com/test/apikeys');
  allOk = false;
}

if (process.env.STRIPE_WEBHOOK_SECRET && process.env.STRIPE_WEBHOOK_SECRET !== 'whsec_VOTRE_WEBHOOK_SECRET_ICI') {
  console.log('  ✅ STRIPE_WEBHOOK_SECRET configuré');
} else {
  console.log('  ⚠️  STRIPE_WEBHOOK_SECRET manquant');
  console.log('  📍 Créez un webhook: https://dashboard.stripe.com/test/webhooks');
  console.log('  📍 URL: http://localhost:3001/api/webhook');
  console.log('  📍 Événement: checkout.session.completed');
}

if (process.env.STRIPE_ACCOUNT_ID) {
  console.log(`  ℹ️  Compte Stripe: ${process.env.STRIPE_ACCOUNT_ID}`);
}

console.log('');

// Vérifier Firebase
console.log('🗄️  FIREBASE');
const firebaseKeyPath = join(__dirname, 'serviceAccountKey.json');
if (existsSync(firebaseKeyPath)) {
  console.log('  ✅ serviceAccountKey.json trouvé');
} else {
  console.log('  ⚠️  serviceAccountKey.json manquant');
  console.log('  📍 Téléchargez-le depuis: https://console.firebase.google.com');
  console.log('  📍 Project Settings → Service Accounts → Generate new private key');
}

if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PROJECT_ID !== 'ghost-remix-pack') {
  console.log(`  ✅ FIREBASE_PROJECT_ID: ${process.env.FIREBASE_PROJECT_ID}`);
} else {
  console.log('  ⚠️  FIREBASE_PROJECT_ID par défaut');
  console.log('  💡 Remplacez par votre vrai ID de projet Firebase');
}

console.log('');

// Vérifier SendGrid
console.log('📧 SENDGRID');
if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'SG.VOTRE_CLE_ICI') {
  console.log('  ✅ SENDGRID_API_KEY configurée');
} else {
  console.log('  ⚠️  SENDGRID_API_KEY manquante');
  console.log('  📍 Créez une clé: https://app.sendgrid.com/settings/api_keys');
}

if (process.env.SENDGRID_FROM_EMAIL) {
  console.log(`  ℹ️  Email expéditeur: ${process.env.SENDGRID_FROM_EMAIL}`);
} else {
  console.log('  ⚠️  SENDGRID_FROM_EMAIL manquant');
}

console.log('');

// Vérifier Configuration Serveur
console.log('⚙️  SERVEUR');
console.log(`  ℹ️  Port: ${process.env.PORT || 3001}`);
console.log(`  ℹ️  Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
console.log(`  ℹ️  Mode: ${process.env.NODE_ENV || 'development'}`);

console.log('');

// Résultat final
if (allOk) {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║  ✅ Configuration complète !                              ║
║  Vous pouvez démarrer le serveur : npm run dev           ║
╚═══════════════════════════════════════════════════════════╝
  `);
} else {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║  ⚠️  Configuration incomplète                             ║
║  Complétez les éléments marqués ❌ ci-dessus              ║
║  Guide: backend/INSTALLATION.md                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
  process.exit(1);
}







