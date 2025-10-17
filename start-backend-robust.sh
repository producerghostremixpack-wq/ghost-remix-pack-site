#!/bin/bash

# 🚀 DÉMARREUR BACKEND ROBUSTE - GHOST REMIX PACK
# Démarre le backend de manière fiable avec gestion d'erreurs

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 DÉMARRAGE BACKEND ROBUSTE${NC}"
echo "═══════════════════════════════════════════════════════════"

# Fonction pour tuer les processus sur le port 3001
kill_port_3001() {
    echo -e "${YELLOW}🛑 Libération du port 3001...${NC}"
    lsof -ti:3001 | xargs kill -9 2>/dev/null || true
    sleep 1
    echo -e "${GREEN}✅ Port 3001 libéré${NC}"
}

# Fonction pour vérifier les dépendances
check_dependencies() {
    echo -e "${YELLOW}🔍 Vérification des dépendances...${NC}"
    
    cd backend
    
    if [ ! -d "node_modules" ]; then
        echo -e "${BLUE}📦 Installation des dépendances backend...${NC}"
        npm install --silent
    fi
    
    # Vérifier que Stripe est installé
    if ! npm list stripe >/dev/null 2>&1; then
        echo -e "${BLUE}📦 Installation de Stripe...${NC}"
        npm install stripe --save --silent
    fi
    
    cd ..
    echo -e "${GREEN}✅ Dépendances vérifiées${NC}"
}

# Fonction pour corriger les imports
fix_server_imports() {
    echo -e "${YELLOW}🔧 Correction des imports du serveur...${NC}"
    
    # Vérifier si les routes Stripe sont correctement importées
    if ! grep -q "stripe" backend/server.js; then
        echo -e "${BLUE}📝 Ajout des routes Stripe...${NC}"
        
        # Créer une sauvegarde
        cp backend/server.js backend/server.js.backup
        
        # Créer un nouveau server.js avec les bonnes imports
        cat > backend/server.js << 'EOF'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import des routes
import contactRouter from './routes/contact.js';
import newsletterRouter from './routes/newsletter.js';
import stripeRouter from './routes/stripe.js';

// Configuration
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Pour Stripe webhook (raw body)
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// JSON middleware pour les autres routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/stripe', stripeRouter);

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: {
      email: process.env.SENDGRID_API_KEY ? 'configured' : 'not configured',
      stripe: process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured'
    }
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: '🎵 Ghost Remix Pack API',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/contact', '/api/newsletter', '/api/stripe']
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  
  // Vérifications
  if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'SG.SIMULATION_MODE') {
    console.log('✅ SendGrid configuré');
  } else {
    console.log('⚠️  SendGrid en mode simulation');
  }
  
  if (process.env.STRIPE_SECRET_KEY) {
    console.log('✅ Stripe configuré');
  } else {
    console.log('⚠️  Stripe non configuré');
  }
});

export default app;
EOF
        
        echo -e "${GREEN}✅ Serveur corrigé${NC}"
    else
        echo -e "${BLUE}ℹ️ Routes Stripe déjà présentes${NC}"
    fi
}

# Fonction pour démarrer le backend
start_backend() {
    echo -e "${YELLOW}🔧 Démarrage du backend...${NC}"
    
    cd backend
    
    # Démarrer en arrière-plan avec logs
    nohup node server.js > ../backend-robust.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > ../backend-robust.pid
    
    cd ..
    
    echo -e "${BLUE}⏳ Attente du démarrage (PID: $BACKEND_PID)...${NC}"
    
    # Attendre que le backend démarre (max 30 secondes)
    for i in {1..30}; do
        if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Backend démarré avec succès !${NC}"
            echo -e "${GREEN}   URL: http://localhost:3001${NC}"
            return 0
        fi
        
        # Vérifier si le processus est encore en vie
        if ! kill -0 $BACKEND_PID 2>/dev/null; then
            echo -e "${RED}❌ Le processus backend s'est arrêté${NC}"
            echo -e "${YELLOW}📋 Logs d'erreur :${NC}"
            tail -10 backend-robust.log
            return 1
        fi
        
        sleep 1
        echo -n "."
    done
    
    echo -e "${RED}❌ Timeout - Backend non accessible après 30s${NC}"
    echo -e "${YELLOW}📋 Logs récents :${NC}"
    tail -10 backend-robust.log
    return 1
}

