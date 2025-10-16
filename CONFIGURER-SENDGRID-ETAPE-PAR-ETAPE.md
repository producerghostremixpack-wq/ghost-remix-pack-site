# 📧 Configurer SendGrid - Guide Étape par Étape

**Date :** 16 octobre 2025  
**Objectif :** Créer un compte SendGrid et obtenir la clé API pour envoyer des emails

---

## 🎯 CE QUE VOUS ALLEZ FAIRE

1. Créer un compte SendGrid (gratuit)
2. Vérifier votre email
3. Créer une API Key
4. Noter la clé pour l'ajouter sur Railway

---

## 📋 ÉTAPE 1 : Créer un compte SendGrid

### 1.1 Aller sur SendGrid
🔗 **https://signup.sendgrid.com/**

### 1.2 Remplir le formulaire
- **Email** : Votre email
- **Mot de passe** : Créer un mot de passe fort
- **Nom** : Votre nom
- **Prénom** : Votre prénom
- **Nom de l'entreprise** : Ghost Remix Pack (ou votre nom)
- **Site web** : https://www.ghostremixpack.com

### 1.3 Accepter les conditions
- Cocher **"J'accepte les conditions"**
- Cliquer sur **"Créer un compte"**

---

## 📋 ÉTAPE 2 : Vérifier votre email

### 2.1 Vérifier votre boîte email
- SendGrid va vous envoyer un email de vérification
- Ouvrir l'email
- Cliquer sur **"Verify Your Email"**

### 2.2 Vous serez redirigé
- Vous serez sur le dashboard SendGrid

---

## 📋 ÉTAPE 3 : Compléter le profil (optionnel)

### 3.1 Informations supplémentaires
SendGrid peut demander :
- **Type de compte** : Choisir "Marketing" ou "Transactional"
- **Langue** : Français
- **Fuseau horaire** : Europe/Paris

### 3.2 Skip pour l'instant
- Vous pouvez cliquer sur **"Skip for now"** ou **"Passer"**

---

## 📋 ÉTAPE 4 : Vérifier votre expéditeur

### 4.1 Aller dans Settings
- Menu de gauche → **"Settings"**
- Puis **"Sender Authentication"**

### 4.2 Single Sender Verification
- Cliquer sur **"Verify a Single Sender"**
- Remplir le formulaire :
  - **From Email Address** : Votre email (exemple : contact@ghostremixpack.com)
  - **From Name** : Ghost Remix Pack
  - **Reply To** : Votre email
  - **Company Address** : Votre adresse
  - **City** : Votre ville
  - **State/Region** : Votre région
  - **Zip Code** : Votre code postal
  - **Country** : France

### 4.3 Vérifier l'email
- SendGrid va envoyer un email de vérification
- Ouvrir l'email
- Cliquer sur **"Verify"**

---

## 📋 ÉTAPE 5 : Créer une API Key

### 5.1 Aller dans API Keys
- Menu de gauche → **"Settings"**
- Puis **"API Keys"**

### 5.2 Créer une nouvelle clé
- Cliquer sur **"Create API Key"**

### 5.3 Nom de la clé
- **API Key Name** : `Ghost Remix Pack Backend`
- **API Key Permissions** : Choisir **"Full Access"**
- Cliquer sur **"Create & View"**

### 5.4 Copier la clé
⚠️ **IMPORTANT :** Vous ne pourrez voir cette clé qu'une seule fois !

- La clé commence par `SG.`
- Exemple : `SG.abc123xyz...`
- **COPIER LA CLÉ IMMÉDIATEMENT**

---

## 📋 ÉTAPE 6 : Noter vos informations

Créez un fichier temporaire :

```bash
nano mes-cles-sendgrid.txt
```

Collez vos informations :
```
SENDGRID_API_KEY=SG.VOTRE_CLE_ICI
SENDGRID_FROM_EMAIL=votre-email@example.com
```

---

## 📋 ÉTAPE 7 : Tester l'envoi (optionnel)

