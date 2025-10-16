# 🔐 CONFIGURER STRIPE EN PRODUCTION
## Ghost Remix Pack - Guide sécurisé étape par étape

---

## ⚠️ IMPORTANT - SÉCURITÉ

Ce guide vous montre comment configurer Stripe **de manière sécurisée** pour la production.

**Règle d'or :** Ne JAMAIS partager vos clés secrètes publiquement !

---

## 📋 CE QUE VOUS ALLEZ FAIRE

1. ✅ Créer de nouvelles clés Stripe (LIVE)
2. ✅ Les configurer dans Railway (Backend)
3. ✅ Les configurer dans Vercel (Frontend)
4. ✅ Tester que tout fonctionne
5. ✅ Vérifier la sécurité

**⏱️ Durée totale : 15 minutes**

---

## 🎯 ÉTAPE 1 : CRÉER LES NOUVELLES CLÉS STRIPE

### **1.1 - Aller sur le Dashboard Stripe**

Ouvrez : https://dashboard.stripe.com/apikeys

### **1.2 - Vérifier que vous êtes en mode LIVE**

En haut à droite, vérifiez que le switch est sur **"Production"** (pas "Test")

```
┌─────────────────────────┐
│ [Test] ○────● [Production] │
└─────────────────────────┘
```

### **1.3 - Créer une clé secrète (Secret Key)**

1. Descendez jusqu'à la section **"Standard keys"**
2. Trouvez la ligne **"Secret key"**
3. Cliquez sur **"Create secret key"** ou le bouton **"Reveal test key"** puis **"Create restricted key"**

### **1.4 - Configurer la clé**

Dans la popup qui s'ouvre :

**Nom de la clé :**
```
Ghost Remix Pack - Production Backend
```

