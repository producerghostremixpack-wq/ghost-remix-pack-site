# 🚀 Guide Complet - Mise en Ligne de Ghost Remix Pack

## 🎯 OBJECTIF

Mettre votre site **Ghost Remix Pack** en ligne avec :
- ✅ Nom de domaine professionnel
- ✅ HTTPS sécurisé (cadenas vert)
- ✅ Paiements Stripe en mode LIVE
- ✅ Vitesse optimale
- ✅ Site accessible 24/7

---

## 📋 PLAN D'ACTION (4 Étapes Principales)

```
1. Acheter le nom de domaine     → 10 min
2. Déployer le frontend          → 15 min
3. Déployer le backend           → 20 min
4. Activer Stripe LIVE           → 10 min
───────────────────────────────────────────
   TOTAL : ~1 heure
```

---

## 🌐 ÉTAPE 1 : ACHETER LE NOM DE DOMAINE (10 min)

### 🎯 Nom Recommandé

```
ghostremixpack.com
```

**Alternatives si pris :**
- `ghost-remix-pack.com`
- `ghostremix.com`
- `ghostremixpro.com`
- `theghostremix.com`

### 📍 Où Acheter ? (Meilleurs Registrars)

#### Option 1 : OVH (Recommandé - France) ⭐

**Avantages :**
- ✅ Français, support FR
- ✅ Prix : ~10-15€/an
- ✅ DNS facile à configurer
- ✅ Excellent service client

**URL :** https://www.ovh.com/fr/domaines/

**Étapes :**
1. Allez sur ovh.com
2. Cherchez `ghostremixpack.com`
3. Ajoutez au panier
4. Créez un compte OVH
5. Payez (CB, PayPal)
6. Confirmez par email

**Prix :** ~12€/an pour `.com`

---

#### Option 2 : Namecheap (International)

**URL :** https://www.namecheap.com

**Avantages :**
- ✅ Moins cher (~9€/an)
- ✅ Protection WHOIS gratuite
- ✅ Interface simple

---

#### Option 3 : Google Domains

**URL :** https://domains.google.com

**Avantages :**
- ✅ Interface Google (simple)
- ✅ Intégration Google
- ✅ Prix : ~12€/an

---

### ⚙️ Configuration DNS (À Faire Plus Tard)

**Après achat, vous configurerez les DNS pour pointer vers :**
- Frontend (Vercel) : CNAME
- Backend (Railway) : A record

**Je vous guiderai à l'étape 4 ! 👇**

---

## 🎨 ÉTAPE 2 : DÉPLOYER LE FRONTEND (15 min)

### 🚀 Vercel (Recommandé) ⭐

**Pourquoi Vercel ?**
- ✅ **GRATUIT** (pour votre usage)
- ✅ Déploiement en 1 clic
- ✅ HTTPS automatique
- ✅ CDN global (super rapide)
- ✅ Optimisé pour React/Vite
- ✅ Déploiement automatique (git push)

**URL :** https://vercel.com

---

### 📝 Étapes Détaillées

#### 1. Créer Compte Vercel

1. **Allez sur :** https://vercel.com/signup
2. **Connectez-vous avec GitHub**
3. **Autorisez Vercel** à accéder à vos repos

---

#### 2. Push Votre Code sur GitHub

**Si pas encore fait :**

```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"

# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Initial commit - Ghost Remix Pack"

# Créer repo sur GitHub
# Allez sur github.com → New repository
# Nom : ghost-remix-pack

# Lier au repo
git remote add origin https://github.com/VOTRE-USERNAME/ghost-remix-pack.git

# Push
git push -u origin main
```

---

#### 3. Déployer sur Vercel

**Via Dashboard Vercel :**

1. **Allez sur :** https://vercel.com/new
2. **Sélectionnez** votre repo `ghost-remix-pack`
3. **Configurez :**

```
Framework Preset:     Vite
Root Directory:       ./
Build Command:        npm run build
Output Directory:     dist
Install Command:      npm install
```

4. **Variables d'environnement :**

```
VITE_BACKEND_URL=https://votre-backend.railway.app
```

*(Vous mettrez à jour après avoir déployé le backend)*

5. **Cliquez sur :** `Deploy`

**⏱️ Attendre 2-3 minutes...**

6. **Votre site est en ligne ! 🎉**

```
https://ghost-remix-pack.vercel.app
```

---

#### 4. Lier Votre Domaine