# Fonction pour tester le backend
test_backend() {
    echo -e "${YELLOW}🧪 Test du backend...${NC}"
    
    # Test de santé
    HEALTH_RESPONSE=$(curl -s http://localhost:3001/api/health || echo "ERREUR")
    if [[ $HEALTH_RESPONSE != "ERREUR" ]]; then
        echo -e "${GREEN}✅ API Health OK${NC}"
    else
        echo -e "${RED}❌ API Health KO${NC}"
        return 1
    fi
    
    # Test Stripe
    STRIPE_RESPONSE=$(curl -s http://localhost:3001/api/stripe/test || echo "ERREUR")
    if [[ $STRIPE_RESPONSE != "ERREUR" ]]; then
        echo -e "${GREEN}✅ API Stripe OK${NC}"
    else
        echo -e "${YELLOW}⚠️ API Stripe non accessible${NC}"
    fi
    
    # Test des produits
    PRODUCTS_RESPONSE=$(curl -s http://localhost:3001/api/stripe/products || echo "ERREUR")
    if [[ $PRODUCTS_RESPONSE != "ERREUR" ]]; then
        echo -e "${GREEN}✅ Produits Stripe OK${NC}"
    else
        echo -e "${YELLOW}⚠️ Produits Stripe non accessibles${NC}"
    fi
    
    return 0
}

# Fonction principale
main() {
    echo -e "${BLUE}🚀 DÉMARRAGE ROBUSTE DU BACKEND${NC}"
    echo ""
    
    # Étapes
    kill_port_3001
    check_dependencies
    fix_server_imports
    
    if start_backend; then
        echo ""
        test_backend
        
        echo ""
        echo "═══════════════════════════════════════════════════════════"
        echo -e "${GREEN}🎉 BACKEND DÉMARRÉ AVEC SUCCÈS !${NC}"
        echo "═══════════════════════════════════════════════════════════"
        echo ""
        echo -e "${BLUE}🔗 ACCÈS :${NC}"
        echo -e "🌐 API: ${GREEN}http://localhost:3001${NC}"
        echo -e "🏥 Health: ${GREEN}http://localhost:3001/api/health${NC}"
        echo -e "💳 Stripe: ${GREEN}http://localhost:3001/api/stripe/test${NC}"
        echo ""
        echo -e "${BLUE}📊 COMMANDES :${NC}"
        echo -e "📈 Statut: ${YELLOW}./status.sh${NC}"
        echo -e "🛑 Arrêt: ${YELLOW}kill \$(cat backend-robust.pid)${NC}"
        echo -e "📋 Logs: ${YELLOW}tail -f backend-robust.log${NC}"
        
        return 0
    else
        echo ""
        echo "═══════════════════════════════════════════════════════════"
        echo -e "${RED}❌ ÉCHEC DU DÉMARRAGE BACKEND${NC}"
        echo "═══════════════════════════════════════════════════════════"
        echo ""
        echo -e "${YELLOW}🔧 ACTIONS DE DÉPANNAGE :${NC}"
        echo "1. Vérifier les logs : tail -f backend-robust.log"
        echo "2. Vérifier les dépendances : cd backend && npm install"
        echo "3. Vérifier le fichier .env"
        echo "4. Relancer : ./start-backend-robust.sh"
        
        return 1
    fi
}

# Gestion des signaux
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Arrêt du backend...${NC}"
    [ -f backend-robust.pid ] && kill $(cat backend-robust.pid) 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM

# Exécution
main "$@"
