#!/bin/bash
echo "🧪 TEST RAPIDE"
echo "Backend:" && curl -s http://localhost:3001/api/health | head -1
echo "Contact:" && curl -s -X POST http://localhost:3001/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","message":"Test"}' | head -1
