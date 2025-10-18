# 🧪 GUIDE TEST PAIEMENT PACK COMPLET GHOST

**Date :** 17 octobre 2025  
**Objectif :** Tester le paiement du Pack Complet Ghost (45€) et vérifier l'email

---

## 🎯 **TEST CRÉÉ POUR VOUS**

### ✅ **Page de test dédiée :**
**URL :** `https://www.ghostremixpack.com/test-paiement-complet`

### ✅ **Script de test automatisé :**
**Fichier :** `test-paiement-pack-complet.js`

---

## 🚀 **ACCÈS IMMÉDIAT AU TEST**

### **Page de test complète :**
```
https://www.ghostremixpack.com/test-paiement-complet
```

**Sur cette page vous avez :**
- ✅ **Pack Complet Ghost** configuré (45€ au lieu de 53€)
- ✅ **Configuration email** avec contact@ghostremixpack.com
- ✅ **Instructions étape par étape** 
- ✅ **Cartes de test Stripe** préconfigurées
- ✅ **Vérification email** Zimbra OVH
- ✅ **Boutons de test** : Normal + Achat rapide

---

## 📋 **PROCÉDURE DE TEST (5 minutes)**

### **ÉTAPE 1 : Accéder à la page**
```
1. Ouvrir : https://www.ghostremixpack.com/test-paiement-complet
2. Vérifier que l'email est configuré sur : contact@ghostremixpack.com
3. Modifier si besoin pour votre email de test
```

### **ÉTAPE 2 : Lancer le paiement**
```
1. Cliquer sur "Acheter 45€" (bouton principal)
2. OU cliquer sur "Test Achat Rapide" (modal)
3. Redirection automatique vers Stripe Checkout
```

### **ÉTAPE 3 : Paiement sur Stripe**
```
🔢 Carte de test (SUCCÈS) :
• Numéro : 4242 4242 4242 4242
• Date : 12/34  
• CVC : 123
• Nom : Test Ghost

🔢 Carte de test (3D Secure) :
• Numéro : 4000 0025 0000 3155
• Date : 12/34
• CVC : 123
```

### **ÉTAPE 4 : Vérifier l'email**
```
📧 Email attendu dans les 30 secondes :
• Expéditeur : "👻 Ghost Remix Pack" <contact@ghostremixpack.com>
• Sujet : "🎉 Paiement confirmé - Pack Complet Ghost (45€)"
• Contenu : Design Ghost + liens téléchargement + détails commande
```

---

## 🧪 **SCRIPT DE TEST AUTOMATISÉ**

### **Exécuter le test automatique :**
```bash
cd "/Users/djshek/Le site Ghost Remix Pack"
node test-paiement-pack-complet.js
```

### **Ce que teste le script :**
✅ **Santé du backend** → API accessible  
✅ **API des produits** → Pack Complet disponible  
✅ **Création session Stripe** → URL de paiement générée  
✅ **Configuration email** → Zimbra OVH fonctionnel  
✅ **Envoi email de test** → Vérification complète  

### **Résultat attendu :**
```
📊 RÉSULTATS DU TEST
===================

✅ Backend Health: OK
✅ API Produits: OK  
✅ Session Stripe: OK
✅ Email Zimbra: OK

🎉 TEST RÉUSSI ! LE SYSTÈME EST PRÊT !
```

---

## 📧 **VÉRIFICATION EMAIL ZIMBRA**

### **Accès webmail OVH :**
```
🌐 URL : https://mail.ovh.net/
📧 Email : contact@ghostremixpack.com  
🔐 Mot de passe : DJshek19529359-
```

### **Email de confirmation attendu :**
```
📧 Expéditeur : "👻 Ghost Remix Pack" <contact@ghostremixpack.com>
📧 Sujet : "🎉 Paiement confirmé - Pack Complet Ghost (45€)"

📧 Contenu :
• Design Ghost professionnel (violet/cyan)
• Détails de la commande (Pack Complet 45€)
• Liste des contenus inclus (37+ tracks)
• Liens de téléchargement sécurisés
• Instructions d'utilisation
• Support contact
```

