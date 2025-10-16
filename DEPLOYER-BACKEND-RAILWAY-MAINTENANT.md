# 🚂 Déployer le Backend sur Railway - Guide Complet

**Date :** 16 octobre 2025  
**Statut :** Frontend déployé ✅ | Backend à déployer ⏳

---

## 🎯 OBJECTIF

Déployer le backend Express.js sur Railway pour gérer :
- ✅ Paiements Stripe
- ✅ Sauvegarde des commandes (Firebase)
- ✅ Envoi d'emails (SendGrid)
- ✅ Webhooks Stripe

---

## 📋 PRÉREQUIS

- ✅ Compte GitHub créé
- ✅ Dépôt GitHub : https://github.com/producerghostremixpack-wq/ghost-remix-pack-site
- ✅ Compte Stripe (test ou production)
- ✅ Projet Firebase créé
- ✅ Compte SendGrid créé

---

## 🚀 ÉTAPE 1 : Créer un compte Railway

### 1.1 Aller sur Railway
🔗 **https://railway.app/**

### 1.2 Se connecter avec GitHub
- Cliquer sur **"Login"**
- Choisir **"Login with GitHub"**
- Autoriser Railway à accéder à vos dépôts GitHub

---

## 🚀 ÉTAPE 2 : Créer un nouveau projet

### 2.1 Nouveau projet
- Cliquer sur **"New Project"**
- Sélectionner **"Deploy from GitHub repo"**

### 2.2 Sélectionner le dépôt
- Chercher : `ghost-remix-pack-site`
- Cliquer sur **"Deploy"**

⚠️ **IMPORTANT :** Railway va déployer le dossier racine. Il faut configurer le **root directory** pour pointer vers `/backend`.

---

## 🚀 ÉTAPE 3 : Configurer le dossier racine

### 3.1 Ouvrir les paramètres du service
- Une fois le déploiement démarré, cliquer sur le service
- Aller dans l'onglet **"Settings"**

### 3.2 Configurer le Root Directory
- Scroller jusqu'à **"Source"**
- **Root Directory** : `/backend`
- Cliquer sur **"Update"**

### 3.3 Redéployer
- Railway va automatiquement redéployer avec la bonne configuration

---

## 🚀 ÉTAPE 4 : Configurer les variables d'environnement

### 4.1 Accéder aux variables
- Dans le service, aller dans l'onglet **"Variables"**

### 4.2 Ajouter les variables suivantes

#### 🔑 Variables Stripe

```bash
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_SECRETE
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET
```

**Où trouver ces valeurs :**
- Dashboard Stripe → Developers → API keys
- Dashboard Stripe → Developers → Webhooks → Ajouter endpoint

#### 🔑 Variables Firebase

```bash
FIREBASE_PROJECT_ID=votre-project-id
```

**Où trouver :**
- Console Firebase → Paramètres du projet → ID du projet

#### 📧 Variables SendGrid

```bash
SENDGRID_API_KEY=SG.VOTRE_CLE_API
SENDGRID_FROM_EMAIL=votre-email@example.com
```

**Où trouver :**
- Dashboard SendGrid → Settings → API Keys → Create API Key

#### 🚂 Variables Railway (optionnelles)

```bash
PORT=3001
NODE_ENV=production
```

---

## 🚀 ÉTAPE 5 : Ajouter les credentials Firebase

### 5.1 Télécharger le fichier JSON
- Console Firebase → Paramètres du projet → Comptes de service
- Générer une nouvelle clé privée
- Télécharger le fichier JSON

### 5.2 Ajouter sur Railway
- Dans l'onglet **"Variables"** de Railway
- Cliquer sur **"New Variable"**
- Nom : `FIREBASE_CREDENTIALS`
- Valeur : Coller tout le contenu du fichier JSON

**Format :**
```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "...",
  ...
}
```

---

## 🚀 ÉTAPE 6 : Configurer le domaine Railway

### 6.1 Générer un domaine
- Dans le service, aller dans l'onglet **"Settings"**
- Scroller jusqu'à **"Networking"**
- Cliquer sur **"Generate Domain"**
- Railway va générer : `ghost-remix-pack-backend.up.railway.app`

### 6.2 Notez l'URL
📝 **URL Backend :** `https://ghost-remix-pack-backend.up.railway.app`

---

## 🚀 ÉTAPE 7 : Configurer le webhook Stripe

### 7.1 Aller sur Stripe
- Dashboard Stripe → Developers → Webhooks
- Cliquer sur **"Add endpoint"**

