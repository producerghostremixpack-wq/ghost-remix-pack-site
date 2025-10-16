# 🚂 Guide Étape par Étape - Déploiement Railway

**Suivez ces étapes dans l'ordre et dites "fait" après chaque étape.**

---

## 🎯 ÉTAPE 1 : Créer un compte Railway

### Instructions :
1. Ouvrez votre navigateur
2. Allez sur : https://railway.app/
3. Cliquez sur "Login"
4. Choisissez "Login with GitHub"
5. Autorisez Railway à accéder à vos dépôts

⏱️ **Temps : 2 minutes**

✅ **Dites "fait" quand c'est terminé**

---

## 🎯 ÉTAPE 2 : Créer un nouveau projet

### Instructions :
1. Cliquez sur "New Project"
2. Choisissez "Deploy from GitHub repo"
3. Dans la liste, cherchez "ghost-remix-pack-site"
4. Cliquez sur "Deploy"

⏱️ **Temps : 1 minute**

✅ **Dites "fait" quand c'est terminé**

---

## 🎯 ÉTAPE 3 : Configurer le Root Directory

### Instructions :
1. Cliquez sur le service qui vient d'être créé
2. En haut, cliquez sur l'onglet "Settings"
3. Scrollez jusqu'à "Source"
4. Cherchez "Root Directory"
5. Mettez : `/backend`
6. Cliquez sur "Update"

⏱️ **Temps : 1 minute**

✅ **Dites "fait" quand c'est terminé**

---

## 🎯 ÉTAPE 4 : Ajouter les variables d'environnement

### Instructions :
1. Cliquez sur l'onglet "Variables"
2. Cliquez sur "New Variable"
3. Ajoutez les variables UNE PAR UNE :

#### Variable 1 :
```
Name: STRIPE_SECRET_KEY
Value: [votre clé Stripe secrète]
```

#### Variable 2 :
```
Name: STRIPE_PUBLISHABLE_KEY
Value: [votre clé Stripe publique]
```

#### Variable 3 :
```
Name: FIREBASE_PROJECT_ID
Value: ghost-remix-pack
```

#### Variable 4 :
```
Name: FIREBASE_CREDENTIALS
Value: [tout le contenu du fichier JSON Firebase]
```

#### Variable 5 :
```
Name: SENDGRID_API_KEY
Value: [votre clé API SendGrid]
```

#### Variable 6 :
```
Name: SENDGRID_FROM_EMAIL
Value: [votre email vérifié SendGrid]
```

#### Variable 7 :
```
Name: PORT
Value: 3001
```

#### Variable 8 :
```
Name: NODE_ENV
Value: production
```

#### Variable 9 :
```
Name: FRONTEND_URL
Value: https://www.ghostremixpack.com
```

⏱️ **Temps : 5-10 minutes**

✅ **Dites "fait" quand toutes les variables sont ajoutées**

---

## 🎯 ÉTAPE 5 : Générer le domaine

### Instructions :
1. Cliquez sur l'onglet "Settings"
2. Scrollez jusqu'à "Networking"
3. Cliquez sur "Generate Domain"
4. Railway va générer une URL comme : `https://ghost-remix-pack-backend.up.railway.app`
5. **NOTEZ CETTE URL !**

⏱️ **Temps : 1 minute**

✅ **Dites "fait" et donnez-moi l'URL générée**

---

## 🎯 ÉTAPE 6 : Configurer le webhook Stripe

### Instructions :
1. Ouvrez un nouvel onglet
2. Allez sur : https://dashboard.stripe.com/test/webhooks
3. Cliquez sur "Add endpoint"
4. Dans "Endpoint URL", collez : `https://votre-url-railway.up.railway.app/api/webhook`
5. Dans "Events to send", cochez :
   - ✅ checkout.session.completed
   - ✅ payment_intent.succeeded
   - ✅ payment_intent.payment_failed
6. Cliquez sur "Add endpoint"
7. Une fois créé, cliquez sur le webhook
8. Copiez le "Signing secret" (commence par `whsec_`)

⏱️ **Temps : 3 minutes**

✅ **Dites "fait" quand vous avez le secret webhook**

---

## 🎯 ÉTAPE 7 : Ajouter le webhook secret sur Railway

### Instructions :
1. Retournez sur Railway
2. Cliquez sur "Variables"
3. Cliquez sur "New Variable"
4. Ajoutez :
```
Name: STRIPE_WEBHOOK_SECRET
Value: [le secret webhook copié]
```

⏱️ **Temps : 1 minute**

✅ **Dites "fait" quand c'est terminé**

---

## 🎯 ÉTAPE 8 : Mettre à jour le frontend

### Instructions :
1. Ouvrez un nouvel onglet
2. Allez sur : https://vercel.com/dashboard
3. Cliquez sur votre projet "ghost-remix-pack"
4. Cliquez sur "Settings"
5. Cliquez sur "Environment Variables"
6. Cliquez sur "Add New"
7. Ajoutez :
```
Name: VITE_BACKEND_URL
Value: https://votre-url-railway.up.railway.app
```
8. Vercel va redéployer automatiquement

⏱️ **Temps : 2 minutes**

✅ **Dites "fait" quand c'est terminé**

---

## ✅ VÉRIFICATION FINALE

### Test 1 : Vérifier l'API Backend
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

### Test 2 : Tester le paiement
1. Allez sur : https://www.ghostremixpack.com
2. Ajoutez un produit au panier
3. Procédez au checkout
4. Utilisez la carte de test : `4242 4242 4242 4242`

---

## 🎉 FÉLICITATIONS !

Si tout fonctionne, votre site est maintenant **100% opérationnel** !

✅ Frontend en ligne
✅ Backend déployé
✅ Paiements fonctionnels
✅ Emails envoyés
✅ Commandes sauvegardées

---

**Suivez les étapes dans l'ordre et dites "fait" après chaque étape !** 🚀

