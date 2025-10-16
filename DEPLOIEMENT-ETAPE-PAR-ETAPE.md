# 🚀 Déploiement Étape par Étape - Commençons MAINTENANT !

## 🟢 ÉTAPE 1 : Déployer le Frontend (15 minutes)

### Option A : Vercel (Le plus simple)

1. **Créer un compte gratuit**
   ```
   https://vercel.com/signup
   ```

2. **Installer Vercel CLI**
   ```bash
   npm i -g vercel
   ```

3. **Déployer** (depuis la racine du projet)
   ```bash
   vercel
   ```
   
   Répondre aux questions :
   - Set up and deploy? **Y**
   - Which scope? **Votre username**
   - Link to existing project? **N**
   - Project name? **ghost-remix-pack**
   - Directory? **.** (point)
   - Override settings? **N**

4. **Votre site est en ligne !** 🎉
   - URL : `https://ghost-remix-pack.vercel.app`

### Option B : Netlify (Alternative)

1. **Build le projet**
   ```bash
   npm run build
   ```

2. **Aller sur** https://app.netlify.com/drop

3. **Glisser-déposer** le dossier `dist`

4. **C'est en ligne !** 🎉

---

## 🟡 ÉTAPE 2 : Déployer le Backend (30 minutes)

### Railway.app (Le plus simple)

1. **Créer un compte**
   ```
   https://railway.app/
   ```

2. **Nouveau projet**
   - "Deploy from GitHub repo"
   - Autoriser Railway
   - Sélectionner votre repo
   - **IMPORTANT** : Spécifier le dossier `backend`

3. **Variables d'environnement**
   Dans Railway > Variables :
   ```
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://ghost-remix-pack.vercel.app
   STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI
   FIREBASE_PROJECT_ID=votre-projet
   FIREBASE_CLIENT_EMAIL=...
   FIREBASE_PRIVATE_KEY=...
   SENDGRID_API_KEY=SG.XXX
   SENDGRID_FROM_EMAIL=contact@votremail.com
   ```

4. **Deploy** → Railway déploie automatiquement !

5. **Récupérer l'URL du backend**
   - Exemple : `https://ghost-remix-backend.up.railway.app`

---

## 🔵 ÉTAPE 3 : Connecter Frontend et Backend (5 minutes)

1. **Dans Vercel**, ajouter la variable d'environnement :
   ```
   VITE_BACKEND_URL=https://ghost-remix-backend.up.railway.app
   ```

2. **Redéployer** le frontend :
   ```bash
   vercel --prod
   ```

---

## 🟣 ÉTAPE 4 : Tester (10 minutes)

1. **Ouvrir votre site**
   ```
   https://ghost-remix-pack.vercel.app
   ```

2. **Tester** :
   - [ ] Ajouter au panier
   - [ ] Aller au checkout
   - [ ] Remplir le formulaire
   - [ ] Vérifier la console pour les erreurs

---

## ⚡ ACTIONS IMMÉDIATES (Faites ça MAINTENANT !)

### 1️⃣ Commande à exécuter maintenant :
```bash
npm i -g vercel && vercel
```

### 2️⃣ Pendant que ça déploie, ouvrez :
- https://railway.app/new

### 3️⃣ Préparez ces infos :
- Votre clé Stripe test (déjà dans le code)
- Un email pour SendGrid

---

## 📱 URLs Finales

Une fois terminé, vous aurez :
- **Site** : `https://ghost-remix-pack.vercel.app`
- **API** : `https://ghost-remix-backend.up.railway.app`
- **Test Stripe** : Carte `4242 4242 4242 4242`

---

## ❓ Problème ?

### Frontend ne build pas ?
```bash
npm run build
# Si erreur, corriger puis :
vercel --prod
```

### Backend ne démarre pas ?
Vérifier dans Railway logs que toutes les variables sont définies.

### CORS error ?
Vérifier que `FRONTEND_URL` dans Railway = URL Vercel exacte

---

## ✅ C'est tout !

En 1 heure maximum, votre site est en ligne et fonctionnel ! 🚀

**Prochaines étapes** :
1. Acheter un domaine
2. Passer Stripe en mode Live
3. Uploader les vrais fichiers audio
