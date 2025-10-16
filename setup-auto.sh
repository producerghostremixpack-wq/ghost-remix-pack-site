#!/bin/bash

# ╔═══════════════════════════════════════════════════════════╗
# ║  ⚙️  CONFIGURATION AUTOMATIQUE                             ║
# ║  Ghost Remix Pack - Setup complet                         ║
# ╚═══════════════════════════════════════════════════════════╝

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  ⚙️  Configuration Automatique de Ghost Remix Pack        ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Compteurs
STEPS_TOTAL=6
STEP_CURRENT=0

# Fonction pour afficher une étape
step() {
    STEP_CURRENT=$((STEP_CURRENT + 1))
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}📍 ÉTAPE $STEP_CURRENT/$STEPS_TOTAL: $1${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# ÉTAPE 1: Vérifier Node.js
step "Vérification de Node.js et npm"

if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js installé: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "Installez-le depuis: https://nodejs.org"
    exit 1
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm installé: v$NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

# ÉTAPE 2: Installation des dépendances
step "Installation des dépendances"

echo -e "${BLUE}📦 Installation des dépendances frontend...${NC}"
npm install --silent 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dépendances frontend installées${NC}"
else
    echo -e "${RED}❌ Erreur lors de l'installation frontend${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📦 Installation des dépendances backend...${NC}"
cd backend
npm install --silent 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dépendances backend installées${NC}"
else
    echo -e "${RED}❌ Erreur lors de l'installation backend${NC}"
    exit 1
fi
cd ..

# ÉTAPE 3: Configuration du fichier .env
step "Configuration du fichier .env"

if [ -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Le fichier backend/.env existe déjà${NC}"
    read -p "Voulez-vous le recréer ? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp backend/env.example backend/.env
        echo -e "${GREEN}✅ Fichier .env recréé${NC}"
    else
        echo -e "${BLUE}ℹ️  Fichier .env conservé${NC}"
    fi
else
    cp backend/env.example backend/.env
    echo -e "${GREEN}✅ Fichier .env créé depuis le template${NC}"
fi

# Vérifier si les variables Stripe sont configurées
if grep -q "sk_test_VOTRE_CLE_TEST_ICI" backend/.env 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Les clés Stripe ne sont pas encore configurées${NC}"
    echo -e "${BLUE}ℹ️  Consultez: VARIABLES-BACKEND-COPIER.txt${NC}"
else
    echo -e "${GREEN}✅ Clés Stripe configurées${NC}"
fi

# ÉTAPE 4: Vérification de Firebase
step "Vérification de Firebase"

if [ -f "backend/serviceAccountKey.json" ]; then
    echo -e "${GREEN}✅ Clé Firebase trouvée (serviceAccountKey.json)${NC}"
else
    echo -e "${YELLOW}⚠️  Clé Firebase manquante (serviceAccountKey.json)${NC}"
    echo -e "${BLUE}ℹ️  Téléchargez-la depuis Firebase Console${NC}"
    echo "   → https://console.firebase.google.com"
    echo "   → Project Settings → Service Accounts → Generate new private key"
fi

# ÉTAPE 5: Vérification de la configuration
step "Vérification de la configuration backend"

cd backend
npm run check 2>/dev/null
cd ..

# ÉTAPE 6: Création des dossiers nécessaires
step "Création des dossiers"

mkdir -p .logs
echo -e "${GREEN}✅ Dossier .logs créé${NC}"

mkdir -p public/audio/downloads
echo -e "${GREEN}✅ Dossier downloads créé${NC}"

# Résumé final
echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  ✅ CONFIGURATION TERMINÉE                                ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

echo -e "${GREEN}🎉 Votre projet est configuré !${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 PROCHAINES ÉTAPES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérifier ce qui manque encore
MISSING_COUNT=0

if grep -q "sk_test_VOTRE_CLE_TEST_ICI" backend/.env 2>/dev/null; then
    echo -e "${YELLOW}⚠️  1. Configurez les clés Stripe dans backend/.env${NC}"
    echo "   Consultez: VARIABLES-BACKEND-COPIER.txt"
    MISSING_COUNT=$((MISSING_COUNT + 1))
fi

if [ ! -f "backend/serviceAccountKey.json" ]; then
    echo -e "${YELLOW}⚠️  2. Téléchargez la clé Firebase${NC}"
    echo "   Guide: CHECKING-COMPLET-ET-TUTORIEL.md - ÉTAPE 3"
    MISSING_COUNT=$((MISSING_COUNT + 1))
fi

if [ $MISSING_COUNT -eq 0 ]; then
    echo -e "${GREEN}✅ Tout est configuré !${NC}"
    echo ""
    echo "Vous pouvez maintenant démarrer le projet :"
    echo ""
    echo -e "   ${BLUE}./start-all.sh${NC}"
    echo ""
else
    echo ""
    echo "Une fois les éléments ci-dessus complétés, lancez :"
    echo ""
    echo -e "   ${BLUE}./start-all.sh${NC}"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

