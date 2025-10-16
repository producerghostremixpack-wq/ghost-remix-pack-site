# ⚡ Guide Rapide Stripe - 3 Étapes (5 min)

**Votre Compte :** `acct_1SHjdhH8jTnKrV0h`  
**Dashboard :** https://dashboard.stripe.com/test/dashboard

---

## 🎯 CE QU'IL FAUT FAIRE (5 minutes)

### ✅ Fichier `.env` déjà créé !

Le fichier `backend/.env` existe avec votre ID de compte.

**Il ne manque que 3 informations à copier-coller !**

---

## 📋 ÉTAPE 1/3 : Clés API (2 min)

### 1. Ouvrez ce lien dans votre navigateur :

```
https://dashboard.stripe.com/test/apikeys
```

### 2. Vous verrez une page avec 2 clés :

#### 🔑 Clé Publiable (Publishable key)
- Visible directement
- Format : `pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI...`
- **Action :** Copiez cette clé

#### 🔐 Clé Secrète (Secret key)
- Masquée par défaut
- Cliquez sur **"Reveal test key"** ou l'icône "œil"
- Format : `sk_test_VOTRE_CLE_TEST_ICI...`
- **Action :** Copiez cette clé

### 3. Ouvrez le fichier :

```bash
/Users/djshek/Documents/Le site Ghost Remix Pack/backend/.env
```

### 4. Remplacez ces 2 lignes :

**AVANT :**
```env
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI
```

**APRÈS :**
```env
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI... (collez votre clé secrète)
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI... (collez votre clé publique)
```

### 5. AUSSI : Ouvrez le fichier :

```bash
/Users/djshek/Documents/Le site Ghost Remix Pack/src/config/stripe.ts
```

### 6. Remplacez cette ligne :

**AVANT :**
```typescript
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI';
```

**APRÈS :**
```typescript
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI...'; (collez votre clé publique)
```

✅ **Étape 1 terminée !**

---

## 📋 ÉTAPE 2/3 : Webhook (3 min)

### 1. Ouvrez ce lien :

```
https://dashboard.stripe.com/test/webhooks
```

### 2. Cliquez sur le bouton :

**`+ Ajouter un point de terminaison`** (ou `+ Add endpoint`)

### 3. Remplissez le formulaire :

**URL du point de terminaison :**
```
http://localhost:3001/api/webhook
```

**Description (optionnel) :**
```
Ghost Remix Pack - Local Development
```

### 4. Section "Écouter" :

Cliquez sur : **`+ Sélectionner des événements`** (ou `+ Select events`)

### 5. Dans la recherche, tapez :

```
checkout.session.completed
```

### 6. Cochez la case :

✅ `checkout.session.completed`

### 7. Cliquez sur :

**`Ajouter des événements`** puis **`Ajouter un point de terminaison`**

### 8. Vous verrez une nouvelle page avec :

**Secret de signature** (ou **Signing secret**)

Format : `whsec_VOTRE_WEBHOOK_SECRET_ICI...`

### 9. Cliquez sur :

**`Cliquer pour révéler`** (ou `Click to reveal`)

### 10. Copiez le secret (format `whsec_VOTRE_WEBHOOK_SECRET_ICI...`)

### 11. Ouvrez le fichier :

```bash
/Users/djshek/Documents/Le site Ghost Remix Pack/backend/.env
```

### 12. Remplacez cette ligne :

**AVANT :**
```env
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI
```

**APRÈS :**
```env
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI... (collez votre secret)
```

✅ **Étape 2 terminée !**

---

## 📋 ÉTAPE 3/3 : Vérifier et Démarrer (2 min)

### 1. Vérifier la configuration :

```bash
cd /Users/djshek/Documents/Le\ site\ Ghost\ Remix\ Pack/backend
npm run check
```

**Vous devriez voir :**
```
✅ STRIPE_SECRET_KEY configurée
✅ STRIPE_PUBLISHABLE_KEY configurée
✅ STRIPE_WEBHOOK_SECRET configuré
✅ Configuration complète !
```

### 2. Installer les dépendances (si pas déjà fait) :

```bash
npm install
```

### 3. Démarrer le backend :

**Terminal 1 :**
```bash
cd /Users/djshek/Documents/Le\ site\ Ghost\ Remix\ Pack/backend
npm run dev
```

**Vous devriez voir :**
```
╔═══════════════════════════════════════════╗
║  🚀 Ghost Remix Backend API               ║
║  ✅ Serveur démarré sur port 3001        ║
║  🔒 Stripe: Configuré ✅                  ║
╚═══════════════════════════════════════════╝
```

### 4. Démarrer le frontend :

**Terminal 2 :**
```bash
cd /Users/djshek/Documents/Le\ site\ Ghost\ Remix\ Pack
npm run dev
```

✅ **Étape 3 terminée !**

---

## 🧪 TESTER (2 min)

### 1. Ouvrez votre site :

```
http://localhost:5173
```

### 2. Ajoutez un pack au panier

### 3. Cliquez sur "Commander"

### 4. Remplissez le formulaire :

- **Nom :** Test Client
- **Email :** test@example.com
- **Téléphone :** 0600000000
- **Adresse :** 123 Rue Test, Paris

### 5. Cliquez sur "Valider la Commande"

**→ Vous serez redirigé vers la page Stripe Checkout**

### 6. Entrez la carte de test Stripe :

**Numéro :** `4242 4242 4242 4242`  
**Date :** `12/25` (n'importe quelle date future)  
**CVC :** `123` (n'importe quel 3 chiffres)  
**Code postal :** `75001` (n'importe lequel)

### 7. Cliquez sur "Payer"

**→ Vous serez redirigé vers la page de succès !**

✅ **Paiement test réussi !**

### 8. Vérifier dans Stripe Dashboard :

Ouvrez : https://dashboard.stripe.com/test/payments

Vous verrez votre paiement test ! 🎉

---

## 📊 Récapitulatif

### ✅ Ce que vous avez fait :

1. ✅ Copié 2 clés API Stripe
2. ✅ Créé un webhook
3. ✅ Configuré le backend
4. ✅ Testé un paiement

### 🎯 Résultat :

**Votre site accepte maintenant les paiements Stripe ! 💳✨**

---

## 🔗 Liens Utiles

| Action | Lien |
|--------|------|
| **Dashboard Principal** | https://dashboard.stripe.com/test/dashboard |
| **Clés API** | https://dashboard.stripe.com/test/apikeys |
| **Webhooks** | https://dashboard.stripe.com/test/webhooks |
| **Paiements** | https://dashboard.stripe.com/test/payments |
| **Journaux (Logs)** | https://dashboard.stripe.com/test/logs |

---

## 🐛 Problème ?

### Le backend ne démarre pas :

```bash
cd backend
npm install
```

### "Clé API invalide" :

- Vérifiez que vous avez bien copié les clés **TEST** (commencent par `sk_test_VOTRE_CLE_TEST_ICI` et `pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI`)
- Pas d'espaces avant/après

### "Webhook signature failed" :

- Vérifiez que le secret commence par `whsec_VOTRE_WEBHOOK_SECRET_ICI`
- Vérifiez que le webhook pointe vers `http://localhost:3001/api/webhook`

### Le site ne se connecte pas au backend :

- Vérifiez que les 2 serveurs tournent (backend port 3001 + frontend port 5173)
- Testez : http://localhost:3001/api/health

---

## 🎉 FÉLICITATIONS !

**Temps total : ~7 minutes**

**Votre site Ghost Remix Pack est maintenant connecté à Stripe ! 🚀**

---

**Des questions ? Je suis là pour vous aider ! 😊**







