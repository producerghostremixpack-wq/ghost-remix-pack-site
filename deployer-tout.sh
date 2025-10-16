#!/bin/bash

# ╔═══════════════════════════════════════════════════════════╗
# ║  🚀 SCRIPT DE DÉPLOIEMENT SEMI-AUTOMATIQUE                ║
# ║  Ghost Remix Pack - Préparation complète                  ║
# ╚═══════════════════════════════════════════════════════════╝

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  🚀 Préparation du Déploiement                            ║"
echo "║  Ghost Remix Pack                                         ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Fonction pour les étapes
step() {
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}📍 $1${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur : Ce script doit être exécuté depuis la racine du projet${NC}"
    exit 1
fi

step "ÉTAPE 1/6 : Vérification de la sécurité"

# Vérifier que .env n'est pas tracké
if git ls-files --error-unmatch backend/.env 2>/dev/null; then
    echo -e "${RED}❌ DANGER : backend/.env est tracké dans Git !${NC}"
    echo -e "${YELLOW}⚠️  Suppression de backend/.env du tracking Git...${NC}"
    git rm --cached backend/.env
    echo -e "${GREEN}✅ backend/.env retiré du tracking${NC}"
else
    echo -e "${GREEN}✅ backend/.env n'est pas tracké (bon)${NC}"
fi

# Vérifier que serviceAccountKey.json n'est pas tracké
if git ls-files --error-unmatch backend/serviceAccountKey.json 2>/dev/null; then
    echo -e "${RED}❌ DANGER : serviceAccountKey.json est tracké !${NC}"
    echo -e "${YELLOW}⚠️  Suppression du tracking...${NC}"
    git rm --cached backend/serviceAccountKey.json
    echo -e "${GREEN}✅ serviceAccountKey.json retiré du tracking${NC}"
else
    echo -e "${GREEN}✅ serviceAccountKey.json n'est pas tracké (bon)${NC}"
fi

# Vérifier le .gitignore
echo -e "${BLUE}📝 Vérification du .gitignore...${NC}"
if ! grep -q "^\.env$" backend/.gitignore; then
    echo ".env" >> backend/.gitignore
    echo -e "${GREEN}✅ .env ajouté au .gitignore${NC}"
fi

if ! grep -q "^serviceAccountKey\.json$" backend/.gitignore; then
    echo "serviceAccountKey.json" >> backend/.gitignore
    echo -e "${GREEN}✅ serviceAccountKey.json ajouté au .gitignore${NC}"
fi

# Ajouter .logs au .gitignore racine
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'EOF'
# Logs
.logs/
*.log

# Dependencies
node_modules/

# Environment
.env
.env.local

# Build
dist/
dist-ssr/
*.local

# IDE
.vscode/
.idea/
.DS_Store

# Vercel
.vercel/
EOF
    echo -e "${GREEN}✅ .gitignore créé à la racine${NC}"
else
    if ! grep -q "^\.logs/" .gitignore; then
        echo ".logs/" >> .gitignore
        echo -e "${GREEN}✅ .logs/ ajouté au .gitignore${NC}"
    fi
fi

step "ÉTAPE 2/6 : Ajout des fichiers au Git"

echo -e "${BLUE}📦 Ajout de tous les fichiers (sauf ceux ignorés)...${NC}"
git add .

echo -e "${GREEN}✅ Fichiers ajoutés${NC}"

step "ÉTAPE 3/6 : Création du commit"

COMMIT_MESSAGE="🚀 Préparation pour déploiement

- Ajout de l'automatisation complète
- Nouveaux guides de déploiement
- Scripts automatiques
- Configuration sécurisée
"

git commit -m "$COMMIT_MESSAGE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Commit créé avec succès${NC}"
else
    echo -e "${YELLOW}⚠️  Aucune modification à committer ou commit déjà fait${NC}"
fi

step "ÉTAPE 4/6 : Vérification du remote GitHub"

# Vérifier si un remote existe
if git remote | grep -q "origin"; then
    REMOTE_URL=$(git remote get-url origin)
    echo -e "${GREEN}✅ Remote GitHub trouvé : $REMOTE_URL${NC}"
    HAS_REMOTE=true
else
    echo -e "${YELLOW}⚠️  Aucun remote GitHub configuré${NC}"
    HAS_REMOTE=false
fi

step "ÉTAPE 5/6 : Instructions manuelles"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${CYAN}🤖 CE QUI A ÉTÉ FAIT AUTOMATIQUEMENT${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Sécurité vérifiée (.env et clés Firebase pas trackées)"
echo "✅ .gitignore configuré correctement"
echo "✅ Fichiers ajoutés au Git"
echo "✅ Commit créé"
echo ""

if [ "$HAS_REMOTE" = false ]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${YELLOW}👤 CE QUE VOUS DEVEZ FAIRE (étapes manuelles)${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📍 ÉTAPE A : Créer un repository sur GitHub"
    echo ""
    echo "   1. Allez sur https://github.com/new"
    echo "   2. Nom du repository : ghost-remix-pack"
    echo "   3. Description : Site e-commerce Ghost Remix Pack"
    echo "   4. Choisissez Public ou Private"
    echo "   5. NE PAS cocher 'Add a README'"
    echo "   6. Cliquez 'Create repository'"
    echo ""
    echo "📍 ÉTAPE B : Connecter votre projet local"
    echo ""
    echo "   Copiez-collez ces commandes (remplacez VOTRE-USERNAME) :"
    echo ""
    echo -e "${GREEN}   git remote add origin https://github.com/VOTRE-USERNAME/ghost-remix-pack.git${NC}"
    echo -e "${GREEN}   git branch -M main${NC}"
    echo -e "${GREEN}   git push -u origin main${NC}"
    echo ""
    echo "   💡 Si GitHub demande un token, créez-en un sur :"
    echo "      https://github.com/settings/tokens"
    echo ""
else
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${YELLOW}👤 CE QUE VOUS DEVEZ FAIRE (1 commande)${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📍 Pusher vers GitHub :"
    echo ""
    echo -e "${GREEN}   git push${NC}"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}📍 ÉTAPE C : Déployer sur Railway${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "   1. Allez sur https://railway.app/new"
echo "   2. Cliquez 'Deploy from GitHub repo'"
echo "   3. Sélectionnez 'ghost-remix-pack'"
echo "   4. Attendez le déploiement (2-3 min)"
echo ""
echo "   5. Dans Railway → Variables, ajoutez :"
echo ""
echo "      STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST_ICI"
echo "      FRONTEND_URL=http://localhost:5173"
echo "      PORT=3001"
echo "      NODE_ENV=production"
echo ""
echo "   6. Settings → Domains → Generate Domain"
echo "   7. Copiez l'URL Railway"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}📍 ÉTAPE D : Tester${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "   Ouvrez : https://VOTRE-URL.railway.app/api/health"
echo ""
echo "   ✅ Vous devriez voir : { \"status\": \"OK\" }"
echo ""

step "ÉTAPE 6/6 : Fichiers de référence créés"

# Créer un fichier avec les commandes exactes
cat > COMMANDES-DEPLOY.txt << 'EOF'
╔═══════════════════════════════════════════════════════════════════════╗
║  📋 COMMANDES À COPIER-COLLER POUR LE DÉPLOIEMENT                     ║
╚═══════════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣  SI VOUS N'AVEZ PAS ENCORE DE REPOSITORY GITHUB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

a) Créer le repository sur GitHub :
   → https://github.com/new
   → Nom : ghost-remix-pack
   → NE PAS cocher "Add a README"

b) Connecter votre projet (remplacez VOTRE-USERNAME) :

git remote add origin https://github.com/VOTRE-USERNAME/ghost-remix-pack.git
git branch -M main
git push -u origin main


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2️⃣  SI VOUS AVEZ DÉJÀ UN REPOSITORY GITHUB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

git push


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3️⃣  DÉPLOYER SUR RAILWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Ouvrir : https://railway.app/new
2. Cliquer "Deploy from GitHub repo"
3. Sélectionner "ghost-remix-pack"
4. Attendre 2-3 minutes


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4️⃣  CONFIGURER LES VARIABLES DANS RAILWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dans Railway → Variables → + New Variable

Ajoutez ces 4 variables une par une :

Variable 1 :
Name: STRIPE_SECRET_KEY
Value: sk_test_VOTRE_CLE_TEST_ICI

Variable 2 :
Name: FRONTEND_URL
Value: http://localhost:5173

Variable 3 :
Name: PORT
Value: 3001

Variable 4 :
Name: NODE_ENV
Value: production


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5️⃣  OBTENIR L'URL RAILWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dans Railway → Settings → Domains → Generate Domain

Vous obtenez une URL comme :
https://ghost-remix-backend-production-xxxx.up.railway.app


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6️⃣  TESTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ouvrez dans votre navigateur :
https://VOTRE-URL.railway.app/api/health

✅ Vous devriez voir :
{
  "status": "OK",
  "message": "Ghost Remix Backend API is running"
}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ C'EST FAIT !
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Votre backend est maintenant en ligne !

Prochaine étape : Configurer Stripe en production
→ Ouvrir : CONFIGURER-STRIPE-PRODUCTION.md

EOF

echo -e "${GREEN}✅ Fichier COMMANDES-DEPLOY.txt créé${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🎉 Préparation terminée !${NC}"
echo ""
echo "📋 Toutes les commandes sont dans : ${BLUE}COMMANDES-DEPLOY.txt${NC}"
echo ""
echo "🚀 Suivez les étapes dans ce fichier pour déployer !"
echo ""

