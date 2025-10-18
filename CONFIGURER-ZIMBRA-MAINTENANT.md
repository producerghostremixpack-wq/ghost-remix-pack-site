# 🚀 CONFIGURER ZIMBRA OVH - GUIDE RAPIDE

**Date:** 18 octobre 2025  
**Objectif:** Activer l'envoi d'emails via Zimbra OVH

---

## 📋 ÉTAPE 1 : MODIFIER VOTRE FICHIER .env

**Ouvrez le fichier `.env`** à la racine du projet et ajoutez ces lignes :

```bash
# Configuration Email Zimbra OVH
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
EMAIL_PASSWORD=VOTRE_MOT_DE_PASSE_OVH
```

**🔐 IMPORTANT :** Remplacez `VOTRE_MOT_DE_PASSE_OVH` par votre vrai mot de passe OVH

---

## 🔑 ÉTAPE 2 : RÉCUPÉRER VOTRE MOT DE PASSE OVH

### Option A - Vous connaissez votre mot de passe

1. **Allez sur** : https://ssl0.ovh.net/zimbra/
2. **Connectez-vous** avec :
   - Email : `contact@ghostremixpack.com`
   - Mot de passe : DJshek19529359-


✅ **Si la connexion fonctionne**, copiez ce mot de passe dans votre `.env`

---

### Option B - Vous avez oublié le mot de passe

1. **Allez sur** : https://www.ovh.com/manager/web/
2. **Connectez-vous** à votre compte OVH
3. **Sélectionnez** votre domaine `ghostremixpack.com`
4. **Cliquez sur** : `Emails` dans le menu de gauche
5. **Sélectionnez** : `contact@ghostremixpack.com`
6. **Cliquez sur** : `Réinitialiser le mot de passe`
7. **Choisissez** : Générer un nouveau mot de passe
8. **Copiez** le nouveau mot de passe

✅ **Copiez ce nouveau mot de passe** dans votre `.env`

---

## 🧪 ÉTAPE 3 : TESTER LA CONFIGURATION

**Après avoir ajouté le mot de passe dans `.env` :**

```bash
node test-email-zimbra.js
```

**✅ Résultat attendu :**
```
🧪 TEST EMAIL ZIMBRA OVH
==================================================

📋 Configuration :
   Host: ssl0.ovh.net
   Port: 587
   User: contact@ghostremixpack.com
   Secure: false

🔍 ÉTAPE 1 : Vérification de la connexion SMTP...
✅ Connexion SMTP réussie !

📧 ÉTAPE 2 : Envoi d'un email de test...
✅ Email envoyé avec succès !

📊 Détails de l'envoi :
   Message ID: <xxx@ssl0.ovh.net>
   Response: 250 2.0.0 OK

✨ ÉTAPE 3 : Résumé
==================================================

✅ Tous les tests sont passés avec succès !

🎯 Prochaines étapes :
   1. Vérifiez votre boîte mail (et spam)
   2. Testez les emails de paiement
   3. Testez les emails de contact
   4. Testez la newsletter

🚀 Votre système d'email Zimbra OVH est opérationnel !
```

---

## 🔄 ÉTAPE 4 : REDÉMARRER LE BACKEND

```bash
# Arrêter le backend actuel
pkill -f 'node server.js'

# Redémarrer avec la nouvelle config
node server.js
```

**✅ Vous devriez voir :**
```
ℹ️  Firebase non configuré (optionnel) - Mode sans base de données
✅ Stripe configuré avec vraies clés
✅ Newsletter : Email Zimbra OVH configuré
✅ Payment API : Email Zimbra OVH configuré
🚀 Ghost Remix Pack API démarrée sur port 3001
💳 Système paiement Stripe opérationnel
📧 Emails Zimbra OVH configuré
🌐 Railway deployment ready
```

**🎉 Plus de message "Email Zimbra non configuré" !**

---

## 🧪 ÉTAPE 5 : TESTER LA NEWSLETTER

1. **Ouvrez** : http://localhost:5173
2. **Inscrivez-vous** à la newsletter
3. **Vérifiez** votre boîte mail

**✅ Vous devriez recevoir :**
- Email de bienvenue avec le design Ghost Remix Pack
- Lien de désinscription
- Design professionnel

---

## 🚀 ÉTAPE 6 : DÉPLOYER SUR RAILWAY

**Après avoir testé en local, déployez sur Railway :**

1. **Allez sur** : https://railway.app
2. **Sélectionnez** votre projet
3. **Cliquez sur** : `Variables`
4. **Ajoutez** ces variables :

```
SMTP_HOST = ssl0.ovh.net
SMTP_PORT = 587
SENDGRID_FROM_EMAIL = contact@ghostremixpack.com
EMAIL_PASSWORD = VOTRE_MOT_DE_PASSE_OVH
```

5. **Railway va redéployer** automatiquement

---

## ❌ RÉSOUDRE LES ERREURS

### Erreur : "Authentication failed"

**Cause :** Mot de passe incorrect

**Solution :**
1. Vérifiez que le mot de passe dans `.env` est correct
2. Testez la connexion sur https://ssl0.ovh.net/zimbra/
3. Réinitialisez le mot de passe si nécessaire

---

### Erreur : "Connection timeout"

**Cause :** Firewall ou réseau bloqué

**Solution :**
1. Vérifiez que le port 587 n'est pas bloqué
2. Testez depuis un autre réseau
3. Contactez OVH si le problème persiste

---

### Erreur : "SSL/TLS error"

**Cause :** Problème de certificat SSL

**Solution :**
✅ **Déjà corrigé** dans le code avec `rejectUnauthorized: false`

---

### Erreur : "550 5.7.1 Relaying denied"

**Cause :** Authentification non activée

**Solution :**
1. Vérifiez que `auth` est bien configuré dans `.env`
2. Assurez-vous que le mot de passe est correct
3. Testez la connexion avec un client email

---

## 📊 CHECKLIST DE VALIDATION

- [ ] Variables d'environnement configurées dans `.env`
- [ ] Mot de passe OVH récupéré et ajouté
- [ ] Test de connexion SMTP réussi
- [ ] Email de test envoyé
- [ ] Backend redémarré sans erreur
- [ ] Newsletter testée sur le site
- [ ] Email de bienvenue reçu
- [ ] Variables ajoutées sur Railway (si déploiement)

---

## 📖 RESSOURCES

- **Tutoriel complet** : `TUTORIEL-EMAIL-ZIMBRA-OVH.md`
- **Support OVH** : https://www.ovh.com/fr/support/
- **Webmail OVH** : https://ssl0.ovh.net/zimbra/
- **Manager OVH** : https://www.ovh.com/manager/web/

---

## ✨ RÉSULTAT ATTENDU

Une fois configuré, vous devriez voir :

```
✅ Newsletter : Email Zimbra OVH configuré
✅ Payment API : Email Zimbra OVH configuré
```

**Et non plus :**
```
ℹ️  Newsletter : Email non configuré (optionnel)
ℹ️  Email Zimbra non configuré (optionnel)
```

---

## 🎯 RÉCAPITULATIF

1. **Ajouter** les variables dans `.env`
2. **Récupérer** le mot de passe OVH
3. **Tester** avec `node test-email-zimbra.js`
4. **Redémarrer** le backend
5. **Tester** la newsletter sur le site
6. **Déployer** sur Railway

---

**Votre système d'email Zimbra OVH est maintenant configuré ! 🎉**

---

**Créé avec ❤️ pour Ghost Remix Pack**