**Une fois le domaine acheté :**

1. **Dans Vercel Dashboard**
2. **Allez dans :** Settings → Domains
3. **Ajoutez :** `ghostremixpack.com`
4. **Vercel vous donne des DNS à configurer**

**Exemple :**
```
Type:  CNAME
Name:  @
Value: cname.vercel-dns.com
```

5. **Allez dans OVH** (ou votre registrar)
6. **Zone DNS** → Ajoutez les enregistrements Vercel
7. **Attendez 5-60 minutes** (propagation DNS)

**Ensuite :**
```
https://ghostremixpack.com → Votre site ! ✅
```

---

## 🔧 ÉTAPE 3 : DÉPLOYER LE BACKEND (20 min)

### 🚂 Railway (Recommandé) ⭐

**Pourquoi Railway ?**
- ✅ **Gratuit** ($5 de crédit/mois offert)
- ✅ Déploiement simple
- ✅ Logs en temps réel
- ✅ Base de données intégrée
- ✅ Variables d'environnement faciles

**URL :** https://railway.app

---

### 📝 Étapes Détaillées

#### 1. Créer Compte Railway

1. **Allez sur :** https://railway.app
2. **Connectez-vous avec GitHub**
3. **Autorisez Railway**

---

#### 2. Créer un Nouveau Projet

1. **Dashboard Railway** → `New Project`
2. **Choisissez :** `Deploy from GitHub repo`
3. **Sélectionnez :** `ghost-remix-pack`
4. **Root Path :** `backend`

---

#### 3. Configurer les Variables d'Environnement

**Dans Railway Settings → Variables :**

```env
# STRIPE (MODE LIVE - À REMPLACER)
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_LIVE_ICI
STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI
STRIPE_ACCOUNT_ID=acct_1SHjdhH8jTnKrV0h

# FIREBASE
FIREBASE_PROJECT_ID=ghost-remix-pack

# SENDGRID
SENDGRID_API_KEY=SG.VOTRE_CLE
SENDGRID_FROM_EMAIL=contact@ghostremixpack.com

# SERVEUR
PORT=3001
FRONTEND_URL=https://ghostremixpack.com
NODE_ENV=production

# URLS STRIPE
SUCCESS_URL=https://ghostremixpack.com/success
CANCEL_URL=https://ghostremixpack.com/cart
```

---

#### 4. Uploader serviceAccountKey.json

**Fichier Firebase :**

**Option A : Via Railway CLI**
```bash
railway login
railway link
railway secrets set FIREBASE_CONFIG="$(cat backend/serviceAccountKey.json)"
```

**Option B : Copier-coller**
- Ouvrir `serviceAccountKey.json`
- Copier le contenu
- Railway → Variables → Ajouter
- Nom : `FIREBASE_CONFIG`
- Valeur : Coller le JSON

---

#### 5. Déployer

Railway déploie automatiquement !

**URL du backend :**
```
https://ghost-remix-backend-production.up.railway.app
```

**Testez :**
```
https://votre-backend.railway.app/api/health
```

**Devrait retourner :**
```json
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running"
}
```

---

#### 6. Mettre à Jour le Frontend

**Retournez sur Vercel :**

1. **Settings** → **Environment Variables**
2. **Ajoutez/Modifiez :**

```
VITE_BACKEND_URL=https://votre-backend.railway.app
```

3. **Redéployez** le frontend

---

### 🔄 Alternative : Render

**Si Railway ne marche pas :**

**URL :** https://render.com

**Similaire à Railway, gratuit aussi.**

---

## 🔐 ÉTAPE 4 : PASSER STRIPE EN MODE LIVE (10 min)

### ⚠️ IMPORTANT

**Avant de passer en LIVE :**

1. ✅ **Onboarding Stripe complété**
   - Identité vérifiée
   - Compte bancaire ajouté
   - Documents validés

2. ✅ **Site testé en mode test**
   - Tous les parcours fonctionnent
   - Aucun bug majeur

---

### 🔑 Récupérer les Clés LIVE

#### 1. Activer Mode Live

**Dashboard Stripe :**
1. **En haut à gauche :** Basculez de `Test mode` à `Live mode`
2. **Vérifiez** que vous êtes bien en mode LIVE (badge bleu)

---

#### 2. Récupérer les Clés

**Allez sur :** https://dashboard.stripe.com/apikeys

