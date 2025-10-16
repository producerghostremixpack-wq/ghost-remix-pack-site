# 🤖 SCRIPTS AUTOMATIQUES
## Ghost Remix Pack - Automatisation Complète

---

## 🎯 SCRIPTS DISPONIBLES

Votre projet dispose maintenant de **7 scripts automatiques** pour vous faciliter la vie !

---

## 📋 LISTE DES SCRIPTS

### **🔍 1. `check-installation.sh`**
**Vérification complète de l'installation**

```bash
./check-installation.sh
```

**Ce qu'il fait :**
- ✅ Vérifie la structure du projet
- ✅ Contrôle tous les fichiers critiques
- ✅ Analyse la configuration backend (.env)
- ✅ Vérifie les dépendances Node.js
- ✅ Compte les fichiers audio
- ✅ Teste les outils (Node, npm, Git, Stripe CLI)
- ✅ Affiche un score de complétion avec pourcentage
- ✅ Donne les actions à effectuer

**Quand l'utiliser :** Première chose à faire, ou à chaque fois que vous voulez un diagnostic

---

### **⚙️ 2. `setup-auto.sh`** ⭐ NOUVEAU
**Configuration automatique complète**

```bash
./setup-auto.sh
```

**Ce qu'il fait :**
- ✅ Vérifie Node.js et npm
- ✅ Installe automatiquement les dépendances (frontend + backend)
- ✅ Crée le fichier .env depuis le template
- ✅ Vérifie la configuration Stripe
- ✅ Vérifie la présence de la clé Firebase
- ✅ Lance la vérification de configuration backend
- ✅ Crée les dossiers nécessaires (.logs, downloads)
- ✅ Affiche un résumé de ce qui manque encore

**Quand l'utiliser :** Pour une configuration automatique en une seule commande

**⏱️ Durée :** 2-5 minutes

---

### **🔐 3. `configure-env-auto.sh`** ⭐ NOUVEAU
**Configuration interactive du fichier .env**

```bash
./configure-env-auto.sh
```

**Ce qu'il fait :**
- ✅ Détecte si .env existe déjà (propose backup)
- ✅ Récupère automatiquement les clés Stripe depuis VARIABLES-BACKEND-COPIER.txt
- ✅ Pose des questions interactives pour chaque variable
- ✅ Propose des valeurs par défaut
- ✅ Met à jour le fichier .env
- ✅ Lance une vérification finale

**Variables configurées :**
- 💳 Stripe (clé secrète, clé publique, webhook)
- 🔥 Firebase (project ID)
- 📧 SendGrid (API key, email - optionnel)
- ⚙️ Serveur (port, URLs, environnement)

**Quand l'utiliser :** Pour configurer .env de manière guidée

**⏱️ Durée :** 3-5 minutes

---

### **🚀 4. `start-all.sh`** ⭐ NOUVEAU
**Démarrage automatique de tous les serveurs**

```bash
./start-all.sh
```

**Ce qu'il fait :**
- ✅ Vérifie Node.js et npm
- ✅ Vérifie/installe les dépendances si manquantes
- ✅ Crée le fichier .env si manquant
- ✅ Démarre le backend (port 3001)
- ✅ Démarre le frontend (port 5173)
- ✅ Crée des logs dans .logs/backend.log et .logs/frontend.log
- ✅ Affiche les URLs (frontend, backend, API health)
- ✅ Ouvre automatiquement le navigateur (Mac)
- ✅ Permet d'arrêter tout avec Ctrl+C

**Quand l'utiliser :** Pour démarrer rapidement tout le projet

**⏱️ Durée :** ~10 secondes

**💡 Astuce :** Les logs sont dans `.logs/` si besoin de debug

---

### **🧪 5. `test-auto.sh`** ⭐ NOUVEAU
**Tests automatiques complets**

```bash
./test-auto.sh
```

**Ce qu'il fait :**
- ✅ Tests de structure (dossiers, fichiers)
- ✅ Tests de configuration (.env, Firebase, Stripe)
- ✅ Tests des dépendances (node_modules)
- ✅ Tests des outils (Node, npm, Git)
- ✅ Tests API (si serveurs actifs)
- ✅ Tests de documentation (guides présents)
- ✅ Affiche un score avec statistiques
- ✅ Retourne un code de sortie (0 = succès, 1 = échec)

**Quand l'utiliser :** 
- Après la configuration
- Avant un déploiement
- Pour vérifier que tout fonctionne

