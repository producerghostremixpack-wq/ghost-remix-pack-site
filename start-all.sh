#!/bin/bash
echo "🚀 DÉMARRAGE COMPLET - GHOST REMIX PACK"
echo "═══════════════════════════════════════════"

# Fonction pour tuer les processus en arrière-plan à la sortie
cleanup() {
    echo "🛑 Arrêt des serveurs..."
    kill $(jobs -p) 2>/dev/null
    exit
}
trap cleanup SIGINT SIGTERM

# Démarrer le backend en arrière-plan
echo "🔧 Démarrage du backend..."
cd backend && npm run dev &
BACKEND_PID=$!

# Attendre que le backend démarre
sleep 3

# Démarrer le frontend en arrière-plan
echo "🎨 Démarrage du frontend..."
cd .. && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Serveurs démarrés !"
echo "🔧 Backend: http://localhost:3001"
echo "🎨 Frontend: http://localhost:5173"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter tous les serveurs"

# Attendre que les processus se terminent
wait