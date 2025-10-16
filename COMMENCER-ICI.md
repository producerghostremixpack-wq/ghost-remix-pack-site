# 🚀 COMMENCER ICI - Déploiement en 3 Étapes

> Tout est prêt ! Il ne reste que 3 commandes à lancer.

---

## ⚡ ÉTAPE 1 : Déployer le Frontend (5 min)

### Ouvrir un terminal et lancer :

```bash
vercel login
```

**Une page web s'ouvre** → Connectez-vous avec votre compte

Puis :

```bash
vercel
```

Répondez **Y** à toutes les questions, puis :

```bash
vercel --prod
```

✅ **Votre frontend est en ligne !**

📝 Notez l'URL : `https://ghost-remix-pack-______.vercel.app`

---

## 🚂 ÉTAPE 2 : Déployer le Backend (15 min)

### 1. Aller sur Railway

👉 https://railway.app/new

**Se connecter avec GitHub**

### 2. Nouveau Projet

- "Deploy from GitHub repo"
- Sélectionner : **Ghost Remix Pack**
- Le fichier `railway.json` est déjà configuré !

### 3. Ajouter les Variables d'Environnement

Copier-coller dans Railway > Variables :

```env
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI
FRONTEND_URL=https://ghost-remix-pack.vercel.app
PORT=3001
NODE_ENV=production
```

*(Remplacer l'URL frontend par la vôtre)*

### 4. Deploy

Railway déploie automatiquement !

✅ **Votre backend est en ligne !**

📝 Notez l'URL : `https://______.up.railway.app`

---

## 🔗 ÉTAPE 3 : Connecter Frontend et Backend (2 min)

### Dans Vercel Dashboard

1. Votre projet > **Settings** > **Environment Variables**
2. Ajouter :
   ```
   Name: VITE_BACKEND_URL
   Value: https://votre-backend.up.railway.app
   ```
3. Redéployer :
   ```bash
   vercel --prod
   ```

✅ **Frontend et backend sont connectés !**

---

## 🎉 C'EST EN LIGNE !

### Testez votre site :

```
https://ghost-remix-pack.vercel.app
```

### Checklist rapide :
- [ ] Site s'affiche
- [ ] Ajouter au panier fonctionne
- [ ] Aller au checkout
- [ ] Pas d'erreur dans la console (F12)

---

## 📚 Documentation Complète

Pour aller plus loin :

1. **Guide complet** : `DEPLOYMENT-COMPLET-CHECKLIST.md`
2. **Vercel détaillé** : `TUTO-VERCEL-DEPLOIEMENT.md`
3. **Railway détaillé** : `DEPLOIEMENT-BACKEND-RAILWAY.md`
4. **Tout le reste** : `RESTE-A-FAIRE-MISE-EN-LIGNE.md`

---

## 🆘 Besoin d'Aide ?

**❌ Erreur Vercel ?**
- Vérifier : `npm run build` fonctionne localement

**❌ Erreur Railway ?**
- Vérifier les variables d'environnement

**❌ CORS Error ?**
- Vérifier que `FRONTEND_URL` = URL Vercel exacte

---

## 🚀 Prochaines Étapes

1. Configurer Firebase Storage (pour téléchargements)
2. Configurer SendGrid (pour emails)
3. Configurer Stripe Webhook (pour paiements)
4. Acheter un domaine personnalisé

Tout est expliqué dans `DEPLOYMENT-COMPLET-CHECKLIST.md` !

---

## 💪 Vous êtes Prêt ?

**Lancez la première commande maintenant :**

```bash
vercel login
```

Go ! 🚀
