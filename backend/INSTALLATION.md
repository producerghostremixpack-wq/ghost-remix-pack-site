# 🚀 Installation du Backend - Ghost Remix Pack

## ✅ Le backend Express.js est prêt !

Suivez ce guide étape par étape pour le configurer.

---

## 📋 ÉTAPE 1 : Installer les Dépendances

```bash
cd backend
npm install
```

**Packages installés :**
- `express` - Serveur web
- `stripe` - Paiement
- `firebase-admin` - Base de données
- `@sendgrid/mail` - Emails
- `cors` - Communication frontend/backend
- `dotenv` - Variables d'environnement
- `nodemon` - Hot reload (dev)

---

## 🔑 ÉTAPE 2 : Obtenir les Clés API

### 1. Stripe (Gratuit)

**a) Créer un compte :**
- Allez sur https://stripe.com
- Cliquez sur "Sign up" / "S'inscrire"
- Remplissez le formulaire (email, nom, pays)

**b) Récupérer les clés :**
1. Une fois connecté, allez dans **"Developers"** → **"API keys"**
2. Vous verrez 2 clés :
   - `Publishable key` (pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI...)
   - `Secret key` (sk_test_VOTRE_CLE_TEST_ICI... - cliquez sur "Reveal")
3. Copiez les deux

**c) Configurer le webhook :**
1. Allez dans **"Developers"** → **"Webhooks"**
2. Cliquez sur **"Add endpoint"**
3. URL : `http://localhost:3001/api/webhook` (pour le test)
4. Écoutez l'événement : `checkout.session.completed`
5. Copiez le **"Signing secret"** (whsec_VOTRE_WEBHOOK_SECRET_ICI...)

---

### 2. Firebase (Gratuit)

**a) Créer un projet :**
- Allez sur https://console.firebase.google.com
- Cliquez sur **"Ajouter un projet"**
- Nom : "Ghost Remix Pack"
- Désactivez Google Analytics (pas nécessaire)
- Cliquez sur **"Créer le projet"**

**b) Activer Firestore :**
1. Dans le menu gauche, cliquez sur **"Firestore Database"**
2. Cliquez sur **"Créer une base de données"**
3. Choisissez **"Mode test"** (pour commencer)
4. Sélectionnez la région : **europe-west (Belgique)** ou **europe-west1 (Belgique)**
5. Cliquez sur **"Activer"**

**c) Télécharger la clé de service :**
1. Allez dans **"Project Settings"** (icône engrenage)
2. Onglet **"Service accounts"**
3. Cliquez sur **"Generate new private key"**
4. Un fichier `serviceAccountKey.json` sera téléchargé
5. **Déplacez ce fichier dans le dossier `backend/`**

---

### 3. SendGrid (Gratuit - 100 emails/jour)

**a) Créer un compte :**
- Allez sur https://signup.sendgrid.com
- Remplissez le formulaire
- Vérifiez votre email

**b) Créer une clé API :**
1. Allez dans **"Settings"** → **"API Keys"**
2. Cliquez sur **"Create API Key"**
3. Nom : "Ghost Remix Backend"
4. Accès : **"Full Access"**
5. Cliquez sur **"Create & View"**
6. **Copiez la clé** (elle ne sera plus affichée !)

**c) Vérifier l'email expéditeur :**
1. Allez dans **"Settings"** → **"Sender Authentication"**
2. Cliquez sur **"Verify a Single Sender"**
3. Remplissez avec `contact@ghostremixpack.com` (ou votre email)
4. Vérifiez l'email reçu

---

## ⚙️ ÉTAPE 3 : Configurer les Variables d'Environnement

```bash
cd backend
cp env.example .env
```

**Éditez le fichier `.env` et remplissez :**

```env
# STRIPE
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI

# FIREBASE
FIREBASE_PROJECT_ID=ghost-remix-pack

# SENDGRID
SENDGRID_API_KEY=SG.VOTRE_CLE_ICI
SENDGRID_FROM_EMAIL=contact@ghostremixpack.com

# SERVEUR
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# STRIPE URLS
SUCCESS_URL=http://localhost:5173/success
CANCEL_URL=http://localhost:5173/cart
```

**⚠️ IMPORTANT :**
- Remplacez TOUS les `VOTRE_CLE_ICI`
- Le fichier `serviceAccountKey.json` doit être dans `/backend/`
- Ne commitez JAMAIS le fichier `.env` sur Git !

---

## 🚀 ÉTAPE 4 : Démarrer le Backend

### Mode Développement (avec hot reload)
```bash
cd backend
npm run dev
```

### Mode Production
```bash
cd backend
npm start
```

**Vous devriez voir :**
```
╔═══════════════════════════════════════════╗
║  🚀 Ghost Remix Backend API               ║
║  ✅ Serveur démarré sur port 3001        ║
║  📡 Frontend URL: http://localhost:5173  ║
║  🔒 Stripe: Configuré ✅                  ║
║  🗄️  Firebase: Configuré ✅               ║
║  📧 SendGrid: Configuré ✅                ║
╚═══════════════════════════════════════════╝
```

