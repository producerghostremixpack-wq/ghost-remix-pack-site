# 🚀 DÉPLOYER LE BACKEND MAINTENANT - Guide Ultra Simple

**Temps estimé : 15-20 minutes**

---

## 📋 CE QU'IL FAUT FAIRE

### **ÉTAPE 1 : Créer un compte Render (5 min)**

1. **Aller sur Render**
   - Ouvrir : https://render.com/
   - Cliquer sur **"Get Started for Free"**

2. **S'inscrire avec GitHub**
   - Cliquer sur **"Sign up with GitHub"**
   - Autoriser Render à accéder à votre compte GitHub
   - Confirmer votre email

3. **Créer un nouveau Web Service**
   - Dans le dashboard Render, cliquer sur **"New +"**
   - Choisir **"Web Service"**
   - Sélectionner votre repository : **ghost-remix-pack-site**

---

### **ÉTAPE 2 : Configurer le Web Service (5 min)**

**Remplir le formulaire :**

```
Name: ghost-remix-pack-backend
Region: Frankfurt (Europe)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: node server.js
```

**⚠️ IMPORTANT :**
- Root Directory = `backend` (pas la racine !)
- Start Command = `node server.js` (pas npm start)

---

### **ÉTAPE 3 : Ajouter les Variables d'Environnement (5 min)**

**Dans la section "Environment Variables", ajouter :**

#### **Variable 1 : PORT**
```
Key: PORT
Value: 3001
```

#### **Variable 2 : NODE_ENV**
```
Key: NODE_ENV
Value: production
```

#### **Variable 3 : FRONTEND_URL**
```
Key: FRONTEND_URL
Value: https://www.ghostremixpack.com
```

#### **Variable 4 : STRIPE_SECRET_KEY**
```
Key: STRIPE_SECRET_KEY
Value: [Votre clé secrète Stripe - sk_test_...]
```
**Où la trouver :** Dashboard Stripe → Developers → API Keys → Secret key

#### **Variable 5 : STRIPE_PUBLISHABLE_KEY**
```
Key: STRIPE_PUBLISHABLE_KEY
Value: [Votre clé publique Stripe - pk_test_...]
```
**Où la trouver :** Dashboard Stripe → Developers → API Keys → Publishable key

#### **Variable 6 : FIREBASE_PROJECT_ID**
```
Key: FIREBASE_PROJECT_ID
Value: ghost-remix-pack
```

#### **Variable 7 : FIREBASE_CREDENTIALS**
```
Key: FIREBASE_CREDENTIALS
Value: [Le contenu complet de votre fichier serviceAccountKey.json]
```
**⚠️ IMPORTANT :** Coller TOUT le JSON avec les accolades { }

#### **Variable 8 : SENDGRID_API_KEY**
```
Key: SENDGRID_API_KEY
Value: [Votre clé API SendGrid - SG.xxx...]
```
**Où la trouver :** Dashboard SendGrid → Settings → API Keys

#### **Variable 9 : SENDGRID_FROM_EMAIL**
```
Key: SENDGRID_FROM_EMAIL
Value: producteurghostremixpack@gmail.com
```

---

### **ÉTAPE 4 : Créer le Service (2 min)**

1. **Cliquer sur "Create Web Service"**
2. **Attendre le déploiement** (2-3 minutes)
3. **Noter l'URL générée** (exemple : `https://ghost-remix-pack-backend.onrender.com`)

**✅ Vous verrez :**
```
Deploy Log:
✓ Build successful
✓ Service is live
```

---

### **ÉTAPE 5 : Tester le Backend (1 min)**

**Ouvrir dans votre navigateur :**
```
https://votre-url.onrender.com/api/health
```

**Réponse attendue :**
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running",
  "timestamp": "2025-10-16T..."
}
```

**✅ Si vous voyez ça, le backend fonctionne !**

---

## 🎉 FÉLICITATIONS !

**Votre backend est maintenant déployé et accessible !**

**Prochaine étape :** Configurer le webhook Stripe

---

## 📞 BESOIN D'AIDE ?

Si vous êtes bloqué à une étape, dites-moi où vous en êtes et je vous aide !

---

**Temps total : 15-20 minutes** ⏱️

