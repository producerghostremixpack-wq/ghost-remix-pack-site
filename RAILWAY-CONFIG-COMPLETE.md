# 🔧 Configuration Railway Complète - Ghost Remix Pack

## ✅ Corrections Appliquées

### 1. 🔴 Problème : Serveur écoute sur 127.0.0.1
**Solution** : Changé vers `0.0.0.0` pour écouter sur toutes les interfaces

**Fichier modifié** : `backend/server.js`
```javascript
// AVANT (ne fonctionne pas sur Railway)
app.listen(PORT, '127.0.0.1', () => { ... });

// APRÈS (fonctionne sur Railway)
app.listen(PORT, '0.0.0.0', () => { ... });
```

### 2. 📋 Configuration Railway

#### Root Directory
```
backend
```

#### Build Command
```
npm install
```

#### Start Command
```
node server.js
```

#### Port
```
3001
```

## 🔑 Variables d'Environnement Requises

### Variables Obligatoires

```bash
# Port (Railway le définit automatiquement, mais on peut le forcer)
PORT=3001

# Environnement
NODE_ENV=production

# Frontend URL
FRONTEND_URL=https://www.ghostremixpack.com

# Stripe (REMPLACER PAR VOS VRAIES CLÉS)
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_SECRETE_ICI
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE_ICI
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_SECRET_WEBHOOK_ICI

# Firebase (REMPLACER PAR VOS VRAIES CREDENTIALS)
FIREBASE_PROJECT_ID=ghost-remix-pack
FIREBASE_CREDENTIALS={"type":"service_account","project_id":"ghost-remix-pack",...}
FIREBASE_DATABASE_URL=https://ghost-remix-pack-default-rtdb.firebase.io
FIREBASE_STORAGE_BUCKET=ghost-remix-pack.appspot.com

# SendGrid (REMPLACER PAR VOTRE VRAIE CLÉ)
SENDGRID_API_KEY=SG.VOTRE_CLE_API_ICI
SENDGRID_FROM_EMAIL=producteurghostremixpack@gmail.com
```

## 📝 Instructions Railway

### 1. Accéder à Railway
👉 https://railway.app

### 2. Sélectionner le Projet
- Cliquez sur "Ghost Remix Pack Site Production"

### 3. Configurer le Root Directory
1. Allez dans **Settings**
2. Trouvez **Root Directory**
3. Définissez : `backend`

### 4. Ajouter les Variables d'Environnement
1. Allez dans **Variables**
2. Cliquez sur **+ New Variable**
3. Ajoutez chaque variable (copiez-collez depuis ci-dessus)

### 5. Vérifier le Deploy
1. Allez dans **Deployments**
2. Vérifiez que le dernier déploiement est **Successful**
3. Si échec, consultez les **Logs**

## 🧪 Tester le Backend

Après configuration, testez :

```bash
curl https://ghost-remix-pack-site-production.up.railway.app/api/health
```

Réponse attendue :
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running",
  "timestamp": "2024-01-XX..."
}
```

## 🔍 Vérification

### Checklist
- [ ] Root Directory = `backend`
- [ ] Toutes les variables d'environnement ajoutées
- [ ] Déploiement réussi
- [ ] Health check répond OK

### Commandes de Test

```bash
# Diagnostic complet
cd railway-diagnostics
npm run diagnose

# Test automatique
npm run test
```

## 🎯 Résultat Attendu

Après ces corrections, le backend devrait :
- ✅ Démarrer correctement sur Railway
- ✅ Répondre aux requêtes HTTP
- ✅ Passer tous les tests de santé
- ✅ Être accessible depuis le frontend

---

**Créé avec ❤️ pour Ghost Remix Pack**

