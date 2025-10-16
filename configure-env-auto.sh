#!/bin/bash

# ╔═══════════════════════════════════════════════════════════╗
# ║  🔐 CONFIGURATION AUTOMATIQUE DU .ENV                     ║
# ║  Ghost Remix Pack - Configuration des variables          ║
# ╚═══════════════════════════════════════════════════════════╝

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  🔐 Configuration Automatique du fichier .env             ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Fichier .env
ENV_FILE="backend/.env"

# Vérifier si le fichier existe déjà
if [ -f "$ENV_FILE" ]; then
    echo -e "${YELLOW}⚠️  Le fichier backend/.env existe déjà${NC}"
    echo ""
    read -p "Voulez-vous le reconfigurer ? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}ℹ️  Configuration annulée${NC}"
        exit 0
    fi
    # Backup de l'ancien fichier
    cp "$ENV_FILE" "$ENV_FILE.backup"
    echo -e "${GREEN}✅ Backup créé: backend/.env.backup${NC}"
fi

# Créer le fichier .env depuis le template
cp backend/env.example "$ENV_FILE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${CYAN}📝 Configuration des variables d'environnement${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Nous allons configurer les variables essentielles."
echo "Appuyez sur Entrée pour garder la valeur par défaut entre []"
echo ""

# Fonction pour demander une valeur
ask_value() {
    VAR_NAME=$1
    VAR_DESC=$2
    VAR_DEFAULT=$3
    VAR_REQUIRED=$4
    
    echo ""
    echo -e "${BLUE}🔑 $VAR_DESC${NC}"
    
    if [ -n "$VAR_DEFAULT" ]; then
        read -p "   Valeur [$VAR_DEFAULT]: " VAR_VALUE
        VAR_VALUE=${VAR_VALUE:-$VAR_DEFAULT}
    else
        read -p "   Valeur: " VAR_VALUE
    fi
    
    # Vérifier si requis
    if [ "$VAR_REQUIRED" = "true" ] && [ -z "$VAR_VALUE" ]; then
        echo -e "${RED}   ❌ Cette valeur est requise${NC}"
        ask_value "$VAR_NAME" "$VAR_DESC" "$VAR_DEFAULT" "$VAR_REQUIRED"
        return
    fi
    
    # Mettre à jour le fichier .env
    if [ -n "$VAR_VALUE" ]; then
        # Échapper les caractères spéciaux pour sed
        VAR_VALUE_ESCAPED=$(echo "$VAR_VALUE" | sed 's/[&/\]/\\&/g')
        sed -i '' "s|^$VAR_NAME=.*|$VAR_NAME=$VAR_VALUE_ESCAPED|" "$ENV_FILE"
        echo -e "${GREEN}   ✅ $VAR_NAME configuré${NC}"
    fi
}

# Configuration des variables

# STRIPE
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}💳 STRIPE - Configuration des paiements${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Vérifier si les clés sont dans VARIABLES-BACKEND-COPIER.txt
if [ -f "VARIABLES-BACKEND-COPIER.txt" ]; then
    STRIPE_SK=$(grep "sk_test_" VARIABLES-BACKEND-COPIER.txt | cut -d':' -f2- | tr -d ' ' | head -1)
    STRIPE_PK=$(grep "pk_test_" VARIABLES-BACKEND-COPIER.txt | cut -d':' -f2- | tr -d ' ' | head -1)
    
    if [ -n "$STRIPE_SK" ]; then
        echo -e "${GREEN}✅ Clé secrète Stripe trouvée dans VARIABLES-BACKEND-COPIER.txt${NC}"
        sed -i '' "s|^STRIPE_SECRET_KEY=.*|STRIPE_SECRET_KEY=$STRIPE_SK|" "$ENV_FILE"
    else
        ask_value "STRIPE_SECRET_KEY" "Clé secrète Stripe (sk_test_...)" "" "true"
    fi
    
    if [ -n "$STRIPE_PK" ]; then
        echo -e "${GREEN}✅ Clé publique Stripe trouvée${NC}"
        sed -i '' "s|^STRIPE_PUBLISHABLE_KEY=.*|STRIPE_PUBLISHABLE_KEY=$STRIPE_PK|" "$ENV_FILE"
    else
        ask_value "STRIPE_PUBLISHABLE_KEY" "Clé publique Stripe (pk_test_...)" "" "false"
    fi
else
    ask_value "STRIPE_SECRET_KEY" "Clé secrète Stripe (sk_test_...)" "" "true"
    ask_value "STRIPE_PUBLISHABLE_KEY" "Clé publique Stripe (pk_test_...)" "" "false"
fi

ask_value "STRIPE_WEBHOOK_SECRET" "Secret webhook Stripe (whsec_...)" "whsec_TEMPORAIRE" "false"

# FIREBASE
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}🔥 FIREBASE - Base de données${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

ask_value "FIREBASE_PROJECT_ID" "ID du projet Firebase" "ghost-remix-pack" "false"

# SENDGRID
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}📧 SENDGRID - Emails (optionnel)${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

ask_value "SENDGRID_API_KEY" "Clé API SendGrid (SG.xxx) [optionnel]" "" "false"
ask_value "SENDGRID_FROM_EMAIL" "Email expéditeur" "contact@votre-domaine.com" "false"

# SERVEUR
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}⚙️  SERVEUR - Configuration${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

ask_value "PORT" "Port du serveur backend" "3001" "false"
ask_value "FRONTEND_URL" "URL du frontend" "http://localhost:5173" "false"
ask_value "NODE_ENV" "Environnement (development/production)" "development" "false"

# Résumé
echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  ✅ CONFIGURATION TERMINÉE                                ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

echo -e "${GREEN}🎉 Le fichier backend/.env a été créé avec succès !${NC}"
echo ""

# Vérifier la configuration
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Vérification de la configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd backend
npm run check 2>/dev/null
cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 PROCHAINES ÉTAPES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérifier ce qui manque
if [ ! -f "backend/serviceAccountKey.json" ]; then
    echo -e "${YELLOW}⚠️  Il manque encore la clé Firebase${NC}"
    echo "   Téléchargez-la depuis Firebase Console"
    echo "   Guide: CHECKING-COMPLET-ET-TUTORIEL.md - ÉTAPE 3"
    echo ""
fi

echo "Pour démarrer le projet :"
echo ""
echo -e "  ${BLUE}./start-all.sh${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