**⏱️ Durée :** 5-10 secondes

---

### **🚀 6. Commandes NPM**

#### **Frontend**
```bash
npm run dev        # Démarrer en développement
npm run build      # Build pour production
npm run preview    # Prévisualiser le build
```

#### **Backend**
```bash
cd backend
npm run dev        # Démarrer avec nodemon (auto-reload)
npm start          # Démarrer en production
npm run check      # Vérifier la configuration
```

---

## 🎯 PARCOURS RECOMMANDÉS

### **Parcours A : Premier Démarrage** ⚡

```bash
# 1. Vérifier l'installation
./check-installation.sh

# 2. Configuration automatique
./setup-auto.sh

# 3. Configurer le .env (interactif)
./configure-env-auto.sh

# 4. Tester
./test-auto.sh

# 5. Démarrer tout
./start-all.sh
```

**⏱️ Temps total :** 10-15 minutes

---

### **Parcours B : Démarrage Rapide** 🚀

Si tout est déjà configuré :

```bash
./start-all.sh
```

C'est tout ! Le script vérifie et démarre tout automatiquement.

---

### **Parcours C : Diagnostic Complet** 🔍

Pour diagnostiquer un problème :

```bash
# 1. Vérification générale
./check-installation.sh

# 2. Tests détaillés
./test-auto.sh

# 3. Vérification config backend
cd backend && npm run check
```

---

## 📊 COMPARAISON DES SCRIPTS

| Script | Durée | Interactif | Installation | Configuration | Tests | Démarrage |
|--------|-------|------------|--------------|---------------|-------|-----------|
| `check-installation.sh` | 5s | ❌ | - | - | ✅ | - |
| `setup-auto.sh` | 3-5min | ⚠️ (1 question) | ✅ | ✅ | ✅ | - |
| `configure-env-auto.sh` | 3-5min | ✅ | - | ✅ | ✅ | - |
| `start-all.sh` | 10s | ❌ | ⚠️ (si manquant) | ⚠️ (si manquant) | - | ✅ |
| `test-auto.sh` | 10s | ❌ | - | - | ✅ | - |

---

## 🎨 EXEMPLES D'UTILISATION

### **Exemple 1 : Configuration depuis zéro**

```bash
# Étape 1 : Diagnostic initial
./check-installation.sh

# Résultat : 50% - Il manque .env et dépendances

# Étape 2 : Configuration automatique
./setup-auto.sh

# Résultat : Dépendances installées, .env créé avec template

# Étape 3 : Configuration interactive
./configure-env-auto.sh

# Vous répondez aux questions, les clés Stripe sont auto-détectées

# Étape 4 : Vérification finale
./test-auto.sh

# Résultat : 95% ✅ (Il manque juste Firebase - optionnel)

# Étape 5 : Démarrage
./start-all.sh

# ✅ Site accessible sur http://localhost:5173
```

---

### **Exemple 2 : Démarrage quotidien**

```bash
./start-all.sh
```

C'est tout ! Le navigateur s'ouvre automatiquement.

**Pour arrêter :** `Ctrl+C`

---

### **Exemple 3 : Diagnostic d'erreur**

```bash
# Le site ne marche pas, je ne sais pas pourquoi...

./check-installation.sh

# ❌ backend/.env manquant
# ❌ Dépendances backend non installées

# Solution automatique :
./setup-auto.sh

# Puis relancer :
./start-all.sh
```

---

## 🛠️ DÉTAILS TECHNIQUES

### **Logs**

Les scripts créent des logs dans `.logs/` :
- `.logs/backend.log` - Logs du backend
- `.logs/frontend.log` - Logs du frontend

**Consulter les logs en temps réel :**
```bash
# Backend
tail -f .logs/backend.log

# Frontend
tail -f .logs/frontend.log
```

---

### **Processus en arrière-plan**

`start-all.sh` lance les serveurs en arrière-plan. Pour les arrêter :

**Méthode 1 :** Dans le terminal où `start-all.sh` tourne :
```bash
Ctrl+C
```

**Méthode 2 :** Manuellement :
```bash
# Trouver les processus
ps aux | grep node

# Tuer un processus
kill <PID>
```

---

### **Gestion des erreurs**

Tous les scripts affichent des messages colorés :
- 🟢 **Vert** = Succès
- 🔴 **Rouge** = Erreur
- 🟡 **Jaune** = Avertissement
- 🔵 **Bleu** = Information

