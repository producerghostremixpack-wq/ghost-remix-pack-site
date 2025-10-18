# 📧 TUTORIEL COMPLET - Configuration Email Zimbra OVH

**Date:** 18 octobre 2025  
**Version:** 1.0  
**Statut:** ✅ Guide complet

---

## 🎯 OBJECTIF

Configurer l'envoi d'emails via votre compte Zimbra OVH pour :
- ✅ Confirmation de paiement
- ✅ Emails de contact
- ✅ Newsletter
- ✅ Notifications

---

## 📋 PRÉREQUIS

- Compte OVH avec email Zimbra
- Accès à l'espace client OVH
- Mot de passe de votre boîte mail

---

## 🔧 ÉTAPE 1 : RÉCUPÉRER VOS INFORMATIONS ZIMBRA OVH

### **1.1. Connectez-vous à votre webmail OVH**

```
https://ssl0.ovh.net/zimbra/
```

Ou selon votre configuration :
- `https://webmail.ghostremixpack.com`
- `https://zimbra.ovh.net`

### **1.2. Vérifiez vos informations SMTP**

**Paramètres SMTP Zimbra OVH :**
```
Serveur SMTP : ssl0.ovh.net
Port SMTP : 587
Sécurité : STARTTLS
Authentification : OUI
```

### **1.3. Votre email et mot de passe**

```
Email : contact@ghostremixpack.com
Mot de passe : [Votre mot de passe OVH]
```

---

## 🔧 ÉTAPE 2 : CONFIGURER LES VARIABLES D'ENVIRONNEMENT

### **2.1. En local (fichier .env)**

Créez ou modifiez le fichier `.env` à la racine du projet :

```bash
# Email Zimbra OVH
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SENDGRID_FROM_EMAIL=contact@ghostremixpack.com
EMAIL_PASSWORD=VOTRE_MOT_DE_PASSE_OVH
```

### **2.2. Sur Railway (Variables d'environnement)**

1. Allez sur https://railway.app
2. Sélectionnez votre projet
3. Cliquez sur **"Variables"**
4. Ajoutez ces variables :

```
SMTP_HOST = ssl0.ovh.net
SMTP_PORT = 587
SENDGRID_FROM_EMAIL = contact@ghostremixpack.com
EMAIL_PASSWORD = VOTRE_MOT_DE_PASSE_OVH
```

---

## 🔧 ÉTAPE 3 : TESTER LA CONFIGURATION

### **3.1. Test en local**

Créez un fichier `test-email-zimbra.js` :

```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'ssl0.ovh.net',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: 'contact@ghostremixpack.com',
    pass: 'VOTRE_MOT_DE_PASSE'
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

async function testEmail() {
  try {
    // Vérifier la connexion
    await transporter.verify();
    console.log('✅ Connexion SMTP réussie !');
    
    // Envoyer un email de test
    const info = await transporter.sendMail({
      from: 'contact@ghostremixpack.com',
      to: 'votre@email.com',
      subject: 'Test Email Zimbra OVH',
      html: '<h1>Test réussi !</h1><p>Votre email Zimbra OVH fonctionne correctement.</p>'
    });
    
    console.log('✅ Email envoyé !');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testEmail();
```

### **3.2. Lancer le test**

```bash
node test-email-zimbra.js
```

---

## 🔧 ÉTAPE 4 : CONFIGURER LE BACKEND

### **4.1. Vérifier le fichier backend/routes/payment.js**

Le code est déjà configuré avec Zimbra OVH :

```javascript
emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'ssl0.ovh.net',
  port: process.env.SMTP_PORT || 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SENDGRID_FROM_EMAIL || 'contact@ghostremixpack.com',
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});
```

### **4.2. Démarrer le backend**

```bash
node server.js
```

Vous devriez voir :
```
✅ Payment API : Email Zimbra OVH configuré
```

---

## 🔧 ÉTAPE 5 : RÉSOUDRE LES ERREURS COURANTES

### **❌ Erreur 1 : "Authentication failed"**

**Cause :** Mot de passe incorrect

**Solution :**
1. Vérifiez votre mot de passe OVH
2. Réinitialisez-le si nécessaire
3. Mettez à jour la variable `EMAIL_PASSWORD`

---

### **❌ Erreur 2 : "Connection timeout"**

**Cause :** Firewall ou réseau bloqué

**Solution :**
1. Vérifiez que le port 587 n'est pas bloqué
2. Testez depuis un autre réseau
3. Contactez OVH si le problème persiste

