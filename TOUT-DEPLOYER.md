# 🚀 TOUT DÉPLOYER DEPUIS ZÉRO
## Guide complet GitHub → Railway → Vercel

---

## 🎯 OBJECTIF

Mettre votre site Ghost Remix Pack en ligne en 30 minutes.

---

## 📊 VUE D'ENSEMBLE

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  ÉTAPE 1 : GITHUB (5 min)                               │
│  └─ Stocker votre code en ligne                         │
│                                                          │
│  ÉTAPE 2 : RAILWAY (10 min)                             │
│  └─ Backend en ligne (API paiements)                    │
│                                                          │
│  ÉTAPE 3 : VERCEL (10 min)                              │
│  └─ Frontend en ligne (votre site web)                  │
│                                                          │
│  ÉTAPE 4 : TESTER (5 min)                               │
│  └─ Vérifier que tout marche                            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

# 📍 ÉTAPE 1 : GITHUB (Stocker le code)

## **C'est quoi GitHub ?**

GitHub = Dropbox pour développeurs. Il stocke votre code en ligne.

**Pourquoi ?** Railway et Vercel vont lire votre code depuis GitHub.

---

## **1.1 - Vérifier que vous êtes connecté**

Votre code est déjà connecté à GitHub !

**Vérification :** https://github.com/producerghostremixpack-wq/ghost-remix-pack

Vous devriez voir votre code.

---

## **1.2 - Pousser les derniers changements**

Dans votre terminal :

```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"
git add .
git commit -m "Site complet prêt pour déploiement"
git push
```

**⏱️ Temps : 30 secondes**

**✅ Résultat :**
```
Writing objects: 100%
To https://github.com/producerghostremixpack-wq/ghost-remix-pack.git
```

**Si erreur "authentication" :**
- GitHub demande un token
- Allez sur : https://github.com/settings/tokens
- Generate new token (classic)
- Cochez "repo"
- Copiez le token
- Utilisez-le comme mot de passe

---

# 🚂 ÉTAPE 2 : RAILWAY (Backend en ligne)

## **C'est quoi Railway ?**

Railway = Un ordinateur dans le cloud qui fait tourner votre backend 24/7.

**Pourquoi ?** Pour traiter les paiements Stripe, envoyer les emails, etc.

---

## **2.1 - Créer un compte Railway**

1. Allez sur **https://railway.app**
2. Cliquez **"Start a New Project"**
3. Choisissez **"Login with GitHub"**
4. Autorisez Railway (cliquez "Authorize")

**✅ Vous êtes maintenant sur le dashboard Railway**

---

## **2.2 - Créer un nouveau projet**

1. Cliquez **"New Project"** (gros bouton violet)
2. Choisissez **"Deploy from GitHub repo"**

**Vous voyez une liste de vos repositories GitHub**

---

## **2.3 - Autoriser l'accès au repository**

### **❓ Vous NE VOYEZ PAS "ghost-remix-pack" ?**

C'est normal ! Railway n'a pas encore l'autorisation.

**Solution :**

En bas de la liste des repos, cliquez sur :
```
"Configure GitHub App"
ou
"Add repositories"
```

**Vous êtes redirigé vers GitHub :**

