# 🔧 Système de Diagnostic et Réparation Automatique - Railway

Système intelligent pour diagnostiquer et réparer automatiquement les erreurs Railway.

## 🎯 Fonctionnalités

### 1. 🔍 Diagnostic Automatique Intelligent
- Analyseur de logs Railway
- Détection des patterns d'erreurs
- Vérification des variables d'environnement
- Test de connectivité API
- Validation de la configuration serveur
- Health check multi-niveaux

### 2. 🚨 Détection d'Erreurs Spécifiques
- Port binding errors
- Variables d'environnement manquantes
- Firebase credentials corruption
- Stripe API key invalides
- Root directory mal configuré
- Package.json scripts manquants
- Dépendances cassées
- Memory/timeout issues

### 3. 🔧 Réparation Automatique
- Auto-fix configuration serveur
- Régénération des variables d'environnement
- Re-formatting Firebase credentials JSON
- Test et validation des clés API
- Reconstruction package.json scripts
- Auto-redéploiement
- Rollback automatique

### 4. 🧪 Système de Tests Automatisés
- Tests de santé pre-déploiement
- Validation des endpoints critiques
- Tests d'intégration API externes
- Tests de charge basiques
- Monitoring post-déploiement
- Alertes automatiques

### 5. 📊 Monitoring et Récupération
- Dashboard de santé temps réel
- Auto-restart en cas de crash
- Backup automatique des configurations
- Historique des incidents
- Métriques de performance
- Notifications proactives

## 🚀 Installation

```bash
cd railway-diagnostics
npm install
```

## 📋 Utilisation

### Diagnostic Complet
```bash
npm run diagnose
```

### Réparation Automatique
```bash
npm run fix
```

### Tests Complets
```bash
npm run test
```

### Monitoring
```bash
npm run monitor
```

## 🔍 Diagnostic

Le système vérifie :
- ✅ Backend (health check)
- ✅ Frontend (accessibilité)
- ✅ Firebase (credentials)
- ✅ Stripe (clés API)
- ✅ SendGrid (clé API)
- ✅ Serveur (configuration)

## 🔧 Réparation Automatique

Le système peut corriger :
- Variables d'environnement manquantes
- Configuration serveur incorrecte
- Credentials Firebase malformés
- Scripts package.json manquants
- Configuration Railway

## 📊 Résultats

Les résultats sont affichés dans le terminal avec :
- Statut de chaque service
- Liste des problèmes détectés
- Recommandations de correction

## 🎯 Objectifs

- **Backend** : Répond aux requêtes
- **Frontend** : Accessible et fonctionnel
- **Firebase** : Credentials valides
- **Stripe** : Clés API valides
- **SendGrid** : Clé API valide
- **Serveur** : Configuration correcte

## 🔧 Configuration

Modifiez les URLs dans les scripts pour analyser d'autres environnements.

## 📞 Support

Pour toute question, consultez la documentation Railway :
https://docs.railway.app

---

**Créé avec ❤️ pour Ghost Remix Pack**

