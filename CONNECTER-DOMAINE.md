# 🌐 CONNECTER VOTRE NOM DE DOMAINE
## Ghost Remix Pack - Configuration DNS complète

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis](#prérequis)
2. [Vue d'ensemble](#vue-densemble)
3. [Étape 1 : Déployer le site](#étape-1--déployer-le-site)
4. [Étape 2 : Configurer Vercel (Frontend)](#étape-2--configurer-vercel-frontend)
5. [Étape 3 : Configurer Railway (Backend)](#étape-3--configurer-railway-backend)
6. [Étape 4 : Configurer le DNS](#étape-4--configurer-le-dns)
7. [Étape 5 : Mettre à jour les URLs](#étape-5--mettre-à-jour-les-urls)
8. [Exemples de configuration](#exemples-de-configuration)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 PRÉREQUIS

Avant de commencer, assurez-vous d'avoir :

- ✅ Un nom de domaine acheté (ex: `ghostremixpack.com`)
- ✅ Accès au panneau de configuration DNS de votre registrar
- ✅ Le site déployé sur Vercel (frontend) et Railway (backend)
- ✅ Environ 30 minutes de temps

**Si le site n'est pas encore déployé :**
→ Suivez d'abord `CHECKING-COMPLET-ET-TUTORIEL.md` - Section Déploiement

---

## 📊 VUE D'ENSEMBLE

Votre site Ghost Remix Pack se compose de **2 parties** :

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  FRONTEND (Vercel)              BACKEND (Railway)           │
│  ─────────────────              ─────────────────           │
│  • Interface utilisateur        • API Stripe                │
│  • Pages du site                • Routes de paiement        │
│  • Panier                       • Téléchargements           │
│                                                              │
│  Domaine souhaité :             Sous-domaine souhaité :     │
│  ghostremixpack.com             api.ghostremixpack.com      │
│  www.ghostremixpack.com                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Objectif :** Connecter votre domaine aux deux services.

---

## 📝 ÉTAPE 1 : DÉPLOYER LE SITE

### **1.1 - Vérifier que le site est déployé**

Si ce n'est pas encore fait, déployez votre site :

#### **Frontend sur Vercel**
1. Allez sur https://vercel.com
2. Importez votre repository GitHub
3. Déployez

**Résultat :** Vous obtenez une URL comme `ghost-remix-pack.vercel.app`

#### **Backend sur Railway**
1. Allez sur https://railway.app
2. Importez votre repository GitHub
3. Déployez le dossier `backend`

**Résultat :** Vous obtenez une URL comme `ghost-remix-backend.up.railway.app`

**📖 Guide détaillé :** `CHECKING-COMPLET-ET-TUTORIEL.md` - Section Déploiement

---

## 🎨 ÉTAPE 2 : CONFIGURER VERCEL (FRONTEND)

### **2.1 - Ajouter le domaine dans Vercel**

1. Allez sur https://vercel.com/dashboard
2. Cliquez sur votre projet `ghost-remix-pack`
3. Allez dans **Settings** → **Domains**
4. Cliquez sur **Add Domain**

### **2.2 - Ajouter vos domaines**

Ajoutez **les deux versions** :

```
ghostremixpack.com
www.ghostremixpack.com
```

**💡 Conseil :** Configurez `www.ghostremixpack.com` comme domaine principal et faites rediriger `ghostremixpack.com` vers lui (ou l'inverse).

### **2.3 - Récupérer les enregistrements DNS**

Vercel va vous donner des enregistrements DNS à configurer. Notez-les :

**Pour `ghostremixpack.com` (apex domain) :**
```
Type: A
Name: @
Value: 76.76.21.21 (IP de Vercel)
```

**Pour `www.ghostremixpack.com` :**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**ℹ️ Les valeurs exactes seront affichées dans Vercel**

---

## 🔧 ÉTAPE 3 : CONFIGURER RAILWAY (BACKEND)

### **3.1 - Ajouter le domaine dans Railway**

1. Allez sur https://railway.app/dashboard
2. Cliquez sur votre projet backend
3. Allez dans **Settings** → **Domains**
4. Cliquez sur **+ New Domain**

### **3.2 - Configurer le sous-domaine**

Option 1 : **Domaine Railway (gratuit)**
```
ghost-remix-backend-production.up.railway.app
```

Option 2 : **Sous-domaine personnalisé** (recommandé)
```
api.ghostremixpack.com
```

### **3.3 - Si vous choisissez un sous-domaine personnalisé**

Railway vous donnera un enregistrement CNAME :

```
Type: CNAME
Name: api
Value: xxxxx.railway.app
```

**ℹ️ La valeur exacte sera affichée dans Railway**

---

## 🌐 ÉTAPE 4 : CONFIGURER LE DNS

Maintenant, allez chez votre **registrar** (là où vous avez acheté le domaine).

### **4.1 - Accéder au panneau DNS**

**Exemples selon les registrars :**

| Registrar | Où trouver les DNS |
|-----------|-------------------|
| **OVH** | Espace client → DNS Zone |
| **Gandi** | Domaines → Enregistrements DNS |
| **Namecheap** | Domain List → Manage → Advanced DNS |
| **GoDaddy** | My Products → DNS → Manage DNS |
| **Google Domains** | My domains → DNS |
| **Cloudflare** | DNS → Records |

### **4.2 - Ajouter les enregistrements DNS**

#### **Configuration Frontend (Vercel)**

**Enregistrement 1 : Domaine principal**
```
Type: A
Name: @ (ou laissez vide selon le registrar)
Value: 76.76.21.21 (ou l'IP fournie par Vercel)
TTL: 3600 (ou Auto)
```

**Enregistrement 2 : Sous-domaine www**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com (ou la valeur fournie par Vercel)
TTL: 3600 (ou Auto)
```

#### **Configuration Backend (Railway)**

**Enregistrement 3 : API**
```
Type: CNAME
Name: api
Value: xxxxx.railway.app (la valeur fournie par Railway)
TTL: 3600 (ou Auto)
```

### **4.3 - Sauvegarder**

Cliquez sur **Sauvegarder** ou **Add Record**.

**⏱️ Délai de propagation :** 5 minutes à 48 heures (généralement 15-30 min)

---

## 🔄 ÉTAPE 5 : METTRE À JOUR LES URLS

### **5.1 - Mettre à jour les variables d'environnement**

#### **Dans Vercel (Frontend)**

1. Allez dans **Settings** → **Environment Variables**
2. Mettez à jour ou ajoutez :

```bash
VITE_BACKEND_URL=https://api.ghostremixpack.com
```

3. Redéployez le projet (Deployments → ... → Redeploy)

#### **Dans Railway (Backend)**

1. Allez dans **Variables**
2. Mettez à jour :

```bash
FRONTEND_URL=https://www.ghostremixpack.com
SUCCESS_URL=https://www.ghostremixpack.com/success
CANCEL_URL=https://www.ghostremixpack.com/cart
```

3. Railway redémarrera automatiquement

### **5.2 - Mettre à jour Stripe**

#### **Mettre à jour le webhook Stripe**

1. Allez sur https://dashboard.stripe.com/webhooks
2. Cliquez sur votre webhook
3. Mettez à jour l'URL :

**Ancienne URL :**
```
https://xxxxx.railway.app/api/webhook
```

**Nouvelle URL :**
```
https://api.ghostremixpack.com/api/webhook
```

4. Sauvegardez

---

## ✅ VÉRIFICATION

### **Vérifier que tout fonctionne**

#### **1. Tester le frontend**

Ouvrez votre navigateur et allez sur :
- `https://ghostremixpack.com`
- `https://www.ghostremixpack.com`

**✅ Résultat attendu :** Votre site s'affiche

#### **2. Tester l'API backend**

Ouvrez :
```
https://api.ghostremixpack.com/api/health
```

**✅ Résultat attendu :**
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running",
  "timestamp": "2025-10-15T..."
}
```

#### **3. Tester un paiement**

1. Ajoutez un produit au panier
2. Procédez au paiement
3. Utilisez la carte de test : `4242 4242 4242 4242`
4. Validez

**✅ Résultat attendu :** Paiement réussi, redirection vers `/success`

---

## 📋 EXEMPLES DE CONFIGURATION

### **Exemple 1 : OVH**

```
┌──────────────────────────────────────────────────────────┐
│ Type    │ Sous-domaine │ Cible                           │
├─────────┼──────────────┼─────────────────────────────────┤
│ A       │              │ 76.76.21.21                     │
│ CNAME   │ www          │ cname.vercel-dns.com            │
│ CNAME   │ api          │ xxxxx.railway.app               │
└──────────────────────────────────────────────────────────┘
```

### **Exemple 2 : Cloudflare**

```
┌──────────────────────────────────────────────────────────┐
│ Type    │ Name         │ Content          │ Proxy status │
├─────────┼──────────────┼──────────────────┼──────────────┤
│ A       │ @            │ 76.76.21.21      │ Proxied      │
│ CNAME   │ www          │ cname.vercel...  │ Proxied      │
│ CNAME   │ api          │ xxxxx.railway... │ DNS only     │
└──────────────────────────────────────────────────────────┘
```

**⚠️ Pour Cloudflare :**
- Frontend : Peut être **Proxied** (recommandé)
- Backend API : Doit être **DNS only** (important !)

### **Exemple 3 : Gandi**

```
┌──────────────────────────────────────────────────────────┐
│ Type    │ Nom          │ Valeur                          │
├─────────┼──────────────┼─────────────────────────────────┤
│ A       │ @            │ 76.76.21.21                     │
│ CNAME   │ www          │ cname.vercel-dns.com            │
│ CNAME   │ api          │ xxxxx.railway.app               │
└──────────────────────────────────────────────────────────┘
```

---

## 🔍 VÉRIFIER LA PROPAGATION DNS

### **Méthode 1 : En ligne**

Allez sur https://dnschecker.org et entrez :
- `ghostremixpack.com`
- `www.ghostremixpack.com`
- `api.ghostremixpack.com`

**✅ Résultat attendu :** Les enregistrements apparaissent partout dans le monde

### **Méthode 2 : Terminal**

```bash
# Vérifier le domaine principal
dig ghostremixpack.com

# Vérifier le www
dig www.ghostremixpack.com

# Vérifier l'API
dig api.ghostremixpack.com
```

---

## 🛡️ SÉCURITÉ : HTTPS/SSL

### **Vercel (Frontend)**

✅ **Automatique !** Vercel configure SSL automatiquement via Let's Encrypt.

**Vérification :** Votre site doit afficher un cadenas 🔒 dans le navigateur.

### **Railway (Backend)**

✅ **Automatique !** Railway configure SSL automatiquement.

**Vérification :** `https://api.ghostremixpack.com/api/health` doit fonctionner en HTTPS.

---

## 🎯 RÉCAPITULATIF

### **Configuration DNS Finale**

| Enregistrement | Type | Nom | Valeur | Usage |
|----------------|------|-----|--------|-------|
| 1 | A | @ | 76.76.21.21 | Site principal |
| 2 | CNAME | www | cname.vercel-dns.com | Site avec www |
| 3 | CNAME | api | xxxxx.railway.app | API Backend |

### **URLs Finales**

| Service | URL | Usage |
|---------|-----|-------|
| **Frontend** | `https://ghostremixpack.com` | Site principal |
| **Frontend** | `https://www.ghostremixpack.com` | Alias |
| **Backend** | `https://api.ghostremixpack.com` | API |
| **Health Check** | `https://api.ghostremixpack.com/api/health` | Test API |
| **Webhook Stripe** | `https://api.ghostremixpack.com/api/webhook` | Notifications |

---

## 🐛 TROUBLESHOOTING

### **Problème 1 : "Site unreachable" ou "DNS_PROBE_FINISHED_NXDOMAIN"**

**Cause :** DNS pas encore propagé ou mal configuré

**Solutions :**
1. Attendez 15-30 minutes
2. Vérifiez les enregistrements DNS dans votre registrar
3. Vérifiez sur https://dnschecker.org
4. Videz le cache DNS de votre ordinateur :
   ```bash
   # Mac
   sudo dscacheutil -flushcache
   
   # Windows
   ipconfig /flushdns
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

---

### **Problème 2 : "ERR_CERT_COMMON_NAME_INVALID" (Erreur SSL)**

**Cause :** Le certificat SSL n'est pas encore généré

**Solutions :**
1. Attendez 5-10 minutes après avoir ajouté le domaine
2. Dans Vercel, allez dans Settings → Domains
3. Vérifiez que le statut est "Valid"
4. Si "Invalid", supprimez et ajoutez à nouveau le domaine

---

### **Problème 3 : Le frontend fonctionne mais pas l'API**

**Cause :** Le CNAME de l'API n'est pas correct ou CORS mal configuré

**Solutions :**

1. Vérifiez le CNAME :
   ```bash
   dig api.ghostremixpack.com
   ```
   
2. Vérifiez que Railway affiche le domaine comme "Active"

3. Vérifiez la variable `FRONTEND_URL` dans Railway :
   ```bash
   FRONTEND_URL=https://www.ghostremixpack.com
   ```

4. Testez directement l'API :
   ```bash
   curl https://api.ghostremixpack.com/api/health
   ```

---

### **Problème 4 : "Mixed Content" (Contenu mixte)**

**Cause :** Le site est en HTTPS mais appelle l'API en HTTP

**Solution :**

Vérifiez `src/config/stripe.ts` :
```typescript
// ❌ MAUVAIS
export const BACKEND_API_URL = 'http://api.ghostremixpack.com';

// ✅ BON
export const BACKEND_API_URL = 'https://api.ghostremixpack.com';
```

Ou utilisez la variable d'environnement :
```bash
# Dans Vercel
VITE_BACKEND_URL=https://api.ghostremixpack.com
```

---

### **Problème 5 : Les paiements ne fonctionnent plus**

**Cause :** Le webhook Stripe n'a pas été mis à jour

**Solution :**

1. Allez sur https://dashboard.stripe.com/webhooks
2. Cliquez sur votre webhook
3. Mettez à jour l'URL :
   ```
   https://api.ghostremixpack.com/api/webhook
   ```
4. Vérifiez que les événements sont bien reçus

---

### **Problème 6 : Redirection www ↔ non-www ne fonctionne pas**

**Solution :**

Dans Vercel, allez dans Settings → Domains et configurez :

**Option A :** Rediriger `ghostremixpack.com` → `www.ghostremixpack.com`
**Option B :** Rediriger `www.ghostremixpack.com` → `ghostremixpack.com`

Choisissez **une seule option** pour éviter les boucles de redirection.

---

## 📞 SUPPORT DES REGISTRARS

### **OVH**
- Documentation : https://docs.ovh.com/fr/domains/
- Support : https://www.ovh.com/fr/support/

### **Gandi**
- Documentation : https://docs.gandi.net/fr/
- Support : https://shop.gandi.net/fr/contact

### **Namecheap**
- Documentation : https://www.namecheap.com/support/knowledgebase/
- Support : Live chat sur le site

### **Cloudflare**
- Documentation : https://developers.cloudflare.com/dns/
- Support : https://support.cloudflare.com/

---

## ✅ CHECKLIST FINALE

### **Configuration**
- [ ] Site déployé sur Vercel
- [ ] Backend déployé sur Railway
- [ ] Domaine ajouté dans Vercel
- [ ] Sous-domaine API ajouté dans Railway
- [ ] Enregistrements DNS configurés (A + CNAME)
- [ ] DNS propagé (vérifier sur dnschecker.org)

### **Variables d'environnement**
- [ ] `VITE_BACKEND_URL` mis à jour dans Vercel
- [ ] `FRONTEND_URL` mis à jour dans Railway
- [ ] `SUCCESS_URL` et `CANCEL_URL` mis à jour
- [ ] Projets redéployés

### **Stripe**
- [ ] URL du webhook mise à jour
- [ ] Test de paiement effectué

### **Tests**
- [ ] `https://ghostremixpack.com` fonctionne
- [ ] `https://www.ghostremixpack.com` fonctionne
- [ ] `https://api.ghostremixpack.com/api/health` fonctionne
- [ ] Paiement test réussi
- [ ] SSL actif (cadenas 🔒 visible)

---

## 🎉 FÉLICITATIONS !

Une fois toutes les étapes complétées, votre site Ghost Remix Pack est accessible sur votre propre domaine !

```
✅ Frontend : https://www.ghostremixpack.com
✅ Backend : https://api.ghostremixpack.com
✅ SSL actif
✅ Paiements fonctionnels
✅ Prêt pour la production !
```

---

## 📚 RESSOURCES

| Document | Sujet |
|----------|-------|
| `CHECKING-COMPLET-ET-TUTORIEL.md` | Déploiement complet |
| `DEPLOIEMENT-BACKEND-RAILWAY.md` | Configuration Railway |
| `TUTO-VERCEL-DEPLOIEMENT.md` | Configuration Vercel |
| `STATUT-PROJET.md` | État du projet |

---

**🌐 Votre site est maintenant en ligne avec votre propre domaine !**

---

_Créé le 15 octobre 2025_  
_Version 1.0 - Configuration DNS complète_

