# 🚂 DÉPLOYER LE BACKEND SUR RAILWAY
## Guide ultra-rapide pour déployer en 10 minutes

---

## ❓ VOUS ÊTES DANS CETTE SITUATION

Vous voulez configurer Stripe en production, mais vous ne voyez pas votre projet backend sur Railway.

**Raison :** Le backend n'a pas encore été déployé sur Railway.

**Solution :** Déployons-le maintenant ! C'est rapide (10 minutes).

---

## 🎯 CE QUE NOUS ALLONS FAIRE

```
Étape 1 : Vérifier si vous avez un compte Railway
Étape 2 : Pusher le code sur GitHub (si pas fait)
Étape 3 : Déployer sur Railway
Étape 4 : Configurer les variables
Étape 5 : Tester que ça marche
```

**⏱️ Temps total : 10-15 minutes**

---

## 📋 ÉTAPE 0 : VÉRIFIER L'ÉTAT ACTUEL

### **Avez-vous un compte Railway ?**

Allez sur https://railway.app

**Option A :** Vous n'avez PAS de compte
→ Cliquez sur **"Start a New Project"** et connectez-vous avec GitHub

**Option B :** Vous avez déjà un compte mais aucun projet
→ Continuez à l'étape 1

**Option C :** Vous avez des projets mais pas de backend
→ Continuez à l'étape 1

---

## 🐙 ÉTAPE 1 : PUSHER SUR GITHUB (SI PAS FAIT)

### **Vérifier si votre code est sur GitHub**

Dans votre terminal :

```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"
git remote -v
```

**Résultat attendu :**
```
origin  https://github.com/VOTRE-USERNAME/ghost-remix-pack.git (fetch)
origin  https://github.com/VOTRE-USERNAME/ghost-remix-pack.git (push)
```

### **Si vous n'avez PAS de remote GitHub :**

#### **1.1 - Créer un repository sur GitHub**

1. Allez sur https://github.com
2. Cliquez sur **"+"** en haut à droite → **"New repository"**
3. Nom : `ghost-remix-pack`
4. **Public** ou **Private** (votre choix)
5. **NE PAS** cocher "Add a README"
6. Cliquez sur **"Create repository"**

#### **1.2 - Connecter votre projet local**

GitHub vous donnera des commandes. Dans votre terminal :

```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"

# Vérifier que .gitignore est bon (important!)
cat backend/.gitignore

# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE-USERNAME/ghost-remix-pack.git

# Vérifier la branche
git branch -M main

# Pusher
git push -u origin main
```

**⚠️ IMPORTANT :** Assurez-vous que `backend/.env` et `backend/serviceAccountKey.json` sont dans `.gitignore` !

### **Si GitHub demande un token :**

Utilisez un Personal Access Token :
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → cochez "repo"
3. Copiez le token
4. Utilisez-le comme mot de passe

---

## 🚂 ÉTAPE 2 : DÉPLOYER SUR RAILWAY

### **2.1 - Aller sur Railway**

Ouvrez https://railway.app/dashboard

### **2.2 - Créer un nouveau projet**

1. Cliquez sur **"New Project"**
2. Sélectionnez **"Deploy from GitHub repo"**

### **2.3 - Autoriser GitHub (si première fois)**

Si Railway demande l'accès à GitHub :
1. Cliquez sur **"Configure GitHub App"**
2. Sélectionnez votre compte ou organisation
3. Choisissez **"All repositories"** ou sélectionnez `ghost-remix-pack`
4. Cliquez sur **"Install & Authorize"**

### **2.4 - Sélectionner le repository**

1. Dans la liste, trouvez **`ghost-remix-pack`**
2. Cliquez dessus

### **2.5 - Configurer le déploiement**

Railway va détecter automatiquement le projet Node.js.

**Si Railway demande un "Start Command" :**
```
cd backend && npm start
```

**Si Railway demande un "Build Command" :**
```
cd backend && npm install
```

**Si Railway propose plusieurs services :**
- Sélectionnez uniquement le **backend** (pas le frontend)

