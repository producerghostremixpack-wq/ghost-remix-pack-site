# 🚀 Tutoriel Vercel - Déploiement Ghost Remix Pack

## 🎯 Objectif
Déployer votre site Ghost Remix Pack sur Vercel en 10 minutes chrono !

---

## 📋 Prérequis
- ✅ Compte Vercel créé : https://vercel.com/hugo-s-projects-b1bae731
- ✅ Vercel CLI installé sur votre machine
- ✅ Projet fonctionnel localement (http://localhost:5173)

---

## 🚀 Méthode 1 : Déploiement via CLI (Recommandé)

### Étape 1 : Se connecter à Vercel

```bash
vercel login
```

Choisir votre méthode de connexion (Email/GitHub/etc.)

### Étape 2 : Déployer le projet

```bash
# Depuis la racine du projet
vercel
```

**Réponses aux questions :**

```
? Set up and deploy "~/Documents/Le site Ghost Remix Pack"? 
→ Y (Oui)

? Which scope do you want to deploy to?
→ Hugo's Projects (votre compte)

? Link to existing project?
→ N (Non, c'est un nouveau projet)

? What's your project's name?
→ ghost-remix-pack (ou le nom de votre choix)

? In which directory is your code located?
→ ./ (appuyez sur Entrée)

? Want to override the settings? [y/N]
→ N (Non, Vercel détecte automatiquement Vite)
```

### Étape 3 : Déploiement automatique

Vercel va :
1. ✅ Détecter que c'est un projet Vite
2. ✅ Installer les dépendances (`npm install`)
3. ✅ Builder le projet (`npm run build`)
4. ✅ Déployer le dossier `dist`

**Temps estimé : 2-3 minutes**

### Étape 4 : Récupérer l'URL

À la fin, Vercel affiche :
```
✅ Preview: https://ghost-remix-pack-xxxxx.vercel.app
✅ Inspect: https://vercel.com/...
```

**🎉 Votre site est en ligne !**

---

## 🌐 Méthode 2 : Déploiement via Interface Web

### Étape 1 : Aller sur Vercel Dashboard
```
https://vercel.com/hugo-s-projects-b1bae731
```

### Étape 2 : Nouveau Projet
1. Cliquer sur **"Add New Project"**
2. Cliquer sur **"Import Git Repository"**

### Étape 3 : Connecter GitHub (Si pas déjà fait)
1. Autoriser Vercel à accéder à GitHub
2. Sélectionner votre repository

### Étape 4 : Configurer le Projet

**Framework Preset :** Vite
**Root Directory :** `./` (racine)
**Build Command :** `npm run build`
**Output Directory :** `dist`

### Étape 5 : Variables d'Environnement (Optionnel)

Ajouter si nécessaire :
```
VITE_BACKEND_URL = https://votre-backend.com
```

### Étape 6 : Deploy
Cliquer sur **"Deploy"** 🚀

---

## ⚙️ Configuration Avancée

### Variables d'Environnement

Pour ajouter des variables après déploiement :

1. Dashboard Vercel > Votre projet
2. **Settings** > **Environment Variables**
3. Ajouter :
   ```
   Name: VITE_BACKEND_URL
   Value: https://ghost-remix-backend.up.railway.app
   ```
4. Redéployer pour appliquer les changements

### Domaine Personnalisé

1. **Settings** > **Domains**
2. Ajouter votre domaine : `votredomaine.com`
3. Configurer le DNS :
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

---

## 🔄 Redéploiement

### Déployer en Production

```bash
vercel --prod
```

### Déployer une Branche Spécifique

```bash
git checkout main
vercel --prod
```

---

## 📊 Commandes Vercel Utiles

```bash
# Se connecter
vercel login

# Déployer (preview)
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Lister les projets
vercel list

# Ouvrir le dashboard
vercel open

# Voir les infos du projet
vercel inspect

# Supprimer un déploiement
vercel remove [deployment-url]
```

---

## 🐛 Résolution de Problèmes

### ❌ Build Failed

**Problème :** Erreur pendant `npm run build`

**Solution :**
```bash
# Tester le build localement d'abord
npm run build

# Si erreur, corriger puis :
git add .
git commit -m "fix: build errors"
git push
```

### ❌ 404 sur les Routes

**Problème :** Les routes React Router ne marchent pas

**Solution :** Créer `vercel.json` à la racine :
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### ❌ Variables d'Environnement Non Reconnues

**Problème :** `VITE_BACKEND_URL` undefined

**Solution :**
1. Les variables DOIVENT commencer par `VITE_`
2. Ajouter dans Vercel Dashboard > Settings > Environment Variables
3. Redéployer : `vercel --prod`

### ❌ CORS Errors

**Problème :** Erreurs CORS avec le backend

**Solution :** Dans votre backend, autoriser l'URL Vercel :
```javascript
app.use(cors({
  origin: 'https://ghost-remix-pack.vercel.app',
  credentials: true
}));
```

---

## 📈 Après le Déploiement

### 1. Vérifier le Site
```
https://ghost-remix-pack-xxxxx.vercel.app
```

### 2. Tester Toutes les Pages
- ✅ Page d'accueil : `/`
- ✅ Panier : `/cart`
- ✅ Checkout : `/checkout`
- ✅ Success : `/success`
- ✅ Mentions légales : `/mentions-legales`
- ✅ Contact : `/contact`

### 3. Vérifier la Console
Ouvrir les DevTools (F12) et vérifier qu'il n'y a pas d'erreurs

### 4. Partager l'URL
Votre site est maintenant accessible à tous ! 🎉

---

## 🎯 Configuration Recommandée pour Production

### Créer `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🚀 Déploiement Automatique (CI/CD)

Vercel détecte automatiquement les push sur GitHub :

1. **Push sur branch** → Preview Deployment
2. **Push sur main** → Production Deployment

**Exemple :**
```bash
git add .
git commit -m "feat: new feature"
git push origin main
# Vercel déploie automatiquement !
```

---

## 💡 Tips & Astuces

### 1. Preview Deployments
Chaque branche a son propre URL de preview :
```
https://ghost-remix-pack-git-feature-hugo.vercel.app
```

### 2. Analytics
Activer Vercel Analytics :
- Dashboard > Analytics > Enable

### 3. Speed Insights
Activer pour voir les performances :
- Dashboard > Speed Insights > Enable

### 4. Rollback
Revenir à un déploiement précédent :
- Dashboard > Deployments > ... > Promote to Production

---

## 📞 Support

- Documentation : https://vercel.com/docs
- Discord : https://vercel.com/discord
- Status : https://vercel-status.com

---

## ✅ Checklist Finale

- [ ] Site accessible sur l'URL Vercel
- [ ] Toutes les pages fonctionnent
- [ ] Panier sauvegarde les items
- [ ] Pas d'erreur dans la console
- [ ] Images et vidéos chargent correctement
- [ ] Site responsive sur mobile
- [ ] Variables d'environnement configurées
- [ ] Domaine personnalisé ajouté (optionnel)

---

## 🎉 Prochaines Étapes

1. **Déployer le Backend** → Railway.app
2. **Connecter Backend** → Ajouter VITE_BACKEND_URL
3. **Tester l'Achat** → Processus complet
4. **Acheter Domaine** → votredomaine.com
5. **Activer Stripe Live** → Passer en production

**Votre site est maintenant LIVE ! 🚀**