**Copiez :**
- `Publishable key` (pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI...)
- `Secret key` (sk_live_VOTRE_CLE_LIVE_ICI...)

---

#### 3. Créer Webhook Production

**Allez sur :** https://dashboard.stripe.com/webhooks

**Créez un nouveau webhook :**

```
URL:        https://votre-backend.railway.app/api/webhook
Événement:  checkout.session.completed
```

**Copiez le secret :** `whsec_VOTRE_WEBHOOK_SECRET_ICI...`

---

#### 4. Mettre à Jour Railway

**Variables d'environnement :**

```env
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_LIVE_ICI...
STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI...
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_ICI...
```

**Railway redémarre automatiquement.**

---

#### 5. Mettre à Jour le Frontend

**Fichier :** `src/config/stripe.ts`

```typescript
export const STRIPE_PUBLISHABLE_KEY = 'pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI...';
```

**Commit et push :**
```bash
git add src/config/stripe.ts
git commit -m "Switch to Stripe Live mode"
git push
```

**Vercel redéploie automatiquement ! ✅**

---

## ✅ ÉTAPE 5 : TESTS EN PRODUCTION (15 min)

### 🧪 Checklist de Test

**1. Page d'accueil**
- [ ] Site s'affiche : `https://ghostremixpack.com`
- [ ] HTTPS actif (cadenas vert)
- [ ] Images chargent
- [ ] Animations fonctionnent

**2. Navigation**
- [ ] Tous les liens marchent
- [ ] Catégories s'affichent
- [ ] Galerie photos fonctionne

**3. Panier & Checkout**
- [ ] Ajout au panier fonctionne
- [ ] Panier latéral s'ouvre
- [ ] Page checkout accessible

**4. Paiement RÉEL**
- [ ] Redirection vers Stripe
- [ ] Paiement avec **VRAIE carte**
- [ ] Redirection vers page succès
- [ ] Paiement visible dans Stripe Dashboard (LIVE)

**5. Backend**
- [ ] API répond : `https://votre-backend.railway.app/api/health`
- [ ] Webhook reçu (check Stripe Dashboard)
- [ ] Email envoyé (si SendGrid configuré)
- [ ] Commande sauvegardée (si Firebase configuré)

---

## 🔧 CONFIGURATION DNS DÉTAILLÉE

### Chez OVH (Exemple)

**1. Connectez-vous à OVH**

**2. Allez dans :** Manager → Domaines → Votre domaine → Zone DNS

**3. Ajoutez ces enregistrements :**

```
# Pour le site principal (Vercel)
Type:  CNAME
Sous-domaine: @
Cible: cname.vercel-dns.com.

Type:  CNAME
Sous-domaine: www
Cible: cname.vercel-dns.com.

# Pour le backend (Railway)
Type:  CNAME
Sous-domaine: api
Cible: votre-projet.up.railway.app.
```

**4. Sauvegardez**

**5. Attendez la propagation** (5-60 min)

**6. Testez :**
```
https://ghostremixpack.com      → Frontend
https://www.ghostremixpack.com  → Frontend (www)
https://api.ghostremixpack.com  → Backend
```

---

## 💰 COÛTS ANNUELS

### Configuration Minimale (Recommandée)

```
Nom de domaine (OVH)         : 12€/an
Vercel (Frontend)            : 0€ (gratuit)
Railway (Backend)            : 0€ (5$ crédit/mois offert)
Stripe (Paiements)           : 1.4% + 0.25€ par vente
Firebase (Database)          : 0€ (gratuit jusqu'à 20K/j)
SendGrid (Emails)            : 0€ (100 emails/jour)
──────────────────────────────────────────
TOTAL AN 1                   : ~12€/an + commissions ventes
```

### Configuration Professionnelle

```
Nom de domaine               : 15€/an
Vercel Pro                   : 240€/an
Railway Pro                  : 60€/an
Stripe                       : 1.4% + 0.25€ par vente
Firebase Blaze               : 240€/an
SendGrid Essentials          : 180€/an
──────────────────────────────────────────
TOTAL AN 1                   : ~735€/an + commissions
```

---

## 📋 CHECKLIST COMPLÈTE

### Avant Mise en Ligne

- [ ] Site testé en local
- [ ] Tous les bugs corrigés
- [ ] Contenu finalisé (textes, images)
- [ ] Fichiers audio ajoutés
- [ ] Stripe onboarding complété
- [ ] Compte bancaire ajouté à Stripe
- [ ] Documents vérifiés par Stripe

