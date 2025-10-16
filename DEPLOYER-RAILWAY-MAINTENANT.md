# 🚂 Déployer sur Railway - Guide Complet Maintenant

**Date :** 16 octobre 2025  
**Statut :** Toutes les configurations terminées ✅

---

## 🎉 RÉCAPITULATIF

### ✅ Ce qui est configuré
- ✅ Frontend déployé sur Vercel : https://www.ghostremixpack.com
- ✅ Stripe : Clés API récupérées
- ✅ Firebase : Projet + Credentials JSON
- ✅ SendGrid : API Key créée

### 🎯 Objectif
Déployer le backend sur Railway et connecter tous les services.

---

## 🚀 ÉTAPE 1 : Créer un compte Railway

### 1.1 Aller sur Railway
🔗 **https://railway.app/**

### 1.2 Se connecter
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

## 🚀 ÉTAPE 4 : Ajouter les variables d'environnement

### 4.1 Accéder aux variables
- Dans le service, aller dans l'onglet **"Variables"**

### 4.2 Ajouter les variables suivantes UNE PAR UNE

#### 🔑 Variables Stripe
```
Name: STRIPE_SECRET_KEY
Value: sk_test_VOTRE_CLE_ICI
```

```
Name: STRIPE_PUBLISHABLE_KEY
Value: pk_test_VOTRE_CLE_ICI
```

#### 🔥 Variables Firebase
```
Name: FIREBASE_PROJECT_ID
Value: ghost-remix-pack
```

```
Name: FIREBASE_CREDENTIALS
Value: {tout le contenu du fichier JSON}
```
⚠️ **COLLER TOUT LE CONTENU DU FICHIER JSON !**

#### 📧 Variables SendGrid
```
Name: SENDGRID_API_KEY
Value: SG.VOTRE_CLE_ICI
```

```
Name: SENDGRID_FROM_EMAIL
Value: votre-email@example.com
```

#### 🌐 Variables Railway
```
Name: PORT
Value: 3001
```

```
Name: NODE_ENV
Value: production
```

```
Name: FRONTEND_URL
Value: https://www.ghostremixpack.com
```

---

## 🚀 ÉTAPE 5 : Générer le domaine Railway

### 5.1 Accéder aux paramètres
- Dans le service, aller dans l'onglet **"Settings"**
- Scroller jusqu'à **"Networking"**

### 5.2 Générer un domaine
- Cliquer sur **"Generate Domain"**
- Railway va générer : `ghost-remix-pack-backend.up.railway.app`

### 5.3 Noter l'URL
📝 **URL Backend :** `https://ghost-remix-pack-backend.up.railway.app`

---

## 🚀 ÉTAPE 6 : Configurer le webhook Stripe

### 6.1 Aller sur Stripe
- Dashboard Stripe → Developers → Webhooks
- Cliquer sur **"Add endpoint"**

### 6.2 Configurer l'endpoint
- **Endpoint URL** : `https://ghost-remix-pack-backend.up.railway.app/api/webhook`
  (Utiliser l'URL générée par Railway)

### 6.3 Sélectionner les événements
Cocher :
- ✅ `checkout.session.completed`
- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.payment_failed`

### 6.4 Créer le webhook
- Cliquer sur **"Add endpoint"**
- Copier le **Signing secret** (commence par `whsec_`)

### 6.5 Ajouter le secret sur Railway
- Retourner sur Railway → Variables
- Ajouter :
```
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_VOTRE_WEBHOOK_SECRET_ICI
```

### 6.6 Redéployer
- Railway va automatiquement redéployer avec la nouvelle variable

---

## 🚀 ÉTAPE 7 : Mettre à jour le frontend

### 7.1 Ajouter l'URL backend dans Vercel

Aller sur Vercel Dashboard :
- Projet `ghost-remix-pack` → Settings → Environment Variables
- Ajouter :
```
Name: VITE_BACKEND_URL
Value: https://ghost-remix-pack-backend.up.railway.app
```

### 7.2 Redéployer le frontend
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

### 5. Vérifier Stripe
- Dashboard Stripe → Payments
- Vérifier que le paiement apparaît

---

## 📋 CHECKLIST COMPLÈTE

### Configuration
- [ ] Compte Railway créé
- [ ] Projet créé depuis GitHub
- [ ] Root Directory configuré : `/backend`
- [ ] Variables Stripe ajoutées
- [ ] Variables Firebase ajoutées
- [ ] Variables SendGrid ajoutées
- [ ] Variables Railway ajoutées
- [ ] Domaine Railway généré
- [ ] Webhook Stripe configuré
- [ ] URL backend ajoutée au frontend (Vercel)
- [ ] Frontend redéployé

### Tests
- [ ] Test de l'API réussi
- [ ] Test de paiement réussi
- [ ] Email de confirmation reçu
- [ ] Commande enregistrée dans Firebase
- [ ] Paiement visible dans Stripe

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
- **Firebase Console** : https://console.firebase.google.com/project/ghost-remix-pack
- **SendGrid Dashboard** : https://app.sendgrid.com/
- **Vercel Dashboard** : https://vercel.com/dashboard

---

## 💡 CONSEILS

### Variables d'environnement
- Ajouter les variables UNE PAR UNE
- Vérifier qu'il n'y a pas d'espaces avant/après
- Vérifier que les guillemets ne sont pas inclus

### Firebase Credentials
- Coller TOUT le contenu du fichier JSON
- Ne pas oublier les accolades `{` et `}`
- Vérifier qu'il n'y a pas de sauts de ligne manquants

### Webhook Stripe
- Configurer APRÈS avoir généré le domaine Railway
- Utiliser l'URL exacte du domaine Railway
- Tester avec le webhook test de Stripe

---

**Prêt à déployer sur Railway ?** Suivez les étapes ci-dessus ! 🚀

