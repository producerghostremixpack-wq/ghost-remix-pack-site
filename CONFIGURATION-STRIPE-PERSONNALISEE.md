# 🔧 Configuration Automatique - Votre Compte Stripe

## ✅ Compte Stripe Détecté !

**Compte ID :** `acct_1SHjdhH8jTnKrV0h`  
**Dashboard :** https://dashboard.stripe.com/test/dashboard

---

## 🚀 ÉTAPES RAPIDES (10 minutes)

### ✅ Fichier `.env` Créé !

Le fichier `backend/.env` a été créé avec votre ID de compte Stripe.

Il ne reste que **3 clés API à copier** !

---

## 📋 ÉTAPE 1 : Récupérer les Clés API (3 min)

### 🔑 Clés API Stripe

**1. Ouvrez ce lien :**  
👉 **https://dashboard.stripe.com/test/apikeys**

**2. Vous verrez 2 clés :**

#### a) **Clé publiable (Publishable key)**
- Format : `pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI...`
- Cliquez sur l'icône "œil" pour révéler
- Copiez la clé

#### b) **Clé secrète (Secret key)**
- Format : `sk_test_VOTRE_CLE_TEST_ICI...`
- Cliquez sur "Reveal test key"
- **⚠️ IMPORTANT :** Ne la partagez JAMAIS !
- Copiez la clé

**3. Ouvrez le fichier :** `backend/.env`

**4. Remplacez :**
```env
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI
```
Par :
```env
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI... (votre vraie clé)
```

Et :
```env
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI
```
Par :
```env
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI... (votre vraie clé)
```

---

## 📋 ÉTAPE 2 : Créer le Webhook (5 min)

### 🔔 Webhook pour Recevoir les Confirmations de Paiement

**1. Ouvrez ce lien :**  
👉 **https://dashboard.stripe.com/test/webhooks**

**2. Cliquez sur :** `+ Ajouter un point de terminaison` / `+ Add endpoint`

**3. Remplissez :**

**URL du point de terminaison :**
```
http://localhost:3001/api/webhook
```

**Description (optionnel) :**
```
Ghost Remix Pack - Confirmations de commande
```

**4. Cliquez sur :** `Sélectionner des événements` / `Select events`

**5. Cherchez et cochez :**
- ✅ `checkout.session.completed`

**6. Cliquez sur :** `Ajouter des événements` / `Add events`

**7. Cliquez sur :** `Ajouter un point de terminaison` / `Add endpoint`

**8. Vous verrez apparaître :** `Secret de signature` / `Signing secret`

Format : `whsec_VOTRE_WEBHOOK_SECRET_ICI...`

**9. Cliquez sur :** `Cliquer pour révéler` / `Click to reveal`

**10. Copiez ce secret**

**11. Ouvrez :** `backend/.env`

**12. Remplacez :**
```env
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI
```
Par :
```env
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI... (votre secret)
```

---

## 📋 ÉTAPE 3 : Configuration Frontend (2 min)

### Ajouter la Clé Publique Stripe au Frontend

**1. Créez le fichier :** `src/config/stripe.ts`

```typescript
// Configuration Stripe
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI...'; // Votre clé publique
export const BACKEND_API_URL = 'http://localhost:3001';
```

**2. Remplacez dans :** `src/components/Checkout.tsx`

Ligne 25, remplacez :
```typescript
const response = await fetch('http://localhost:3001/api/checkout/create-session', {
```

Par :
```typescript
import { BACKEND_API_URL } from '@/config/stripe';

const response = await fetch(`${BACKEND_API_URL}/api/checkout/create-session`, {
```

---

## 📋 ÉTAPE 4 (Optionnel) : Firebase & SendGrid

### Si vous voulez la sauvegarde des commandes et les emails :

#### Firebase (5 min)
1. **Créez un projet :** https://console.firebase.google.com
2. **Activez Firestore Database**
3. **Téléchargez `serviceAccountKey.json`**
4. **Placez-le dans :** `/backend/`
5. **Mettez à jour :** `FIREBASE_PROJECT_ID` dans `.env`

#### SendGrid (5 min)
1. **Créez un compte :** https://signup.sendgrid.com
2. **Créez une API Key :** https://app.sendgrid.com/settings/api_keys
3. **Mettez à jour :** `SENDGRID_API_KEY` dans `.env`
4. **Vérifiez votre email expéditeur**

---

## ✅ VÉRIFICATION

### Fichier `backend/.env` Final

```env
# STRIPE (Complété ✅)
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI...
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI...
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI...
STRIPE_ACCOUNT_ID=acct_1SHjdhH8jTnKrV0h

# FIREBASE (Optionnel)
FIREBASE_PROJECT_ID=ghost-remix-pack

# SENDGRID (Optionnel)
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=contact@ghostremixpack.com

# SERVEUR
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
SUCCESS_URL=http://localhost:5173/success
CANCEL_URL=http://localhost:5173/cart
```