### Mise en Ligne

- [ ] Nom de domaine acheté
- [ ] Code pushé sur GitHub
- [ ] Frontend déployé sur Vercel
- [ ] Backend déployé sur Railway
- [ ] Variables d'environnement configurées
- [ ] DNS configurés
- [ ] HTTPS actif

### Stripe LIVE

- [ ] Clés LIVE récupérées
- [ ] Webhook production créé
- [ ] Backend mis à jour avec clés LIVE
- [ ] Frontend mis à jour avec clés LIVE
- [ ] Test paiement RÉEL effectué

### Post-Lancement

- [ ] Google Analytics configuré
- [ ] SendGrid emails testés
- [ ] Page Facebook créée
- [ ] Instagram créé
- [ ] Mentions légales à jour
- [ ] CGV finalisées

---

## 🆘 DÉPANNAGE

### Site ne s'affiche pas

**Vérifiez :**
1. DNS propagés (https://dnschecker.org)
2. Déploiement Vercel réussi
3. Pas d'erreurs dans Vercel logs

### Backend ne répond pas

**Vérifiez :**
1. Railway deployment logs
2. Variables d'environnement configurées
3. Port 3001 (ou Railway auto)
4. Santé : `/api/health`

### Paiements ne marchent pas

**Vérifiez :**
1. Mode LIVE activé dans Stripe
2. Clés LIVE dans variables d'environnement
3. Webhook LIVE configuré
4. CORS autorisé (frontend URL)

### Emails ne partent pas

**Vérifiez :**
1. SendGrid API key valide
2. Email expéditeur vérifié
3. Webhook Stripe fonctionne
4. Logs Railway pour erreurs

---

## 📞 SUPPORT

### Vercel
- **Docs :** https://vercel.com/docs
- **Support :** https://vercel.com/support

### Railway
- **Docs :** https://docs.railway.app
- **Discord :** https://discord.gg/railway

### Stripe
- **Docs :** https://stripe.com/docs
- **Support :** https://support.stripe.com

### OVH
- **Support :** https://www.ovh.com/fr/support/

---

## 🎯 ORDRE RECOMMANDÉ

### Phase 1 : Préparation (1 semaine)
1. Tester site en local
2. Corriger bugs
3. Finaliser contenu
4. Compléter onboarding Stripe

### Phase 2 : Achat Domaine (1 jour)
5. Acheter `ghostremixpack.com`
6. Attendre confirmation

### Phase 3 : Déploiement (1 jour)
7. Push code sur GitHub
8. Déployer frontend (Vercel)
9. Déployer backend (Railway)
10. Configurer DNS

### Phase 4 : Production (1 jour)
11. Passer Stripe en LIVE
12. Tester paiement réel
13. Vérifier emails
14. Lancement ! 🚀

---

## 🎉 APRÈS LE LANCEMENT

### Marketing
- [ ] Annoncer sur réseaux sociaux
- [ ] Contacter DJs/producteurs
- [ ] Créer contenu (posts, stories)
- [ ] SEO (référencement Google)

### Suivi
- [ ] Analyser trafic (Google Analytics)
- [ ] Suivre conversions
- [ ] Collecter feedback clients
- [ ] Améliorer contenu

### Maintenance
- [ ] Vérifier paiements quotidiennement
- [ ] Répondre emails clients
- [ ] Ajouter nouveaux packs
- [ ] Mettre à jour site

---

## 💡 CONSEILS FINAUX

### Timing
- Déployez en **semaine** (pas weekend)
- Préférez le **matin** (pour corriger bugs)
- Évitez les **jours fériés**

### Sécurité
- ✅ Toujours HTTPS
- ✅ Variables d'environnement sécurisées
- ✅ Jamais de clés API dans le code
- ✅ Logs backend activés

### Performance
- ✅ Images optimisées
- ✅ Audio en MP3 (pas WAV pour preview)
- ✅ CDN Vercel activé
- ✅ Cache configuré

---

## 🚀 PRÊT À DÉMARRER ?

**Étape 1 : Acheter le domaine**
👉 https://www.ovh.com/fr/domaines/

**Puis suivez ce guide étape par étape ! 📖**

**Besoin d'aide ? Je suis là à chaque étape ! 😊**

---

**🎉 Bon lancement ! Votre site Ghost Remix Pack va cartonner ! 💎✨**