**Permissions :** (garder les valeurs par défaut pour une clé standard)
- ✅ Toutes les permissions (c'est une clé standard)

**Expiration :** 
- Choisissez "Never" (jamais) ou une date dans 1 an

Cliquez sur **"Create key"**

### **1.5 - COPIER LA CLÉ IMMÉDIATEMENT**

⚠️ **TRÈS IMPORTANT :** La clé ne sera affichée qu'UNE SEULE FOIS !

La clé ressemble à :
```
sk_live_VOTRE_CLE_LIVE_ICI
```

**Copiez-la dans un endroit temporaire sûr** (pas dans un fichier, juste dans votre presse-papier)

### **1.6 - Récupérer la clé publique**

1. Dans la même page, trouvez **"Publishable key"**
2. Cliquez sur **"Reveal"** si nécessaire
3. Copiez cette clé aussi

Elle ressemble à :
```
pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI
```

---

## 🚂 ÉTAPE 2 : CONFIGURER RAILWAY (BACKEND)

### **2.1 - Aller sur Railway**

Ouvrez : https://railway.app/dashboard

### **2.2 - Sélectionner votre projet backend**

Cliquez sur votre projet **Ghost Remix Pack Backend**

### **2.3 - Ouvrir les variables d'environnement**

1. Cliquez sur l'onglet **"Variables"**
2. Vous verrez la liste des variables existantes

### **2.4 - Mettre à jour la clé secrète Stripe**

Trouvez la variable `STRIPE_SECRET_KEY` :

**Option A : Si elle existe déjà**
1. Cliquez sur les 3 points "..." à droite de la variable
2. Cliquez sur **"Edit"**
3. Remplacez l'ancienne valeur par la nouvelle :
   ```
   sk_live_VOTRE_CLE_LIVE_ICI
   ```
4. Cliquez sur **"Save"**

**Option B : Si elle n'existe pas**
1. Cliquez sur **"+ New Variable"**
2. **Variable Name :** `STRIPE_SECRET_KEY`
3. **Value :** Collez votre clé secrète
   ```
   sk_live_VOTRE_CLE_LIVE_ICI
   ```
4. Cliquez sur **"Add"**

### **2.5 - Vérifier les autres variables**

Assurez-vous que ces variables existent aussi :

```bash
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_LIVE_ICI
FRONTEND_URL=https://www.votre-domaine.com
NODE_ENV=production
PORT=3001
```

### **2.6 - Railway redémarrera automatiquement**

Railway détecte le changement et redémarre le backend automatiquement.

**Attendez 30 secondes à 1 minute.**

---

## ☁️ ÉTAPE 3 : CONFIGURER VERCEL (FRONTEND)

### **3.1 - Aller sur Vercel**

Ouvrez : https://vercel.com/dashboard

### **3.2 - Sélectionner votre projet**

Cliquez sur votre projet **Ghost Remix Pack**

### **3.3 - Ouvrir les paramètres**

1. Cliquez sur **"Settings"** (en haut)
2. Dans le menu de gauche, cliquez sur **"Environment Variables"**

### **3.4 - Ajouter/Mettre à jour les variables**

#### **Variable 1 : Backend URL**

Si vous avez déjà déployé avec un domaine personnalisé :

```bash
Name: VITE_BACKEND_URL
Value: https://api.votre-domaine.com
```

Sinon, utilisez l'URL Railway :

```bash
Name: VITE_BACKEND_URL
Value: https://votre-projet.railway.app
```

#### **Important :** Pas besoin de mettre la clé publique Stripe en variable Vercel, elle est dans le code.

### **3.5 - Mettre à jour le code frontend**

#### **Option A : Via l'interface Vercel (plus simple)**

La clé publique Stripe doit être dans votre code.

Ouvrez le fichier `src/config/stripe.ts` sur GitHub ou localement :

```typescript
// Avant (TEST)
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI';

// Après (PRODUCTION)
export const STRIPE_PUBLISHABLE_KEY = 'pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI';
```

**Commitez et pushez :**

```bash
git add src/config/stripe.ts
git commit -m "Update Stripe to production keys"
git push
```

Vercel redéploiera automatiquement.

#### **Option B : Utiliser une variable d'environnement (recommandé)**

Modifiez `src/config/stripe.ts` :

```typescript
// Utiliser une variable d'environnement
export const STRIPE_PUBLISHABLE_KEY = 
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
  'pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI'; // fallback
```

Puis dans Vercel, ajoutez :

```bash
Name: VITE_STRIPE_PUBLISHABLE_KEY
Value: pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI
```

---

## 🔔 ÉTAPE 4 : CONFIGURER LE WEBHOOK STRIPE

### **4.1 - Aller sur les webhooks Stripe**

Ouvrez : https://dashboard.stripe.com/webhooks

### **4.2 - Vérifier le mode**

Assurez-vous d'être en mode **"Production"** (switch en haut à droite)

### **4.3 - Créer ou mettre à jour le webhook**

**Si vous avez déjà un webhook :**

1. Cliquez sur le webhook existant
2. Cliquez sur **"Edit endpoint"**
3. Mettez à jour l'URL :

**Si vous avez un domaine personnalisé :**
```
https://api.votre-domaine.com/api/webhook
```

**Sinon, utilisez Railway :**
```
https://votre-projet.railway.app/api/webhook
```

**Si vous n'avez pas encore de webhook :**

1. Cliquez sur **"+ Add endpoint"**
2. **Endpoint URL :** `https://api.votre-domaine.com/api/webhook`
3. **Description :** `Ghost Remix Pack - Production Webhook`
4. **Listen to :** Sélectionnez **"Events on your account"**
5. **Select events :** Cochez :
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
6. Cliquez sur **"Add endpoint"**

### **4.4 - Récupérer le signing secret**

1. Cliquez sur votre webhook
2. Trouvez **"Signing secret"**
3. Cliquez sur **"Reveal"** ou **"Click to reveal"**
4. Copiez le secret (commence par `whsec_VOTRE_WEBHOOK_SECRET_ICI`)

### **4.5 - Ajouter le secret dans Railway**

Retournez sur Railway → Variables :

```bash
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_VOTRE_WEBHOOK_SECRET_ICI
```

Railway redémarrera automatiquement.

---

## ✅ ÉTAPE 5 : VÉRIFIER QUE TOUT FONCTIONNE

### **5.1 - Tester l'API Backend**

Ouvrez dans votre navigateur :

**Si domaine personnalisé :**
```
https://api.votre-domaine.com/api/health
```

**Sinon :**
```
https://votre-projet.railway.app/api/health
```

**✅ Résultat attendu :**
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running",
  "timestamp": "2025-10-15T..."
}
```

### **5.2 - Tester le Frontend**

Ouvrez votre site :
```
https://www.votre-domaine.com
```

**✅ Vérifiez que :**
- Le site s'affiche
- Pas d'erreur dans la console (F12)
- Le panier fonctionne

### **5.3 - Tester un paiement RÉEL (petit montant)**

⚠️ **ATTENTION :** Vous allez faire un VRAI paiement !

1. Ajoutez un produit au panier
2. Procédez au checkout
3. **Utilisez votre VRAIE carte bancaire**
4. Faites un paiement pour le montant minimum

**✅ Résultat attendu :**
- Paiement accepté
- Redirection vers `/success`
- Commande visible dans Stripe Dashboard

### **5.4 - Vérifier le webhook**

1. Allez sur https://dashboard.stripe.com/webhooks
2. Cliquez sur votre webhook
3. Vérifiez l'onglet **"Recent events"**

**✅ Résultat attendu :**
- Événements reçus avec statut **200 OK**
- Pas d'erreur 400, 500, etc.

### **5.5 - Rembourser le test (optionnel)**

Si vous voulez récupérer l'argent du test :

1. Allez sur https://dashboard.stripe.com/payments
2. Trouvez le paiement de test
3. Cliquez dessus
4. Cliquez sur **"Refund payment"**
5. Confirmez

---

## 🔐 ÉTAPE 6 : SÉCURITÉ - VÉRIFICATION FINALE

### **Checklist de sécurité :**

- [ ] ✅ Les anciennes clés ont été supprimées de Stripe
- [ ] ✅ Les nouvelles clés sont UNIQUEMENT dans Railway/Vercel
- [ ] ✅ Le fichier `backend/.env` local est dans `.gitignore`
- [ ] ✅ Les clés ne sont PAS committées dans Git
- [ ] ✅ Les clés ne sont PAS dans des fichiers de config visibles
- [ ] ✅ Le webhook a un signing secret configuré
- [ ] ✅ Les logs ne montrent pas les clés complètes

### **Vérifier que les clés ne sont pas dans Git :**

```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"

