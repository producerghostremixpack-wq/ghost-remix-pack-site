# 🔗 Connecter Vercel avec GitHub - Guide Simple

## 📋 Votre Repository GitHub
- **URL** : https://github.com/producerghostremixpack-wq/ghost-remix-pack
- **Branche** : main

---

## 🚀 ÉTAPE 1 : Se connecter à Vercel

1. Allez sur : **https://vercel.com**
2. Cliquez sur **"Sign Up"** ou **"Log In"**
3. **Choisissez : "Continue with GitHub"** ⬅️ IMPORTANT
4. Autorisez Vercel à accéder à votre compte GitHub

---

## 🔌 ÉTAPE 2 : Importer votre Repository

Une fois connecté sur Vercel :

1. Cliquez sur **"Add New..."** → **"Project"**
2. Vous verrez la liste de vos repositories GitHub
3. Cherchez : **`ghost-remix-pack`**
4. Cliquez sur **"Import"**

### ⚠️ Si vous ne voyez pas votre repository :

1. Cliquez sur **"Adjust GitHub App Permissions"**
2. Dans GitHub, autorisez Vercel à accéder au repository `ghost-remix-pack`
3. Revenez sur Vercel et actualisez la page

---

## ⚙️ ÉTAPE 3 : Configurer le Projet

Vercel va détecter automatiquement que c'est un projet **Vite + React**.

### Configuration requise :

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**✅ NE PAS TOUCHER** - Vercel détecte tout automatiquement !

---

## 🔑 ÉTAPE 4 : Variables d'Environnement (IMPORTANT)

Avant de déployer, ajoutez cette variable :

**Nom** : `VITE_BACKEND_URL`  
**Valeur** : `https://votre-backend-url.railway.app`

⚠️ **Note** : Vous devrez d'abord déployer le backend sur Railway pour obtenir cette URL

---

## 🎯 ÉTAPE 5 : Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes ⏳
3. Une fois terminé, vous aurez une URL comme : `https://ghost-remix-pack.vercel.app`

---

## 🔄 Déploiements Automatiques

Vercel est maintenant connecté à GitHub ! 

**À chaque fois que vous pushez sur GitHub** :
```bash
git add .
git commit -m "Nouvelle modification"
git push origin main
```

→ Vercel **déploie automatiquement** votre site ! 🎉

---

## 🛠️ Commandes Git Utiles

```bash
# Vérifier l'état
git status

# Ajouter tous les fichiers
git add .

# Faire un commit
git commit -m "Votre message"

# Pousser sur GitHub
git push origin main
```

---

## ❌ Problèmes Courants

### 1. "Repository not found"
→ Autorisez Vercel dans : https://github.com/settings/installations

### 2. "Build failed"
→ Vérifiez que `npm run build` fonctionne en local

### 3. "404 on refresh"
→ Vérifier que `vercel.json` est présent (déjà fait ✅)

---

## 📞 Besoin d'aide ?

Si Vercel ne trouve pas votre repository, je peux :
1. Vérifier votre configuration Git
2. Vous guider pas à pas
3. Créer les scripts de déploiement

**Votre repository GitHub** : https://github.com/producerghostremixpack-wq/ghost-remix-pack

Bon déploiement ! 🚀