1. Sélectionnez votre compte : **producerghostremixpack-wq**
2. **Repository access** → Choisissez :
   ```
   ● All repositories
   ```
   (Plus simple pour l'avenir)
   
   OU
   
   ```
   ● Only select repositories
   ☑ ghost-remix-pack  ← Cochez cette case
   ```

3. Cliquez **"Save"** ou **"Install & Authorize"**

**Vous êtes redirigé vers Railway**

4. Rafraîchissez la page (F5) si nécessaire
5. Cliquez à nouveau **"Deploy from GitHub repo"**
6. **Maintenant vous VOYEZ "ghost-remix-pack" !** ✅

---

## **2.4 - Déployer le backend**

1. **Cliquez** sur **"ghost-remix-pack"** dans la liste

Railway démarre le déploiement automatiquement :

```
⏳ Cloning repository...
⏳ Installing dependencies...
⏳ Building...
⏳ Deploying...
```

**⏱️ Attendez 2-3 minutes**

Vous verrez les logs défiler en direct.

**✅ Quand vous voyez :**
```
✓ Build successful
✓ Deployment live
```

**C'est déployé !**

---

## **2.5 - Ajouter les variables d'environnement**

**IMPORTANT :** Votre backend a besoin de ses "clés API" pour fonctionner.

Dans Railway, cliquez sur l'onglet **"Variables"** (en haut).

**Ajoutez ces 4 variables UNE PAR UNE :**

### **Variable 1 : Clé Stripe**

Cliquez **"+ New Variable"** :

```
Name: STRIPE_SECRET_KEY

Value: sk_test_VOTRE_CLE_TEST_ICI
```

Cliquez **"Add"**

### **Variable 2 : URL du Frontend**

Cliquez **"+ New Variable"** :

```
Name: FRONTEND_URL

Value: http://localhost:5173
```

(On mettra l'URL Vercel après)

Cliquez **"Add"**

### **Variable 3 : Port**

Cliquez **"+ New Variable"** :

```
Name: PORT

Value: 3001
```

Cliquez **"Add"**

### **Variable 4 : Environment**

Cliquez **"+ New Variable"** :

```
Name: NODE_ENV

Value: production
```

Cliquez **"Add"**

**⏱️ Railway redémarre automatiquement après chaque variable (30 sec)**

---

## **2.6 - Générer l'URL publique**

1. Cliquez sur l'onglet **"Settings"** (en haut)
2. Descendez jusqu'à la section **"Domains"**
3. Cliquez sur **"Generate Domain"**

**Railway vous donne une URL comme :**
```
https://ghost-remix-backend-production-abc123.up.railway.app
```

**📝 COPIEZ CETTE URL DANS UN FICHIER TEXTE !**

Vous en aurez besoin pour Vercel.

---

## **2.7 - Tester que l'API fonctionne**

Ouvrez dans votre navigateur (remplacez par VOTRE URL Railway) :

```
https://ghost-remix-backend-production-abc123.up.railway.app/api/health
```

**✅ Vous DEVEZ voir :**
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running",
  "timestamp": "2025-10-15T10:30:00.000Z"
}
```

**❌ Si vous voyez "Application Error" ou erreur 500 :**

1. Dans Railway, cliquez sur **"Deployments"**
2. Cliquez sur le dernier déploiement
3. Regardez les **logs**
4. Cherchez les lignes ROUGES (erreurs)

**Erreurs courantes :**
- `STRIPE_SECRET_KEY not found` → Vérifiez que la variable est bien ajoutée
- `Cannot find module` → Attendez encore 1-2 minutes

---

# ☁️ ÉTAPE 3 : VERCEL (Frontend en ligne)

## **C'est quoi Vercel ?**

Vercel = Un ordinateur dans le cloud qui affiche votre site web 24/7.

**Pourquoi ?** Pour que les gens puissent voir votre site depuis n'importe où.

---

## **3.1 - Créer un compte Vercel**

1. Allez sur **https://vercel.com**
2. Cliquez **"Sign Up"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel (cliquez "Authorize")

**✅ Vous êtes maintenant sur le dashboard Vercel**

---

## **3.2 - Importer votre projet**

1. Cliquez **"Add New..."** (bouton en haut à droite)
2. Choisissez **"Project"**
3. Dans la liste des repositories, trouvez **"ghost-remix-pack"**
4. Cliquez **"Import"** à côté

---

## **3.3 - Configurer AVANT de déployer**

**IMPORTANT :** Ne cliquez PAS encore sur "Deploy" !

1. **Framework Preset** : Vercel détecte automatiquement "Vite" ✅
2. **Root Directory** : Laissez `./` (racine) ✅
3. **Environment Variables** : **C'EST ICI QU'ON AJOUTE LA VARIABLE !**

Cliquez pour déplier **"Environment Variables"**

### **Ajouter la variable Backend URL :**

```
Name: VITE_BACKEND_URL

Value: https://ghost-remix-backend-production-abc123.up.railway.app
```

**⚠️ Remplacez par VOTRE URL Railway (de l'étape 2.6) !**

4. Cliquez **"Add"**

5. **MAINTENANT** cliquez **"Deploy"**

---

## **3.4 - Attendre le déploiement**

Vercel va :
- ✅ Cloner votre code depuis GitHub
- ✅ Installer les dépendances
- ✅ Compiler le projet (build)
- ✅ Le mettre en ligne

**⏱️ Attendez 2-3 minutes**

Vous verrez les logs défiler :
```
⏳ Building...
⏳ Deploying...
✅ Success!
```

---

## **3.5 - Obtenir l'URL de votre site**

**Quand c'est terminé, Vercel affiche :**

```
🎉 Congratulations!

Visit: https://ghost-remix-pack-xyz123.vercel.app
```

**📝 COPIEZ CETTE URL !**

**C'est l'adresse de votre site en ligne !**

---

## **3.6 - Mettre à jour Railway**

**IMPORTANT :** Il faut dire au backend où est le frontend !

Retournez sur **Railway** :

1. Cliquez sur votre projet backend
2. Onglet **"Variables"**
3. Trouvez la variable **`FRONTEND_URL`**
4. Cliquez sur les 3 points **"..."** → **"Edit"**
5. Changez la valeur :

**AVANT :**
```
http://localhost:5173
```

**APRÈS :**
```
https://ghost-remix-pack-xyz123.vercel.app
```

(Remplacez par VOTRE URL Vercel de l'étape 3.5)

6. Cliquez **"Update"**

**Railway redémarre automatiquement (30 secondes)**

---

# 🧪 ÉTAPE 4 : TESTER TOUT

## **4.1 - Tester le backend seul**

Ouvrez :
```
https://VOTRE-URL.railway.app/api/health
```

**✅ Doit afficher :**
```json
{ "status": "OK", "message": "Ghost Remix Backend API is running" }
```

---

## **4.2 - Tester le frontend seul**

Ouvrez :
```
https://VOTRE-URL.vercel.app
```

**✅ Doit afficher :**
- Votre site avec la vidéo
- Les packs audio
- Le design

---

## **4.3 - Tester le parcours complet**

Sur votre site Vercel :

1. ✅ Cliquez **"Ajouter au panier"** sur un pack
2. ✅ Cliquez sur l'icône panier (en haut à droite)
3. ✅ Vérifiez que le panier contient le produit
4. ✅ Cliquez **"Procéder au paiement"**
5. ✅ Remplissez le formulaire :
   ```
   Nom : Test User
   Email : test@example.com
   Téléphone : 0612345678
   ```
6. ✅ Cliquez **"Payer"**
7. ✅ Vous êtes redirigé vers Stripe Checkout
8. ✅ Utilisez la carte de TEST :
   ```
   Numéro : 4242 4242 4242 4242
   Date : 12/25 (n'importe quelle date future)
   CVC : 123 (n'importe quels 3 chiffres)
   ```
9. ✅ Cliquez **"Pay"**
10. ✅ Vous êtes redirigé vers la page de succès

**🎉 SI TOUT MARCHE : FÉLICITATIONS ! VOTRE SITE EST EN LIGNE !**

---

## ❌ DÉPANNAGE

### **Erreur lors du git push**

```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"
git status
```

Si conflit ou erreur, tapez :
```bash
git add .
git commit -m "Fix"
git push --force
```

---

### **Repository introuvable sur Railway**

1. https://github.com/settings/installations
2. Trouvez **"Railway"**
3. Cliquez **"Configure"**
4. **Repository access** → Cochez **"ghost-remix-pack"**
5. **Save**
6. Retournez sur Railway
7. Le repository devrait apparaître

---

### **Railway : Erreur "Application Error"**

**Dans Railway :**
1. Deployments → Dernier déploiement → **Build Logs**
2. Cherchez les erreurs en ROUGE

**Causes courantes :**
- Variables d'environnement manquantes
- Problème dans `railway.json`
- Port incorrect

**Solution :**
- Vérifiez que les 4 variables sont bien là
- Vérifiez que `railway.json` existe à la racine
- Redéployez : Deployments → ... → Redeploy

---

### **Vercel : Build failed**

**Dans Vercel :**
1. Deployments → Dernier déploiement → **Build Logs**
2. Cherchez l'erreur

**Causes courantes :**
- Erreur TypeScript
- Dépendance manquante
- Variable d'environnement incorrecte

**Solution :**
1. Vérifiez que `VITE_BACKEND_URL` est correct
2. Redéployez : Deployments → ... → Redeploy

---

### **Site en ligne mais paiement ne marche pas**

**Vérifiez dans l'ordre :**

1. **L'API fonctionne :** Ouvrez `https://railway.app/api/health`
2. **La variable Vercel est correcte :**
   - Settings → Environment Variables
   - `VITE_BACKEND_URL` = URL Railway complète
3. **La console navigateur :** F12 → Console → Cherchez les erreurs CORS
4. **Railway FRONTEND_URL :**
   - Variables → `FRONTEND_URL` = URL Vercel complète

---

### **Erreur CORS**

```
Access to fetch at 'https://railway...' from origin 'https://vercel...' 
has been blocked by CORS policy
```

**Cause :** `FRONTEND_URL` dans Railway n'est pas correct.

**Solution :**
- Railway → Variables → `FRONTEND_URL`
- Mettez EXACTEMENT l'URL Vercel (avec https://)
- Railway redémarre (30 sec)
- Testez à nouveau

---

# 📊 RÉCAPITULATIF DES URLS

**À la fin, vous aurez 3 URLs :**

| Service | URL | Utilité |
|---------|-----|---------|
| **GitHub** | `https://github.com/producerghostremixpack-wq/ghost-remix-pack` | Code source |
| **Railway** | `https://xxx.railway.app` | API Backend |
| **Vercel** | `https://xxx.vercel.app` | Site Web |

**Vos clients visiteront :** L'URL Vercel  
**Vercel appellera :** L'URL Railway  
**Les deux lisent depuis :** GitHub  

---

# ⚙️ CONFIGURATION DES VARIABLES

## **Railway (Backend) :**

```
STRIPE_SECRET_KEY = sk_test_VOTRE_CLE_TEST_ICI
FRONTEND_URL = https://VOTRE-SITE.vercel.app
PORT = 3001
NODE_ENV = production
```

## **Vercel (Frontend) :**

```
VITE_BACKEND_URL = https://VOTRE-BACKEND.railway.app
```

**⚠️ Important :** Les deux doivent se pointer l'un vers l'autre !

---

# ✅ CHECKLIST FINALE

## **GitHub :**
- [ ] Code poussé sur GitHub
- [ ] Repository visible en ligne
- [ ] Dernières modifications commitées

## **Railway :**
- [ ] Compte créé
- [ ] Repository autorisé
- [ ] Projet déployé avec succès
- [ ] 4 variables ajoutées
- [ ] URL générée
- [ ] Test `/api/health` OK
- [ ] `FRONTEND_URL` mise à jour avec URL Vercel

## **Vercel :**
- [ ] Compte créé
- [ ] Projet importé
- [ ] Variable `VITE_BACKEND_URL` ajoutée
- [ ] Déploiement réussi
- [ ] URL obtenue
- [ ] Site s'affiche

## **Tests :**
- [ ] API health check fonctionne
- [ ] Site s'affiche correctement
- [ ] Panier fonctionne
- [ ] Paiement test réussi
- [ ] Redirection vers page de succès

---

# 🎉 FÉLICITATIONS !

**Une fois toutes les étapes complétées :**

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║  ✅ VOTRE SITE EST EN LIGNE !                         ║
║                                                       ║
║  Frontend : https://xxx.vercel.app                   ║
║  Backend  : https://xxx.railway.app                  ║
║                                                       ║
║  🌐 Accessible partout dans le monde                 ║
║  💳 Prêt à accepter des paiements TEST               ║
║  💰 Gratuit (tant que mode TEST)                     ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

---

# 🔑 PASSER EN PRODUCTION (Plus tard)

Quand vous serez prêt à accepter de VRAIS paiements :

1. **Stripe Dashboard** → Mode "Live"
2. **Créer de nouvelles clés** (sk_live_VOTRE_CLE_LIVE_ICI... et pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI...)
3. **Mettre à jour Railway** → Variable `STRIPE_SECRET_KEY`
4. **Mettre à jour le code** → `src/config/stripe.ts`
5. **Créer un webhook Stripe** production
6. **Tester avec une vraie carte** (petit montant)

⚠️ **Important :** Révoquez toujours les anciennes clés !

---

# 🌐 AJOUTER UN DOMAINE PERSONNALISÉ

Si vous avez un domaine (ex: ghostremixpack.com) :

## **Sur Vercel :**
1. Settings → Domains
2. Add : `www.ghostremixpack.com`
3. Suivez les instructions DNS

## **Sur Railway :**
1. Settings → Domains → Custom Domain
2. Add : `api.ghostremixpack.com`
3. Suivez les instructions DNS

## **Chez votre registrar (OVH, Gandi, etc.) :**

Ajoutez ces enregistrements DNS :
```
A     @    → (IP Vercel)
CNAME www  → (cname.vercel-dns.com)
CNAME api  → (xxx.railway.app)
```

**⏱️ Propagation : 15-30 minutes**

---

# 🎯 COMMANDES RAPIDES

## **Pousser sur GitHub :**
```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"
git add .
git commit -m "Update"
git push
```

## **Tester en local :**
```bash
# Terminal 1
npm run dev

# Terminal 2
cd backend && npm run dev
```

## **Redéployer :**
- **Railway :** Deployments → ... → Redeploy
- **Vercel :** Deployments → ... → Redeploy

---

# 📞 LIENS UTILES

| Service | Dashboard | Documentation |
|---------|-----------|---------------|
| **GitHub** | https://github.com/producerghostremixpack-wq/ghost-remix-pack | https://docs.github.com |
| **Railway** | https://railway.app/dashboard | https://docs.railway.app |
| **Vercel** | https://vercel.com/dashboard | https://vercel.com/docs |
| **Stripe** | https://dashboard.stripe.com | https://stripe.com/docs |

---

# 💡 CE QU'IL FAUT RETENIR

```
GitHub   = Stocke votre code
Railway  = Fait tourner le backend (API)
Vercel   = Affiche le frontend (site web)

Les 3 sont GRATUITS pour commencer !
```

---

# 🚀 COMMENCEZ MAINTENANT !

**Étape 1 :** Pusher sur GitHub
```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"
git push
```

**Étape 2 :** Allez sur https://railway.app/new

**Étape 3 :** Suivez ce guide étape par étape !

---

**🎉 Bon déploiement !**

