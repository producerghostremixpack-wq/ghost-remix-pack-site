
#!/bin/bash

echo "╔════════════════════════════════════════════════════╗"
echo "║  🔍 Vérification DNS - ghostremixpack.com         ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Fonction pour afficher les résultats
check_dns() {
    local domain=$1
    echo "🔎 Vérification de: $domain"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Vérifier avec nslookup
    result=$(nslookup "$domain" 8.8.8.8 2>&1)
    
    if echo "$result" | grep -q "No answer" || echo "$result" | grep -q "can't find"; then
        echo "❌ Pas de réponse DNS"
        echo "   → Les enregistrements DNS ne sont pas encore configurés"
    else
        ip=$(echo "$result" | grep -A 1 "Name:" | grep "Address:" | awk '{print $2}' | grep -v "8.8.8.8" | head -1)
        if [ -n "$ip" ]; then
            echo "✅ DNS configuré!"
            echo "   → Adresse IP: $ip"
            
            # Vérifier si c'est la bonne IP Vercel
            if [ "$ip" = "76.76.21.21" ]; then
                echo "   → ✅ Pointe correctement vers Vercel!"
            else
                echo "   → ⚠️  Ne pointe pas vers Vercel (attendu: 76.76.21.21)"
            fi
        else
            # Peut-être un CNAME
            cname=$(echo "$result" | grep "canonical name" | awk '{print $NF}')
            if [ -n "$cname" ]; then
                echo "✅ CNAME configuré!"
                echo "   → Cible: $cname"
                if echo "$cname" | grep -q "vercel"; then
                    echo "   → ✅ Pointe correctement vers Vercel!"
                fi
            fi
        fi
    fi
    echo ""
}

# Vérifier le domaine principal
check_dns "ghostremixpack.com"

# Vérifier www
check_dns "www.ghostremixpack.com"

# Test HTTP
echo "🌐 Test de connexion HTTP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if curl -I -s -m 5 http://ghostremixpack.com 2>&1 | grep -q "200\|301\|302"; then
    echo "✅ Le site répond!"
    echo "   → Testez dans votre navigateur: https://ghostremixpack.com"
else
    echo "❌ Le site ne répond pas encore"
    echo "   → Attendez que les DNS se propagent"
fi
echo ""

# Résumé
echo "╔════════════════════════════════════════════════════╗"
echo "║  📊 RÉSUMÉ                                        ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""
echo "Si vous voyez des ❌ :"
echo "  → Vérifiez que les DNS sont bien configurés dans OVH"
echo "  → Attendez 15-30 minutes pour la propagation"
echo "  → Relancez ce script: ./verifier-domaine.sh"
echo ""
echo "Si vous voyez des ✅ :"
echo "  → Félicitations! Votre domaine est configuré!"
echo "  → Testez: https://ghostremixpack.com"
echo ""