### **2.6 - Attendre le déploiement**

Railway va :
1. ✅ Cloner le repository
2. ✅ Détecter Node.js
3. ✅ Installer les dépendances (`npm install`)
4. ✅ Démarrer le serveur

**⏱️ Temps : 2-3 minutes**

Vous verrez des logs en temps réel. Attendez le message :
```
✅ Build successful
✅ Deploy successful
```

---

## ⚙️ ÉTAPE 3 : CONFIGURER LES VARIABLES

### **3.1 - Ouvrir les variables**

1. Cliquez sur votre projet (qui vient d'être déployé)
2. Cliquez sur l'onglet **"Variables"**

### **3.2 - Ajouter les variables une par une**

Cliquez sur **"+ New Variable"** pour chaque variable :

#### **Variable 1 : Clé Stripe (TEST pour commencer)**

```bash
Name: STRIPE_SECRET_KEY
Value: sk_test_VOTRE_CLE_TEST_ICI
```

#### **Variable 2 : Frontend URL**

```bash
Name: FRONTEND_URL
Value: http://localhost:5173
```

**⚠️ On mettra l'URL de production plus tard**

#### **Variable 3 : Port**

```bash
Name: PORT
Value: 3001
```

#### **Variable 4 : Environment**

```bash
Name: NODE_ENV
Value: production
```

### **3.3 - Sauvegarder**

Railway redémarre automatiquement après chaque ajout de variable.

---

## 🌐 ÉTAPE 4 : OBTENIR L'URL

### **4.1 - Générer un domaine Railway**

1. Dans votre projet, cliquez sur **"Settings"**
2. Allez dans la section **"Domains"**
3. Cliquez sur **"Generate Domain"**

Railway vous donnera une URL comme :
```
https://ghost-remix-backend-production-xxxx.up.railway.app
```

**Copiez cette URL !**

### **4.2 - Tester l'API**

Ouvrez cette URL dans votre navigateur en ajoutant `/api/health` :
```
https://ghost-remix-backend-production-xxxx.up.railway.app/api/health
```

**✅ Résultat attendu :**
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running",
  "timestamp": "2025-10-15T..."
}
```

**❌ Si vous voyez une erreur :**
1. Cliquez sur **"Deployments"** dans Railway
2. Cliquez sur le dernier déploiement
3. Regardez les **logs** pour voir l'erreur

---

## 🔗 ÉTAPE 5 : CONNECTER AU FRONTEND

### **5.1 - Si vous testez en local**

Dans votre terminal :

```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"

# Créer/éditer le fichier .env à la racine (pas dans backend!)
echo "VITE_BACKEND_URL=https://ghost-remix-backend-production-xxxx.up.railway.app" > .env

# Redémarrer le frontend
./start-all.sh
```

### **5.2 - Si le frontend est déjà sur Vercel**

1. Allez sur https://vercel.com/dashboard
2. Cliquez sur votre projet frontend
3. **Settings** → **Environment Variables**
4. Ajoutez ou modifiez :
   ```
   Name: VITE_BACKEND_URL
   Value: https://ghost-remix-backend-production-xxxx.up.railway.app
   ```
5. Redéployez le frontend

---

## ✅ VÉRIFICATION COMPLÈTE

### **Test 1 : Backend seul**

```
https://votre-backend.railway.app/api/health
```
✅ Doit retourner `{ "status": "OK" }`

### **Test 2 : Frontend + Backend**

1. Ouvrez votre site (local ou Vercel)
2. Ajoutez un produit au panier
3. Ouvrez la console du navigateur (F12)
4. Regardez l'onglet **Network**
5. Procédez au checkout

✅ Les requêtes vers l'API Railway doivent réussir (statut 200)

### **Test 3 : Paiement complet**

1. Procédez à un checkout
2. Utilisez la carte de test : `4242 4242 4242 4242`
3. Validez le paiement

✅ Vous êtes redirigé vers `/success`

---

## 🎯 RÉCAPITULATIF

### **Ce qui a été fait :**

```
✅ Code pushé sur GitHub
✅ Backend déployé sur Railway
✅ Variables d'environnement configurées
✅ URL Railway obtenue
✅ API testée et fonctionnelle
✅ Frontend connecté au backend
```

### **Votre infrastructure :**

```
┌─────────────────────────────────────────┐
│                                         │
│  GitHub                                 │
│  └── ghost-remix-pack                   │
│      ├── src/ (frontend)                │
│      └── backend/ (backend)             │
│                                         │
│  ↓ déployé vers                         │
│                                         │
│  Railway                                │
│  └── Backend API                        │
│      URL: https://xxx.railway.app       │
│                                         │
│  Vercel (ou local)                      │
│  └── Frontend                           │
│      Appelle → Railway API              │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔄 MAINTENANT : RETOUR À STRIPE

