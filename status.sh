#!/bin/bash
echo "📊 STATUT DES SERVEURS"
echo "═══════════════════════"
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Backend: http://localhost:3001"
else
    echo "❌ Backend: Non accessible"
fi

FRONTEND_PORT=5173
[ -f frontend.log ] && FRONTEND_PORT=$(grep -o "localhost:[0-9]*" frontend.log | head -1 | cut -d: -f2 2>/dev/null || echo "5173")

if curl -s http://localhost:$FRONTEND_PORT > /dev/null 2>&1; then
    echo "✅ Frontend: http://localhost:$FRONTEND_PORT"
else
    echo "❌ Frontend: Non accessible"
fi
