#!/bin/bash

# 🚀 Script de Déploiement Vercel
# Ce script ouvre toutes les pages nécessaires pour connecter Vercel

echo "╔════════════════════════════════════════════════╗"
echo "║  🚀 Déploiement Ghost Remix Pack sur Vercel   ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

echo "📋 Repository GitHub:"
echo "   https://github.com/producerghostremixpack-wq/ghost-remix-pack"
echo ""

# Vérifier que nous sommes sur la branche main
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo "⚠️  Attention: Vous n'êtes pas sur la branche 'main'"
  echo "   Branche actuelle: $BRANCH"
  echo ""
fi

# Vérifier s'il y a des changements non commités
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠️  Vous avez des changements non commités"
  echo ""
  read -p "Voulez-vous les commiter maintenant? (o/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Oo]$ ]]; then
    git add .
    read -p "Message du commit: " commit_msg
    git commit -m "$commit_msg"
    echo ""
    read -p "Pousser sur GitHub? (o/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Oo]$ ]]; then
      echo "📤 Push vers GitHub..."
      git push origin main
      echo "✅ Code poussé sur GitHub"
      echo ""
    fi
  fi
fi

echo "🌐 Ouverture des pages nécessaires..."
echo ""

# Ouvrir Vercel
echo "1️⃣  Ouverture de Vercel..."
open "https://vercel.com/new?utm_source=github"
sleep 2

echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║  📝 ÉTAPES À SUIVRE SUR VERCEL                ║"
echo "╚════════════════════════════════════════════════╝"
echo ""
echo "1. Connectez-vous avec GitHub (Continue with GitHub)"
echo "2. Autorisez Vercel à accéder à vos repositories"
echo "3. Importez le repository: ghost-remix-pack"
echo "4. Cliquez sur Deploy (ne changez rien)"
echo ""
echo "⏱️  Le déploiement prend 2-3 minutes"
echo ""
echo "❓ Si vous ne voyez pas le repository:"
echo "   → Ouvrez: https://github.com/settings/installations"
echo "   → Configurez Vercel → Ajoutez ghost-remix-pack"
echo ""
echo "📚 Guides détaillés disponibles:"
echo "   - VERCEL-GITHUB-CONNEXION.md"
echo "   - AUTORISER-VERCEL.md"
echo ""
echo "✅ Bonne chance! 🚀"



