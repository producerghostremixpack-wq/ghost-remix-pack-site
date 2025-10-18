#!/bin/bash

echo "🔌 ARRÊT DE TOUS LES SERVEURS GHOST REMIX PACK"
echo "============================================="

# Arrêt des serveurs de développement
echo "📱 Arrêt serveur frontend (Vite)..."
pkill -f "vite" 2>/dev/null
pkill -f "npm run dev" 2>/dev/null

# Arrêt des serveurs backend
echo "🖥️ Arrêt serveur backend..."
pkill -f "node.*server" 2>/dev/null
pkill -f "backend" 2>/dev/null

# Arrêt des processus Node.js Ghost Remix Pack
echo "👻 Arrêt processus Ghost Remix Pack..."
pkill -f "ghost-remix" 2>/dev/null

# Libération des ports
echo "🔓 Libération des ports..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null
lsof -ti:3004 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null

echo ""
echo "✅ TOUS LES SERVEURS SONT DÉCONNECTÉS !"
echo "🚪 Vous pouvez maintenant fermer ce terminal."


