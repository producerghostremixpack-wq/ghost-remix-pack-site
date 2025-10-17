#!/bin/bash

# Script de vérification des enregistrements DNS Google
# Pour ghostremixpack.com

echo "╔════════════════════════════════════════════════════════╗"
echo "║  VÉRIFICATION DNS - Google                             ║"
echo "║  Domaine : ghostremixpack.com                          ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour vérifier un enregistrement
check_dns() {
    local type=$1
    local expected=$2
    local description=$3
    
    echo -e "${BLUE}Vérification : ${description}${NC}"
    
    if [ "$type" = "TXT" ]; then
        result=$(dig TXT ghostremixpack.com +short | grep -o "$expected")
    elif [ "$type" = "CNAME" ]; then
        result=$(dig CNAME ghostremixpack.com +short | grep -o "$expected")
    fi
    
    if [ -n "$result" ]; then
        echo -e "${GREEN}✅ Trouvé : $result${NC}"
        return 0
    else
        echo -e "${RED}❌ Non trouvé${NC}"
        return 1
    fi
    echo ""
}

# Vérifier Google Search Console
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Google Search Console"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_dns "TXT" "google-site-verification=0aCVNJX0dMhyAGYMNJmxi03zRczsgJVQ_iYXaRr0Gks" "Google Search Console"

# Vérifier Google Workspace TXT
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. Google Workspace (TXT)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_dns "TXT" "x3jyqv4ulvd7" "Google Workspace TXT"

# Vérifier Google Workspace CNAME
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Google Workspace (CNAME)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_dns "CNAME" "gv-f3mjlwqtry376y.dv.googlehosted.com" "Google Workspace CNAME"

# Résumé
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║  RÉSUMÉ                                                 ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Vérifier si tous les enregistrements sont présents
txt1=$(dig TXT ghostremixpack.com +short | grep "google-site-verification=0aCVNJX0dMhyAGYMNJmxi03zRczsgJVQ_iYXaRr0Gks")
txt2=$(dig TXT ghostremixpack.com +short | grep "x3jyqv4ulvd7")
cname=$(dig CNAME ghostremixpack.com +short | grep "gv-f3mjlwqtry376y.dv.googlehosted.com")

if [ -n "$txt1" ] && [ -n "$txt2" ] && [ -n "$cname" ]; then
    echo -e "${GREEN}✅ Tous les enregistrements DNS sont configurés !${NC}"
    echo ""
    echo "Prochaines étapes :"
    echo "1. Vérifiez dans Google Search Console : https://search.google.com/search-console"
    echo "2. Vérifiez dans Google Workspace : https://admin.google.com"
    echo "3. Soumettez votre sitemap : https://www.ghostremixpack.com/sitemap.xml"
else
    echo -e "${YELLOW}⚠️  Certains enregistrements ne sont pas encore configurés${NC}"
    echo ""
    echo "Actions à faire :"
    echo "1. Ajoutez les enregistrements DNS dans OVH"
    echo "2. Attendez 1-2 heures pour la propagation"
    echo "3. Relancez ce script pour vérifier"
    echo ""
    echo "Voir le fichier : DNS-OVH-A-AJOUTER.md"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Détails complets :"
echo ""
echo "Tous les enregistrements TXT :"
dig TXT ghostremixpack.com +short
echo ""
echo "Tous les enregistrements CNAME :"
dig CNAME ghostremixpack.com +short
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

