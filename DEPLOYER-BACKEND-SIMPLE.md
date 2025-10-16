# 🚂 Déployer le Backend - ULTRA SIMPLE

> On va déployer votre backend sur Railway.app en 10 minutes !

---

## 📍 ÉTAPE 1 : Créer un Compte Railway

### 1. Ouvrir ce lien
👉 **https://railway.app/new**

### 2. Cliquer sur "Login with GitHub"
C'est le plus simple !

### 3. Autoriser Railway
GitHub va demander l'autorisation → Cliquer sur **"Authorize"**

✅ **Vous êtes connecté à Railway !**

---

## 📍 ÉTAPE 2 : Créer le Projet

### 1. Vous voyez "Deploy from GitHub repo"
Cliquer dessus

### 2. Sélectionner votre repository
- Chercher : **"Ghost Remix Pack"** ou le nom de votre repo
- Cliquer dessus

### 3. Cliquer sur "Deploy Now"

⏱️ **Attendez 30 secondes...**

❌ **Il va planter ! C'est NORMAL !**

Pourquoi ? Parce qu'on doit configurer les variables d'environnement.

---

## 📍 ÉTAPE 3 : Configurer le Dossier Backend

### 1. Dans Railway, cliquer sur votre service

### 2. Aller dans "Settings"

### 3. Trouver "Root Directory"
- Cliquer pour éditer
- Taper : **backend**
- Sauvegarder

### 4. Trouver "Start Command"
- Cliquer pour éditer
- Taper : **npm start**
- Sauvegarder

✅ **Configuration de base OK !**

---

## 📍 ÉTAPE 4 : Ajouter les Variables d'Environnement

### 1. Aller dans "Variables"

### 2. Copier-coller ces variables UNE PAR UNE :

```
STRIPE_SECRET_KEY
```
Valeur : `sk_test_VOTRE_CLE_TEST_ICI`

---

```
FRONTEND_URL
```
Valeur : `https://ghost-remix-pack-jygc9mfwa-hugo-s-projects-b1bae731.vercel.app`

---

```
PORT
```
Valeur : `3001`

---

```
NODE_ENV
```
Valeur : `production`

---

### 3. Cliquer sur "Add Variable" pour chaque

✅ **Variables de base ajoutées !**

---

## 📍 ÉTAPE 5 : Redéployer

### 1. Aller dans "Deployments"

### 2. Cliquer sur "Deploy" (bouton en haut à droite)

⏱️ **Attendez 2-3 minutes...**

### 3. Vérifier que c'est vert
Vous devez voir : **"Success"** avec une coche verte ✅

---

## 📍 ÉTAPE 6 : Récupérer l'URL du Backend

### 1. Dans Railway, aller dans "Settings"

### 2. Section "Networking"

### 3. Cliquer sur "Generate Domain"

### 4. Railway génère une URL
Exemple : `ghost-remix-backend-production-xxxx.up.railway.app`

📝 **COPIEZ cette URL !**

✅ **Votre backend est EN LIGNE !**

---

## 📍 ÉTAPE 7 : Connecter Frontend et Backend

Maintenant il faut dire au frontend où est le backend.

### 1. Aller sur Vercel
👉 https://vercel.com/hugo-s-projects-b1bae731/ghost-remix-pack

### 2. Cliquer sur "Settings"

### 3. Cliquer sur "Environment Variables"

### 4. Ajouter cette variable :

**Name:**
```
VITE_BACKEND_URL
```

**Value:**
```
https://votre-url-railway.up.railway.app
```
*(Remplacer par votre vraie URL Railway)*

**Environment:** Cocher les 3 (Production, Preview, Development)

### 5. Cliquer sur "Save"

---

## 📍 ÉTAPE 8 : Redéployer le Frontend

Il faut redéployer pour que la variable soit prise en compte.

**Dans votre terminal, taper :**

```bash
vercel --prod --yes
```

⏱️ Attendez 1 minute...

✅ **Frontend et Backend sont connectés !**

---

## 🧪 TESTER QUE TOUT MARCHE

### 1. Ouvrir votre site
```
https://ghost-remix-pack-jygc9mfwa-hugo-s-projects-b1bae731.vercel.app
```

### 2. Appuyer sur F12 (ouvrir la console)

### 3. Aller sur la page Checkout

### 4. Regarder la console

**Si tout marche :**
- ✅ Pas d'erreur rouge
- ✅ Pas de "CORS error"
- ✅ Pas de "Failed to fetch"

**Si erreur CORS :**
- ❌ Vérifier que `FRONTEND_URL` dans Railway = URL Vercel exacte

---

## 🎉 C'EST FINI !

**Vous avez maintenant :**
- ✅ Frontend en ligne (Vercel)
- ✅ Backend en ligne (Railway)
- ✅ Les deux connectés ensemble
- ✅ Prêt pour les paiements Stripe !

---

## 📊 URLs Finales

**Frontend :** https://ghost-remix-pack-jygc9mfwa-hugo-s-projects-b1bae731.vercel.app

**Backend :** https://votre-url.up.railway.app

**Dashboard Vercel :** https://vercel.com/hugo-s-projects-b1bae731

**Dashboard Railway :** https://railway.app/dashboard

---

## 🔴 Problèmes Fréquents

### ❌ Build Failed sur Railway

**Solution :**
1. Vérifier que "Root Directory" = **backend**
2. Vérifier que toutes les variables sont ajoutées
3. Redéployer

### ❌ CORS Error

**Solution :**
Vérifier que `FRONTEND_URL` dans Railway = URL Vercel EXACTE (sans / à la fin)

### ❌ 503 Service Unavailable

**Solution :**
1. Railway logs → Voir l'erreur
2. Souvent : variable d'environnement manquante
3. Ajouter et redéployer

---

## 🎯 Prochaines Étapes

Maintenant que tout est en ligne :

1. **Configurer Firebase** (pour téléchargements)
2. **Configurer SendGrid** (pour emails)
3. **Configurer Stripe Webhook** (pour paiements)
4. **Acheter un domaine** (optionnel)

Mais tout ça peut attendre ! 

**Pour l'instant, PROFITEZ de votre site en ligne ! 🎉**
