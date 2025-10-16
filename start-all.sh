#!/bin/bash

# ╔═══════════════════════════════════════════════════════════╗
# ║  🚀 DÉMARRAGE AUTOMATIQUE COMPLET                         ║
# ║  Ghost Remix Pack - Tous les serveurs                     ║
# ╚═══════════════════════════════════════════════════════════╝

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  🚀 Démarrage de Ghost Remix Pack                         ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour nettoyer les processus à la sortie
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Arrêt des serveurs...${NC}"
    kill $(jobs -p) 2>/dev/null
    echo -e "${GREEN}✅ Serveurs arrêtés${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "Installez-le depuis: https://nodejs.org"
    exit 1
fi

echo -e "${BLUE}📦 Vérification des dépendances...${NC}"

# Vérifier et installer les dépendances frontend
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Installation des dépendances frontend...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur lors de l'installation frontend${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Dépendances frontend installées${NC}"
fi

# Vérifier et installer les dépendances backend
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Installation des dépendances backend...${NC}"
    cd backend && npm install && cd ..
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur lors de l'installation backend${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Dépendances backend installées${NC}"
fi

# Vérifier le fichier .env
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Fichier .env manquant${NC}"
    echo -e "${BLUE}ℹ️  Création du fichier .env depuis le template...${NC}"
    cp backend/env.example backend/.env
    echo -e "${GREEN}✅ Fichier .env créé${NC}"
    echo -e "${YELLOW}⚠️  N'oubliez pas de remplir les clés API dans backend/.env${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🚀 Démarrage des serveurs...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Créer un dossier pour les logs
mkdir -p .logs

# Démarrer le backend
echo -e "${BLUE}🔧 Démarrage du backend (port 3001)...${NC}"
cd backend
npm run dev > ../.logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Attendre que le backend démarre
sleep 3

# Vérifier si le backend tourne (compatible macOS)
if kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${GREEN}✅ Backend démarré (PID: $BACKEND_PID)${NC}"
else
    echo -e "${RED}❌ Erreur lors du démarrage du backend${NC}"
    echo "Consultez le fichier .logs/backend.log pour plus de détails"
    exit 1
fi

# Démarrer le frontend
echo -e "${BLUE}🎨 Démarrage du frontend (port 5173)...${NC}"
npm run dev > .logs/frontend.log 2>&1 &
FRONTEND_PID=$!

# Attendre que le frontend démarre
sleep 3

# Vérifier si le frontend tourne (compatible macOS)
if kill -0 $FRONTEND_PID 2>/dev/null; then
    echo -e "${GREEN}✅ Frontend démarré (PID: $FRONTEND_PID)${NC}"
else
    echo -e "${RED}❌ Erreur lors du démarrage du frontend${NC}"
    echo "Consultez le fichier .logs/frontend.log pour plus de détails"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  ✅ TOUT EST PRÊT !                                       ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}🎉 Les serveurs sont démarrés !${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📍 URLs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "   ${BLUE}Frontend:${NC}  http://localhost:5173"
echo -e "   ${BLUE}Backend:${NC}   http://localhost:3001"
echo -e "   ${BLUE}API Health:${NC} http://localhost:3001/api/health"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Logs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "   Backend:  ${BLUE}tail -f .logs/backend.log${NC}"
echo -e "   Frontend: ${BLUE}tail -f .logs/frontend.log${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}💡 Appuyez sur Ctrl+C pour arrêter tous les serveurs${NC}"
echo ""

# Ouvrir le navigateur automatiquement (Mac)
if [[ "$OSTYPE" == "darwin"* ]]; then
    sleep 2
    open http://localhost:5173 2>/dev/null
fi

# Garder le script actif
wait

