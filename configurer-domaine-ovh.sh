#!/bin/bash

echo "╔════════════════════════════════════════════════════╗"
echo "║  🌐 Configuration Domaine OVH → Vercel            ║"
echo "║  ghostremixpack.com                               ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

echo "📋 Domaine : ghostremixpack.com"
echo "🏢 Registrar : OVH"
echo "🚀 Hébergement : Vercel"
echo ""

echo "────────────────────────────────────────────────────"
echo "📝 VALEURS DNS À CONFIGURER"
echo "────────────────────────────────────────────────────"
echo ""
echo "🔹 Enregistrement A (domaine principal):"
echo "   Type : A"
echo "   Sous-domaine : (vide)"
echo "   Cible : 76.76.21.21"
echo ""
echo "🔹 Enregistrement CNAME (www):"
echo "   Type : CNAME"
echo "   Sous-domaine : www"
echo "   Cible : cname.vercel-dns.com."
echo ""

echo "────────────────────────────────────────────────────"
echo "🌐 Ouverture des pages nécessaires..."
echo "────────────────────────────────────────────────────"
echo ""

# Ouvrir OVH Manager
echo "1️⃣  Ouverture de OVH Manager..."
open "https://www.ovh.com/manager/"
sleep 2

# Ouvrir Vercel Dashboard
echo "2️⃣  Ouverture de Vercel Dashboard..."
open "https://vercel.com/dashboard"
sleep 2

# Ouvrir le fichier aide-mémoire
echo "3️⃣  Ouverture du fichier avec les valeurs à copier..."
open "DNS-OVH-COPIER-COLLER.txt"

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║  ✅ ÉTAPES À SUIVRE MAINTENANT                    ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""
echo "📍 DANS VERCEL :"
echo "   1. Cliquez sur votre projet 'ghost-remix-pack'"
echo "   2. Settings → Domains"
echo "   3. Ajoutez : ghostremixpack.com"
echo "   4. Ajoutez : www.ghostremixpack.com"
echo ""
echo "📍 DANS OVH :"
echo "   1. Noms de domaine → ghostremixpack.com"
echo "   2. Zone DNS → Ajouter une entrée"
echo "   3. Ajoutez l'enregistrement A (76.76.21.21)"
echo "   4. Ajoutez l'enregistrement CNAME (cname.vercel-dns.com.)"
echo ""
echo "⏱️  Propagation DNS : 15-30 minutes"
echo ""
echo "📚 Guide détaillé : CONNECTER-GHOSTREMIXPACK-OVH.md"
echo ""
echo "✅ Bonne configuration ! 🚀"



