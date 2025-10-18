#!/bin/bash

# Script pour mettre à jour automatiquement l'URL Railway dans tous les fichiers frontend
# Usage: ./update-railway-url.sh https://votre-url-railway.up.railway.app

if [ "$#" -ne 1 ]; then
    echo "❌ Usage: $0 https://votre-url-railway.up.railway.app"
    echo ""
    echo "🎯 Exemple:"
    echo "   $0 https://abc123-xyz789.up.railway.app"
    exit 1
fi

RAILWAY_URL="$1"

echo "🔧 Mise à jour des URLs Railway dans le frontend Ghost Remix Pack..."
echo "📡 Nouvelle URL: $RAILWAY_URL"
echo ""

# Sauvegarder les fichiers originaux
echo "📋 Sauvegarde des fichiers originaux..."
cp src/components/Newsletter.tsx src/components/Newsletter.tsx.backup
cp src/components/ContactPage.tsx src/components/ContactPage.tsx.backup  
cp src/components/PaiementDirect.tsx src/components/PaiementDirect.tsx.backup
cp src/lib/constants.ts src/lib/constants.ts.backup

# Remplacer les URLs dans tous les fichiers
echo "🔄 Remplacement des URLs..."

# Newsletter.tsx
sed -i "s|https://ghost-remix-backend.up.railway.app|$RAILWAY_URL|g" src/components/Newsletter.tsx

# ContactPage.tsx  
sed -i "s|https://ghost-remix-backend.up.railway.app|$RAILWAY_URL|g" src/components/ContactPage.tsx

# PaiementDirect.tsx
sed -i "s|https://ghost-remix-backend.up.railway.app|$RAILWAY_URL|g" src/components/PaiementDirect.tsx

# constants.ts
sed -i "s|https://ghost-remix-backend.up.railway.app|$RAILWAY_URL|g" src/lib/constants.ts

echo "✅ Mise à jour terminée !"
echo ""
echo "📋 Fichiers modifiés:"
echo "   - src/components/Newsletter.tsx"
echo "   - src/components/ContactPage.tsx" 
echo "   - src/components/PaiementDirect.tsx"
echo "   - src/lib/constants.ts"
echo ""
echo "🚀 Prochaines étapes:"
echo "1. Vérifiez les modifications avec: git diff"
echo "2. Committez: git add . && git commit -m 'feat: Update Railway URL'"
echo "3. Poussez: git push origin main"
echo "4. Vercel redéploiera automatiquement !"
echo ""
echo "🎯 Votre site sera alors connecté à Railway avec Zimbra OVH !"