### **En cas de non-réception :**
1. ✅ Vérifier dossier "Spam/Indésirables"
2. ✅ Vérifier configuration SMTP dans Railway
3. ✅ Relancer le test avec une autre carte
4. ✅ Consulter les logs Railway pour erreurs

---

## 🔧 **CONFIGURATION STRIPE REQUISE**

### **Variables à configurer sur Railway :**
```env
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete
STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret
```

### **Variables à configurer sur Vercel :**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique
VITE_BACKEND_URL=https://votre-railway-url.up.railway.app
```

### **Webhook Stripe requis :**
```
URL : https://votre-railway-url.up.railway.app/api/webhook
Événements : checkout.session.completed, payment_intent.succeeded
```

---

## 🎵 **DÉTAILS DU PACK COMPLET TESTÉ**

### **Pack Complet Ghost - 45€ (au lieu de 53€) :**
```
✅ Contenu inclus :
• 37+ tracks WAV haute qualité
• Tous les stems séparés  
• 50+ samples premium exclusifs
• Pack House Premium (15 tracks)
• Pack Afro Vibes (12 tracks)
• Pack Rap FR (10 tracks)
• Bonus exclusifs Ghost
• Licence commerciale incluse

💰 Économie : 8€
⏱️ Durée totale : 5h 30min
📊 Valeur : Meilleure offre Ghost
```

---

## ✅ **CHECKLIST TEST COMPLET**

### **Avant le test :**
```
□ Clés Stripe configurées sur Railway
□ Variable VITE_STRIPE_PUBLISHABLE_KEY sur Vercel  
□ Webhook Stripe créé et configuré
□ Email Zimbra OVH fonctionnel
□ Backend déployé sur Railway
□ Frontend déployé sur Vercel
```

### **Pendant le test :**
```
□ Page test accessible (/test-paiement-complet)
□ Email configuré (contact@ghostremixpack.com)
□ Redirection Stripe fonctionnelle
□ Paiement avec carte 4242... réussi
□ Retour sur /success-stripe automatique
```

### **Après le test :**
```
□ Email de confirmation reçu dans les 30s
□ Design email Ghost professionnel
□ Détails commande corrects (45€)
□ Liens de téléchargement présents
□ Email admin de notification reçu
```

---

## 🎉 **RÉSULTAT ATTENDU**

### **Test réussi si :**
✅ **Paiement Stripe** → Redirection + paiement + retour site  
✅ **Email client** → Reçu avec design Ghost + liens  
✅ **Email admin** → Notification nouvelle vente  
✅ **Données correctes** → 45€, Pack Complet, économie 8€  
✅ **Design cohérent** → Thème Ghost violet/cyan  

### **En cas de problème :**
1. **Vérifier variables d'environnement** (Railway + Vercel)
2. **Tester script automatisé** (`node test-paiement-pack-complet.js`)
3. **Consulter logs Railway** pour erreurs backend
4. **Vérifier webhook Stripe** (événements reçus)
5. **Tester avec autre carte** (4000 0025 0000 3155 pour 3DS)

---

## 📞 **SUPPORT TEST**

### **En cas de problème :**
- **Logs Railway :** Console Railway > Deployments > Logs
- **Webhook Stripe :** Dashboard Stripe > Webhooks > Événements
- **Email Zimbra :** https://mail.ovh.net/ (vérifier spam)
- **Test API :** `/api/health` et `/api/payment/products`

---

## 🚀 **FÉLICITATIONS !**

**Si le test est réussi, votre système de paiement Pack Complet Ghost est 100% opérationnel !**

**Vous pouvez maintenant :**
- ✅ Recevoir de vrais paiements
- ✅ Envoyer des emails automatiques  
- ✅ Vendre le Pack Complet (45€)
- ✅ Avoir confiance dans votre système

**🎵 Prêt à lancer votre e-commerce musical Ghost Remix Pack ! 💰**

