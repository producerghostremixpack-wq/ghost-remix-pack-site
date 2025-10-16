#!/bin/bash

# ╔═══════════════════════════════════════════════════════════╗
# ║  🧪 TESTS AUTOMATIQUES                                    ║
# ║  Ghost Remix Pack - Tests complets                        ║
# ╚═══════════════════════════════════════════════════════════╝

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  🧪 Tests Automatiques - Ghost Remix Pack                 ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Compteurs
TESTS_TOTAL=0
TESTS_PASSED=0
TESTS_FAILED=0
TESTS_SKIPPED=0

# Fonction de test
test_check() {
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    TEST_NAME="$1"
    TEST_COMMAND="$2"
    
    echo -n "  🧪 $TEST_NAME... "
    
    if eval "$TEST_COMMAND" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ OK${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        echo -e "${RED}❌ ÉCHEC${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

# Test API
test_api() {
    TEST_NAME="$1"
    URL="$2"
    EXPECTED_STATUS="$3"
    
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    echo -n "  🧪 $TEST_NAME... "
    
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null)
    
    if [ "$STATUS" = "$EXPECTED_STATUS" ]; then
        echo -e "${GREEN}✅ OK (HTTP $STATUS)${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        echo -e "${RED}❌ ÉCHEC (HTTP $STATUS, attendu $EXPECTED_STATUS)${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 TESTS DE STRUCTURE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

test_check "Dossier src existe" "test -d src"
test_check "Dossier backend existe" "test -d backend"
test_check "Dossier public existe" "test -d public"
test_check "package.json frontend" "test -f package.json"
test_check "package.json backend" "test -f backend/package.json"
test_check "vite.config.ts" "test -f vite.config.ts"
test_check "backend/server.js" "test -f backend/server.js"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 TESTS DE CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

test_check "Fichier .env backend" "test -f backend/.env"
test_check "Clé Firebase (serviceAccountKey.json)" "test -f backend/serviceAccountKey.json" || TESTS_SKIPPED=$((TESTS_SKIPPED + 1))
test_check "Configuration Stripe frontend" "test -f src/config/stripe.ts"

if [ -f "backend/.env" ]; then
    test_check "Variable STRIPE_SECRET_KEY" "grep -q 'STRIPE_SECRET_KEY=sk_' backend/.env"
    test_check "Variable FRONTEND_URL" "grep -q 'FRONTEND_URL=' backend/.env"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 TESTS DES DÉPENDANCES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

test_check "Dépendances frontend installées" "test -d node_modules"
test_check "Dépendances backend installées" "test -d backend/node_modules"
test_check "Node.js installé" "command -v node"
test_check "npm installé" "command -v npm"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 TESTS DES OUTILS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

test_check "Git installé" "command -v git"
test_check "Script check-installation.sh" "test -x check-installation.sh"
test_check "Script start-all.sh" "test -x start-all.sh"

# Tests réseau (si curl disponible)
if command -v curl &> /dev/null; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🌐 TESTS API (si serveurs actifs)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Tester si le backend est en cours d'exécution
    if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
        test_api "API Backend Health Check" "http://localhost:3001/api/health" "200"
    else
        echo -e "  ${YELLOW}⚠️  Backend non démarré (tests API ignorés)${NC}"
        TESTS_SKIPPED=$((TESTS_SKIPPED + 1))
    fi
    
    # Tester si le frontend est en cours d'exécution
    if curl -s http://localhost:5173 > /dev/null 2>&1; then
        test_api "Frontend accessible" "http://localhost:5173" "200"
    else
        echo -e "  ${YELLOW}⚠️  Frontend non démarré (tests ignorés)${NC}"
        TESTS_SKIPPED=$((TESTS_SKIPPED + 1))
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📄 TESTS DE DOCUMENTATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

test_check "LIRE-EN-PREMIER.md" "test -f LIRE-EN-PREMIER.md"
test_check "COMMENCER-MAINTENANT.md" "test -f COMMENCER-MAINTENANT.md"
test_check "CHECKING-COMPLET-ET-TUTORIEL.md" "test -f CHECKING-COMPLET-ET-TUTORIEL.md"
test_check "STATUT-PROJET.md" "test -f STATUT-PROJET.md"
test_check "DOCUMENTATION-INDEX.md" "test -f DOCUMENTATION-INDEX.md"

# Résumé
echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  📊 RÉSUMÉ DES TESTS                                      ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

PERCENTAGE=$((TESTS_PASSED * 100 / TESTS_TOTAL))

echo "  Total de tests : $TESTS_TOTAL"
echo -e "  ${GREEN}✅ Réussis     : $TESTS_PASSED${NC}"
if [ $TESTS_FAILED -gt 0 ]; then
    echo -e "  ${RED}❌ Échoués     : $TESTS_FAILED${NC}"
fi
if [ $TESTS_SKIPPED -gt 0 ]; then
    echo -e "  ${YELLOW}⚠️  Ignorés     : $TESTS_SKIPPED${NC}"
fi

echo ""
echo "  Score : $PERCENTAGE%"

if [ $PERCENTAGE -ge 90 ]; then
    echo ""
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  🎉 EXCELLENT ! Votre installation est complète           ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Vous pouvez démarrer le projet avec :"
    echo ""
    echo -e "  ${BLUE}./start-all.sh${NC}"
    echo ""
elif [ $PERCENTAGE -ge 70 ]; then
    echo ""
    echo -e "${YELLOW}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║  ⚠️  Installation presque complète                        ║${NC}"
    echo -e "${YELLOW}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Quelques éléments manquent. Consultez :"
    echo ""
    echo -e "  ${BLUE}COMMENCER-MAINTENANT.md${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ❌ Installation incomplète                               ║${NC}"
    echo -e "${RED}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Suivez le guide de configuration :"
    echo ""
    echo -e "  ${BLUE}./setup-auto.sh${NC}"
    echo ""
fi

# Code de sortie
if [ $TESTS_FAILED -gt 0 ]; then
    exit 1
else
    exit 0
fi