**Si vous voyez des ❌, vérifiez vos clés API dans `.env`**

---

## ✅ ÉTAPE 5 : Tester en Mode Test

### 1. Démarrer les 2 serveurs

**Terminal 1 - Frontend :**
```bash
cd /Users/djshek/Documents/Le\ site\ Ghost\ Remix\ Pack
npm run dev
```

**Terminal 2 - Backend :**
```bash
cd /Users/djshek/Documents/Le\ site\ Ghost\ Remix\ Pack/backend
npm run dev
```

### 2. Tester un achat

1. Ouvrez http://localhost:5173
2. Ajoutez un pack au panier
3. Allez à la page Checkout
4. Remplissez le formulaire
5. Cliquez sur **"Valider la Commande"**
6. Vous serez redirigé vers **Stripe Checkout**
7. Utilisez une **carte de test Stripe** :
   - Numéro : `4242 4242 4242 4242`
   - Date : N'importe quelle date future (12/25)
   - CVC : N'importe quel 3 chiffres (123)
   - Code postal : N'importe lequel
8. Validez le paiement
9. Vous êtes redirigé vers `/success` ✅
10. Vérifiez votre email (confirmation reçue)
11. Vérifiez Firebase (commande sauvegardée)

---

## 📊 ÉTAPE 6 : Vérifier que Tout Fonctionne

### Test 1 : API Health Check
```bash
curl http://localhost:3001/api/health
```

**Réponse attendue :**
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running",
  "timestamp": "2025-10-14T..."
}
```

### Test 2 : Firebase
- Allez sur https://console.firebase.google.com
- Ouvrez votre projet
- Allez dans **"Firestore Database"**
- Après un achat test, vous devriez voir une collection **"orders"**

### Test 3 : SendGrid
- Allez sur https://app.sendgrid.com
- **"Activity"** → Vous verrez les emails envoyés

---

## 🐛 DÉPANNAGE

### Erreur : "Cannot find module"
```bash
cd backend
npm install
```

### Erreur : "Stripe key not found"
- Vérifiez que `.env` existe
- Vérifiez que les clés Stripe sont bien remplies
- Redémarrez le serveur

### Erreur : "Firebase serviceAccountKey.json not found"
- Téléchargez le fichier depuis Firebase Console
- Placez-le dans `/backend/serviceAccountKey.json`
- Redémarrez le serveur

### Erreur : "SendGrid authentication failed"
- Vérifiez votre clé API SendGrid
- Vérifiez que l'email expéditeur est vérifié sur SendGrid

### Erreur CORS (frontend ne peut pas appeler backend)
- Vérifiez que `FRONTEND_URL` dans `.env` = `http://localhost:5173`
- Vérifiez que les 2 serveurs tournent

---

## 🌐 ÉTAPE 7 : Passer en Production

### Avant de déployer :

1. **Remplacer les clés TEST par les clés LIVE :**
   - `sk_test_VOTRE_CLE_TEST_ICI...` → `sk_live_VOTRE_CLE_LIVE_ICI...`
   - `pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI...` → `pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI...`
   - `whsec_VOTRE_WEBHOOK_SECRET_ICI...` → `whsec_VOTRE_WEBHOOK_SECRET_ICI...`

2. **Changer les URLs :**
   ```env
   FRONTEND_URL=https://votre-domaine.com
   SUCCESS_URL=https://votre-domaine.com/success
   CANCEL_URL=https://votre-domaine.com/cart
   ```

3. **Mettre `NODE_ENV=production`**

4. **Configurer le webhook Stripe en production :**
   - URL : `https://votre-backend.com/api/webhook`

---

## 📦 DÉPLOIEMENT

### Backend (Railway - Recommandé)
```bash
# 1. Créer compte sur railway.app (gratuit)
# 2. Connecter GitHub
# 3. Déployer le dossier /backend/
# 4. Ajouter les variables d'environnement
# 5. Uploader serviceAccountKey.json
```

### Frontend (Vercel - Gratuit)
```bash
# Déjà prêt, pas de changement nécessaire
vercel deploy
```

---

## ✅ CHECKLIST FINALE

- [ ] `npm install` dans /backend/
- [ ] Compte Stripe créé
- [ ] Compte Firebase créé
- [ ] Compte SendGrid créé
- [ ] Fichier `.env` rempli
- [ ] Fichier `serviceAccountKey.json` dans /backend/
- [ ] Backend démarré (port 3001)
- [ ] Frontend démarré (port 5173)
- [ ] Test d'achat avec carte 4242... réussi
- [ ] Email de confirmation reçu
- [ ] Commande dans Firebase
- [ ] Webhook Stripe configuré

---

## 🎯 RÉSULTAT

**Site 100% fonctionnel avec paiements réels ! 💳✅**

Vos clients peuvent maintenant :
1. Ajouter des packs au panier
2. Passer commande
3. Payer par carte bancaire (Stripe)
4. Recevoir confirmation par email
5. Recevoir les fichiers WAV

---

**Besoin d'aide ? Suivez le guide pas à pas ! 🚀**