### 7.2 Configurer l'endpoint
- **Endpoint URL** : `https://ghost-remix-pack-backend.up.railway.app/api/webhook`
- **Events to send** : Sélectionner :
  - ✅ `checkout.session.completed`
  - ✅ `payment_intent.succeeded`
  - ✅ `payment_intent.payment_failed`

### 7.3 Copier le webhook secret
- Une fois créé, cliquer sur le webhook
- Copier le **Signing secret** (commence par `whsec_`)
- Ajouter dans Railway : `STRIPE_WEBHOOK_SECRET=whsec_...`

---

## 🚀 ÉTAPE 8 : Mettre à jour le frontend

### 8.1 Ajouter l'URL backend dans Vercel

Aller sur Vercel Dashboard :
- Projet `ghost-remix-pack` → Settings → Environment Variables
- Ajouter :
  ```
  VITE_BACKEND_URL=https://ghost-remix-pack-backend.up.railway.app
  ```

### 8.2 Redéployer le frontend
- Vercel va automatiquement redéployer avec la nouvelle variable

---

## ✅ VÉRIFICATION

### 1. Tester l'API
```bash
curl https://ghost-remix-pack-backend.up.railway.app/api/health
```

Réponse attendue :
```json
{
  "status": "ok",
  "timestamp": "..."
}
```

### 2. Tester un paiement
- Aller sur https://www.ghostremixpack.com
- Ajouter un produit au panier
- Procéder au checkout
- Utiliser la carte de test Stripe : `4242 4242 4242 4242`

### 3. Vérifier Firebase
- Console Firebase → Firestore
- Vérifier qu'une collection `orders` a été créée
- Vérifier qu'une commande a été enregistrée

### 4. Vérifier l'email
- Vérifier votre boîte email
- Vous devriez recevoir un email de confirmation

---

## 🆘 DÉPANNAGE

### ❌ Build échoue
- Vérifier que le Root Directory est bien `/backend`
- Vérifier que toutes les variables d'environnement sont présentes
- Vérifier les logs dans Railway → Deployments

### ❌ API ne répond pas
- Vérifier que le service est bien déployé (statut "Active")
- Vérifier l'URL du domaine généré
- Vérifier les variables d'environnement

### ❌ Erreur Firebase
- Vérifier que `FIREBASE_CREDENTIALS` est bien au format JSON complet
- Vérifier que le `FIREBASE_PROJECT_ID` est correct
- Vérifier les permissions du service account Firebase

### ❌ Erreur Stripe
- Vérifier que les clés API Stripe sont correctes
- Vérifier que le webhook secret est bien configuré
- Vérifier les logs Stripe dans le Dashboard

### ❌ Email non envoyé
- Vérifier que `SENDGRID_API_KEY` est correcte
- Vérifier que `SENDGRID_FROM_EMAIL` est vérifiée dans SendGrid
- Vérifier les logs SendGrid dans le Dashboard

---

## 📊 CHECKLIST FINALE

- [ ] Compte Railway créé
- [ ] Projet créé depuis GitHub
- [ ] Root Directory configuré : `/backend`
- [ ] Variables Stripe ajoutées
- [ ] Variables Firebase ajoutées
- [ ] Variables SendGrid ajoutées
- [ ] Firebase credentials JSON ajouté
- [ ] Domaine Railway généré
- [ ] Webhook Stripe configuré
- [ ] URL backend ajoutée au frontend (Vercel)
- [ ] Frontend redéployé
- [ ] Test de l'API réussi
- [ ] Test de paiement réussi
- [ ] Email de confirmation reçu
- [ ] Commande enregistrée dans Firebase

---

## 🎉 RÉSULTAT FINAL

Une fois tout configuré, vous aurez :

✅ **Frontend** : https://www.ghostremixpack.com  
✅ **Backend** : https://ghost-remix-pack-backend.up.railway.app  
✅ **Paiements** : Stripe Checkout fonctionnel  
✅ **Emails** : SendGrid configuré  
✅ **Database** : Firebase Firestore actif  

---

## 📞 SUPPORT

- **Railway Dashboard** : https://railway.app/dashboard
- **Railway Docs** : https://docs.railway.app
- **Stripe Dashboard** : https://dashboard.stripe.com
- **Firebase Console** : https://console.firebase.google.com
- **SendGrid Dashboard** : https://app.sendgrid.com

---

**Prochaine étape après le déploiement :** Tester le parcours complet de commande ! 🎯

