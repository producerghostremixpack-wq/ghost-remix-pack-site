# 🔑 Où Trouver les Clés API - Guide Complet

## 📋 Liste des Clés Nécessaires

Vous avez besoin de **6 éléments** :

1. ✅ Clé secrète Stripe
2. ✅ Clé publique Stripe
3. ✅ Firebase Project ID
4. ✅ Firebase Credentials JSON
5. ✅ Clé API SendGrid
6. ✅ Email SendGrid

---

## 1️⃣ STRIPE - Clés API

### 🔗 Où aller :
👉 **https://dashboard.stripe.com/test/apikeys**

### 📝 Ce qu'il faut faire :
1. Connectez-vous à votre compte Stripe
2. Assurez-vous d'être en mode **Test** (toggle en haut à droite)
3. Allez dans **Developers** → **API keys**
4. Vous verrez 2 clés :

#### Clé Secrète (Secret key)
```
sk_test_51ABC... (longue chaîne)
```
- Cliquez sur **"Reveal test key"** pour la voir
- Cliquez sur **"Copy"** pour la copier

#### Clé Publique (Publishable key)
```
pk_test_51ABC... (longue chaîne)
```
- Elle est déjà visible
- Cliquez sur **"Copy"** pour la copier

### ✅ Ce qu'il me faut :
- Clé secrète : `sk_test_...`
- Clé publique : `pk_test_...`

---

## 2️⃣ FIREBASE - Project ID

### 🔗 Où aller :
👉 **https://console.firebase.google.com/project/ghost-remix-pack/settings/general**

### 📝 Ce qu'il faut faire :
1. Connectez-vous à Firebase
2. Sélectionnez votre projet : **ghost-remix-pack**
3. Allez dans **Paramètres** (icône ⚙️ en haut à gauche)
4. Onglet **"General"**
5. Vous verrez **"Project ID"**

### ✅ Ce qu'il me faut :
- Project ID : `ghost-remix-pack`

---

## 3️⃣ FIREBASE - Credentials JSON

### 🔗 Où aller :
👉 **https://console.firebase.google.com/project/ghost-remix-pack/settings/serviceaccounts/adminsdk**

### 📝 Ce qu'il faut faire :
1. Dans Firebase, allez dans **Paramètres** (⚙️)
2. Onglet **"Service accounts"**
3. Cliquez sur **"Generate new private key"**
4. Cliquez sur **"Generate key"**
5. Un fichier JSON va se télécharger
6. **Ouvrez ce fichier** et **copiez TOUT le contenu**

### ✅ Ce qu'il me faut :
- Le contenu COMPLET du fichier JSON (avec les accolades `{` et `}`)

**Exemple :**
```json
{
  "type": "service_account",
  "project_id": "ghost-remix-pack",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  "client_id": "...",
  ...
}
```

---

## 4️⃣ SENDGRID - Clé API

### 🔗 Où aller :
👉 **https://app.sendgrid.com/settings/api_keys**

### 📝 Ce qu'il faut faire :
1. Connectez-vous à SendGrid
2. Allez dans **Settings** → **API Keys**
3. Cliquez sur **"Create API Key"**
4. Nom : `Ghost Remix Pack Backend`
5. Permissions : **Full Access**
6. Cliquez sur **"Create & View"**
7. **COPIEZ LA CLÉ IMMÉDIATEMENT** (vous ne pourrez plus la voir après !)

### ✅ Ce qu'il me faut :
- Clé API : `SG.abc123xyz...` (commence par SG.)

---

## 5️⃣ SENDGRID - Email Vérifié

### 🔗 Où aller :
👉 **https://app.sendgrid.com/settings/sender_auth/senders**

### 📝 Ce qu'il faut faire :
1. Dans SendGrid, allez dans **Settings** → **Sender Authentication**
2. Cliquez sur **"Verify a Single Sender"**
3. Remplissez le formulaire avec votre email
4. Vérifiez l'email envoyé
5. Une fois vérifié, **notez cet email**

### ✅ Ce qu'il me faut :
- Email vérifié : `votre-email@example.com`

---

## 📊 RÉCAPITULATIF

| # | Service | Ce qu'il me faut | Où le trouver |
|---|---------|------------------|---------------|
| 1 | Stripe | Clé secrète (sk_test_...) | Dashboard Stripe → API keys |
| 2 | Stripe | Clé publique (pk_test_...) | Dashboard Stripe → API keys |
| 3 | Firebase | Project ID (ghost-remix-pack) | Console Firebase → Paramètres |
| 4 | Firebase | Credentials JSON complet | Console Firebase → Service accounts |
| 5 | SendGrid | Clé API (SG.xxx...) | Dashboard SendGrid → API Keys |
| 6 | SendGrid | Email vérifié | Dashboard SendGrid → Sender Auth |

---

## 🎯 ORDRE RECOMMANDÉ

1. **Stripe** (2 clés) - 2 minutes
2. **Firebase Project ID** (1 info) - 1 minute
3. **Firebase Credentials** (JSON complet) - 2 minutes
4. **SendGrid API Key** (1 clé) - 2 minutes
5. **SendGrid Email** (1 email) - 1 minute

**Temps total : ~8 minutes**

---

## 💡 CONSEILS

### ⚠️ Sécurité
- Ne partagez JAMAIS ces clés publiquement
- Ne les commitez PAS sur GitHub
- Supprimez les fichiers temporaires après

### ✅ Validation
- Stripe : Commence par `sk_test_` ou `pk_test_`
- Firebase : JSON valide avec accolades
- SendGrid : Commence par `SG.`

---

## 🆘 BESOIN D'AIDE ?

Si vous avez des questions sur :
- Où trouver une clé spécifique
- Comment copier le JSON Firebase
- Comment vérifier un email SendGrid

**Dites-le moi et je vous guide !** 😊

---

**Une fois que vous avez toutes les clés, donnez-les moi et je créerai le fichier .env pour vous !** 🚀

