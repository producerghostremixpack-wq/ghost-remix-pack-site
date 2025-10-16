# 🔓 Autoriser Vercel à accéder à votre Repository GitHub

## Si vous ne voyez pas `ghost-remix-pack` dans Vercel :

### Option 1 : Via Vercel (Recommandé)

1. Dans Vercel, cherchez le lien : **"Adjust GitHub App Permissions"** ou **"Configure GitHub App"**
2. Cliquez dessus → Vous serez redirigé vers GitHub
3. Dans GitHub, cherchez **Vercel** dans les applications installées
4. Cliquez sur **"Configure"**
5. Descendez jusqu'à **"Repository access"**
6. Choisissez :
   - **"All repositories"** (plus simple) OU
   - **"Only select repositories"** → Sélectionnez `ghost-remix-pack`
7. Cliquez **"Save"**
8. Retournez sur Vercel et actualisez la page

---

### Option 2 : Via GitHub Directement

1. Allez sur : **https://github.com/settings/installations**
2. Cherchez **"Vercel"** dans la liste
3. Cliquez sur **"Configure"**
4. Descendez jusqu'à **"Repository access"**
5. Sélectionnez **"All repositories"** ou ajoutez `ghost-remix-pack`
6. Cliquez **"Save"**
7. Retournez sur Vercel

---

## 🎯 Une fois que vous voyez le repository dans Vercel :

1. Cliquez sur **"Import"** à côté de `ghost-remix-pack`
2. Vercel va détecter automatiquement que c'est un projet **Vite**
3. **NE CHANGEZ RIEN** dans la configuration
4. Cliquez sur **"Deploy"**

---

## ⏱️ Le déploiement prend 2-3 minutes

Une fois terminé, vous aurez :
- ✅ Une URL publique : `https://ghost-remix-pack.vercel.app`
- ✅ Déploiements automatiques à chaque push GitHub
- ✅ Aperçus pour chaque branche

---

## 🔗 Liens Utiles

- **Vercel Dashboard** : https://vercel.com/dashboard
- **GitHub Settings** : https://github.com/settings/installations
- **Votre Repository** : https://github.com/producerghostremixpack-wq/ghost-remix-pack

---

## 💡 Astuce

Si Vercel ne trouve toujours pas votre repository, essayez de :
1. Vous déconnecter de Vercel
2. Vous reconnecter avec GitHub
3. Autoriser à nouveau l'accès

C'est tout ! 🚀



