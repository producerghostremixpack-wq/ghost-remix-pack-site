#!/bin/bash

# 🔍 COMMANDES CLI POUR VÉRIFICATION DNS
# Commandes utiles pour diagnostiquer manuellement votre DNS

DOMAIN="ghostremixpack.com"

echo "🔍 COMMANDES CLI DE VÉRIFICATION DNS"
echo "═══════════════════════════════════════"
echo "Domaine: $DOMAIN"
echo "Date: $(date)"
echo ""

# Fonction pour afficher une section
print_section() {
    echo ""
    echo "📋 $1"
    echo "$(printf '─%.0s' {1..50})"
}

# Fonction pour exécuter une commande avec description
run_command() {
    local description="$1"
    local command="$2"
    
    echo "💡 $description"
    echo "$ $command"
    
    # Exécuter la commande et capturer le résultat
    if result=$(eval "$command" 2>&1); then
        if [ -n "$result" ]; then
            echo "$result"
        else
            echo "❌ Aucun résultat"
        fi
    else
        echo "❌ Erreur lors de l'exécution"
    fi
    echo ""
}

# 1. VÉRIFICATIONS DNS BASIQUES
print_section "VÉRIFICATIONS DNS BASIQUES"

run_command "Enregistrements A (IPv4)" "dig A $DOMAIN +short"
run_command "Enregistrements AAAA (IPv6)" "dig AAAA $DOMAIN +short"
run_command "Nameservers" "dig NS $DOMAIN +short"
run_command "Tous les enregistrements" "dig ANY $DOMAIN +short"

# 2. CONFIGURATION EMAIL
print_section "CONFIGURATION EMAIL"

run_command "Enregistrements MX (serveurs email)" "dig MX $DOMAIN +short"
run_command "Enregistrements MX avec détails" "dig MX $DOMAIN"
run_command "SPF (Sender Policy Framework)" "dig TXT $DOMAIN +short | grep -i spf"
run_command "DMARC" "dig TXT _dmarc.$DOMAIN +short"

# 3. VÉRIFICATIONS DKIM
print_section "VÉRIFICATIONS DKIM"

# Sélecteurs DKIM communs
selectors=("default" "google" "k1" "selector1" "selector2" "mail" "dkim" "ovh")

for selector in "${selectors[@]}"; do
    run_command "DKIM sélecteur: $selector" "dig TXT ${selector}._domainkey.$DOMAIN +short | grep -i dkim"
done

# 4. VÉRIFICATIONS GOOGLE WORKSPACE
print_section "VÉRIFICATIONS GOOGLE WORKSPACE"

run_command "Vérification Google" "dig TXT $DOMAIN +short | grep google-site-verification"
run_command "MX Google" "dig MX $DOMAIN +short | grep -i google"

# 5. VÉRIFICATIONS OVH
print_section "VÉRIFICATIONS OVH"

run_command "MX OVH" "dig MX $DOMAIN +short | grep -i ovh"
run_command "Nameservers OVH" "dig NS $DOMAIN +short | grep -i ovh"

# 6. TESTS DE PROPAGATION
print_section "TESTS DE PROPAGATION DNS"

# Serveurs DNS publics
dns_servers=("8.8.8.8" "1.1.1.1" "208.67.222.222" "9.9.9.9")

for dns in "${dns_servers[@]}"; do
    case $dns in
        "8.8.8.8") provider="Google" ;;
        "1.1.1.1") provider="Cloudflare" ;;
        "208.67.222.222") provider="OpenDNS" ;;
        "9.9.9.9") provider="Quad9" ;;
    esac
    
    run_command "Test propagation via $provider ($dns)" "nslookup $DOMAIN $dns | grep -A2 'Name:'"
done

# 7. VÉRIFICATIONS DE SÉCURITÉ
print_section "VÉRIFICATIONS DE SÉCURITÉ"

run_command "Enregistrements CAA" "dig CAA $DOMAIN +short"
run_command "Test DNSSEC" "dig DNSKEY $DOMAIN +dnssec +short | head -1"

# 8. TESTS AVANCÉS
print_section "TESTS AVANCÉS"

run_command "Reverse DNS (PTR)" "dig -x $(dig A $DOMAIN +short | head -1) +short"
run_command "Trace DNS" "dig $DOMAIN +trace +short | tail -5"

# 9. RÉSUMÉ ET RECOMMANDATIONS
print_section "RÉSUMÉ ET RECOMMANDATIONS"

echo "📊 ANALYSE RAPIDE:"
echo ""

# Vérifier la présence des enregistrements essentiels
has_a=$(dig A $DOMAIN +short | wc -l)
has_mx=$(dig MX $DOMAIN +short | wc -l)
has_spf=$(dig TXT $DOMAIN +short | grep -i spf | wc -l)
has_dmarc=$(dig TXT _dmarc.$DOMAIN +short | wc -l)

if [ "$has_a" -gt 0 ]; then
    echo "✅ Enregistrements A: OK ($has_a trouvé(s))"
else
    echo "❌ Enregistrements A: MANQUANT"
fi

if [ "$has_mx" -gt 0 ]; then
    echo "✅ Enregistrements MX: OK ($has_mx trouvé(s))"
else
    echo "❌ Enregistrements MX: MANQUANT"
fi

if [ "$has_spf" -gt 0 ]; then
    echo "✅ SPF: OK"
else
    echo "❌ SPF: MANQUANT"
fi

if [ "$has_dmarc" -gt 0 ]; then
    echo "✅ DMARC: OK"
else
    echo "❌ DMARC: MANQUANT"
fi

echo ""
echo "🎯 ACTIONS RECOMMANDÉES:"

if [ "$has_a" -eq 0 ]; then
    echo "1. 🔴 URGENT: Configurer les enregistrements A"
fi

if [ "$has_mx" -eq 0 ]; then
    echo "2. 🔴 URGENT: Configurer les enregistrements MX"
fi

if [ "$has_spf" -eq 0 ]; then
    echo "3. 🟡 IMPORTANT: Ajouter un enregistrement SPF"
fi

if [ "$has_dmarc" -eq 0 ]; then
    echo "4. 🟡 RECOMMANDÉ: Ajouter un enregistrement DMARC"
fi

echo ""
echo "🔧 OUTILS EN LIGNE RECOMMANDÉS:"
echo "• MXToolbox: https://mxtoolbox.com/SuperTool.aspx?action=mx%3a$DOMAIN"
echo "• DNS Checker: https://dnschecker.org/#A/$DOMAIN"
echo "• Google Admin Toolbox: https://toolbox.googleapps.com/apps/checkmx/"
echo ""

echo "═══════════════════════════════════════"
echo "✅ Vérification terminée - $(date)"
echo "═══════════════════════════════════════"
