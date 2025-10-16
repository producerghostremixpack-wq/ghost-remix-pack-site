# ✅ Checklist Déploiement Complet - Ghost Remix Pack

## 🎯 Objectif Final
Avoir votre site Ghost Remix Pack 100% fonctionnel en ligne avec paiements Stripe actifs.

---

## 📋 PHASE 1 : Préparation Locale ✅ FAIT

- [x] Site fonctionne en local (`npm run dev`)
- [x] Backend fonctionne en local
- [x] Panier fonctionne
- [x] Aucune erreur TypeScript
- [x] Build réussi (`npm run build`)

---

## 🚀 PHASE 2 : Déploiement Frontend

### Vercel

- [ ] **Connexion à Vercel**
  ```bash
  vercel login
  ```

- [ ] **Premier déploiement**
  ```bash
  vercel
  ```

- [ ] **Déploiement production**
  ```bash
  vercel --prod
  ```

- [ ] **URL obtenue** : `https://ghost-remix-pack-_____.vercel.app`

- [ ] **Site accessible** et toutes les pages fonctionnent

### Fichiers créés automatiquement
- [x] `vercel.json` - Configuration Vercel
- [x] `.vercelignore` - Fichiers à ignorer

---

## 🖥️ PHASE 3 : Déploiement Backend

### Railway.app

- [ ] **Compte créé** : https://railway.app/

- [ ] **Nouveau projet** → Deploy from GitHub

- [ ] **Root Directory** configuré : `backend`

- [ ] **Variables d'environnement** ajoutées (voir liste complète ci-dessous)

- [ ] **Déploiement réussi**

- [ ] **URL backend obtenue** : `https://______.up.railway.app`

- [ ] **Health check OK** : 
  ```bash
  curl https://votre-backend.up.railway.app/api/health
  ```

### Fichier créé
- [x] `railway.json` - Configuration Railway

---

## 🔗 PHASE 4 : Connexion Frontend ↔ Backend

- [ ] **Variable dans Vercel** :
  - Dashboard Vercel > Settings > Environment Variables
  - `VITE_BACKEND_URL` = `https://votre-backend.up.railway.app`

- [ ] **Redéploiement frontend** :
  ```bash
  vercel --prod
  ```

- [ ] **Test connexion** :
  - Ouvrir la console du navigateur
  - Aller au checkout
  - Vérifier qu'il n'y a pas d'erreur CORS

---

## 🔐 PHASE 5 : Configuration Services

### Firebase

- [ ] **Projet créé** : https://console.firebase.google.com

- [ ] **Storage activé**

- [ ] **Service account créé**

- [ ] **Credentials ajoutés dans Railway** :
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_PRIVATE_KEY` (avec `\n`)
  - `FIREBASE_CLIENT_EMAIL`

- [ ] **Structure créée** :
  ```
  /packs/
    /house/
    /afro/
    /rap/
  ```

- [ ] **Fichiers audio uploadés**

### SendGrid

- [ ] **Compte créé** : https://sendgrid.com/

- [ ] **API Key créée**

- [ ] **Sender vérifié**

- [ ] **Credentials dans Railway** :
  - `SENDGRID_API_KEY`
  - `SENDGRID_FROM_EMAIL`

### Stripe

- [ ] **Mode test vérifié** : Clés test dans Railway

- [ ] **Webhook créé** :
  - URL : `https://votre-backend.up.railway.app/api/webhook`
  - Event : `checkout.session.completed`

- [ ] **Webhook secret dans Railway** :
  - `STRIPE_WEBHOOK_SECRET`

- [ ] **Webhook activé dans `server.js`** (décommenter la ligne)

---

## 📝 VARIABLES D'ENVIRONNEMENT COMPLÈTES

### Vercel (Frontend)
```env
VITE_BACKEND_URL=https://votre-backend.up.railway.app
```

