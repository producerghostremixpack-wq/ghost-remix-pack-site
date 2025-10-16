#!/bin/bash

# Script pour nettoyer les clés API des fichiers de documentation

echo "🧹 Nettoyage des clés API..."

# Liste des fichiers à nettoyer
files=(
    "CONFIGURER-STRIPE-PRODUCTION.md"
    "TUTO-ULTRA-SIMPLE.md"
    "RAILWAY-AUTORISER-REPO.md"
    "RAILWAY-ETAPES-SIMPLES.md"
    "VARIABLES-BACKEND-COPIER.txt"
    "deployer-tout.sh"
    "SOLUTION-GITHUB.md"
    "TOUT-DEPLOYER.md"
    "DEMARRAGE-ZERO.md"
    "GUIDE-ULTIME-SIMPLE.md"
    "setup-auto.sh"
    "backend/check-config.js"
    "backend/INSTALLATION.md"
    "STRIPE-GUIDE-RAPIDE.md"
    "STRIPE-CONNECTE.md"
    "DEPLOYMENT-COMPLET-CHECKLIST.md"
    "DEPLOYER-RAILWAY-RAPIDE.md"
    "DEPLOYER-BACKEND-SIMPLE.md"
    "DEPLOIEMENT-BACKEND-RAILWAY.md"
    "CONFIGURATION-STRIPE-PERSONNALISEE.md"
    "COMMENCER-MAINTENANT.md"
    "COMMENCER-ICI.md"
    "COMMANDES-EXACTES.md"
    "COMMANDES-DEPLOY.txt"
    "CHECKING-COMPLET-ET-TUTORIEL.md"
    "backend/env.example"
    "DEPLOIEMENT-ETAPE-PAR-ETAPE.md"
    "GUIDE-MISE-EN-LIGNE-COMPLETE.md"
    "RESTE-A-FAIRE-MISE-EN-LIGNE.md"
)

# Remplacer les clés Stripe par des placeholders
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        # Remplacer les clés de test
        sed -i '' 's/sk_test_[a-zA-Z0-9_]*/sk_test_VOTRE_CLE_TEST_ICI/g' "$file"
        
        # Remplacer les clés live
        sed -i '' 's/sk_live_[a-zA-Z0-9_]*/sk_live_VOTRE_CLE_LIVE_ICI/g' "$file"
        
        # Remplacer les clés publiques de test
        sed -i '' 's/pk_test_[a-zA-Z0-9_]*/pk_test_VOTRE_CLE_PUBLIQUE_TEST_ICI/g' "$file"
        
        # Remplacer les clés publiques live
        sed -i '' 's/pk_live_[a-zA-Z0-9_]*/pk_live_VOTRE_CLE_PUBLIQUE_LIVE_ICI/g' "$file"
        
        # Remplacer les webhook secrets
        sed -i '' 's/whsec_[a-zA-Z0-9_]*/whsec_VOTRE_WEBHOOK_SECRET_ICI/g' "$file"
        
        echo "✅ $file"
    fi
done

echo ""
echo "✨ Nettoyage terminé !"
echo ""
echo "📝 Prochaines étapes :"
echo "1. Vérifier les changements : git diff"
echo "2. Créer un nouveau commit : git add . && git commit -m 'chore: Nettoyage des clés API'"
echo "3. Pousser vers GitHub : git push -u origin main"

