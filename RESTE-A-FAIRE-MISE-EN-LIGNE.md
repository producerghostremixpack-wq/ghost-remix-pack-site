# 🚀 Reste à Faire pour la Mise en Ligne - Ghost Remix Pack

## 📋 Vue d'ensemble
Ce document liste toutes les étapes restantes pour déployer votre site en production.

## ✅ Ce qui est déjà fait
- ✓ Site frontend fonctionnel (React + Vite)
- ✓ Backend configuré (Express + Stripe + Firebase)
- ✓ Panier e-commerce avec persistance
- ✓ Interface utilisateur complète
- ✓ Configuration Stripe en mode test

## 🔴 ÉTAPES CRITIQUES AVANT MISE EN LIGNE

### 1. 🔐 Configuration des Variables d'Environnement

#### Frontend (`/.env`)
```bash
VITE_BACKEND_URL=https://votre-backend.com
VITE_STRIPE_PUBLIC_KEY=pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI  # Clé publique Stripe LIVE
```

#### Backend (`/backend/.env`)
```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_LIVE_ICI      # Clé secrète Stripe LIVE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI    # Secret webhook Stripe

# Firebase
FIREBASE_PROJECT_ID=votre-projet
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@votre-projet.iam.gserviceaccount.com

# SendGrid
SENDGRID_API_KEY=SG.XXXXXX
SENDGRID_FROM_EMAIL=contact@votredomaine.com

# URLs
FRONTEND_URL=https://votredomaine.com
DOWNLOAD_BASE_URL=https://votredomaine.com/downloads
```

### 2. 💳 Stripe Production

#### a) Activer le mode Live
1. Aller sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. Basculer en mode "Live" (switch en haut)
3. Compléter la vérification d'identité
4. Configurer les informations bancaires

#### b) Créer les produits en Live
```javascript
// Dans Stripe Dashboard > Produits
// Créer chaque pack avec les prix correspondants
```

#### c) Configurer le Webhook
1. Dashboard Stripe > Développeurs > Webhooks
2. Ajouter endpoint : `https://votre-backend.com/api/webhook`
3. Sélectionner l'événement : `checkout.session.completed`
4. Copier le secret webhook dans `.env`

### 3. 🌐 Déploiement Frontend

#### Option A : Vercel (Recommandé)
```bash
# Installation
npm i -g vercel

# Déploiement
vercel

# Configuration
# - Framework: Vite
# - Build Command: npm run build
# - Output Directory: dist
# - Install Command: npm install
```

#### Option B : Netlify
```bash
# Build local
npm run build

# Drag & drop du dossier 'dist' sur netlify.com
# OU
# Connecter le repo GitHub
```

#### Configuration DNS
```
Type: A
Name: @
Value: IP_VERCEL_OU_NETLIFY

Type: CNAME
Name: www
Value: votredomaine.com
```

### 4. 🖥️ Déploiement Backend

#### Option A : Heroku
```bash
# Dans /backend
heroku create ghost-remix-backend
heroku config:set NODE_ENV=production
heroku config:set STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_LIVE_ICI
# ... autres variables

git push heroku main
```

#### Option B : Railway.app
1. Connecter GitHub
2. Sélectionner le dossier `/backend`
3. Ajouter toutes les variables d'environnement
4. Deploy

#### Option C : VPS (DigitalOcean/OVH)
```bash
# Sur le serveur
git clone votre-repo
cd backend
npm install
npm install -g pm2

# Démarrer avec PM2
pm2 start server.js --name ghost-remix-api
pm2 save
pm2 startup
```

### 5. 📦 Configuration Firebase Storage

1. **Créer les buckets** pour les fichiers audio
```javascript
// Structure dans Firebase Storage
/packs/
  /house/
    pack1.zip
    pack2.zip
  /afro/
    pack1.zip
  /rap/
    pack1.zip
```

2. **Règles de sécurité**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /packs/{packId}/{file} {
      allow read: if request.auth != null;
    }
  }
}
```

### 6. 🔒 Sécurité

#### a) HTTPS obligatoire
- Frontend : Automatique avec Vercel/Netlify
- Backend : Certificat SSL avec Let's Encrypt

#### b) CORS Configuration
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

#### c) Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite par IP
});
app.use('/api/', limiter);
```

### 7. 📧 Configuration Email (SendGrid)

1. Vérifier le domaine dans SendGrid
2. Configurer SPF/DKIM/DMARC
3. Créer les templates d'email:
   - Confirmation de commande
   - Lien de téléchargement
   - Newsletter

### 8. 📊 Analytics & Monitoring

#### Google Analytics
```html
<!-- Dans index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"></script>
```

#### Monitoring Backend
- Sentry pour les erreurs
- LogRocket ou DataDog pour le monitoring

### 9. ✅ Checklist Finale

#### Tests en production
- [ ] Processus d'achat complet
- [ ] Réception des emails
- [ ] Téléchargement des fichiers
- [ ] Webhook Stripe fonctionnel
- [ ] Panier persistent
- [ ] Pages responsives

#### Optimisations
- [ ] Images optimisées (WebP)
- [ ] Lazy loading activé
- [ ] Cache headers configurés
- [ ] Compression gzip activée

#### Légal
- [ ] Mentions légales à jour
- [ ] CGV complètes
- [ ] Politique de confidentialité
- [ ] Bannière cookies (si nécessaire)

## 📅 Planning Estimé

1. **Jour 1-2** : Configuration Stripe Live + Firebase
2. **Jour 3** : Déploiement Frontend
3. **Jour 4** : Déploiement Backend
4. **Jour 5** : Tests et ajustements
5. **Jour 6** : Monitoring et analytics
6. **Jour 7** : Go Live! 🎉

## 💰 Coûts Mensuels Estimés

- **Domaine** : ~15€/an
- **Frontend** : 0€ (Vercel/Netlify gratuit)
- **Backend** : 
  - Heroku : ~7€/mois
  - Railway : ~5€/mois
  - VPS : ~5-20€/mois
- **Firebase** : 0€ (quota gratuit suffisant au début)
- **SendGrid** : 0€ (100 emails/jour gratuits)
- **Total** : ~5-20€/mois

## 🆘 Support

### Problèmes Fréquents
1. **CORS errors** : Vérifier FRONTEND_URL dans .env
2. **Webhook fails** : Vérifier le secret et l'URL
3. **Download fails** : Vérifier Firebase Storage rules
4. **Email not sent** : Vérifier SendGrid domain verification

### Commandes Utiles
```bash
# Logs Heroku
heroku logs --tail

# Logs PM2
pm2 logs

# Test webhook local
stripe listen --forward-to localhost:3001/api/webhook
```

## 🎯 Prochaine Étape Immédiate

1. **Créer un compte Vercel** : https://vercel.com
2. **Installer Vercel CLI** : `npm i -g vercel`
3. **Déployer le frontend** : `vercel` (depuis la racine du projet)

Une fois le frontend en ligne, vous aurez l'URL pour configurer le backend ! 🚀
