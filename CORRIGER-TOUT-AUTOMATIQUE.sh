#!/bin/bash

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

clear

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🤖 ASSISTANT AUTOMATIQUE - Configuration Domaine         ║"
echo "║  ghostremixpack.com → Vercel                              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Étape 1 : Diagnostic
echo -e "${BLUE}📊 ÉTAPE 1/4 : Diagnostic actuel${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "🔍 Vérification DNS en cours..."
sleep 1

# Vérifier le domaine principal
MAIN_DNS=$(nslookup ghostremixpack.com 8.8.8.8 2>&1 | grep "Address:" | grep -v "8.8.8.8" | tail -1 | awk '{print $2}')
if [ "$MAIN_DNS" = "76.76.21.21" ]; then
    echo -e "${GREEN}✅ ghostremixpack.com → 76.76.21.21 (Correct!)${NC}"
    MAIN_OK=true
else
    echo -e "${RED}❌ ghostremixpack.com → Pas configuré correctement${NC}"
    MAIN_OK=false
fi

# Vérifier www
WWW_DNS=$(nslookup www.ghostremixpack.com 8.8.8.8 2>&1 | grep "Address:" | grep -v "8.8.8.8" | tail -1 | awk '{print $2}')
WWW_CNAME=$(nslookup www.ghostremixpack.com 8.8.8.8 2>&1 | grep "canonical name" | awk '{print $NF}')

if echo "$WWW_CNAME" | grep -q "vercel"; then
    echo -e "${GREEN}✅ www.ghostremixpack.com → Vercel (Correct!)${NC}"
    WWW_OK=true
elif [ -n "$WWW_DNS" ] && [ "$WWW_DNS" != "76.76.21.21" ]; then
    echo -e "${RED}❌ www.ghostremixpack.com → $WWW_DNS (À corriger)${NC}"
    WWW_OK=false
else
    echo -e "${RED}❌ www.ghostremixpack.com → Pas configuré${NC}"
    WWW_OK=false
fi

echo ""
sleep 2

# Étape 2 : Plan d'action
echo -e "${BLUE}📋 ÉTAPE 2/4 : Plan d'action automatique${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ "$MAIN_OK" = true ] && [ "$WWW_OK" = true ]; then
    echo -e "${GREEN}✅ Tout est déjà configuré correctement!${NC}"
    echo ""
    echo "🌐 Votre site devrait être accessible sur:"
    echo "   → https://ghostremixpack.com"
    echo "   → https://www.ghostremixpack.com"
    echo ""
    echo "Si le site ne s'affiche pas encore:"
    echo "   → Attendez 10-15 minutes pour le SSL Vercel"
    echo "   → Videz le cache du navigateur (Ctrl+Shift+R)"
    echo ""
    exit 0
fi

echo "🔧 Actions nécessaires:"
echo ""

if [ "$MAIN_OK" = false ]; then
    echo -e "${YELLOW}⚠️  Configurer l'enregistrement A pour ghostremixpack.com${NC}"
fi

if [ "$WWW_OK" = false ]; then
    echo -e "${YELLOW}⚠️  Configurer l'enregistrement CNAME pour www${NC}"
fi

echo ""
sleep 2

# Étape 3 : Ouverture automatique des pages
echo -e "${BLUE}🌐 ÉTAPE 3/4 : Ouverture automatique des pages${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "Voulez-vous que j'ouvre automatiquement OVH et Vercel? (o/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Oo]$ ]]; then
    echo "1️⃣  Ouverture de OVH Manager..."
    open "https://www.ovh.com/manager/web/#/zone/ghostremixpack.com"
    sleep 2
    
    echo "2️⃣  Ouverture de Vercel Dashboard..."
    open "https://vercel.com/dashboard"
    sleep 2
    
    echo "3️⃣  Ouverture du fichier avec les valeurs..."
    open "DNS-OVH-COPIER-COLLER.txt"
    sleep 1
fi

echo ""

