# 🚀 Backend API - Ghost Remix Pack

Backend Express.js pour gérer les paiements Stripe, sauvegarder les commandes et envoyer les emails.

---

## 🎯 Fonctionnalités

✅ **Paiement Stripe Checkout** - Cartes bancaires sécurisées  
✅ **Base de données Firebase** - Sauvegarde des commandes et clients  
✅ **Emails automatiques** - Confirmation et livraison  
✅ **Webhooks Stripe** - Traitement des paiements réussis  
✅ **API REST** - Communication avec le frontend  
✅ **Liens de téléchargement** - Sécurisés et temporaires (à compléter)  

---

## 📦 Stack Technique

- **Runtime** : Node.js 18+
- **Framework** : Express.js
- **Paiement** : Stripe API
- **Database** : Firebase Firestore
- **Email** : SendGrid
- **CORS** : Activé pour frontend

---

## 🚀 Démarrage Rapide

```bash
# 1. Installer
npm install

# 2. Configurer (voir INSTALLATION.md)
cp env.example .env
# Remplir .env avec vos clés API

# 3. Ajouter la clé Firebase
# Placer serviceAccountKey.json dans ce dossier

# 4. Démarrer
npm run dev
```

**Serveur sur : http://localhost:3001**

---

## 📡 Routes API

### Health Check
```
GET /api/health
→ Vérifier que l'API fonctionne
```

### Créer Session Stripe
```
POST /api/checkout/create-session
Body: { cart: [...], customer: {...} }
→ Retourne l'URL Stripe Checkout
```

### Récupérer Session
```
GET /api/checkout/session/:sessionId
→ Détails d'une session Stripe
```

### Webhook Stripe
```
POST /api/webhook
→ Traité automatiquement par Stripe
```

### Téléchargement
```
GET /api/download/:orderId/:packId
→ Lien de téléchargement sécurisé
```

---

## 🔑 Variables d'Environnement Requises

Voir `env.example` pour le template complet.

**Obligatoires :**
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `FIREBASE_PROJECT_ID`
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`

---

## 📁 Structure

```
backend/
├── server.js                 → Serveur principal
├── routes/
│   ├── checkout.js          → Gestion paiement
│   ├── webhook.js           → Webhooks Stripe
│   └── download.js          → Liens téléchargement
├── services/
│   ├── stripe.js            → API Stripe
│   ├── firebase.js          → Database Firebase
│   └── email.js             → Emails SendGrid
├── package.json
├── .env                     → Variables (à créer)
├── env.example              → Template
├── serviceAccountKey.json   → Clé Firebase (à ajouter)
├── .gitignore
├── README.md (ce fichier)
└── INSTALLATION.md          → Guide détaillé
```

---

## 📚 Documentation

Consultez **INSTALLATION.md** pour le guide complet étape par étape.

---

## 🐛 Support

En cas de problème, consultez la section "DÉPANNAGE" dans INSTALLATION.md

---

## 📄 Licence

MIT - Ghost Remix Pack © 2025