### 7.1 Aller dans Email API
- Menu de gauche → **"Email API"**
- Puis **"Integration Guide"**

### 7.2 Choisir "Web API"
- Sélectionner **"Web API"**
- Puis **"cURL"**

### 7.3 Tester avec curl
```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'Authorization: Bearer SG.VOTRE_CLE_ICI' \
  --header 'Content-Type: application/json' \
  --data '{
    "personalizations": [
      {
        "to": [{"email": "votre-email@example.com"}]
      }
    ],
    "from": {"email": "votre-email@example.com"},
    "subject": "Test SendGrid",
    "content": [
      {
        "type": "text/plain",
        "value": "Test réussi !"
      }
    ]
  }'
```

---

## ✅ CHECKLIST SENDGRID

- [ ] Compte SendGrid créé
- [ ] Email vérifié
- [ ] Single Sender vérifié
- [ ] API Key créée
- [ ] Clé API copiée : `SG.xxx...`
- [ ] Email expéditeur noté
- [ ] Informations notées dans un fichier temporaire

---

## 🔐 SÉCURITÉ

### ⚠️ NE JAMAIS :
- ❌ Commiter la clé API sur GitHub
- ❌ Partager la clé API publiquement
- ❌ La mettre dans des fichiers publics
- ❌ L'oublier (vous ne pourrez pas la revoir)

### ✅ TOUJOURS :
- ✅ Utiliser des variables d'environnement
- ✅ La stocker sur Railway (sécurisé)
- ✅ Supprimer les fichiers temporaires
- ✅ Noter la clé immédiatement

---

## 💰 LIMITES DU PLAN GRATUIT

### Plan Free
- **100 emails/jour** : Gratuit à vie
- **40,000 emails** : Premier mois
- **Support** : Email uniquement

### Pour augmenter
- **Plan Essentials** : $19.95/mois (50,000 emails)
- **Plan Pro** : $89.95/mois (100,000 emails)

Pour commencer, le plan gratuit est largement suffisant ! 🎉

---

## 🎯 CE QU'IL FAUT NOTER

Vous avez besoin de **2 choses** :

### 1. API Key
```
SG.abc123xyz... (longue chaîne)
```
👉 À ajouter sur Railway : `SENDGRID_API_KEY`

### 2. Email expéditeur
```
votre-email@example.com
```
👉 À ajouter sur Railway : `SENDGRID_FROM_EMAIL`
(Must être un email vérifié dans SendGrid)

---

## 🎯 PROCHAINES ÉTAPES

Une fois SendGrid configuré :

1. **Déployer sur Railway** (backend)
2. **Ajouter toutes les variables** sur Railway
3. **Tester l'envoi d'emails**

---

## 📞 SUPPORT

- **SendGrid Dashboard** : https://app.sendgrid.com/
- **Documentation SendGrid** : https://docs.sendgrid.com/
- **Support SendGrid** : https://support.sendgrid.com/

---

## 💡 CONSEILS

### Plan gratuit
- **100 emails/jour** : Parfait pour commencer
- **Pas de carte bancaire** : Requis
- **Pas de limite de temps** : Gratuit à vie

### Vérification de l'expéditeur
- **Single Sender** : Pour un seul email
- **Domain Authentication** : Pour un domaine (plus professionnel)

### API Key
- **Full Access** : Pour tout faire
- **Restricted Access** : Pour limiter les permissions

---

## 🆘 DÉPANNAGE

### ❌ Email non reçu
- Vérifier les spams
- Vérifier que l'expéditeur est vérifié
- Vérifier les logs dans SendGrid → Activity

### ❌ API Key invalide
- Vérifier qu'elle commence par `SG.`
- Vérifier qu'elle est complète
- Créer une nouvelle clé si nécessaire

### ❌ Email non envoyé
- Vérifier que l'email expéditeur est vérifié
- Vérifier les logs SendGrid
- Vérifier les variables d'environnement sur Railway

---

**Prêt à configurer SendGrid ?** Suivez les étapes ci-dessus ! 🚀

