# 💳 Configurer Stripe - Guide Étape par Étape

**Date :** 16 octobre 2025  
**Objectif :** Obtenir vos clés API Stripe pour le backend

---

## 🎯 CE QUE VOUS ALLEZ FAIRE

1. Créer un compte Stripe (si pas encore fait)
2. Activer le mode Test
3. Récupérer vos clés API
4. Les noter pour les ajouter sur Railway

---

## 📋 ÉTAPE 1 : Créer un compte Stripe

### 1.1 Aller sur Stripe
🔗 **https://stripe.com/fr**

### 1.2 S'inscrire
- Cliquer sur **"Commencer"** ou **"S'inscrire"**
- Remplir le formulaire :
  - Email
  - Mot de passe
  - Nom complet
  - Pays (France)

### 1.3 Vérifier votre email
- Vérifier votre boîte email
- Cliquer sur le lien de confirmation

---

## 📋 ÉTAPE 2 : Accéder au Dashboard

### 2.1 Se connecter
- Aller sur : **https://dashboard.stripe.com/login**
- Se connecter avec vos identifiants

### 2.2 Activer le mode Test
- En haut à droite, vous verrez un toggle **"Mode test"**
- Cliquer dessus pour l'activer (devrait être vert)

⚠️ **IMPORTANT :** Assurez-vous que le mode TEST est activé pour commencer !

---

## 📋 ÉTAPE 3 : Récupérer vos clés API

### 3.1 Aller dans Developers
- Dans le menu de gauche, cliquer sur **"Developers"**
- Puis sur **"API keys"**

### 3.2 Vous verrez 2 clés :

#### 🔑 Clé secrète (Secret key)
```
sk_test_51ABC... (longue chaîne)
```

- Cliquer sur **"Reveal test key"** pour la voir
- Cliquer sur **"Copy"** pour la copier

#### 🔑 Clé publique (Publishable key)
```
pk_test_51ABC... (longue chaîne)
```

- Elle est déjà visible
- Cliquer sur **"Copy"** pour la copier

---

## 📋 ÉTAPE 4 : Noter vos clés

Créez un fichier temporaire avec vos clés :

```bash
# Dans votre terminal
nano mes-cles-stripe.txt
```

Collez vos clés :
```
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_ICI
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_ICI
```

⚠️ **SÉCURITÉ :** 
- Ne partagez JAMAIS ces clés publiquement
- Ne les commitez PAS sur GitHub
- Supprimez ce fichier après avoir configuré Railway

---

## 📋 ÉTAPE 5 : Tester avec une carte

### 5.1 Cartes de test Stripe

Pour tester vos paiements, utilisez ces cartes :

#### ✅ Carte qui fonctionne :
```
Numéro : 4242 4242 4242 4242
Date : n'importe quelle date future
CVC : n'importe quel 3 chiffres
Code postal : n'importe quel code postal
```

#### ❌ Carte qui échoue :
```
Numéro : 4000 0000 0000 0002
Date : n'importe quelle date future
CVC : n'importe quel 3 chiffres
Code postal : n'importe quel code postal
```

#### 💳 Carte qui demande une authentification :
```
Numéro : 4000 0025 0000 3155
Date : n'importe quelle date future
CVC : n'importe quel 3 chiffres
Code postal : n'importe quel code postal
```

---

## 📋 ÉTAPE 6 : Configurer le webhook (APRÈS Railway)

⚠️ **À faire APRÈS avoir déployé le backend sur Railway**

### 6.1 Aller dans Webhooks
- Dashboard Stripe → Developers → Webhooks
- Cliquer sur **"Add endpoint"**

### 6.2 Configurer l'endpoint
- **Endpoint URL** : `https://votre-backend.up.railway.app/api/webhook`
  (Vous aurez cette URL après avoir déployé sur Railway)

### 6.3 Sélectionner les événements
Cocher :
- ✅ `checkout.session.completed`
- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.payment_failed`

### 6.4 Créer le webhook
- Cliquer sur **"Add endpoint"**
- Copier le **Signing secret** (commence par `whsec_`)
- Noter cette valeur pour l'ajouter sur Railway

---

## ✅ CHECKLIST STRIPE

- [ ] Compte Stripe créé
- [ ] Mode test activé
- [ ] Clé secrète copiée : `sk_test_...`
- [ ] Clé publique copiée : `pk_test_...`
- [ ] Clés notées dans un fichier temporaire
- [ ] Cartes de test notées
- [ ] Prêt à configurer Railway

---

## 🔐 SÉCURITÉ

### ⚠️ NE JAMAIS :
- ❌ Commiter les clés sur GitHub
- ❌ Partager les clés publiquement
- ❌ Les mettre dans des fichiers publics
- ❌ Les laisser dans l'historique Git

### ✅ TOUJOURS :
- ✅ Utiliser des variables d'environnement
- ✅ Les stocker sur Railway (sécurisé)
- ✅ Supprimer les fichiers temporaires
- ✅ Utiliser le mode test en développement

---

## 🎯 PROCHAINES ÉTAPES

Une fois Stripe configuré :

1. **Configurer Firebase** (base de données)
2. **Configurer SendGrid** (emails)
3. **Déployer sur Railway** (backend)
4. **Ajouter les clés** sur Railway
5. **Tester les paiements**

---

## 📞 SUPPORT

- **Stripe Dashboard** : https://dashboard.stripe.com
- **Documentation Stripe** : https://stripe.com/docs
- **Support Stripe** : https://support.stripe.com

---

## 💡 CONSEILS

### Mode Test vs Production
- **Mode Test** : Pour développer et tester
- **Mode Production** : Pour les vrais paiements

### Activer le mode Production
Une fois prêt :
1. Aller dans Settings → Account → Activate account
2. Remplir les informations business
3. Ajouter vos informations bancaires
4. Obtenir les clés de production (commencent par `sk_live_` et `pk_live_`)

### Frais Stripe
- **Europe** : 1.4% + 0.25€ par transaction
- **Carte européenne** : 1.4% + 0.25€
- **Carte non-européenne** : 2.9% + 0.25€

---

**Prêt à configurer Stripe ?** Suivez les étapes ci-dessus ! 🚀

