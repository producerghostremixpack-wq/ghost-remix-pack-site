# ⚡ Mise en Ligne Rapide - Ghost Remix Pack

## 🎯 4 ÉTAPES POUR METTRE EN LIGNE

---

## 1️⃣ ACHETER LE DOMAINE (10 min)

### 👉 Allez sur OVH
**URL :** https://www.ovh.com/fr/domaines/

**Actions :**
1. Cherchez : `ghostremixpack.com`
2. Ajoutez au panier
3. Créez un compte
4. Payez (~12€/an)

✅ **Domaine acheté !**

---

## 2️⃣ DÉPLOYER LE FRONTEND (15 min)

### 👉 Créez un compte Vercel
**URL :** https://vercel.com/signup

**Actions :**
1. Connectez-vous avec GitHub
2. Push votre code sur GitHub :
```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"
git init
git add .
git commit -m "Initial commit"
```
3. Créez repo sur GitHub.com
4. Push :
```bash
git remote add origin https://github.com/VOTRE-USERNAME/ghost-remix-pack.git
git push -u origin main
```
5. Sur Vercel : Import repo → Deploy

✅ **Frontend en ligne !**
**URL :** `https://ghost-remix-pack.vercel.app`

---

## 3️⃣ DÉPLOYER LE BACKEND (20 min)

### 👉 Créez un compte Railway
**URL :** https://railway.app

**Actions :**
1. Connectez-vous avec GitHub
2. New Project → Deploy from GitHub
3. Sélectionnez votre repo
4. Root path : `backend`
5. Variables d'environnement :
```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
FRONTEND_URL=https://ghostremixpack.com
```

✅ **Backend en ligne !**
**URL :** `https://votre-backend.railway.app`

---

## 4️⃣ CONNECTER LE DOMAINE (10 min)

### A. Dans Vercel

1. Settings → Domains
2. Ajoutez : `ghostremixpack.com`
3. Vercel vous donne des DNS

### B. Dans OVH

1. Manager → Domaines → Zone DNS
2. Ajoutez les DNS de Vercel :
```
Type:  CNAME
Name:  @
Value: cname.vercel-dns.com
```

### C. Attendez 10-60 min

✅ **Site accessible sur votre domaine !**
**URL :** `https://ghostremixpack.com`

---

## 🔐 BONUS : PASSER STRIPE EN LIVE

### 👉 Dashboard Stripe (Mode LIVE)
**URL :** https://dashboard.stripe.com/apikeys

**Actions :**
1. Basculez en mode LIVE (en haut)
2. Copiez les clés LIVE :
   - `pk_live_...`
   - `sk_live_...`
3. Mettez à jour Railway et Vercel
4. Créez webhook LIVE :
   - URL : `https://votre-backend.railway.app/api/webhook`
   - Événement : `checkout.session.completed`

✅ **Paiements réels activés !**

---

## ✅ CHECKLIST

- [ ] Domaine acheté (OVH)
- [ ] Code sur GitHub
- [ ] Frontend déployé (Vercel)
- [ ] Backend déployé (Railway)
- [ ] DNS configurés (OVH)
- [ ] Stripe LIVE activé
- [ ] Test paiement réel

---

## 💰 COÛT TOTAL

```
Domaine :     ~12€/an
Vercel :      0€ (gratuit)
Railway :     0€ (gratuit)
Stripe :      1.4% par vente
──────────────────────────
TOTAL :       ~12€/an
```

---

## 🆘 PROBLÈME ?

Consultez le guide complet : `GUIDE-MISE-EN-LIGNE-COMPLETE.md`

---

## 🎉 C'EST TOUT !

**Votre site sera en ligne en ~1 heure ! 🚀**

**Besoin d'aide ? Je suis là ! 😊**







