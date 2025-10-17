#!/bin/bash
echo "🛑 Arrêt de tous les serveurs..."
[ -f backend.pid ] && kill $(cat backend.pid) 2>/dev/null && rm backend.pid
[ -f frontend.pid ] && kill $(cat frontend.pid) 2>/dev/null && rm frontend.pid
pkill -f "ghost-remix" 2>/dev/null || true
for port in 3001 5173 5174 5175 5176 5177 5178 5179 5180; do
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
done
echo "✅ Serveurs arrêtés"
