# 🔍 CHECKING COMPLET & TUTORIEL DE CONNEXION
## Ghost Remix Pack - Site E-commerce de Packs Audio

---

## 📋 TABLE DES MATIÈRES

1. [État Actuel du Projet](#état-actuel-du-projet)
2. [Vérification Technique](#vérification-technique)
3. [Configuration Requise](#configuration-requise)
4. [Tutoriel Détaillé de Connexion](#tutoriel-détaillé-de-connexion)
5. [Tests de Fonctionnement](#tests-de-fonctionnement)
6. [Déploiement](#déploiement)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 ÉTAT ACTUEL DU PROJET

### ✅ CE QUI EST DÉJÀ FAIT

#### **Frontend (React + Vite + TypeScript)**
- ✅ Architecture complète avec React Router
- ✅ Design moderne avec Tailwind CSS
- ✅ Animations avec Framer Motion
- ✅ Système de panier fonctionnel (CartContext)
- ✅ Pages configurées :
  - `/` - Page d'accueil avec packs audio
  - `/cart` - Panier
  - `/checkout` - Page de paiement
  - `/success` - Confirmation de commande
  - `/mentions-legales` - Mentions légales
  - `/contact` - Contact
- ✅ Composants UI professionnels
- ✅ Configuration Stripe (clé publique configurée)
- ✅ Lecteur audio intégré
- ✅ Vidéo d'intro avec son

#### **Backend (Node.js + Express)**
- ✅ Structure complète avec routes organisées
- ✅ API Express configurée
- ✅ Routes implémentées :
  - `/api/checkout/create-session` - Création de session Stripe
  - `/api/webhook` - Webhook Stripe (commenté, à activer)
  - `/api/download` - Téléchargement de fichiers
  - `/api/health` - Test de santé du serveur
- ✅ Services configurés :
  - Stripe (paiement)
  - Firebase (base de données)
  - SendGrid (emails)
- ✅ Gestion CORS
- ✅ Script de vérification de config (`check-config.js`)

#### **Configuration**
- ✅ `package.json` frontend et backend
- ✅ Configuration Vercel (`vercel.json`)
- ✅ Configuration Railway (`railway.json`)
- ✅ Variables d'environnement documentées
- ✅ Stripe en mode TEST configuré
- ✅ `.gitignore` configurés (sécurité)

---

### ⚠️ CE QUI MANQUE / À CONFIGURER

#### **Backend Local**
- ❌ Fichier `.env` non créé dans `/backend`
- ❌ Fichier `serviceAccountKey.json` Firebase manquant
- ⚠️ Webhook Stripe commenté (à activer après config)
- ⚠️ SendGrid à configurer (optionnel mais recommandé)

#### **Configuration Stripe**
- ⚠️ Webhook Stripe à créer (pour notifications de paiement)
- ⚠️ Produits Stripe à créer (si utilisation API Stripe)

#### **Firebase**
- ❌ Projet Firebase à créer
- ❌ Clé de service à télécharger

#### **SendGrid**
- ❌ Compte SendGrid à créer
- ❌ Clé API à générer
- ❌ Email expéditeur à vérifier

#### **Déploiement**
- ⚠️ Backend à déployer sur Railway
- ⚠️ Frontend à déployer sur Vercel
- ⚠️ Variables d'environnement à configurer en production

---

## 🔍 VÉRIFICATION TECHNIQUE

### **Structure des Fichiers**

```
✅ Frontend
├── src/
│   ├── components/        ✅ Tous les composants présents
│   ├── config/            ✅ stripe.ts configuré
│   ├── context/           ✅ CartContext.tsx
│   ├── lib/               ✅ utils.ts
│   ├── App.tsx            ✅ Routes configurées
│   └── main.tsx           ✅ Point d'entrée
├── public/
│   ├── audio/             ✅ Structure présente
│   └── videos/            ✅ Vidéo présente
├── package.json           ✅ Dépendances complètes
└── vite.config.ts         ✅ Configuration Vite

✅ Backend
├── routes/
│   ├── checkout.js        ✅ Route de paiement
│   ├── webhook.js         ✅ Route webhook (commentée)
│   └── download.js        ✅ Route de téléchargement
├── services/
│   ├── stripe.js          ✅ Service Stripe
│   ├── firebase.js        ✅ Service Firebase
│   └── email.js           ✅ Service Email
├── server.js              ✅ Serveur Express
├── check-config.js        ✅ Script de vérification
├── env.example            ✅ Template des variables
└── ❌ .env                MANQUANT - À CRÉER
└── ❌ serviceAccountKey.json  MANQUANT - À TÉLÉCHARGER
```

### **Variables d'Environnement**

#### **Frontend**
```bash
✅ VITE_BACKEND_URL    # À définir pour production
                       # Local: http://localhost:3001
                       # Prod: https://votre-backend.railway.app
```

#### **Backend** (fichier `.env` à créer)
```bash
# STRIPE
✅ STRIPE_SECRET_KEY       # Déjà fournie
✅ STRIPE_PUBLISHABLE_KEY  # Déjà fournie
❌ STRIPE_WEBHOOK_SECRET   # À créer

# FIREBASE
❌ FIREBASE_PROJECT_ID     # À créer projet Firebase

# SENDGRID
❌ SENDGRID_API_KEY        # À créer compte SendGrid
❌ SENDGRID_FROM_EMAIL     # À vérifier l'email

# SERVEUR
✅ PORT                    # 3001
✅ FRONTEND_URL            # Fournie
✅ NODE_ENV                # development/production
```

---

## 📝 CONFIGURATION REQUISE

### **Comptes à Créer/Avoir**

1. **Stripe** (Paiement)
   - ✅ Compte créé
   - ✅ Clés API obtenues
   - ❌ Webhook à créer

2. **Firebase** (Base de données)
   - ❌ Créer un projet Firebase
   - ❌ Télécharger clé de service

3. **SendGrid** (Emails) - OPTIONNEL
   - ❌ Créer compte SendGrid (gratuit)
   - ❌ Générer clé API

4. **Railway** (Hébergement Backend)
   - ❌ Créer compte Railway
   - ❌ Connecter GitHub

5. **Vercel** (Hébergement Frontend)
   - ✅ Compte probablement créé
   - ❌ Vérifier configuration

6. **GitHub** (Code source)
   - ❌ Repository à créer/utiliser

---

## 🚀 TUTORIEL DÉTAILLÉ DE CONNEXION

### **ÉTAPE 1 : Configuration du Backend Local**

#### 1.1 - Créer le fichier `.env`

```bash
cd backend
cp env.example .env
```

#### 1.2 - Éditer le fichier `.env`

Ouvrez `backend/.env` et configurez :

```bash
# ==========================================
# STRIPE - Paiement
# ==========================================
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI
# ⚠️ À remplacer après création du webhook (étape 2)

# ==========================================
# FIREBASE - Base de données
# ==========================================
FIREBASE_PROJECT_ID=ghost-remix-pack
# ⚠️ À remplacer par votre vrai ID après création (étape 3)

# ==========================================
# SENDGRID - Emails (OPTIONNEL)
# ==========================================
SENDGRID_API_KEY=SG.VOTRE_CLE_ICI
# ⚠️ À créer si vous voulez envoyer des emails (étape 4)
SENDGRID_FROM_EMAIL=contact@votre-domaine.com
# ⚠️ Email vérifié dans SendGrid

# ==========================================
# SERVEUR - Configuration
# ==========================================
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# ==========================================
# URLS - Redirection après paiement
# ==========================================
SUCCESS_URL=http://localhost:5173/success
CANCEL_URL=http://localhost:5173/cart
```

---

### **ÉTAPE 2 : Configuration Stripe Webhook**

#### 2.1 - Installer Stripe CLI (pour tests locaux)

**Mac/Linux :**
```bash
brew install stripe/stripe-cli/stripe
```

**Windows :**
Téléchargez depuis : https://github.com/stripe/stripe-cli/releases

#### 2.2 - Authentifier Stripe CLI

```bash
stripe login
```

Une fenêtre de navigateur s'ouvrira pour vous connecter.

#### 2.3 - Démarrer le webhook local

```bash
stripe listen --forward-to localhost:3001/api/webhook
```

Vous obtiendrez un secret webhook comme :
```
> Ready! Your webhook signing secret is whsec_VOTRE_WEBHOOK_SECRET_ICI
```

#### 2.4 - Copier le secret webhook

Copiez le secret `whsec_VOTRE_WEBHOOK_SECRET_ICI` et mettez-le dans `backend/.env` :

```bash
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI
```

#### 2.5 - Activer le webhook dans le code

Ouvrez `backend/server.js` et **décommentez** ces lignes :

**AVANT :**
```javascript
// ⚠️ Commenté temporairement si webhook non configuré
// app.use('/api/webhook', express.raw({ type: 'application/json' }));

// ...

// ⚠️ Webhook commenté temporairement (à activer après création webhook)
// app.use('/api/webhook', webhookRouter);
```

**APRÈS :**
```javascript
// IMPORTANT : Le webhook Stripe nécessite le raw body
app.use('/api/webhook', express.raw({ type: 'application/json' }));

// ...

// Routes
app.use('/api/webhook', webhookRouter);
```

---

### **ÉTAPE 3 : Configuration Firebase**

#### 3.1 - Créer un projet Firebase

1. Allez sur https://console.firebase.google.com
2. Cliquez sur **"Ajouter un projet"**
3. Nom du projet : `ghost-remix-pack` (ou autre)
4. Désactivez Google Analytics (optionnel)
5. Cliquez sur **"Créer un projet"**

#### 3.2 - Activer Firestore Database

1. Dans le menu de gauche, cliquez sur **"Firestore Database"**
2. Cliquez sur **"Créer une base de données"**
3. Choisissez **"Démarrer en mode test"** (pour développement)
4. Choisissez une région proche (ex : `europe-west1`)
5. Cliquez sur **"Activer"**

#### 3.3 - Télécharger la clé de service

1. Allez dans **Paramètres du projet** (icône engrenage)
2. Onglet **"Comptes de service"**
3. Cliquez sur **"Générer une nouvelle clé privée"**
4. Un fichier JSON sera téléchargé
5. **Renommez-le** en `serviceAccountKey.json`
6. **Déplacez-le** dans le dossier `backend/`

```bash
mv ~/Downloads/ghost-remix-pack-xxxxx.json backend/serviceAccountKey.json
```

⚠️ **IMPORTANT** : Ce fichier NE DOIT JAMAIS être commité sur Git (déjà dans `.gitignore`)

#### 3.4 - Copier l'ID du projet

Dans le fichier `serviceAccountKey.json`, trouvez `project_id` :

```json
{
  "project_id": "ghost-remix-pack-xxxxx",
  ...
}
```

Mettez cet ID dans `backend/.env` :

```bash
FIREBASE_PROJECT_ID=ghost-remix-pack-xxxxx
```

---

### **ÉTAPE 4 : Configuration SendGrid (OPTIONNEL)**

> 💡 **Optionnel mais recommandé** pour envoyer des emails de confirmation

#### 4.1 - Créer un compte SendGrid

1. Allez sur https://signup.sendgrid.com
2. Créez un compte gratuit (100 emails/jour)
3. Validez votre email

#### 4.2 - Créer une clé API

1. Allez dans **Settings** → **API Keys**
2. Cliquez sur **"Create API Key"**
3. Nom : `Ghost Remix Pack`
4. Permissions : **Full Access**
5. Cliquez sur **"Create & View"**
6. **COPIEZ LA CLÉ** (elle ne sera plus visible)

#### 4.3 - Configurer la clé dans `.env`

```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 4.4 - Vérifier un email expéditeur

1. Allez dans **Settings** → **Sender Authentication**
2. Cliquez sur **"Verify a Single Sender"**
3. Remplissez le formulaire avec votre email
4. Validez l'email reçu

```bash
SENDGRID_FROM_EMAIL=votre-email@gmail.com
```

> ⚠️ Si vous sautez cette étape, les emails ne seront pas envoyés mais le site fonctionnera quand même.

---

### **ÉTAPE 5 : Installation des Dépendances**

#### 5.1 - Backend

```bash
cd backend
npm install
```

#### 5.2 - Frontend

```bash
cd ..
npm install
```

---

### **ÉTAPE 6 : Vérification de la Configuration**

```bash
cd backend
npm run check
```

Vous devriez voir :

```
╔═══════════════════════════════════════════════════════════╗
║  🔍 Vérification de la Configuration                      ║
║  Ghost Remix Pack Backend                                 ║
╚═══════════════════════════════════════════════════════════╝

🔒 STRIPE
  ✅ STRIPE_SECRET_KEY configurée
  ℹ️  Mode TEST (utilisez sk_live_VOTRE_CLE_LIVE_ICI pour la production)
  ✅ STRIPE_PUBLISHABLE_KEY configurée
  ✅ STRIPE_WEBHOOK_SECRET configuré

🗄️  FIREBASE
  ✅ serviceAccountKey.json trouvé
  ✅ FIREBASE_PROJECT_ID: ghost-remix-pack-xxxxx

📧 SENDGRID
  ✅ SENDGRID_API_KEY configurée
  ℹ️  Email expéditeur: votre-email@gmail.com

⚙️  SERVEUR
  ℹ️  Port: 3001
  ℹ️  Frontend URL: http://localhost:5173
  ℹ️  Mode: development

╔═══════════════════════════════════════════════════════════╗
║  ✅ Configuration complète !                              ║
║  Vous pouvez démarrer le serveur : npm run dev           ║
╚═══════════════════════════════════════════════════════════╝
```

---

### **ÉTAPE 7 : Démarrage Local**

#### 7.1 - Terminal 1 : Backend

```bash
cd backend
npm run dev
```

Vous devriez voir :
```
╔═══════════════════════════════════════════╗
║  🚀 Ghost Remix Backend API               ║
║  ✅ Serveur démarré sur port 3001         ║
║  📡 Frontend URL: http://localhost:5173   ║
║  🔒 Stripe: Configuré ✅                  ║
║  🗄️  Firebase: Configuré ✅               ║
║  📧 SendGrid: Configuré ✅                ║
╚═══════════════════════════════════════════╝
```

#### 7.2 - Terminal 2 : Webhook Stripe (si configuré)

```bash
stripe listen --forward-to localhost:3001/api/webhook
```

#### 7.3 - Terminal 3 : Frontend

```bash
npm run dev
```

Le site s'ouvrira automatiquement sur http://localhost:5173

---

## ✅ TESTS DE FONCTIONNEMENT

### **Test 1 : API Backend**

Ouvrez http://localhost:3001/api/health

Vous devriez voir :
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running",
  "timestamp": "2025-10-15T..."
}
```

### **Test 2 : Frontend**

Ouvrez http://localhost:5173

Vérifiez :
- ✅ La vidéo d'intro se lance
- ✅ Les packs audio s'affichent
- ✅ Le lecteur audio fonctionne
- ✅ Le bouton "Ajouter au panier" fonctionne

### **Test 3 : Panier**

1. Ajoutez un pack au panier
2. Cliquez sur l'icône panier (en haut à droite)
3. Vérifiez que le pack apparaît
4. Modifiez la quantité
5. Vérifiez que le total se met à jour

### **Test 4 : Checkout (SANS paiement réel)**

1. Dans le panier, cliquez sur **"Procéder au paiement"**
2. Remplissez le formulaire avec des données de test :
   - Nom : Test User
   - Email : test@example.com
   - Téléphone : 0612345678
3. Cliquez sur **"Payer 47€"**
4. Vous devriez être redirigé vers Stripe Checkout
5. Utilisez une carte de test :
   - Numéro : `4242 4242 4242 4242`
   - Date : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres
6. Complétez le paiement
7. Vous devriez être redirigé vers `/success`

### **Test 5 : Webhook**

Si le webhook est configuré, dans le terminal où `stripe listen` tourne, vous devriez voir :

```
2025-10-15 10:30:45  --> checkout.session.completed [evt_xxx]
2025-10-15 10:30:45  <-- [200] POST http://localhost:3001/api/webhook
```

---

## 🌐 DÉPLOIEMENT EN PRODUCTION

### **ÉTAPE 1 : Préparer GitHub**

#### 1.1 - Créer un repository GitHub

```bash
# Depuis votre projet
git init
git add .
git commit -m "Initial commit - Ghost Remix Pack"

# Créer le repository sur GitHub.com
# Puis :
git remote add origin https://github.com/VOTRE-USERNAME/ghost-remix-pack.git
git branch -M main
git push -u origin main
```

---

### **ÉTAPE 2 : Déployer le Backend sur Railway**

#### 2.1 - Créer un compte Railway

1. Allez sur https://railway.app
2. Cliquez sur **"Start a New Project"**
3. Connectez votre compte GitHub

#### 2.2 - Déployer depuis GitHub

1. Cliquez sur **"Deploy from GitHub repo"**
2. Sélectionnez votre repository `ghost-remix-pack`
3. Railway détectera automatiquement le `railway.json`

#### 2.3 - Configurer les variables d'environnement

Dans Railway, allez dans **Variables** et ajoutez :

```bash
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI
STRIPE_WEBHOOK_SECRET=(à créer après)
FIREBASE_PROJECT_ID=ghost-remix-pack-xxxxx
SENDGRID_API_KEY=SG.xxxxxxxxx
SENDGRID_FROM_EMAIL=votre-email@gmail.com
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://votre-site.vercel.app
```

⚠️ `FRONTEND_URL` sera mise à jour après le déploiement du frontend

#### 2.4 - Ajouter le fichier Firebase

Railway ne supporte pas les fichiers uploadés, donc convertissez `serviceAccountKey.json` en variable :

```bash
# Dans Railway, ajoutez une variable :
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}
```

OU modifiez `backend/services/firebase.js` pour lire depuis une variable.

#### 2.5 - Obtenir l'URL du backend

Une fois déployé, Railway vous donnera une URL comme :
```
https://ghost-remix-backend-production-xxxx.up.railway.app
```

**Copiez cette URL** pour la prochaine étape.

---

### **ÉTAPE 3 : Créer le Webhook Stripe en Production**

#### 3.1 - Aller sur Stripe Dashboard

1. Allez sur https://dashboard.stripe.com/test/webhooks
2. Cliquez sur **"Add endpoint"**

#### 3.2 - Configurer le webhook

- **URL** : `https://VOTRE-BACKEND.railway.app/api/webhook`
- **Description** : Ghost Remix Pack Webhook
- **Events to send** : 
  - `checkout.session.completed`
  - `payment_intent.succeeded`

#### 3.3 - Obtenir le secret

Une fois créé, cliquez sur le webhook et révélez **"Signing secret"** :

```
whsec_VOTRE_WEBHOOK_SECRET_ICI
```

#### 3.4 - Ajouter dans Railway

Dans Railway **Variables** :
```bash
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI
```

Redéployez le backend.

---

### **ÉTAPE 4 : Déployer le Frontend sur Vercel**

#### 4.1 - Créer un compte Vercel

1. Allez sur https://vercel.com
2. Connectez votre compte GitHub

#### 4.2 - Importer le projet

1. Cliquez sur **"Add New..." → Project**
2. Sélectionnez votre repository `ghost-remix-pack`
3. Framework Preset : **Vite**
4. Root Directory : `./` (racine)

#### 4.3 - Configurer les variables d'environnement

Dans **Environment Variables** :

```bash
VITE_BACKEND_URL=https://VOTRE-BACKEND.railway.app
```

⚠️ Remplacez par l'URL Railway obtenue à l'étape 2.5

#### 4.4 - Déployer

Cliquez sur **"Deploy"**

Vercel construira et déploiera votre site. Vous obtiendrez une URL comme :
```
https://ghost-remix-pack.vercel.app
```

#### 4.5 - Mettre à jour Railway

Retournez dans Railway **Variables** et mettez à jour :

```bash
FRONTEND_URL=https://ghost-remix-pack.vercel.app
```

Redéployez le backend.

---

### **ÉTAPE 5 : Tests en Production**

#### 5.1 - Tester l'API

Ouvrez : `https://VOTRE-BACKEND.railway.app/api/health`

Vous devriez voir :
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running",
  ...
}
```

#### 5.2 - Tester le site

1. Ouvrez : `https://VOTRE-SITE.vercel.app`
2. Ajoutez un produit au panier
3. Procédez au checkout
4. Utilisez la carte de test Stripe : `4242 4242 4242 4242`
5. Validez le paiement
6. Vérifiez la redirection vers `/success`

#### 5.3 - Vérifier les webhooks

Dans Stripe Dashboard → Webhooks, vérifiez que les événements sont bien reçus (statut 200).

---

## 🐛 TROUBLESHOOTING

### **Problème 1 : Backend ne démarre pas**

**Erreur :** `Cannot find module 'dotenv'`

**Solution :**
```bash
cd backend
npm install
```

---

### **Problème 2 : Stripe API Error**

**Erreur :** `Invalid API Key provided`

**Solution :**
- Vérifiez que `STRIPE_SECRET_KEY` dans `.env` commence par `sk_test_VOTRE_CLE_TEST_ICI` ou `sk_live_VOTRE_CLE_LIVE_ICI`
- Vérifiez qu'il n'y a pas d'espaces avant/après la clé
- Obtenez une nouvelle clé sur https://dashboard.stripe.com/test/apikeys

---

### **Problème 3 : CORS Error**

**Erreur :** `Access to fetch at 'http://localhost:3001/api/...' from origin 'http://localhost:5173' has been blocked by CORS`

**Solution :**

Dans `backend/server.js`, vérifiez :
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

Et dans `.env` :
```bash
FRONTEND_URL=http://localhost:5173
```

---

### **Problème 4 : Firebase Error**

**Erreur :** `Error: Firebase service account key not found`

**Solution :**
- Vérifiez que `serviceAccountKey.json` est dans le dossier `backend/`
- Vérifiez que le fichier n'est pas vide
- Re-téléchargez la clé depuis Firebase Console

---

### **Problème 5 : Webhook ne fonctionne pas**

**Erreur :** Webhook endpoint returned an error

**Solution :**

1. Vérifiez que le webhook est activé dans `server.js`
2. Vérifiez que `STRIPE_WEBHOOK_SECRET` est configuré
3. Pour le local, assurez-vous que `stripe listen` tourne
4. Pour la production, vérifiez l'URL du webhook sur Stripe Dashboard

---

### **Problème 6 : Paiement ne redirige pas**

**Erreur :** Après paiement, je reste sur Stripe

**Solution :**

Dans `backend/services/stripe.js`, vérifiez :
```javascript
success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.FRONTEND_URL}/cart`,
```

Et dans `.env` :
```bash
FRONTEND_URL=http://localhost:5173  # ou votre URL de prod
```

---

### **Problème 7 : SendGrid emails ne partent pas**

**Erreur :** SendGrid API error

**Solution :**

1. Vérifiez que l'email expéditeur est vérifié dans SendGrid
2. Vérifiez que la clé API a les permissions **Full Access**
3. Si en mode gratuit, vous êtes limité à 100 emails/jour

Pour tester sans SendGrid, commentez les appels dans `backend/services/email.js`

---

### **Problème 8 : Fichiers audio ne se chargent pas**

**Erreur :** Failed to load audio

**Solution :**

1. Vérifiez que les fichiers sont dans `public/audio/`
2. Vérifiez les noms de fichiers dans le code (casse importante)
3. Formats supportés : `.mp3`, `.wav`, `.ogg`

---

### **Problème 9 : Build Vercel échoue**

**Erreur :** `Build failed`

**Solution :**

1. Vérifiez qu'il n'y a pas d'erreurs TypeScript :
```bash
npm run build
```

2. Vérifiez que `vercel.json` est correct
3. Dans Vercel, vérifiez que le Framework est **Vite**

---

### **Problème 10 : Railway ne trouve pas le backend**

**Erreur :** `No such file or directory: backend/server.js`

**Solution :**

Vérifiez `railway.json` :
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && npm install"
  },
  "deploy": {
    "startCommand": "cd backend && npm start"
  }
}
```

---

## 📊 RÉCAPITULATIF DES URLS

### **Développement Local**

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3001 |
| Backend Health Check | http://localhost:3001/api/health |
| Stripe Dashboard | https://dashboard.stripe.com/test |
| Firebase Console | https://console.firebase.google.com |
| SendGrid Dashboard | https://app.sendgrid.com |

### **Production**

| Service | URL |
|---------|-----|
| Frontend | https://votre-site.vercel.app |
| Backend API | https://votre-backend.railway.app |
| Backend Health Check | https://votre-backend.railway.app/api/health |
| Stripe Webhook | https://votre-backend.railway.app/api/webhook |

---

## 📞 SUPPORT

### **Ressources Utiles**

- [Documentation Stripe](https://stripe.com/docs)
- [Documentation Firebase](https://firebase.google.com/docs)
- [Documentation SendGrid](https://docs.sendgrid.com)
- [Documentation Railway](https://docs.railway.app)
- [Documentation Vercel](https://vercel.com/docs)

### **Fichiers de Configuration**

- `backend/.env` - Variables d'environnement backend
- `backend/serviceAccountKey.json` - Clé Firebase
- `src/config/stripe.ts` - Configuration Stripe frontend
- `vercel.json` - Configuration Vercel
- `railway.json` - Configuration Railway

---

## ✅ CHECKLIST FINALE

### **Configuration Locale**

- [ ] `backend/.env` créé et rempli
- [ ] `backend/serviceAccountKey.json` téléchargé
- [ ] Dépendances installées (frontend + backend)
- [ ] Backend démarre sur port 3001
- [ ] Frontend démarre sur port 5173
- [ ] Stripe webhook configuré (local)
- [ ] Test de paiement réussi

### **Déploiement**

- [ ] Code pushé sur GitHub
- [ ] Backend déployé sur Railway
- [ ] Variables d'environnement Railway configurées
- [ ] Frontend déployé sur Vercel
- [ ] Variable `VITE_BACKEND_URL` Vercel configurée
- [ ] Webhook Stripe production créé
- [ ] Test de paiement production réussi
- [ ] Emails de confirmation fonctionnent

---

## 🎉 FÉLICITATIONS !

Si vous avez suivi toutes les étapes, votre site **Ghost Remix Pack** est maintenant :

✅ **Fonctionnel localement**
✅ **Déployé en production**
✅ **Prêt à accepter des paiements**
✅ **Configuré pour envoyer des emails**
✅ **Sécurisé avec Firebase**

---

## 📈 PROCHAINES ÉTAPES

1. **Ajouter vos vrais fichiers audio** dans `public/audio/`
2. **Personnaliser le contenu** dans `src/components/GhostRemixPack.tsx`
3. **Passer en mode production Stripe** (remplacer `sk_test_VOTRE_CLE_TEST_ICI` par `sk_live_VOTRE_CLE_LIVE_ICI`)
4. **Configurer un nom de domaine personnalisé**
5. **Ajouter Google Analytics** (optionnel)
6. **Améliorer le SEO** (meta tags, etc.)

---

**🚀 Bon lancement avec votre site Ghost Remix Pack !**

---

_Document créé le 15 octobre 2025_
_Version 1.0_

