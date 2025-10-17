# 🔗 CONNECTER LE FRONTEND AU BACKEND - Guide Ultra Simple

**Temps estimé : 2 minutes**

---

## 📋 POURQUOI CONNECTER LE FRONTEND AU BACKEND ?

Actuellement, votre frontend essaie de se connecter à `localhost:3001` (en local).

**Il faut lui dire d'utiliser votre backend déployé sur Render !**

---

## 🚀 ÉTAPES

### **ÉTAPE 1 : Aller sur Vercel (1 min)**

1. **Ouvrir :** https://vercel.com/dashboard
2. **Sélectionner votre projet :** ghost-remix-pack
3. **Cliquer sur :** Settings
4. **Cliquer sur :** Environment Variables

---

### **ÉTAPE 2 : Ajouter la Variable (1 min)**

**Ajouter cette variable :**

```
Name: VITE_BACKEND_URL
Value: https://votre-url-render.onrender.com
```

**⚠️ IMPORTANT :** Remplacez `votre-url-render` par votre vraie URL Render !

**Exemple :**
```
Name: VITE_BACKEND_URL
Value: https://ghost-remix-pack-backend.onrender.com
```

---

### **ÉTAPE 3 : Déployer (automatique)**

1. **Vercel va redéployer automatiquement** (2-3 min)
2. **Attendre que le déploiement soit terminé**

---

## ✅ VÉRIFICATION

**Une fois le déploiement terminé :**

1. **Aller sur :** https://www.ghostremixpack.com
2. **Ajouter un produit au panier**
3. **Procéder au checkout**
4. **Remplir le formulaire et payer**

**✅ Si ça fonctionne, vous êtes redirigé vers Stripe !**

---

## 🎉 FÉLICITATIONS !

**Votre frontend est maintenant connecté à votre backend !**

**Les paiements fonctionnent maintenant à 100% !**

---

## 🆘 PROBLÈME ?

**Si le frontend ne se connecte pas au backend :**

1. **Vérifier l'URL sur Vercel**
   - Doit être exactement : `https://votre-url.onrender.com`
   - Sans `/api` à la fin !

2. **Vérifier que le backend est "Live" sur Render**
   - Dashboard Render → Status doit être "Live"

3. **Vider le cache du navigateur**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)

---

**Temps total : 2 minutes** ⏱️

