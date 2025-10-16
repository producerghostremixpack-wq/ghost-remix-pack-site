#!/bin/bash

# 🚀 Script de Déploiement Automatique Ghost Remix Pack
# Ce script déploie votre projet sur Vercel en une seule commande

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  🚀 Déploiement Ghost Remix Pack sur Vercel              ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI n'est pas installé${NC}"
    echo -e "${BLUE}Installation en cours...${NC}"
    npm i -g vercel
fi

echo -e "${GREEN}✅ Vercel CLI installé${NC}"
echo ""

# Étape 1: Build local pour vérifier
echo -e "${BLUE}📦 Étape 1/4 : Build local...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build réussi !${NC}"
else
    echo -e "${RED}❌ Erreur de build. Corrigez les erreurs avant de déployer.${NC}"
    exit 1
fi

echo ""

# Étape 2: Connexion Vercel
echo -e "${BLUE}🔐 Étape 2/4 : Connexion à Vercel...${NC}"
echo -e "${YELLOW}👉 Une page web va s'ouvrir pour vous connecter${NC}"
vercel login

echo ""

# Étape 3: Déploiement Preview
echo -e "${BLUE}🚀 Étape 3/4 : Déploiement preview...${NC}"
vercel

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Preview déployé !${NC}"
else
    echo -e "${RED}❌ Erreur de déploiement${NC}"
    exit 1
fi

echo ""

# Étape 4: Déploiement Production
echo -e "${BLUE}🌟 Étape 4/4 : Déploiement production...${NC}"
echo -e "${YELLOW}👉 Déploiement en production...${NC}"
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "╔═══════════════════════════════════════════════════════════╗"
    echo "║            🎉 DÉPLOIEMENT RÉUSSI ! 🎉                    ║"
    echo "╚═══════════════════════════════════════════════════════════╝"
    echo ""
    echo -e "${GREEN}✅ Votre site est en ligne !${NC}"
    echo ""
    echo -e "${BLUE}📊 Prochaines étapes :${NC}"
    echo "  1. Testez votre site sur l'URL fournie"
    echo "  2. Déployez le backend sur Railway.app"
    echo "  3. Connectez frontend et backend"
    echo ""
    echo -e "${YELLOW}👉 Dashboard Vercel : https://vercel.com/dashboard${NC}"
else
    echo -e "${RED}❌ Erreur lors du déploiement production${NC}"
    exit 1
fi

