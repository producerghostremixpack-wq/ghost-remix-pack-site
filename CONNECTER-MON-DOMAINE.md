# 🌐 Connecter votre Nom de Domaine à votre Site

## 📋 Informations nécessaires

Avant de commencer, vous devez avoir :
- ✅ Votre nom de domaine (ex: `ghostremixpack.com`)
- ✅ Accès au panneau de contrôle de votre registrar (là où vous avez acheté le domaine)
- ✅ Votre site déployé sur Vercel

**Où avez-vous acheté votre domaine ?**
- GoDaddy
- OVH
- Namecheap
- Google Domains
- Autre ?

---

## 🎯 MÉTHODE 1 : Via Vercel (RECOMMANDÉ - Le plus simple)

### Étape 1 : Ajouter le domaine dans Vercel

1. Allez sur votre projet dans Vercel : https://vercel.com/dashboard
2. Cliquez sur votre projet **`ghost-remix-pack`**
3. Allez dans l'onglet **"Settings"**
4. Cliquez sur **"Domains"** dans le menu de gauche
5. Entrez votre nom de domaine (ex: `ghostremixpack.com`)
6. Cliquez sur **"Add"**

### Étape 2 : Configurer les DNS

Vercel va vous donner des instructions spécifiques. Vous aurez 2 options :

#### Option A : Utiliser les Nameservers Vercel (PLUS SIMPLE)
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Instructions :**
1. Allez sur le site de votre registrar (là où vous avez acheté le domaine)
2. Trouvez la section **"Nameservers"** ou **"DNS"**
3. Remplacez les nameservers existants par ceux de Vercel
4. Sauvegardez
5. ⏱️ Attendez 10 minutes à 24 heures (propagation DNS)

#### Option B : Ajouter des enregistrements DNS (Si vous ne pouvez pas changer les nameservers)

Ajoutez ces enregistrements DNS chez votre registrar :

**Pour le domaine principal (`ghostremixpack.com`) :**
```
Type: A
Name: @ (ou vide)
Value: 76.76.21.21
TTL: 3600
```

**Pour www (`www.ghostremixpack.com`) :**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

---

## 🎯 MÉTHODE 2 : Configuration Manuelle par Registrar

### 🟦 GoDaddy

1. Allez sur : https://account.godaddy.com/
2. **Mes Produits** → Trouvez votre domaine → **DNS**
3. **Ajouter** un nouvel enregistrement :
   - Type : **A**
   - Nom : **@**
   - Valeur : **76.76.21.21**
   - TTL : **600**
4. **Ajouter** un autre enregistrement :
   - Type : **CNAME**
   - Nom : **www**
   - Valeur : **cname.vercel-dns.com**
   - TTL : **1 heure**
5. Sauvegardez

### 🟠 OVH

1. Allez sur : https://www.ovh.com/manager/
2. **Noms de domaine** → Cliquez sur votre domaine
3. Onglet **"Zone DNS"** → **"Ajouter une entrée"**
4. Choisissez **A** :
   - Sous-domaine : (vide)
   - Cible : **76.76.21.21**
5. Ajoutez un **CNAME** :
   - Sous-domaine : **www**
   - Cible : **cname.vercel-dns.com.**
6. Validez

### 🟢 Namecheap

1. Allez sur : https://ap.www.namecheap.com/
2. **Domain List** → Cliquez sur **Manage** à côté de votre domaine
3. Onglet **"Advanced DNS"**
4. **Add New Record** :
   - Type : **A Record**
   - Host : **@**
   - Value : **76.76.21.21**
   - TTL : **Automatic**
5. **Add New Record** :
   - Type : **CNAME Record**
   - Host : **www**
   - Value : **cname.vercel-dns.com**
   - TTL : **Automatic**
6. Sauvegardez

### 🔵 Google Domains

1. Allez sur : https://domains.google.com/
2. Cliquez sur votre domaine
3. Menu de gauche : **DNS**
4. Descendez jusqu'à **"Enregistrements personnalisés"**
5. Créez un enregistrement **A** :
   - Nom d'hôte : (vide ou @)
   - Type : **A**
   - TTL : **3600**
   - Données : **76.76.21.21**
6. Créez un enregistrement **CNAME** :
   - Nom d'hôte : **www**
   - Type : **CNAME**
   - TTL : **3600**
   - Données : **cname.vercel-dns.com**
7. Enregistrez

---

## ✅ Vérifier que ça fonctionne

### 1. Via Vercel Dashboard
- Allez dans **Settings** → **Domains**
- Votre domaine devrait afficher : **✅ Valid Configuration**

### 2. Via un navigateur (après propagation)
- Ouvrez : `http://votre-domaine.com`
- Ouvrez : `http://www.votre-domaine.com`
- Les deux devraient afficher votre site !

### 3. Vérifier les DNS (optionnel)
```bash
# Vérifier l'enregistrement A
dig votre-domaine.com

# Vérifier le CNAME
dig www.votre-domaine.com
```

---

## ⏱️ Temps de Propagation

- **Minimum** : 10-30 minutes
- **Maximum** : 24-48 heures
- **Généralement** : 1-2 heures

💡 **Astuce** : Utilisez un onglet de navigation privée pour vérifier plus rapidement

---

## 🔒 HTTPS / SSL (Automatique)

Vercel configure automatiquement HTTPS pour votre domaine !
- Certificat SSL gratuit (Let's Encrypt)
- Renouvellement automatique
- Rien à faire de votre côté 🎉

---

## 🎯 Domaines Multiples (Optionnel)

Vous pouvez ajouter plusieurs domaines :
- `ghostremixpack.com` → Principal
- `www.ghostremixpack.com` → Redirige vers principal
- `ghostremix.fr` → Autre domaine (si vous en avez)

---

## ⚠️ Problèmes Courants

### Le site ne s'affiche pas
- ✅ Vérifiez que les DNS sont corrects
- ✅ Attendez la propagation (peut prendre jusqu'à 24h)
- ✅ Videz le cache de votre navigateur (Ctrl+Shift+R)

### "This site can't be reached"
- ✅ Vérifiez l'enregistrement A : doit pointer vers `76.76.21.21`
- ✅ Vérifiez que le domaine est bien ajouté dans Vercel

### "Not Found - 404"
- ✅ Vérifiez que votre site est bien déployé sur Vercel
- ✅ Vérifiez que le domaine est dans **Settings** → **Domains**

### HTTPS ne fonctionne pas
- ✅ Attendez 10-15 minutes après l'ajout du domaine
- ✅ Vercel génère automatiquement le certificat SSL

---

## 📞 Besoin d'Aide ?

Dites-moi :
1. **Quel est votre nom de domaine ?**
2. **Où l'avez-vous acheté ?** (GoDaddy, OVH, etc.)
3. **Où en êtes-vous ?** (DNS configurés ? Erreur ?)

Et je vous aiderai étape par étape ! 🚀

---

## 🎉 Une fois configuré

Votre site sera accessible sur :
- ✅ `https://votre-domaine.com`
- ✅ `https://www.votre-domaine.com`
- ✅ Avec HTTPS automatique
- ✅ Déploiements automatiques à chaque push GitHub

Félicitations ! 🎊