# Vérifier qu'aucune clé n'est committée
git log --all -p | grep -i "sk_live" && echo "⚠️ CLÉ TROUVÉE DANS GIT!" || echo "✅ Aucune clé dans Git"
```

**Si une clé est trouvée dans Git :**
1. Supprimez-la immédiatement du code
2. Révoquez la clé sur Stripe
3. Créez une nouvelle clé
4. Ne la committez JAMAIS

---

## 📊 RÉCAPITULATIF

### **Ce qui a été fait :**

```
✅ Nouvelles clés Stripe créées (LIVE)
✅ Clé secrète configurée dans Railway
✅ Clé publique configurée dans le code
✅ Webhook configuré avec signing secret
✅ Tests effectués
✅ Sécurité vérifiée
```

### **Variables configurées :**

**Railway (Backend) :**
```bash
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_LIVE_ICI... (nouvelle)
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI...
FRONTEND_URL=https://www.votre-domaine.com
NODE_ENV=production
```

**Code Frontend :**
```typescript
STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI... (nouvelle)
```

**Stripe Dashboard :**
```
Webhook URL: https://api.votre-domaine.com/api/webhook
Events: checkout.session.completed, payment_intent.succeeded
```

---

## 🎯 PROCHAINES ÉTAPES

### **1. Tester complètement**

Faites plusieurs tests de paiement pour vérifier :
- ✅ Le processus complet
- ✅ Les webhooks
- ✅ Les emails (si SendGrid configuré)
- ✅ Les téléchargements

### **2. Surveiller**

Dans les premiers jours :
- Vérifiez Stripe Dashboard régulièrement
- Surveillez les webhooks (pas d'erreurs)
- Vérifiez que les paiements fonctionnent

### **3. Activer l'authentification 3D Secure** (recommandé)

Pour plus de sécurité et conformité européenne :

1. Allez sur https://dashboard.stripe.com/settings/payment_methods
2. Activez **"3D Secure"** pour les cartes
3. Configurez les règles selon vos besoins

---

## 🐛 TROUBLESHOOTING

### **Erreur : "Invalid API key"**

**Cause :** La clé n'est pas correcte ou n'est pas en mode LIVE

**Solution :**
1. Vérifiez que la clé commence bien par `sk_live_VOTRE_CLE_LIVE_ICI`
2. Vérifiez qu'il n'y a pas d'espace avant/après
3. Régénérez une nouvelle clé si nécessaire

---

### **Erreur : "No such customer"**

**Cause :** Vous mélangez des données TEST et LIVE

**Solution :**
- Les données TEST et LIVE sont séparées dans Stripe
- Ne copiez pas d'IDs entre les deux modes
- Créez de nouvelles données en mode LIVE

---

### **Le webhook retourne 401 ou 403**

**Cause :** Le signing secret n'est pas correct

**Solution :**
1. Récupérez le signing secret depuis Stripe Dashboard
2. Mettez-le à jour dans Railway
3. Redémarrez le backend

---

### **Les paiements fonctionnent mais pas les webhooks**

**Cause :** L'URL du webhook est incorrecte ou le backend ne répond pas

**Solution :**
1. Vérifiez l'URL : `https://api.votre-domaine.com/api/webhook`
2. Testez : `curl https://api.votre-domaine.com/api/health`
3. Vérifiez les logs Railway pour voir si les requêtes arrivent