### Railway (Backend)
```env
# Stripe
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI...
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI...

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

## 🧪 PHASE 6 : Tests Complets

### Test 1 : Navigation
- [ ] Page d'accueil charge
- [ ] Menu fonctionne
- [ ] Toutes les routes accessibles

### Test 2 : Panier
- [ ] Ajouter un produit au panier
- [ ] Panier latéral s'ouvre
- [ ] Quantité modifiable
- [ ] Suppression fonctionne
- [ ] Panier persiste après refresh

### Test 3 : Checkout
- [ ] Page checkout accessible
- [ ] Formulaire s'affiche
- [ ] Récapitulatif correct

### Test 4 : Paiement (Stripe Test)
- [ ] Redirection vers Stripe
- [ ] Paiement avec carte test : `4242 4242 4242 4242`
- [ ] Redirection vers page success
- [ ] Email reçu

### Test 5 : Backend
- [ ] Health check répond
- [ ] Pas d'erreurs dans Railway logs
- [ ] Webhook Stripe déclenché

### Test 6 : Téléchargement
- [ ] Lien de téléchargement dans email
- [ ] Fichier téléchargeable
- [ ] Firebase Storage logs OK

---

## 📱 PHASE 7 : Responsive & Optimisation

- [ ] **Mobile** : Site fonctionne sur smartphone
- [ ] **Tablet** : Site fonctionne sur tablette
- [ ] **Desktop** : Site fonctionne sur ordinateur

- [ ] **Performance** :
  - Lighthouse score > 80
  - Images optimisées
  - Temps de chargement < 3s

- [ ] **SEO** :
  - Meta tags présents
  - Open Graph configuré
  - Sitemap généré

---

## 🌐 PHASE 8 : Domaine Personnalisé (Optionnel)

- [ ] **Domaine acheté** : `votredomaine.com`

- [ ] **DNS configuré** :
  ```
  Type: CNAME
  Name: @
  Value: cname.vercel-dns.com
  ```

- [ ] **Domaine ajouté dans Vercel** :
  - Settings > Domains
  - Ajouter `votredomaine.com`

- [ ] **SSL activé** (automatique avec Vercel)

- [ ] **FRONTEND_URL mise à jour** dans Railway

---

## 📊 PHASE 9 : Monitoring & Analytics

- [ ] **Vercel Analytics activé**

- [ ] **Google Analytics** :
  - Property créée
  - Tag ajouté dans `index.html`

- [ ] **Sentry** (erreurs) :
  - Projet créé
  - SDK installé

- [ ] **LogRocket** (session replay) (optionnel)

---

## 📄 PHASE 10 : Légal

- [ ] **Mentions légales** à jour
- [ ] **CGV** complètes
- [ ] **Politique de confidentialité** RGPD
- [ ] **Cookies** : Bannière ajoutée si nécessaire

---

## 🚀 PHASE 11 : Passage en Production (Stripe Live)

⚠️ **À faire uniquement quand tout fonctionne en test**

- [ ] **Compte Stripe vérifié** :
  - Identité
  - Compte bancaire

- [ ] **Clés Live obtenues** :
  - `pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI...`
  - `sk_live_VOTRE_CLE_LIVE_ICI...`

- [ ] **Produits créés en Live**

- [ ] **Webhook Live configuré**

- [ ] **Variables mises à jour** :
  - Vercel : `VITE_STRIPE_PUBLIC_KEY` (live)
  - Railway : `STRIPE_SECRET_KEY` (live)
  - Railway : `STRIPE_WEBHOOK_SECRET` (live)

- [ ] **Test achat réel** avec vraie carte

---

## 🎉 DÉPLOIEMENT COMPLET !

### URLs Finales
- ✅ Frontend : `https://votredomaine.com`
- ✅ Backend : `https://ghost-remix-backend.up.railway.app`
- ✅ Dashboard Vercel : https://vercel.com/dashboard
- ✅ Dashboard Railway : https://railway.app/dashboard
- ✅ Dashboard Stripe : https://dashboard.stripe.com

### Prochaines Étapes
1. 📣 Marketing & Communication
2. 📧 Newsletter & Email campaigns
3. 📊 Analyse des ventes
4. 🔄 Mises à jour et nouvelles features

---

## 📞 Support & Documentation

Tous les guides sont dans :
- `TUTO-VERCEL-DEPLOIEMENT.md`
- `DEPLOIEMENT-BACKEND-RAILWAY.md`
- `DEPLOYER-MAINTENANT.md`
- `LANCER-DEPLOIEMENT.md`
- `RESTE-A-FAIRE-MISE-EN-LIGNE.md`

---

## 💡 Temps Estimé Total

- ⏱️ Frontend (Vercel) : **5-10 minutes**
- ⏱️ Backend (Railway) : **15-30 minutes**
- ⏱️ Configuration services : **30-60 minutes**
- ⏱️ Tests : **15-30 minutes**
- ⏱️ Optimisations : **1-2 heures**

**Total : 2-4 heures** pour un déploiement complet ! 🚀