Maintenant que votre backend est sur Railway, vous pouvez :

1. **Retourner au guide Stripe :**
   → Ouvrez `CONFIGURER-STRIPE-PRODUCTION.md`

2. **Vous êtes à l'étape 2.2** du guide
   → "Sélectionner votre projet backend"

3. **Votre projet s'appelle probablement :**
   - `ghost-remix-pack` (le nom de votre repo)
   - Ou Railway lui a donné un nom automatique

4. **Continuez le guide depuis là !**

---

## 🐛 PROBLÈMES COURANTS

### **"Repository not found"**

**Solution :**
- Vérifiez que le repository est bien public ou que Railway a accès
- Dans GitHub → Settings → Applications → Railway → Configure
- Donnez accès au repository

---

### **"Build failed"**

**Causes possibles :**
1. Le `railway.json` n'est pas correct
2. Les dépendances npm ont des erreurs

**Solution :**
1. Regardez les logs dans Railway
2. Vérifiez que `backend/package.json` est correct
3. Vérifiez que `railway.json` pointe bien vers `backend/`

---

### **"Application error" ou 500**

**Cause :** Une variable d'environnement manque ou le backend crash

**Solution :**
1. Allez dans Railway → Deployments → Logs
2. Cherchez l'erreur
3. Vérifiez que toutes les variables sont configurées
4. Si `FIREBASE_PROJECT_ID` manque, ajoutez-le (même temporaire)

---

### **CORS error dans le frontend**

**Cause :** La variable `FRONTEND_URL` dans Railway n'est pas correcte

**Solution :**
1. Dans Railway → Variables
2. Vérifiez `FRONTEND_URL`
3. Elle doit correspondre à l'URL de votre frontend :
   - Local : `http://localhost:5173`
   - Vercel : `https://votre-site.vercel.app`

---

## 📚 RESSOURCES

| Guide | Quand l'utiliser |
|-------|------------------|
| `DEPLOYER-RAILWAY-RAPIDE.md` | Ce guide (déploiement) |
| `CONFIGURER-STRIPE-PRODUCTION.md` | Après le déploiement |
| `RAILWAY-ETAPES-SIMPLES.md` | Alternative détaillée |
| `CHECKING-COMPLET-ET-TUTORIEL.md` | Guide complet (section déploiement) |

---

## ✅ CHECKLIST

- [ ] Compte Railway créé
- [ ] Code pushé sur GitHub
- [ ] Repository connecté à Railway
- [ ] Backend déployé avec succès
- [ ] Variables d'environnement ajoutées
- [ ] URL Railway générée
- [ ] API testée (`/api/health` fonctionne)
- [ ] Frontend connecté au backend
- [ ] Test de paiement réussi

---

## 🎉 BRAVO !

Votre backend est maintenant déployé sur Railway !

**Prochaine étape :**

👉 Retournez à **`CONFIGURER-STRIPE-PRODUCTION.md`** - Étape 2.2

Vous pouvez maintenant configurer Stripe en production car vous avez un projet backend sur Railway !

---

_Créé le 15 octobre 2025_  
_Version 1.0 - Déploiement Railway Express_

