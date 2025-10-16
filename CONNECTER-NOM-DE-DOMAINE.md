# 🌐 Connecter un Nom de Domaine à Ghost Remix Pack

Guide complet pour connecter votre propre nom de domaine (ex: `ghostremixpack.com`) à votre site.

---

## 📋 Vue d'ensemble

Vous aurez besoin de :
- 1 nom de domaine (ex: `ghostremixpack.com`)
- 2 sous-domaines :
  - `ghostremixpack.com` → Frontend (Vercel)
  - `api.ghostremixpack.com` → Backend (Railway)

**Temps estimé** : 30-60 minutes (+ temps de propagation DNS)

---

## 🛒 ÉTAPE 1 : Acheter un Nom de Domaine (10 min)

### Options recommandées :

#### A. Namecheap (Recommandé - Pas cher)
- URL : https://www.namecheap.com
- Prix : ~10-15€/an
- Interface simple
- Bon support

#### B. Google Domains → Squarespace
- URL : https://domains.google.com
- Prix : ~12-15€/an
- Très fiable

#### C. OVH (Si vous êtes en France)
- URL : https://www.ovh.com
- Prix : ~10€/an
- Support français

#### D. GoDaddy
- URL : https://www.godaddy.com
- Prix : Variable
- Le plus connu

### 📝 Conseils pour choisir :
```
✅ ghostremixpack.com        (Idéal)
✅ ghost-remix-pack.com      (Bien)
✅ ghostremix.com            (Court)
❌ ghost-remix-pack.fr       (Éviter les TLD spécifiques)
```

---

## 🚀 ÉTAPE 2 : Déployer votre Site (Si pas déjà fait)

### A. Déployer le Frontend sur Vercel

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel --prod
```

**Résultat** : Vous obtiendrez une URL comme `https://ghost-remix-pack.vercel.app`

### B. Déployer le Backend sur Railway

1. Aller sur https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Sélectionner votre repo
4. Configurer les variables d'environnement
5. Railway vous donnera une URL comme `https://ghost-remix-backend.up.railway.app`

---

## 🔗 ÉTAPE 3 : Connecter le Domaine au Frontend (Vercel)

### Dans Vercel Dashboard :

1. **Aller dans votre projet**
   - https://vercel.com/dashboard
   - Cliquer sur votre projet `ghost-remix-pack`

2. **Ajouter un domaine**
   - Onglet "Settings" → "Domains"
   - Cliquer "Add"
   - Entrer votre domaine : `ghostremixpack.com`
   - Ajouter aussi : `www.ghostremixpack.com`

3. **Vercel vous donnera des DNS à configurer**
   
   Exemple de ce que vous verrez :
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME  
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 🌍 ÉTAPE 4 : Configurer les DNS chez votre Registrar

### Si vous utilisez Namecheap :

1. **Aller dans votre compte Namecheap**
   - Domain List → Votre domaine → "Manage"

2. **Advanced DNS**
   - Supprimer les enregistrements par défaut
   - Ajouter les enregistrements fournis par Vercel :

```
Type        Host    Value                       TTL
A Record    @       76.76.21.21                Automatic
CNAME       www     cname.vercel-dns.com       Automatic
CNAME       api     ghost-remix-backend.up.railway.app    Automatic
```

### Si vous utilisez Google Domains / Squarespace :

1. **DNS Settings**
2. **Custom records** :

```
Type    Name    Data
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
CNAME   api     ghost-remix-backend.up.railway.app
```

### Si vous utilisez OVH :

1. **Zone DNS**
2. **Ajouter une entrée** :

```
Sous-domaine    Type    Cible
(vide)          A       76.76.21.21
www             CNAME   cname.vercel-dns.com
api             CNAME   ghost-remix-backend.up.railway.app
```

---

## 🔧 ÉTAPE 5 : Connecter le Sous-domaine API au Backend (Railway)

### Dans Railway Dashboard :

1. **Aller dans votre projet backend**
   - https://railway.app/dashboard
   - Sélectionner votre service backend

2. **Settings → Networking → Custom Domain**
   - Cliquer "Add Custom Domain"
   - Entrer : `api.ghostremixpack.com`
   - Railway vous confirmera la configuration

