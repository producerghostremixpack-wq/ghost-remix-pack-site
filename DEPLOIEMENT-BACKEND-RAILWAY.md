# 🚂 Déploiement Backend sur Railway.app

## 🎯 Pourquoi Railway ?

- ✅ Gratuit pour commencer (500h/mois)
- ✅ Déploiement en 5 minutes
- ✅ PostgreSQL/Redis inclus si besoin
- ✅ Variables d'environnement faciles
- ✅ Logs en temps réel

---

## 🚀 Étapes de Déploiement

### 1️⃣ Créer un compte Railway

**Aller sur :** https://railway.app/

**Se connecter avec GitHub** (recommandé)

---

### 2️⃣ Nouveau Projet

1. Cliquer sur **"New Project"**
2. Choisir **"Deploy from GitHub repo"**
3. Autoriser Railway à accéder à GitHub
4. Sélectionner votre repository **Ghost Remix Pack**

---

### 3️⃣ Configuration du Service

⚠️ **IMPORTANT** : Railway doit déployer UNIQUEMENT le dossier `backend`

**Option A : Configurer dans l'interface**
1. Settings > **Root Directory** : `backend`
2. Build Command : `npm install`
3. Start Command : `npm start`

**Option B : Créer `railway.json`**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && npm install"
  },
  "deploy": {
    "startCommand": "cd backend && npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

### 4️⃣ Variables d'Environnement

**Dans Railway > Variables, ajouter :**

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI... (votre clé test)
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI... (à obtenir après webhook)

# Firebase
FIREBASE_PROJECT_ID=ghost-remix-pack
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@ghost-remix-pack.iam.gserviceaccount.com

# SendGrid
SENDGRID_API_KEY=SG.XXXXXX
SENDGRID_FROM_EMAIL=contact@votredomaine.com

# URLs
FRONTEND_URL=https://ghost-remix-pack.vercel.app
DOWNLOAD_BASE_URL=https://ghost-remix-pack.vercel.app/downloads

# Serveur
PORT=3001
NODE_ENV=production
```

---

### 5️⃣ Deploy !

1. Railway déploie automatiquement
2. Attendez 2-3 minutes
3. Récupérez l'URL : `https://ghost-remix-backend.up.railway.app`

---

## 🔗 Connecter Frontend et Backend

### Dans Vercel

1. Aller sur le dashboard Vercel
2. Projet **ghost-remix-pack** > **Settings** > **Environment Variables**
3. Ajouter :
   ```
   Name: VITE_BACKEND_URL
   Value: https://ghost-remix-backend.up.railway.app
   ```
4. **Redéployer** :
   ```bash
   vercel --prod
   ```

---

## ✅ Vérifier que ça Marche

### Test 1 : Health Check
```bash
curl https://ghost-remix-backend.up.railway.app/api/health
```

Réponse attendue :
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running",
  "timestamp": "2024-..."
}
```

### Test 2 : Dans le Frontend
1. Ouvrir votre site : `https://ghost-remix-pack.vercel.app`
2. Ajouter un produit au panier
3. Aller au checkout
4. Vérifier la console : pas d'erreur CORS

---

## 📊 Monitoring Railway

### Voir les Logs
1. Railway Dashboard > Votre service
2. Onglet **"Logs"**
3. Logs en temps réel !

### Métriques
- CPU usage
- Memory usage
- Network traffic

---

## 🛠️ Commandes Utiles

### Redéployer
```bash
git push origin main
# Railway redéploie automatiquement !
```

### Variables localement
```bash
# Dans backend/.env
cp env.example .env
# Éditer avec vos vraies valeurs
```

### Test local avec Railway URL
```bash
FRONTEND_URL=https://ghost-remix-pack.vercel.app npm start
```

---

## 🎯 Configuration Firebase (Nécessaire)

### 1. Aller sur Firebase Console
https://console.firebase.google.com

### 2. Créer un projet
- Nom : `ghost-remix-pack`
- Analytics : Oui (optionnel)

### 3. Activer Storage
1. Storage > Get Started
2. Rules mode : Test mode (pour l'instant)

### 4. Obtenir les credentials
1. Project Settings > Service Accounts
2. Generate new private key
3. Copier les valeurs dans Railway

---

## 🎯 Configuration SendGrid

### 1. Créer un compte
https://sendgrid.com/

### 2. Créer une API Key
1. Settings > API Keys
2. Create API Key
3. Full Access
4. Copier la clé dans Railway

### 3. Vérifier un sender
1. Settings > Sender Authentication
2. Single Sender Verification
3. Utiliser votre email

---

## 🔐 Configuration Webhook Stripe

**⚠️ À faire APRÈS le déploiement Railway**

### 1. Dashboard Stripe
https://dashboard.stripe.com/webhooks

### 2. Ajouter endpoint
```
URL: https://ghost-remix-backend.up.railway.app/api/webhook
Events: checkout.session.completed
```

### 3. Copier le secret
```
whsec_VOTRE_WEBHOOK_SECRET_ICI
```

### 4. Ajouter dans Railway
```
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI
```

### 5. Activer dans le code
Dans `backend/server.js`, décommenter :
```javascript
app.use('/api/webhook', webhookRouter);
```

---

## 💰 Coûts Railway

**Free Tier :**
- 500 heures/mois GRATUITES
- 512 MB RAM
- 1 GB Disk
- Parfait pour démarrer !

**Après dépassement :**
- ~$5/mois si 24/7

---

## 🆘 Problèmes Fréquents

### ❌ Build Failed
**Solution :** Vérifier que `package.json` est dans `/backend`

### ❌ CORS Error
**Solution :** Vérifier `FRONTEND_URL` dans Railway

### ❌ Firebase Auth Failed  
**Solution :** Vérifier le format de `FIREBASE_PRIVATE_KEY` (avec `\n`)

### ❌ Port Error
**Solution :** Railway utilise la variable `PORT` automatiquement

---

## ✅ Checklist Finale

- [ ] Backend déployé sur Railway
- [ ] URL Railway récupérée
- [ ] Variables d'environnement configurées
- [ ] Health check OK (`/api/health`)
- [ ] Frontend connecté (VITE_BACKEND_URL)
- [ ] Pas d'erreur CORS
- [ ] Firebase configuré
- [ ] SendGrid configuré
- [ ] Webhook Stripe créé

---

## 🎉 C'est Fait !

**Vos URLs :**
- Frontend : `https://ghost-remix-pack.vercel.app`
- Backend : `https://ghost-remix-backend.up.railway.app`
- Dashboard Railway : https://railway.app/dashboard

**Prochaine étape :** Tester le processus d'achat complet ! 🛒
