# 🚀 Démarrer les Serveurs

## 📝 Vous avez besoin de 2 terminaux

---

## Terminal 1️⃣ : Frontend (Port 5173)

```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"
npm run dev
```

**Le site sera sur :** http://localhost:5173

---

## Terminal 2️⃣ : Backend (Port 3001)

**⚠️ Avant de démarrer le backend :**
- Assurez-vous d'avoir configuré le fichier `.env` dans `/backend/`
- Assurez-vous d'avoir le fichier `serviceAccountKey.json` dans `/backend/`
- Voir `backend/INSTALLATION.md` pour la configuration

```bash
cd "/Users/djshek/Documents/Le site Ghost Remix Pack/backend"
npm run dev
```

**L'API sera sur :** http://localhost:3001

---

## ✅ Vérifier que Tout Fonctionne

### Test 1 : Frontend
Ouvrez http://localhost:5173
→ Le site devrait s'afficher

### Test 2 : Backend
Ouvrez http://localhost:3001/api/health
→ Vous devriez voir : `{"status":"OK",...}`

### Test 3 : Connexion Frontend ↔ Backend
1. Ajoutez un pack au panier
2. Allez à la page Checkout
3. Remplissez le formulaire
4. Cliquez sur "Valider la Commande"
5. → Vous devriez être redirigé vers Stripe Checkout ✅

---

## ⚠️ Si le Backend N'est Pas Configuré

Le site fonctionnera quand même en **mode simulation** :
- Le panier fonctionne
- Le checkout affiche une confirmation simulée
- Mais **pas de vrai paiement Stripe**

Pour activer les paiements réels, suivez : `backend/INSTALLATION.md`

---

## 🐛 Problèmes Courants

### "Port 5173 already in use"
Un autre serveur tourne déjà. Tuez-le :
```bash
lsof -ti:5173 | xargs kill -9
```

### "Port 3001 already in use"
```bash
lsof -ti:3001 | xargs kill -9
```

### "Cannot find module"
Installez les dépendances :
```bash
# Frontend
npm install

# Backend
cd backend && npm install
```

---

## 🎯 Raccourci : Script de Démarrage Automatique

Créez un fichier `start.sh` :

```bash
#!/bin/bash

# Démarrer le frontend
cd "/Users/djshek/Documents/Le site Ghost Remix Pack"
npm run dev &

# Démarrer le backend (si configuré)
cd backend
if [ -f ".env" ]; then
  npm run dev &
else
  echo "⚠️  Backend non configuré (.env manquant)"
  echo "Voir backend/INSTALLATION.md"
fi

wait
```

Puis :
```bash
chmod +x start.sh
./start.sh
```

---

**Bon développement ! 🚀**