---

## 🚀 DÉMARRER LES SERVEURS

### Terminal 1 - Backend
```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack/backend"
npm install
npm run dev
```

**Vous devriez voir :**
```
✅ Serveur démarré sur port 3001
🔒 Stripe: Configuré ✅
```

### Terminal 2 - Frontend
```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"
npm run dev
```

---

## 🧪 TESTER AVEC VOTRE COMPTE STRIPE

### Carte de Test Stripe

Utilisez cette carte pour tester :

**Numéro :** `4242 4242 4242 4242`  
**Date :** N'importe quelle date future (ex: 12/25)  
**CVC :** N'importe quel 3 chiffres (ex: 123)  
**Code postal :** N'importe lequel

### Parcours de Test

1. **Ouvrez :** http://localhost:5173
2. **Ajoutez un pack au panier**
3. **Cliquez sur "Commander"**
4. **Remplissez le formulaire**
5. **Validez** → Redirection vers Stripe
6. **Entrez la carte 4242...**
7. **Validez** → Page de succès ✅

### Vérifier dans Stripe Dashboard

**Allez sur :** https://dashboard.stripe.com/test/payments

Vous verrez :
- ✅ Paiement test réussi
- 💰 Montant
- 📧 Email client
- 📋 Métadonnées de la commande

---

## 📊 Dashboard Stripe - Liens Utiles

| Section | Lien Direct |
|---------|-------------|
| **Dashboard Principal** | https://dashboard.stripe.com/test/dashboard |
| **Paiements** | https://dashboard.stripe.com/test/payments |
| **Clients** | https://dashboard.stripe.com/test/customers |
| **Clés API** | https://dashboard.stripe.com/test/apikeys |
| **Webhooks** | https://dashboard.stripe.com/test/webhooks |
| **Journaux** | https://dashboard.stripe.com/test/logs |

---

## 🎯 RÉCAPITULATIF

### Ce qui est déjà fait ✅
- [x] Compte Stripe actif
- [x] Fichier `.env` créé avec votre ID
- [x] Backend configuré pour votre compte
- [x] Code prêt à l'emploi

### Ce qu'il vous reste à faire (10 min)
- [ ] Copier 2 clés API (3 min)
- [ ] Créer webhook (5 min)
- [ ] Démarrer les serveurs (2 min)
- [ ] Tester avec carte 4242... ✅

---

## 💡 AVANTAGES DE VOTRE CONFIGURATION

✅ **Compte Stripe déjà créé** - Gain de temps !  
✅ **Mode test activé** - Testez sans risque  
✅ **Dashboard accessible** - Suivez vos paiements  
✅ **Configuration automatique** - Minimum d'effort  

---

## 🆘 PROBLÈMES COURANTS

### "Clé API invalide"
- Vérifiez que vous utilisez les clés **TEST** (commencent par `sk_test_VOTRE_CLE_TEST_ICI` et `pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI`)
- Pas les clés LIVE (`sk_live_VOTRE_CLE_LIVE_ICI` et `pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI`)

### "Webhook signature failed"
- Vérifiez que le secret webhook commence par `whsec_VOTRE_WEBHOOK_SECRET_ICI`
- Vérifiez que l'URL du webhook est exactement : `http://localhost:3001/api/webhook`
- Vérifiez que le backend tourne sur le port 3001

### "Cannot connect to backend"
- Vérifiez que le backend est démarré : `cd backend && npm run dev`
- Vérifiez dans la console : `http://localhost:3001/api/health`

---

## 🌐 PASSER EN PRODUCTION

### Quand vous serez prêt :

1. **Activer votre compte Stripe** (remplir infos entreprise)
2. **Remplacer clés TEST par clés LIVE**
3. **Créer nouveau webhook en production**
   - URL : `https://votre-domaine.com/api/webhook`
4. **Déployer backend** (Railway, Heroku)
5. **Déployer frontend** (Vercel)

---

## 🎉 FÉLICITATIONS !

**Votre compte Stripe est prêt à être intégré !**

**Temps estimé total : 10 minutes** ⏱️

**Suivez les 3 étapes ci-dessus et vous pourrez accepter des paiements ! 💳✨**

---

## 📞 Liens de Support

- **Documentation Stripe :** https://stripe.com/docs
- **Support Stripe :** https://support.stripe.com
- **Testing Stripe :** https://stripe.com/docs/testing

---

**Besoin d'aide ? Dites-moi si vous êtes bloqué quelque part ! 😊**