---

### **❌ Erreur 3 : "SSL/TLS error"**

**Cause :** Problème de certificat SSL

**Solution :**
```javascript
tls: {
  ciphers: 'SSLv3',
  rejectUnauthorized: false // Déjà ajouté
}
```

---

### **❌ Erreur 4 : "550 5.7.1 Relaying denied"**

**Cause :** Authentification non activée

**Solution :**
1. Vérifiez que `auth` est bien configuré
2. Assurez-vous que le mot de passe est correct
3. Testez la connexion avec un client email

---

## 🔧 ÉTAPE 6 : TESTER LES EMAILS

### **6.1. Test de paiement**

1. Allez sur votre site
2. Ajoutez un produit au panier
3. Passez la commande
4. Vous devriez recevoir un email de confirmation

### **6.2. Test de contact**

1. Allez sur `/contact`
2. Remplissez le formulaire
3. Envoyez le message
4. Vous devriez recevoir un email

### **6.3. Test de newsletter**

1. Allez sur la page d'accueil
2. Inscrivez-vous à la newsletter
3. Vous devriez recevoir un email de confirmation

---

## 📊 VÉRIFICATION FINALE

### **✅ Checklist**

- [ ] Variables d'environnement configurées
- [ ] Test de connexion SMTP réussi
- [ ] Email de test envoyé
- [ ] Backend démarre sans erreur
- [ ] Emails de paiement fonctionnent
- [ ] Emails de contact fonctionnent
- [ ] Newsletter fonctionne

---

## 🚀 DÉPLOIEMENT SUR RAILWAY

### **1. Ajouter les variables sur Railway**

```
SMTP_HOST = ssl0.ovh.net
SMTP_PORT = 587
SENDGRID_FROM_EMAIL = contact@ghostremixpack.com
EMAIL_PASSWORD = VOTRE_MOT_DE_PASSE_OVH
```

### **2. Redéployer**

```bash
git add .
git commit -m "feat: Configuration email Zimbra OVH"
git push origin main
```

Railway va redéployer automatiquement.

### **3. Vérifier les logs**

Sur Railway, allez dans **"Deployments"** > **"Logs"**

Vous devriez voir :
```
✅ Payment API : Email Zimbra OVH configuré
```

---

## 📧 TYPES D'EMAILS ENVOYÉS

### **1. Confirmation de paiement**
```
De : contact@ghostremixpack.com
À : client@email.com
Sujet : ✅ Paiement confirmé - Ghost Remix Pack
```

### **2. Email de contact**
```
De : contact@ghostremixpack.com
À : contact@ghostremixpack.com
Sujet : Nouveau message de [Nom]
```

### **3. Newsletter**
```
De : contact@ghostremixpack.com
À : abonné@email.com
Sujet : Newsletter Ghost Remix Pack
```

---

## 🔐 SÉCURITÉ

### **✅ Bonnes pratiques**

1. **Ne jamais commiter le mot de passe**
   - Utilisez `.env` en local
   - Variables d'environnement sur Railway

2. **Limiter les envois**
   - Rate limiting sur les routes
   - Validation des emails

3. **Protéger contre le spam**
   - Vérifier les emails entrants
   - Utiliser des CAPTCHA si nécessaire

---

## 📞 SUPPORT

### **Problèmes avec OVH ?**

- **Support OVH** : https://www.ovh.com/fr/support/
- **Documentation Zimbra** : https://docs.ovh.com/fr/emails/
- **Forum OVH** : https://community.ovh.com/

### **Problèmes avec le backend ?**

- Vérifiez les logs : `node server.js`
- Testez la connexion SMTP
- Vérifiez les variables d'environnement

---

## ✨ RÉSULTAT ATTENDU

Une fois configuré, vous devriez voir :

```
🚀 Ghost Remix Pack API démarrée sur port 3001
💳 Système paiement Stripe opérationnel
✅ Payment API : Email Zimbra OVH configuré
🌐 Railway deployment ready
```

**Et non plus :**
```
⚠️  Email Zimbra non configuré (optionnel)
```

---

## 🎯 RÉCAPITULATIF

1. **Récupérer** vos informations SMTP OVH
2. **Configurer** les variables d'environnement
3. **Tester** la connexion SMTP
4. **Démarrer** le backend
5. **Vérifier** les emails
6. **Déployer** sur Railway

---

**Votre système d'email Zimbra OVH est maintenant configuré ! 🎉**

---

**Créé avec ❤️ pour Ghost Remix Pack**
