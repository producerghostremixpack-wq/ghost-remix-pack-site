# 🚀 Guide Rapide - Automatisation Railway

## 🎯 Démarrage Ultra-Rapide

### 1️⃣ Installation (1 minute)
```bash
cd automation
npm install
```

### 2️⃣ Configuration (5 minutes)
```bash
npm run setup
```
Suivez les instructions interactives pour entrer vos clés API.

### 3️⃣ Déploiement (10 minutes)
```bash
npm run deploy:auto
```
Tout se configure automatiquement !

### 4️⃣ Monitoring
```bash
npm run monitor
```
Dashboard en temps réel.

---

## 📋 Checklist Avant de Commencer

Assurez-vous d'avoir :
- ✅ Compte Railway
- ✅ Clés Stripe (secrète + publique)
- ✅ Firebase Project ID + Credentials JSON
- ✅ Clé API SendGrid
- ✅ Email SendGrid vérifié

---

## 🆘 Problèmes Courants

### ❌ "Fichier .env introuvable"
**Solution :** Lancez `npm run setup`

### ❌ "Railway login failed"
**Solution :** Connectez-vous manuellement : `railway login`

### ❌ "Tests échoués"
**Solution :** Vérifiez vos clés API dans `.env`

---

## 🎉 Résultat Final

Après le déploiement, vous aurez :
- ✅ Backend déployé sur Railway
- ✅ Webhook Stripe configuré
- ✅ Tests validés
- ✅ Monitoring actif

---

## 📞 Support

Consultez les logs :
```bash
cat logs/deploy.log
```

---

**Créé avec ❤️ pour Ghost Remix Pack**

