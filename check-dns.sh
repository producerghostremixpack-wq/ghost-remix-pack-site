#!/bin/bash

echo "🔍 Vérification DNS pour ghostremixpack.com"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérifier le domaine principal
echo "📍 Domaine principal (ghostremixpack.com):"
echo "Attendu: 76.76.21.21"
echo -n "Actuel: "
nslookup ghostremixpack.com 2>/dev/null | grep "Address:" | tail -1 | awk '{print $2}'
echo ""

# Vérifier WWW
echo "📍 Sous-domaine (www.ghostremixpack.com):"
echo "Attendu: cname.vercel-dns.com"
echo -n "Actuel: "
nslookup www.ghostremixpack.com 2>/dev/null | grep "canonical name" | awk '{print $4}'
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Test de connexion:"
echo ""

# Tester ghostremixpack.com
if curl -s -I https://ghostremixpack.com 2>/dev/null | grep -q "200\|301\|302"; then
    echo "✅ https://ghostremixpack.com → Fonctionne"
else
    echo "⏳ https://ghostremixpack.com → En attente de propagation DNS"
fi

# Tester www.ghostremixpack.com
if curl -s -I https://www.ghostremixpack.com 2>/dev/null | grep -q "200\|301\|302"; then
    echo "✅ https://www.ghostremixpack.com → Fonctionne"
else
    echo "⏳ https://www.ghostremixpack.com → En attente de propagation DNS"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Si les DNS ne sont pas encore propagés:"
echo "   • Attendre 15-30 minutes après modification OVH"
echo "   • Relancer ce script avec: ./check-dns.sh"
echo ""

