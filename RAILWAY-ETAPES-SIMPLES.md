# 🚂 Railway - Les Étapes EXACTES à Suivre

> Votre code est sur GitHub ! Maintenant on déploie le backend en 5 minutes !

---

## 🎯 Étape par Étape

### ✅ ÉTAPE 1 : Ouvrir Railway (30 sec)

**Cliquer sur ce lien :**
👉 https://railway.app/new

**Se connecter avec GitHub**
- Cliquer sur "Login with GitHub"
- Autoriser Railway

---

### ✅ ÉTAPE 2 : Déployer le Repo (1 min)

1. Vous voyez des options
2. Cliquer sur **"Deploy from GitHub repo"**
3. Vous voyez la liste de vos repos
4. Chercher et cliquer sur **"ghost-remix-pack"**
5. Cliquer sur **"Deploy Now"**

⏱️ Railway commence à build...

⚠️ **Ça va échouer ! C'est NORMAL !**

---

### ✅ ÉTAPE 3 : Configurer Root Directory (30 sec)

1. **Cliquer sur votre service** (le carré avec le nom)
2. Aller dans l'onglet **"Settings"** 
3. Chercher **"Root Directory"**
4. Cliquer sur le crayon ✏️ pour éditer
5. Taper : `backend`
6. Appuyer sur **Entrée**

✅ **Root Directory = backend**

---

### ✅ ÉTAPE 4 : Ajouter les Variables (2 min)

1. Cliquer sur l'onglet **"Variables"**
2. Cliquer sur **"New Variable"**

**Ajouter ces 4 variables UNE PAR UNE :**

---

**Variable 1:**
```
STRIPE_SECRET_KEY
```
Valeur (copier-coller) :
```
sk_test_VOTRE_CLE_TEST_ICI
```

---

**Variable 2:**
```
FRONTEND_URL
```
Valeur (copier-coller) :
```
https://ghost-remix-pack-jygc9mfwa-hugo-s-projects-b1bae731.vercel.app
```

---

**Variable 3:**
```
PORT
```
Valeur :
```
3001
```

---

**Variable 4:**
```
NODE_ENV
```
Valeur :
```
production
```

---

✅ **4 variables ajoutées !**

---

### ✅ ÉTAPE 5 : Redéployer (1 min)

1. Aller dans l'onglet **"Deployments"**
2. Cliquer sur le bouton **"Deploy"** (en haut à droite)
3. Ou redémarrer le service qui a échoué

⏱️ Attendre 2-3 minutes...

✅ **Vous devez voir "Success" en vert !** 🟢

---

### ✅ ÉTAPE 6 : Générer l'URL (30 sec)

1. Aller dans **"Settings"**
2. Descendre à **"Networking"**
3. Cliquer sur **"Generate Domain"**

Railway crée une URL comme :
```
ghost-remix-pack-production-xxxx.up.railway.app
```

📝 **COPIEZ cette URL !**

---

### ✅ ÉTAPE 7 : Tester le Backend (30 sec)

**Ouvrir cette URL dans le navigateur :**
```
https://votre-url.up.railway.app/api/health
```

**Vous devez voir :**
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running"
}
```

✅ **Backend fonctionne !** 🎉

---

## 🔗 ÉTAPE 8 : Connecter au Frontend

Maintenant on connecte le backend au frontend.

**Donnez-moi votre URL Railway** et je configure Vercel automatiquement !

Ou faites-le vous-même :

```bash
vercel env add VITE_BACKEND_URL production
```

Coller votre URL Railway (sans /api/health)

Puis :
```bash
vercel --prod --yes
```

---

## ✅ CHECKLIST RAPIDE

- [ ] Railway ouvert et connecté avec GitHub
- [ ] Repo "ghost-remix-pack" déployé
- [ ] Root Directory = `backend`
- [ ] 4 variables ajoutées
- [ ] Déploiement réussi (vert)
- [ ] URL générée
- [ ] Test /api/health OK
- [ ] URL communiquée pour connexion frontend

---

## 🎉 C'EST PRESQUE FINI !

Après avoir fait les étapes 1-7, **donnez-moi votre URL Railway** et je termine la connexion avec Vercel !

---

## 🔴 Si Problème

**Build Failed ?**
- Vérifier Root Directory = `backend`
- Vérifier que les 4 variables sont là
- Redéployer

**503 Error ?**
- Aller dans Logs (onglet)
- Me dire l'erreur affichée

---

**Allez sur Railway maintenant : https://railway.app/new** 🚂