# Étape 4 : Instructions détaillées
echo -e "${BLUE}📝 ÉTAPE 4/4 : Instructions détaillées${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${YELLOW}🔹 DANS OVH (Zone DNS):${NC}"
echo ""

if [ "$MAIN_OK" = false ]; then
    echo -e "${RED}1. CORRIGER/AJOUTER l'enregistrement A:${NC}"
    echo "   Type        : A"
    echo "   Sous-domaine: (VIDE - ne rien mettre)"
    echo "   Cible       : 76.76.21.21"
    echo "   TTL         : 3600"
    echo ""
fi

if [ "$WWW_OK" = false ]; then
    echo -e "${RED}2. CORRIGER/AJOUTER l'enregistrement CNAME:${NC}"
    echo "   Type        : CNAME"
    echo "   Sous-domaine: www"
    echo "   Cible       : cname.vercel-dns.com."
    echo "   TTL         : 3600"
    echo "   ${YELLOW}⚠️  N'oubliez pas le point final: cname.vercel-dns.com.${NC}"
    echo ""
fi

echo -e "${YELLOW}🔹 DANS VERCEL:${NC}"
echo "   1. Cliquez sur le projet: ghost-remix-pack"
echo "   2. Settings → Domains"
echo "   3. Ajoutez: ghostremixpack.com"
echo "   4. Ajoutez: www.ghostremixpack.com"
echo ""

# Mode monitoring
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Voulez-vous activer le monitoring automatique? (o/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Oo]$ ]]; then
    echo ""
    echo -e "${GREEN}🔄 Mode monitoring activé${NC}"
    echo "Je vais vérifier toutes les 2 minutes si les DNS sont configurés..."
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter"
    echo ""
    
    for i in {1..30}; do
        echo -e "${BLUE}[Vérification #$i - $(date +%H:%M:%S)]${NC}"
        
        # Re-vérifier
        MAIN_CHECK=$(nslookup ghostremixpack.com 8.8.8.8 2>&1 | grep "Address:" | grep -v "8.8.8.8" | tail -1 | awk '{print $2}')
        WWW_CHECK=$(nslookup www.ghostremixpack.com 8.8.8.8 2>&1 | grep "canonical name")
        
        MAIN_STATUS="❌"
        WWW_STATUS="❌"
        
        if [ "$MAIN_CHECK" = "76.76.21.21" ]; then
            MAIN_STATUS="✅"
        fi
        
        if echo "$WWW_CHECK" | grep -q "vercel"; then
            WWW_STATUS="✅"
        fi
        
        echo "   ghostremixpack.com     : $MAIN_STATUS"
        echo "   www.ghostremixpack.com : $WWW_STATUS"
        
        # Si tout est OK
        if [ "$MAIN_STATUS" = "✅" ] && [ "$WWW_STATUS" = "✅" ]; then
            echo ""
            echo -e "${GREEN}╔════════════════════════════════════════════════╗${NC}"
            echo -e "${GREEN}║  🎉 FÉLICITATIONS! TOUT EST CONFIGURÉ!        ║${NC}"
            echo -e "${GREEN}╚════════════════════════════════════════════════╝${NC}"
            echo ""
            echo "✅ DNS configurés correctement"
            echo "✅ Propagation terminée"
            echo ""
            echo "🌐 Testez votre site:"
            echo "   → https://ghostremixpack.com"
            echo "   → https://www.ghostremixpack.com"
            echo ""
            echo "⏰ SSL peut prendre encore 10-15 minutes"
            echo ""
            exit 0
        fi
        
        echo "   Prochaine vérification dans 2 minutes..."
        echo ""
        sleep 120
    done
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Configuration terminée!${NC}"
echo ""
echo "⏱️  Attendez 15-30 minutes pour la propagation DNS"
echo ""
echo "🔄 Pour re-vérifier manuellement:"
echo "   ./verifier-domaine.sh"
echo ""
echo "📚 Guides disponibles:"
echo "   - CONNECTER-GHOSTREMIXPACK-OVH.md"
echo "   - DNS-OVH-COPIER-COLLER.txt"
echo ""



