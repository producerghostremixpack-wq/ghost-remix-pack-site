# 🚀 Déployer sur Render - Guide Étape par Étape

**Render est gratuit à vie et aussi simple que Railway !**

---

## 🎯 ÉTAPE 1 : Créer un compte Render

### Instructions :
1. Ouvrez votre navigateur
2. Allez sur : https://render.com/
3. Cliquez sur "Get Started for Free"
4. Choisissez "Sign up with GitHub"
5. Autorisez Render à accéder à vos dépôts

⏱️ **Temps : 2 minutes**

✅ **Dites "fait" quand c'est terminé**

---

## 🎯 ÉTAPE 2 : Créer un nouveau Web Service

### Instructions :
1. Cliquez sur "New +" (en haut à droite)
2. Choisissez "Web Service"
3. Cliquez sur "Connect account" si nécessaire
4. Sélectionnez "ghost-remix-pack-site" dans la liste
5. Cliquez sur "Connect"

⏱️ **Temps : 1 minute**

✅ **Dites "fait" quand c'est terminé**

---

## 🎯 ÉTAPE 3 : Configurer le service

### Instructions :
1. **Name** : `ghost-remix-pack-backend`
2. **Region** : Frankfurt (Europe)
3. **Branch** : `main`
4. **Root Directory** : `backend`
5. **Runtime** : `Node`
6. **Build Command** : `npm install`
7. **Start Command** : `node server.js`

⏱️ **Temps : 2 minutes**

✅ **Dites "fait" quand c'est terminé**

---

## 🎯 ÉTAPE 4 : Ajouter les variables d'environnement

### Instructions :
1. Scrollez jusqu'à "Environment Variables"
2. Cliquez sur "Add Environment Variable"
3. Ajoutez les variables UNE PAR UNE :

#### Variable 1 :
```
Key: STRIPE_SECRET_KEY
Value: [votre clé Stripe secrète]
```

#### Variable 2 :
```
Key: STRIPE_PUBLISHABLE_KEY
Value: [votre clé Stripe publique]
```

#### Variable 3 :
```
Key: FIREBASE_PROJECT_ID
Value: ghost-remix-pack
```

#### Variable 4 :
```
Key: FIREBASE_CREDENTIALS
Value: [tout le contenu du fichier JSON Firebase]
```

#### Variable 5 :
```
Key: SENDGRID_API_KEY
Value: [votre clé API SendGrid]
```

#### Variable 6 :
```
Key: SENDGRID_FROM_EMAIL
Value: [votre email vérifié SendGrid]
```

#### Variable 7 :
```
Key: PORT
Value: 3001
```

#### Variable 8 :
```
Key: NODE_ENV
Value: production
```

#### Variable 9 :
```
Key: FRONTEND_URL
Value: https://www.ghostremixpack.com
```

⏱️ **Temps : 5-10 minutes**

✅ **Dites "fait" quand toutes les variables sont ajoutées**

---

## 🎯 ÉTAPE 5 : Créer le service

### Instructions :
1. Scrollez en bas
2. Cliquez sur "Create Web Service"
3. Render va commencer à déployer votre backend
4. Attendez que le statut passe à "Live" (2-5 minutes)

⏱️ **Temps : 2-5 minutes**

✅ **Dites "fait" quand c'est "Live"**

---

## 🎯 ÉTAPE 6 : Noter l'URL du backend

### Instructions :
1. Une fois "Live", vous verrez l'URL en haut
2. Elle ressemble à : `https://ghost-remix-pack-backend.onrender.com`
3. **NOTEZ CETTE URL !**

⏱️ **Temps : 1 minute**

✅ **Dites "fait" et donnez-moi l'URL générée**

---

## 🎯 ÉTAPE 7 : Configurer le webhook Stripe

### Instructions :
1. Ouvrez un nouvel onglet
2. Allez sur : https://dashboard.stripe.com/test/webhooks
3. Cliquez sur "Add endpoint"
4. Dans "Endpoint URL", collez : `https://votre-url-render.onrender.com/api/webhook`
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

## 🎯 ÉTAPE 8 : Ajouter le webhook secret sur Render

### Instructions :
1. Retournez sur Render
2. Dans votre service, allez dans "Environment"
3. Cliquez sur "Add Environment Variable"
4. Ajoutez :
```
Key: STRIPE_WEBHOOK_SECRET
Value: [le secret webhook copié]
```
5. Render va redéployer automatiquement

⏱️ **Temps : 2 minutes**

✅ **Dites "fait" quand c'est terminé**

---

## 🎯 ÉTAPE 9 : Mettre à jour le frontend

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
Value: https://votre-url-render.onrender.com
```
8. Vercel va redéployer automatiquement

⏱️ **Temps : 2 minutes**

✅ **Dites "fait" quand c'est terminé**

---

## ✅ VÉRIFICATION FINALE

### Test 1 : Vérifier l'API Backend
```bash
curl https://votre-url-render.onrender.com/api/health
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
✅ Backend déployé sur Render
✅ Paiements fonctionnels
✅ Emails envoyés
✅ Commandes sauvegardées

---

## 💡 AVANTAGES DE RENDER

- ✅ Gratuit à vie
- ✅ Pas de carte bancaire requise
- ✅ Déploiement automatique depuis GitHub
- ✅ SSL gratuit
- ✅ URL personnalisée

---

**Suivez les étapes dans l'ordre et dites "fait" après chaque étape !** 🚀

