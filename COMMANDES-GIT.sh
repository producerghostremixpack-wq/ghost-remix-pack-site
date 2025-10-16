#!/bin/bash

# 🚀 Script de Mise en Ligne - Ghost Remix Pack
# Ce script prépare votre code pour le déploiement

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  🚀 Préparation Mise en Ligne - Ghost Remix Pack         ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Vérifier qu'on est dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur : Vous devez être dans le dossier racine du projet"
    exit 1
fi

echo "📂 Dossier actuel : $(pwd)"
echo ""

# Créer .gitignore s'il n'existe pas
if [ ! -f ".gitignore" ]; then
    echo "📝 Création .gitignore..."
    cat > .gitignore << 'EOF'
# Dépendances
node_modules/
backend/node_modules/

# Variables d'environnement (IMPORTANT !)
.env
backend/.env
.env.local
.env.production

# Fichiers Firebase (NE JAMAIS COMMIT !)
serviceAccountKey.json
backend/serviceAccountKey.json

# Build
dist/
build/
.vercel/

# Logs
*.log
npm-debug.log*
.DS_Store

# IDE
.vscode/
.idea/

# Audio (trop gros pour Git)
public/audio/**/*.wav
public/audio/**/*.mp3
!public/audio/**/README.md

# Vidéo
public/video/**/*.mp4
!public/video/**/README.md

# Temporaire
.cache/
tmp/
temp/
EOF
    echo "✅ .gitignore créé"
else
    echo "✅ .gitignore existe déjà"
fi
echo ""

# Initialiser Git si nécessaire
if [ ! -d ".git" ]; then
    echo "🎯 Initialisation Git..."
    git init
    echo "✅ Git initialisé"
else
    echo "✅ Git déjà initialisé"
fi
echo ""

# Vérifier qu'il n'y a pas de .env committé
if git ls-files | grep -q "\.env"; then
    echo "⚠️  ATTENTION : Fichiers .env détectés dans Git !"
    echo "   Suppression des fichiers sensibles du suivi Git..."
    git rm --cached .env 2>/dev/null
    git rm --cached backend/.env 2>/dev/null
    git rm --cached backend/serviceAccountKey.json 2>/dev/null
    echo "✅ Fichiers sensibles retirés"
fi
echo ""

# Ajouter tous les fichiers
echo "📦 Ajout des fichiers au commit..."
git add .
echo "✅ Fichiers ajoutés"
echo ""

# Afficher les fichiers à commiter
echo "📋 Fichiers qui seront commitués :"
git status --short | head -20
echo ""

# Commit
echo "💾 Création du commit..."
git commit -m "Initial commit - Ghost Remix Pack ready for deployment" -m "Frontend + Backend + Stripe integration" 2>/dev/null || echo "ℹ️  Aucun changement à commiter"
echo ""

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  ✅ CODE PRÊT POUR DÉPLOIEMENT !                          ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

echo "🎯 PROCHAINES ÉTAPES :"
echo ""
echo "1. Créez un repo sur GitHub :"
echo "   👉 https://github.com/new"
echo "   Nom suggéré : ghost-remix-pack"
echo ""
echo "2. Liez votre repo local :"
echo "   git remote add origin https://github.com/VOTRE-USERNAME/ghost-remix-pack.git"
echo ""
echo "3. Poussez votre code :"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Déployez sur Vercel :"
echo "   👉 https://vercel.com/new"
echo ""
echo "5. Déployez le backend sur Railway :"
echo "   👉 https://railway.app"
echo ""
echo "📚 Guide complet : GUIDE-MISE-EN-LIGNE-COMPLETE.md"
echo ""
echo "🆘 Besoin d'aide ? Consultez les guides créés !"
echo ""