3. **Vérifier le CNAME**
   - Railway vous donnera un CNAME (généralement déjà configuré à l'étape 4)

---

## ⚙️ ÉTAPE 6 : Mettre à Jour les Variables d'Environnement

### Dans Vercel (Frontend) :

Aller dans Settings → Environment Variables et ajouter/modifier :

```bash
VITE_BACKEND_URL=https://api.ghostremixpack.com
```

### Dans Railway (Backend) :

Aller dans Variables et modifier :

```bash
FRONTEND_URL=https://ghostremixpack.com
```

### ⚠️ IMPORTANT : Redéployer après changement

**Vercel :**
```bash
vercel --prod
```

**Railway :** 
- Redémarrage automatique après changement de variables

---

## 🔒 ÉTAPE 7 : Configurer HTTPS (Automatique)

### Vercel
✅ Configure automatiquement SSL/HTTPS
✅ Certificat Let's Encrypt gratuit
✅ Rien à faire !

### Railway
✅ Configure automatiquement SSL/HTTPS
✅ Certificat gratuit
✅ Rien à faire !

---

## ⏱️ ÉTAPE 8 : Attendre la Propagation DNS (5 min - 48h)

La propagation DNS peut prendre du temps :
- **Minimum** : 5-10 minutes
- **Typique** : 1-2 heures
- **Maximum** : 48 heures

### Vérifier la propagation :

```bash
# Vérifier le domaine principal
nslookup ghostremixpack.com

# Vérifier le sous-domaine API
nslookup api.ghostremixpack.com
```

Ou utilisez ces outils en ligne :
- https://dnschecker.org
- https://www.whatsmydns.net

---

## ✅ ÉTAPE 9 : Tester Votre Site

Une fois la propagation terminée :

1. **Ouvrir votre site**
   ```
   https://ghostremixpack.com
   ```

2. **Tester l'API**
   ```
   https://api.ghostremixpack.com/api/health
   ```
   
   Vous devriez voir :
   ```json
   {"status":"OK","message":"Ghost Remix Backend API is running"}
   ```

3. **Tester un achat**
   - Ajouter un produit au panier
   - Aller au checkout
   - Utiliser la carte de test Stripe : `4242 4242 4242 4242`

---

## 🎯 Configuration Finale

Votre configuration finale ressemblera à ça :

```
┌─────────────────────────────────────────┐
│  Utilisateur visite :                   │
│  https://ghostremixpack.com             │
└───────────┬─────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  DNS pointe vers :                      │
│  Vercel (Frontend)                      │
│  - Fichiers statiques                   │
│  - React/Vite                           │
└───────────┬─────────────────────────────┘
            │
            │ API Calls
            ▼
┌─────────────────────────────────────────┐
│  https://api.ghostremixpack.com         │
│  Railway (Backend)                      │
│  - Node.js/Express                      │
│  - Stripe                               │
│  - Firebase                             │
│  - SendGrid                             │
└─────────────────────────────────────────┘
```

---

## 🔄 Résumé des URLs

| Service | URL Développement | URL Production |
|---------|------------------|----------------|
| Frontend | http://localhost:5173 | https://ghostremixpack.com |
| Backend | http://localhost:3001 | https://api.ghostremixpack.com |
| API Health | http://localhost:3001/api/health | https://api.ghostremixpack.com/api/health |

---

## ❓ Problèmes Courants

### 1. "DNS_PROBE_FINISHED_NXDOMAIN"
**Problème** : Le domaine n'est pas encore propagé  
**Solution** : Attendre 1-2 heures

### 2. "CORS Error"
**Problème** : Le backend n'autorise pas le nouveau domaine  
**Solution** : Vérifier que `FRONTEND_URL` dans Railway = votre domaine exact

### 3. "NET::ERR_CERT_AUTHORITY_INVALID"
**Problème** : Le certificat SSL n'est pas encore configuré  
**Solution** : Attendre 5-10 minutes que Vercel/Railway génèrent le certificat

### 4. Le site fonctionne mais pas l'API
**Problème** : Le CNAME pour `api` n'est pas configuré  
**Solution** : Vérifier l'enregistrement CNAME pour `api.votredomaine.com`

### 5. "www" ne fonctionne pas
**Problème** : Le CNAME pour `www` manque  
**Solution** : Ajouter un CNAME : `www` → `cname.vercel-dns.com`

---

## 💰 Coûts Approximatifs

| Service | Coût |
|---------|------|
| Nom de domaine | 10-15€/an |
| Vercel (Frontend) | Gratuit (plan Hobby) |
| Railway (Backend) | Gratuit ($5/mois de crédit) ou $5-20/mois |
| Stripe | 2,9% + 0,30€ par transaction |
| Firebase | Gratuit (plan Spark) |
| SendGrid | Gratuit (100 emails/jour) |
| **TOTAL** | ~10€/an + frais de transaction |

---

## 🎓 Commandes de Vérification

### Vérifier que tout fonctionne :

```bash
# 1. Vérifier le frontend
curl -I https://ghostremixpack.com

# 2. Vérifier l'API
curl https://api.ghostremixpack.com/api/health

# 3. Vérifier les DNS
dig ghostremixpack.com
dig api.ghostremixpack.com

# 4. Vérifier le SSL
curl -vI https://ghostremixpack.com 2>&1 | grep "SSL certificate verify"
```

---

## 📚 Prochaines Étapes

Une fois votre domaine connecté :

1. ✅ **SEO**
   - Ajouter Google Analytics
   - Créer un sitemap.xml
   - Optimiser les meta tags

2. ✅ **Marketing**
   - Configurer les réseaux sociaux
   - Créer des cartes Open Graph
   - Ajouter un blog

3. ✅ **Passer en Production**
   - Passer Stripe en mode Live
   - Configurer les vrais emails
   - Uploader les vrais fichiers audio

---

## 🆘 Besoin d'Aide ?

**DNS/Domaine** :
- Support de votre registrar (Namecheap, Google, etc.)

**Vercel** :
- https://vercel.com/docs/custom-domains
- Discord Vercel

**Railway** :
- https://docs.railway.app/deploy/deployments
- Discord Railway

---

## ✨ Félicitations !

Une fois tout configuré, votre site Ghost Remix Pack sera accessible sur votre propre domaine ! 🎉

**Votre site pro** : `https://ghostremixpack.com`  
**Votre API** : `https://api.ghostremixpack.com`

---

## 📋 Checklist Finale

- [ ] Nom de domaine acheté
- [ ] Frontend déployé sur Vercel
- [ ] Backend déployé sur Railway
- [ ] DNS configurés (A, CNAME)
- [ ] Domaine ajouté à Vercel
- [ ] Sous-domaine API ajouté à Railway
- [ ] Variables d'environnement mises à jour
- [ ] HTTPS fonctionnel sur les deux
- [ ] Test d'achat réussi
- [ ] Tout fonctionne ! 🚀