---

## 📞 RESSOURCES

| Ressource | Lien |
|-----------|------|
| Stripe Dashboard | https://dashboard.stripe.com |
| Stripe API Keys | https://dashboard.stripe.com/apikeys |
| Stripe Webhooks | https://dashboard.stripe.com/webhooks |
| Stripe Docs | https://stripe.com/docs |
| Railway Dashboard | https://railway.app/dashboard |
| Vercel Dashboard | https://vercel.com/dashboard |

---

## ⚠️ RAPPELS IMPORTANTS

```
❌ NE JAMAIS partager vos clés secrètes (sk_live_VOTRE_CLE_LIVE_ICI)
❌ NE JAMAIS committer les clés dans Git
❌ NE JAMAIS publier les clés en ligne
✅ Utiliser les variables d'environnement
✅ Révoquer les clés compromises immédiatement
✅ Créer des clés avec des noms descriptifs
✅ Surveiller les webhooks régulièrement
```

---

## ✅ CHECKLIST FINALE

- [ ] Anciennes clés révoquées sur Stripe
- [ ] Nouvelles clés créées (LIVE)
- [ ] Clé secrète dans Railway (STRIPE_SECRET_KEY)
- [ ] Clé publique dans le code frontend
- [ ] Webhook créé sur Stripe Dashboard
- [ ] Signing secret dans Railway (STRIPE_WEBHOOK_SECRET)
- [ ] Backend redéployé
- [ ] Frontend redéployé
- [ ] Test de paiement effectué avec succès
- [ ] Webhook fonctionne (événements reçus)
- [ ] Aucune clé dans Git (vérification faite)
- [ ] Documentation des clés dans un endroit sûr

---

## 🎉 FÉLICITATIONS !

Votre site Ghost Remix Pack est maintenant configuré avec Stripe en mode PRODUCTION de manière sécurisée !

```
✅ Paiements réels activés
✅ Webhooks fonctionnels
✅ Configuration sécurisée
✅ Prêt pour vos clients !
```

**🚀 Votre site peut maintenant accepter de vrais paiements !**

---

_Créé le 15 octobre 2025_  
_Version 1.0 - Configuration Stripe Production Sécurisée_

