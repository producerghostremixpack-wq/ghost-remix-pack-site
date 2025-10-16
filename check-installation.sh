#!/bin/bash

# ╔═══════════════════════════════════════════════════════════╗
# ║  🔍 SCRIPT DE VÉRIFICATION COMPLÈTE                       ║
# ║  Ghost Remix Pack - Installation Check                   ║
# ╚═══════════════════════════════════════════════════════════╝

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  🔍 Vérification Complète de l'Installation              ║"
echo "║  Ghost Remix Pack                                         ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Compteurs
TOTAL_CHECKS=0
PASSED_CHECKS=0
WARNINGS=0

# Fonction de check
check() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅${NC} $2"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "${RED}❌${NC} $2"
    fi
}

# Fonction de warning
warn() {
    WARNINGS=$((WARNINGS + 1))
    echo -e "${YELLOW}⚠️${NC}  $1"
}

# Fonction d'info
info() {
    echo -e "${BLUE}ℹ️${NC}  $1"
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 STRUCTURE DU PROJET"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Vérifier les dossiers principaux
[ -d "src" ] && check 0 "Dossier src/" || check 1 "Dossier src/ manquant"
[ -d "backend" ] && check 0 "Dossier backend/" || check 1 "Dossier backend/ manquant"
[ -d "public" ] && check 0 "Dossier public/" || check 1 "Dossier public/ manquant"

# Vérifier les fichiers de configuration
[ -f "package.json" ] && check 0 "package.json (frontend)" || check 1 "package.json manquant"
[ -f "backend/package.json" ] && check 0 "package.json (backend)" || check 1 "backend/package.json manquant"
[ -f "vite.config.ts" ] && check 0 "vite.config.ts" || check 1 "vite.config.ts manquant"
[ -f "vercel.json" ] && check 0 "vercel.json (config Vercel)" || check 1 "vercel.json manquant"
[ -f "railway.json" ] && check 0 "railway.json (config Railway)" || check 1 "railway.json manquant"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📂 FICHIERS CRITIQUES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Frontend
[ -f "src/App.tsx" ] && check 0 "src/App.tsx" || check 1 "src/App.tsx manquant"
[ -f "src/main.tsx" ] && check 0 "src/main.tsx" || check 1 "src/main.tsx manquant"
[ -f "src/config/stripe.ts" ] && check 0 "src/config/stripe.ts" || check 1 "src/config/stripe.ts manquant"
[ -f "src/context/CartContext.tsx" ] && check 0 "src/context/CartContext.tsx" || check 1 "src/context/CartContext.tsx manquant"

# Backend
[ -f "backend/server.js" ] && check 0 "backend/server.js" || check 1 "backend/server.js manquant"
[ -f "backend/routes/checkout.js" ] && check 0 "backend/routes/checkout.js" || check 1 "backend/routes/checkout.js manquant"
[ -f "backend/routes/webhook.js" ] && check 0 "backend/routes/webhook.js" || check 1 "backend/routes/webhook.js manquant"
[ -f "backend/services/stripe.js" ] && check 0 "backend/services/stripe.js" || check 1 "backend/services/stripe.js manquant"
[ -f "backend/services/firebase.js" ] && check 0 "backend/services/firebase.js" || check 1 "backend/services/firebase.js manquant"
[ -f "backend/services/email.js" ] && check 0 "backend/services/email.js" || check 1 "backend/services/email.js manquant"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 CONFIGURATION BACKEND"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Vérifier .env
if [ -f "backend/.env" ]; then
    check 0 "Fichier backend/.env existe"
    
    # Vérifier les variables importantes
    if grep -q "STRIPE_SECRET_KEY=sk_" backend/.env; then
        check 0 "STRIPE_SECRET_KEY configuré"
    else
        check 1 "STRIPE_SECRET_KEY manquant ou invalide"
    fi
    
    if grep -q "STRIPE_WEBHOOK_SECRET=whsec_" backend/.env; then
        check 0 "STRIPE_WEBHOOK_SECRET configuré"
    else
        warn "STRIPE_WEBHOOK_SECRET manquant (webhook non configuré)"
    fi
    
    if grep -q "FIREBASE_PROJECT_ID=" backend/.env && ! grep -q "FIREBASE_PROJECT_ID=votre-projet-firebase" backend/.env; then
        check 0 "FIREBASE_PROJECT_ID configuré"
    else
        warn "FIREBASE_PROJECT_ID pas encore personnalisé"
    fi
    
    if grep -q "SENDGRID_API_KEY=SG." backend/.env; then
        check 0 "SENDGRID_API_KEY configuré"
    else
        warn "SENDGRID_API_KEY manquant (emails désactivés)"
    fi
    
    if grep -q "FRONTEND_URL=" backend/.env; then
        FRONTEND_URL=$(grep "FRONTEND_URL=" backend/.env | cut -d '=' -f2)
        info "FRONTEND_URL: $FRONTEND_URL"
    fi
else
    check 1 "Fichier backend/.env MANQUANT"
    warn "Créez le fichier avec: cp backend/env.example backend/.env"
fi

# Vérifier Firebase key
if [ -f "backend/serviceAccountKey.json" ]; then
    check 0 "Clé Firebase (serviceAccountKey.json)"
else
    check 1 "Clé Firebase MANQUANTE"
    warn "Téléchargez-la depuis Firebase Console"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 DÉPENDANCES NODE.JS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Frontend
if [ -d "node_modules" ]; then
    check 0 "Dépendances frontend installées"
else
    check 1 "Dépendances frontend NON installées"
    warn "Exécutez: npm install"
fi

# Backend
if [ -d "backend/node_modules" ]; then
    check 0 "Dépendances backend installées"
else
    check 1 "Dépendances backend NON installées"
    warn "Exécutez: cd backend && npm install"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎵 FICHIERS AUDIO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Compter les fichiers audio
AUDIO_COUNT=$(find public/audio -name "*.mp3" -o -name "*.wav" 2>/dev/null | wc -l | tr -d ' ')
if [ "$AUDIO_COUNT" -gt 0 ]; then
    info "Fichiers audio trouvés: $AUDIO_COUNT"
else
    warn "Aucun fichier audio trouvé dans public/audio/"
fi

# Vidéo
if [ -f "public/videos/Vidéo_sans_musique_ni_personnage.mp4" ]; then
    check 0 "Vidéo d'intro présente"
else
    warn "Vidéo d'intro manquante"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 OUTILS DE DÉVELOPPEMENT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    check 0 "Node.js installé ($NODE_VERSION)"
else
    check 1 "Node.js NON installé"
fi

# npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    check 0 "npm installé (v$NPM_VERSION)"
else
    check 1 "npm NON installé"
fi

# Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version | cut -d ' ' -f3)
    check 0 "Git installé (v$GIT_VERSION)"
else
    warn "Git non installé (recommandé)"
fi

# Stripe CLI (optionnel)
if command -v stripe &> /dev/null; then
    STRIPE_VERSION=$(stripe --version | cut -d ' ' -f2)
    check 0 "Stripe CLI installé (v$STRIPE_VERSION)"
else
    warn "Stripe CLI non installé (optionnel pour webhooks locaux)"
    info "Installation: brew install stripe/stripe-cli/stripe"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RÉSUMÉ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "Tests passés: $PASSED_CHECKS / $TOTAL_CHECKS"
echo "Avertissements: $WARNINGS"
echo ""

# Calcul du pourcentage
PERCENTAGE=$((PASSED_CHECKS * 100 / TOTAL_CHECKS))

if [ $PERCENTAGE -ge 90 ]; then
    echo -e "${GREEN}✅ Installation complète à $PERCENTAGE% !${NC}"
    echo ""
    echo "🚀 Vous pouvez démarrer le projet :"
    echo ""
    echo "   Terminal 1 - Backend:"
    echo "   $ cd backend && npm run dev"
    echo ""
    echo "   Terminal 2 - Frontend:"
    echo "   $ npm run dev"
    echo ""
elif [ $PERCENTAGE -ge 70 ]; then
    echo -e "${YELLOW}⚠️  Installation à $PERCENTAGE% - Quelques éléments manquent${NC}"
    echo ""
    echo "📖 Consultez: CHECKING-COMPLET-ET-TUTORIEL.md"
    echo ""
else
    echo -e "${RED}❌ Installation incomplète ($PERCENTAGE%)${NC}"
    echo ""
    echo "📖 Suivez le tutoriel: CHECKING-COMPLET-ET-TUTORIEL.md"
    echo ""
fi

# Instructions spécifiques selon ce qui manque
if [ ! -f "backend/.env" ]; then
    echo "⚡ ACTION REQUISE:"
    echo "   $ cp backend/env.example backend/.env"
    echo "   Puis éditez backend/.env avec vos clés API"
    echo ""
fi

if [ ! -f "backend/serviceAccountKey.json" ]; then
    echo "⚡ ACTION REQUISE:"
    echo "   Téléchargez serviceAccountKey.json depuis Firebase Console"
    echo "   → https://console.firebase.google.com"
    echo "   → Project Settings → Service Accounts → Generate new private key"
    echo ""
fi

if [ ! -d "node_modules" ] || [ ! -d "backend/node_modules" ]; then
    echo "⚡ ACTION REQUISE:"
    echo "   $ npm install"
    echo "   $ cd backend && npm install"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 DOCUMENTATION DISPONIBLE:"
echo ""
echo "   • CHECKING-COMPLET-ET-TUTORIEL.md  (CE GUIDE)"
echo "   • COMMENCER-ICI.md                  (Déploiement rapide)"
echo "   • backend/INSTALLATION.md           (Installation backend)"
echo "   • README.md                         (Documentation générale)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

