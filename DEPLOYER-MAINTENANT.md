# ⚡ DÉPLOYEZ MAINTENANT - 3 Commandes !

## 🎯 Copier-Coller ces Commandes

### 1️⃣ Connectez-vous à Vercel
```bash
vercel login
```
👉 Choisissez votre méthode de connexion (Email/GitHub)

---

### 2️⃣ Déployez (Preview)
```bash
vercel
```

**Répondez simplement :**
- Set up and deploy? → **Y**
- Which scope? → **Hugo's Projects**
- Link to existing project? → **N**
- Project name? → **ghost-remix-pack**
- Directory? → **./** (appuyez sur Entrée)
- Override settings? → **N**

⏱️ Attendez 2-3 minutes...

---

### 3️⃣ Déployez en Production
```bash
vercel --prod
```

**✅ C'EST EN LIGNE !**

Votre URL : `https://ghost-remix-pack.vercel.app`

---

## 🔗 URLs Utiles

- **Votre Dashboard :** https://vercel.com/hugo-s-projects-b1bae731
- **Documentation :** https://vercel.com/docs

---

## 🎨 Personnaliser l'URL

Par défaut : `ghost-remix-pack-xxxxx.vercel.app`

Pour changer le nom :
1. Dashboard Vercel > Projet > Settings
2. General > Project Name
3. Renommer en : `ghost-remix` par exemple
4. URL devient : `ghost-remix.vercel.app`

---

## 🚀 PROCHAINE ÉTAPE : Backend

Une fois le frontend déployé :
1. Aller sur https://railway.app/new
2. Deploy le dossier `/backend`
3. Ajouter `FRONTEND_URL=https://ghost-remix-pack.vercel.app`

---

## ❓ Problème ?

### ❌ Erreur "not found"
```bash
npm i -g vercel
vercel login
```

### ❌ Build failed
```bash
npm run build
# Corriger les erreurs, puis :
vercel --prod
```

### ❌ 404 sur les routes
✅ Le fichier `vercel.json` est déjà créé, ça devrait marcher !

---

## 🎉 Après le Déploiement

✅ Testez votre site sur l'URL fournie
✅ Partagez le lien à vos amis
✅ Passez au déploiement du backend !

**LANCEZ LA COMMANDE MAINTENANT ! 🚀**
```bash
vercel login
```