**Codes de sortie :**
- `0` = Succès
- `1` = Échec

Utilisable dans vos propres scripts :
```bash
if ./test-auto.sh; then
    echo "Tests OK, on continue"
else
    echo "Tests échoués, on arrête"
fi
```

---

## 🎯 AVANTAGES DES SCRIPTS

### **Avant (Manuel) :**
```bash
# Terminal 1
cd backend
npm install
npm run dev

# Terminal 2
npm install
npm run dev

# Ouvrir le navigateur manuellement
# Vérifier manuellement si tout fonctionne
```

**⏱️ Temps :** ~5 minutes, 2 terminaux, beaucoup de commandes

---

### **Maintenant (Automatique) :**
```bash
./start-all.sh
```

**⏱️ Temps :** ~10 secondes, 1 commande, 1 terminal !

---

## 📝 PERSONNALISATION

### **Modifier les ports**

Éditez `backend/.env` :
```bash
PORT=3001                    # Port backend
FRONTEND_URL=http://localhost:5173  # URL frontend
```

### **Désactiver l'ouverture auto du navigateur**

Éditez `start-all.sh`, commentez ces lignes (vers la fin) :
```bash
# if [[ "$OSTYPE" == "darwin"* ]]; then
#     sleep 2
#     open http://localhost:5173 2>/dev/null
# fi
```

### **Changer les chemins des logs**

Éditez `start-all.sh`, changez :
```bash
mkdir -p .logs  # → mkdir -p mes-logs
```

---

## 🔧 DÉPANNAGE

### **"Permission denied"**

```bash
chmod +x *.sh
```

### **"command not found: node"**

Installez Node.js : https://nodejs.org

### **Les serveurs ne démarrent pas**

1. Vérifiez les logs :
```bash
cat .logs/backend.log
cat .logs/frontend.log
```

2. Vérifiez la configuration :
```bash
./check-installation.sh
```

3. Réinstallez les dépendances :
```bash
rm -rf node_modules backend/node_modules
./setup-auto.sh
```

### **Port déjà utilisé**

Si le port 3001 ou 5173 est déjà utilisé :

```bash
# Trouver le processus
lsof -i :3001
lsof -i :5173

# Tuer le processus
kill -9 <PID>
```

---

## 📚 DOCUMENTATION ASSOCIÉE

| Document | Description |
|----------|-------------|
| `LIRE-EN-PREMIER.md` | Point d'entrée du projet |
| `COMMENCER-MAINTENANT.md` | Guide de démarrage manuel (5 étapes) |
| `CHECKING-COMPLET-ET-TUTORIEL.md` | Tutoriel exhaustif |
| `STATUT-PROJET.md` | État du projet |
| `TEST-CHECKLIST.md` | Checklist de tests manuels |

---

## ✅ CHECKLIST D'UTILISATION

### **Première fois**
- [ ] Exécuter `./check-installation.sh`
- [ ] Exécuter `./setup-auto.sh`
- [ ] Exécuter `./configure-env-auto.sh`
- [ ] Exécuter `./test-auto.sh`
- [ ] Exécuter `./start-all.sh`
- [ ] Tester le site dans le navigateur

### **Utilisation quotidienne**
- [ ] Exécuter `./start-all.sh`
- [ ] Travailler sur le projet
- [ ] Arrêter avec `Ctrl+C`

### **Avant un déploiement**
- [ ] Exécuter `./test-auto.sh`
- [ ] Vérifier que tous les tests passent (score > 90%)
- [ ] Consulter `CHECKING-COMPLET-ET-TUTORIEL.md` - Déploiement

---

## 🎉 RÉSUMÉ

**Vous avez maintenant 7 scripts automatiques qui font le travail pour vous !**

```
1. check-installation.sh      → Diagnostic complet
2. setup-auto.sh              → Configuration automatique
3. configure-env-auto.sh      → Configuration .env interactive
4. start-all.sh               → Démarrage en 1 clic
5. test-auto.sh               → Tests automatiques
6. npm scripts                → Commandes classiques
7. backend/check-config.js    → Vérification backend
```

**Plus besoin de vous rappeler de toutes les commandes !**

---

## 🚀 COMMENCEZ MAINTENANT

```bash
# Si c'est la première fois :
./setup-auto.sh

# Puis :
./start-all.sh
```

**C'est tout ! 🎉**

---

_Créé le 15 octobre 2025_  
_Ghost Remix Pack - Documentation Automatique_

