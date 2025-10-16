# 🚀 Déploiement Final - Guide Étape par Étape

**Date :** 16 janvier 2025  
**Statut :** Configuration complète ✅ | Déploiement en cours ⏳

---

## ✅ CE QUI EST TERMINÉ

- ✅ Frontend déployé sur Vercel : https://www.ghostremixpack.com
- ✅ Toutes les clés API configurées
- ✅ Fichier .env créé et validé
- ✅ Backend prêt à déployer

---

## 🎯 DÉPLOIEMENT SUR RAILWAY

### ÉTAPE 1 : Créer le projet Railway

1. **Aller sur Railway**
   👉 https://railway.app/

2. **Se connecter**
   - Cliquer sur "Login"
   - Choisir "Login with GitHub"
   - Autoriser Railway

3. **Créer un nouveau projet**
   - Cliquer sur "New Project"
   - Choisir "Deploy from GitHub repo"
   - Sélectionner "ghost-remix-pack-site"
   - Cliquer sur "Deploy"

---

### ÉTAPE 2 : Configurer le Root Directory

1. **Cliquer sur le service déployé**

2. **Aller dans Settings**
   - Onglet "Settings"
   - Scroller jusqu'à "Source"

3. **Configurer le Root Directory**
   - Root Directory : `/backend`
   - Cliquer sur "Update"

---

### ÉTAPE 3 : Ajouter les variables d'environnement

1. **Aller dans Variables**
   - Onglet "Variables"
   - Cliquer sur "New Variable"

2. **Ajouter les variables UNE PAR UNE**

Copiez-collez depuis le fichier `.env` dans `automation/` :

```bash
# Stripe
STRIPE_SECRET_KEY=votre_cle_stripe_secrete_ici
STRIPE_PUBLISHABLE_KEY=votre_cle_stripe_publique_ici

# Firebase
FIREBASE_PROJECT_ID=ghost-remix-pack
FIREBASE_CREDENTIALS={"type":"service_account","project_id":"ghost-remix-pack",...}

# SendGrid
SENDGRID_API_KEY=votre_cle_sendgrid_ici
SENDGRID_FROM_EMAIL=votre_email_sendgrid_ici

# Application
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://www.ghostremixpack.com
```

---

### ÉTAPE 4 : Générer le domaine

1. **Aller dans Settings**
   - Onglet "Settings"
   - Scroller jusqu'à "Networking"

2. **Générer le domaine**
   - Cliquer sur "Generate Domain"
   - Railway va générer une URL
   - **NOTEZ CETTE URL !**

Exemple : `https://ghost-remix-pack-backend.up.railway.app`

---

### ÉTAPE 5 : Configurer le webhook Stripe

1. **Aller sur Stripe**
   👉 https://dashboard.stripe.com/test/webhooks

2. **Ajouter un endpoint**
   - Cliquer sur "Add endpoint"
   - Endpoint URL : `https://votre-url-railway.up.railway.app/api/webhook`
   - Events to send :
     - ✅ checkout.session.completed
     - ✅ payment_intent.succeeded
     - ✅ payment_intent.payment_failed
   - Cliquer sur "Add endpoint"

3. **Copier le secret webhook**
   - Cliquer sur le webhook créé
   - Copier le "Signing secret" (commence par `whsec_`)

4. **Ajouter le secret sur Railway**
   - Retourner sur Railway
   - Onglet "Variables"
   - Ajouter :
     ```
     STRIPE_WEBHOOK_SECRET=whsec_votre_secret_ici
     ```

---

### ÉTAPE 6 : Mettre à jour le frontend

1. **Aller sur Vercel**
   👉 https://vercel.com/dashboard

2. **Ajouter la variable d'environnement**
   - Projet "ghost-remix-pack"
   - Settings → Environment Variables
   - Ajouter :
     ```
     Name: VITE_BACKEND_URL
     Value: https://votre-url-railway.up.railway.app
     ```

3. **Redéployer**
   - Vercel redéploiera automatiquement

---

## ✅ VÉRIFICATION FINALE

### Test 1 : Santé de l'API
```bash
curl https://votre-url-railway.up.railway.app/api/health
```

Réponse attendue :
```json
{
  "status": "ok",
  "timestamp": "..."
}
```

### Test 2 : Paiement
1. Aller sur : https://www.ghostremixpack.com
2. Ajouter un produit au panier
3. Procéder au checkout
4. Utiliser la carte de test : `4242 4242 4242 4242`

### Test 3 : Vérifier Firebase
- Console Firebase → Firestore
- Vérifier qu'une collection `orders` existe
- Vérifier qu'une commande a été enregistrée

### Test 4 : Vérifier l'email
- Vérifier votre boîte email
- Vous devriez recevoir un email de confirmation

---

## 🎉 RÉSULTAT FINAL

Une fois tout configuré, vous aurez :

✅ **Frontend** : https://www.ghostremixpack.com  
✅ **Backend** : https://votre-url-railway.up.railway.app  
✅ **Paiements** : Stripe Checkout fonctionnel  
✅ **Emails** : SendGrid configuré  
✅ **Database** : Firebase Firestore actif  

---

## 📊 CHECKLIST

- [ ] Compte Railway créé
- [ ] Projet Railway créé
- [ ] Root Directory configuré : `/backend`
- [ ] Variables d'environnement ajoutées
- [ ] Domaine Railway généré
- [ ] Webhook Stripe configuré
- [ ] Variable `VITE_BACKEND_URL` ajoutée sur Vercel
- [ ] Tests de validation effectués

---

## 🆘 DÉPANNAGE

### ❌ Build échoue
- Vérifier que Root Directory = `/backend`
- Vérifier que toutes les variables sont présentes
- Vérifier les logs dans Railway

### ❌ API ne répond pas
- Vérifier que le service est "Active"
- Vérifier l'URL du domaine
- Vérifier les variables d'environnement

### ❌ Erreur Firebase
- Vérifier que `FIREBASE_CREDENTIALS` est le JSON complet
- Vérifier que `FIREBASE_PROJECT_ID` est correct

---

**Créé avec ❤️ pour Ghost Remix Pack**

