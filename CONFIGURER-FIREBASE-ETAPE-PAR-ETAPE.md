# 🔥 Configurer Firebase - Guide Étape par Étape

**Date :** 16 octobre 2025  
**Objectif :** Créer un projet Firebase pour sauvegarder les commandes

---

## 🎯 CE QUE VOUS ALLEZ FAIRE

1. Créer un compte Firebase (si pas encore fait)
2. Créer un nouveau projet
3. Activer Firestore (base de données)
4. Créer un compte de service
5. Télécharger le fichier JSON de credentials

---

## 📋 ÉTAPE 1 : Créer un compte Firebase

### 1.1 Aller sur Firebase
🔗 **https://console.firebase.google.com/**

### 1.2 Se connecter
- Cliquer sur **"Commencer"** ou **"Se connecter"**
- Utiliser votre compte Google
- Autoriser Firebase

---

## 📋 ÉTAPE 2 : Créer un nouveau projet

### 2.1 Ajouter un projet
- Cliquer sur **"Ajouter un projet"** ou **"Add project"**

### 2.2 Nom du projet
- **Nom du projet** : `ghost-remix-pack`
- Cliquer sur **"Continuer"**

### 2.3 Google Analytics (optionnel)
- **Voulez-vous activer Google Analytics ?**
- Choisir **"Non, pas maintenant"** (pour simplifier)
- Cliquer sur **"Créer le projet"**

### 2.4 Attendre
- Firebase va créer votre projet (30 secondes)
- Cliquer sur **"Continuer"**

---

## 📋 ÉTAPE 3 : Activer Firestore Database

### 3.1 Accéder à Firestore
- Dans le menu de gauche, cliquer sur **"Firestore Database"**
- Cliquer sur **"Créer une base de données"**

### 3.2 Mode de sécurité
- **Choisir : "Démarrer en mode test"**
- ⚠️ **IMPORTANT :** On changera ça plus tard pour la sécurité
- Cliquer sur **"Suivant"**

### 3.3 Emplacement
- **Sélectionner : "europe-west"** (Belgique)
- Cliquer sur **"Activer"**

### 3.4 Attendre
- Firebase va créer votre base de données (30-60 secondes)

---

## 📋 ÉTAPE 4 : Récupérer votre Project ID

### 4.1 Accéder aux paramètres
- Cliquer sur l'icône ⚙️ en haut à gauche
- Cliquer sur **"Paramètres du projet"**

### 4.2 Noter le Project ID
- Vous verrez **"ID du projet"**
- Le noter quelque part (exemple : `ghost-remix-pack-abc123`)

---

## 📋 ÉTAPE 5 : Créer un compte de service

### 5.1 Aller dans Comptes de service
- Dans les paramètres du projet
- Onglet **"Comptes de service"**
- Cliquer sur **"Générer une nouvelle clé privée"**

### 5.2 Confirmer
- Une popup va apparaître
- Cliquer sur **"Générer une clé"**

### 5.3 Télécharger le fichier JSON
- Un fichier JSON va se télécharger
- Exemple : `ghost-remix-pack-abc123-firebase-adminsdk-xyz.json`
- **Garder ce fichier précieusement !**

---

## 📋 ÉTAPE 6 : Ouvrir le fichier JSON

### 6.1 Trouver le fichier
- Le fichier devrait être dans votre dossier **Téléchargements**

### 6.2 Ouvrir avec un éditeur
```bash
# Dans votre terminal
open ~/Downloads/ghost-remix-pack-*-firebase-adminsdk-*.json
```

### 6.3 Copier tout le contenu
Le fichier ressemble à ça :
```json
{
  "type": "service_account",
  "project_id": "ghost-remix-pack-abc123",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xyz@ghost-remix-pack-abc123.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs/firebase-adminsdk-xyz@ghost-remix-pack-abc123.iam.gserviceaccount.com"
}
```

### 6.4 Noter le contenu
- ** du fichier JSON
- Le coller dans un fichier temporaire :
```bash
nano mes-credentials-firebase.txt
```

---

## 📋 ÉTAPE 7 : Sécuriser Firestore (IMPORTANT)

### 7.1 Aller dans Firestore
- Menu de gauche → **"Firestore Database"**
- Onglet **"Règles"**

### 7.2 Modifier les règles
Remplacer par :
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Autoriser la lecture/écriture uniquement pour les admins
    match /orders/{orderId} {
      allow read, write: if false; // Seul le backend peut écrire
    }
  }
}
```

### 7.3 Publier
- Cliquer sur **"Publier"**

---

## ✅ CHECKLIST FIREBASE

- [ ] Compte Firebase créé
- [ ] Projet créé : `ghost-remix-pack`
- [ ] Firestore activé
- [ ] Project ID noté
- [ ] Compte de service créé
- [ ] Fichier JSON téléchargé
- [ ] Contenu JSON copié
- [ ] Règles Firestore sécurisées

---

## 🔐 SÉCURITÉ

### ⚠️ NE JAMAIS :
- ❌ Commiter le fichier JSON sur GitHub
- ❌ Partager le fichier JSON publiquement
- ❌ Le mettre dans des fichiers publics
- ❌ Laisser Firestore en mode test en production

### ✅ TOUJOURS :
- ✅ Utiliser des variables d'environnement
- ✅ Stocker le JSON sur Railway (sécurisé)
- ✅ Supprimer les fichiers temporaires
- ✅ Sécuriser les règles Firestore

---

## 🎯 CE QU'IL FAUT NOTER

Vous avez besoin de **2 choses** :

### 1. Project ID
```
ghost-remix-pack-abc123
```
👉 À ajouter sur Railway : `FIREBASE_PROJECT_ID`

### 2. Credentials JSON (tout le contenu)
```json
{
  "type": "service_account",
  "project_id": "...",
  ...
}
```
👉 À ajouter sur Railway : `FIREBASE_CREDENTIALS`

---

## 📊 STRUCTURE DES DONNÉES

Firebase va créer automatiquement une collection **`orders`** avec cette structure :

```javascript
orders/
  └─ {orderId}/
      ├─ customerEmail: "client@example.com"
      ├─ customerName: "John Doe"
      ├─ items: [...]
      ├─ total: 29.99
      ├─ stripeSessionId: "cs_test_..."
      ├─ status: "completed"
      └─ createdAt: timestamp
```

---

## 🎯 PROCHAINES ÉTAPES

Une fois Firebase configuré :

1. **Configurer SendGrid** (emails)
2. **Déployer sur Railway** (backend)
3. **Ajouter les variables** sur Railway
4. **Tester l'enregistrement** des commandes

---

## 📞 SUPPORT

- **Firebase Console** : https://console.firebase.google.com
- **Documentation Firebase** : https://firebase.google.com/docs
- **Support Firebase** : https://firebase.google.com/support

---

## 💡 CONSEILS

### Firestore vs Realtime Database
- **Firestore** : Base de données moderne (recommandé)
- **Realtime Database** : Ancienne version

### Emplacements
- **europe-west** : Belgique (recommandé pour la France)
- **us-central** : États-Unis
- **asia-southeast** : Singapour

### Coûts
- **Gratuit** : Jusqu'à 1 GB de stockage
- **Payant** : À partir de 0.18$/GB/mois

---

**Prêt à configurer Firebase ?** Suivez les étapes ci-dessus ! 🚀

