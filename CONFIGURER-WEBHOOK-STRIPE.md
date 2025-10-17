# 🔔 CONFIGURER LE WEBHOOK STRIPE - Guide Ultra Simple

**Temps estimé : 5 minutes**

---

## 📋 POURQUOI CONFIGURER LE WEBHOOK ?

Le webhook permet à Stripe de notifier votre backend quand :
- ✅ Un paiement est réussi
- ❌ Un paiement échoue
- 🎉 Une commande est complétée

**Sans webhook :** Les paiements fonctionnent mais les commandes ne sont pas enregistrées dans Firebase.

---

## 🚀 ÉTAPES

### **ÉTAPE 1 : Aller sur Stripe Dashboard (1 min)**

1. **Ouvrir :** https://dashboard.stripe.com/test/webhooks
2. **Cliquer sur :** "Add endpoint"

---

### **ÉTAPE 2 : Configurer l'Endpoint (2 min)**

**Remplir le formulaire :**

```
Endpoint URL: https://votre-url-render.onrender.com/api/webhook
```

**⚠️ IMPORTANT :** Remplacez `votre-url-render` par votre vraie URL Render !

**Exemple :**
```
https://ghost-remix-pack-backend.onrender.com/api/webhook
```

---

### **ÉTAPE 3 : Sélectionner les Événements (1 min)**

**Cocher ces événements :**

- ✅ `checkout.session.completed`
- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.payment_failed`

**⚠️ IMPORTANT :** Ne cocher QUE ces 3 événements !

---

### **ÉTAPE 4 : Créer le Webhook (1 min)**

1. **Cliquer sur :** "Add endpoint"
2. **Copier le "Signing secret"** (commence par `whsec_`)
3. **Le sauvegarder** (vous en aurez besoin)

**Exemple de secret :**
```
whsec_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

---

### **ÉTAPE 5 : Ajouter le Secret sur Render (2 min)**

1. **Retourner sur Render**
   - Dashboard Render → Votre service backend
   - Cliquer sur "Environment"

2. **Ajouter la variable :**
   ```
   Key: STRIPE_WEBHOOK_SECRET
   Value: [Le secret webhook que vous avez copié]
   ```

3. **Sauvegarder**
   - Render redéploiera automatiquement (2-3 min)

---

## ✅ VÉRIFICATION

**Attendre que le déploiement soit terminé, puis tester :**

1. **Aller sur votre site :** https://www.ghostremixpack.com
2. **Ajouter un produit au panier**
3. **Procéder au checkout**
4. **Utiliser la carte de test :**
   ```
   Numéro : 4242 4242 4242 4242
   Date : 12/25
   CVC : 123
   ```

5. **Vérifier dans Firebase :**
   - Console Firebase → Firestore
   - Collection `orders` doit contenir votre commande

---

## 🎉 FÉLICITATIONS !

**Votre webhook Stripe est maintenant configuré !**

**Les paiements seront automatiquement enregistrés dans Firebase !**

---

## 🆘 PROBLÈME ?

**Si le webhook ne fonctionne pas :**

1. **Vérifier l'URL du webhook sur Stripe**
   - Doit correspondre exactement à votre URL Render
   - Doit se terminer par `/api/webhook`

2. **Vérifier le secret sur Render**
   - Doit commencer par `whsec_`
   - Doit être identique à celui sur Stripe

3. **Vérifier les logs Render**
   - Dashboard Render → Logs
   - Chercher les erreurs éventuelles

---

**Temps total : 5 minutes** ⏱️

