# 🚀 Automatisation Complète - Déploiement Railway

Système d'automatisation complet pour déployer le backend Ghost Remix Pack sur Railway.

## 📋 Prérequis

- Node.js 18+
- Compte Railway
- Compte Stripe
- Compte Firebase
- Compte SendGrid

## 🚀 Installation

```bash
cd automation
npm install
```

## 🎯 Utilisation

### 1. Configuration Initiale

```bash
npm run setup
```

Ce script interactif va vous demander :
- Clés API Stripe
- Credentials Firebase
- Clé API SendGrid
- Configuration Railway

### 2. Déploiement Automatique

```bash
npm run deploy:auto
```

Ce script va :
1. Valider toutes les configurations
2. Se connecter à Railway
3. Créer/mettre à jour le projet
4. Déployer le backend
5. Configurer le webhook Stripe
6. Lancer les tests
7. Afficher le dashboard

### 3. Tests

```bash
npm run test
```

Tests automatiques :
- ✅ Santé de l'API
- ✅ Webhook Stripe
- ✅ Email SendGrid
- ✅ Connection Firebase

### 4. Monitoring

```bash
npm run monitor
```

Dashboard en temps réel avec :
- Statut du backend
- Logs
- Métriques
- Alertes

## 📁 Structure

```
automation/
├── railway.json          # Configuration Railway
├── setup.js             # Configuration interactive
├── deploy.js            # Déploiement manuel
├── deploy-auto.js       # Déploiement automatique
├── test.js              # Tests automatiques
├── monitor.js           # Dashboard monitoring
├── webhook-config.js    # Config webhook Stripe
├── validate.js          # Validation des configs
├── .env.template        # Template variables
└── README.md           # Ce fichier
```

## 🔐 Sécurité

- Les variables sensibles sont chiffrées
- Validation des formats de clés API
- Audit trail des déploiements
- Backup automatique des configs

## 🆘 Support

En cas de problème, consultez les logs :
```bash
cat logs/deploy.log
```

## 📊 Variables d'Environnement

Toutes les variables sont définies dans `.env.template`.

**Important :** Ne commitez JAMAIS le fichier `.env` sur GitHub !

## 🎉 Résultat

Après le déploiement, vous aurez :
- ✅ Backend déployé sur Railway
- ✅ Webhook Stripe configuré
- ✅ Tests validés
- ✅ Monitoring actif
- ✅ Documentation générée

---

**Créé avec ❤️ pour Ghost Remix Pack**

