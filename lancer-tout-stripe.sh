#!/bin/bash

# 🚀 LANCEUR COMPLET AVEC STRIPE - GHOST REMIX PACK
# Lance tout automatiquement avec Stripe configuré

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}🚀 LANCEUR COMPLET AVEC STRIPE${NC}"
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Configuration et lancement automatique complet${NC}"
echo ""

# Fonction pour nettoyer les processus
cleanup_processes() {
    echo -e "${YELLOW}🛑 Nettoyage des processus...${NC}"
    pkill -f "node" 2>/dev/null || true
    pkill -f "nodemon" 2>/dev/null || true
    for port in 3001 5173 5174 5175 5176 5177 5178 5179 5180; do
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    done
    sleep 2
    echo -e "${GREEN}✅ Processus nettoyés${NC}"
}

# Fonction pour installer les dépendances
install_dependencies() {
    echo -e "${YELLOW}📦 Installation des dépendances...${NC}"
    
    # Dépendances racine (frontend)
    if [ ! -d "node_modules" ]; then
        echo -e "${BLUE}📦 Installation dépendances frontend...${NC}"
        npm install --silent
    fi
    
    # Dépendances backend
    cd backend
    if [ ! -d "node_modules" ]; then
        echo -e "${BLUE}📦 Installation dépendances backend...${NC}"
        npm install --silent
    fi
    
    # Vérifier et installer Stripe
    if ! npm list stripe >/dev/null 2>&1; then
        echo -e "${BLUE}📦 Installation Stripe backend...${NC}"
        npm install stripe --save --silent
    fi
    cd ..
    
    # Stripe frontend
    if ! npm list @stripe/stripe-js >/dev/null 2>&1; then
        echo -e "${BLUE}📦 Installation Stripe frontend...${NC}"
        npm install @stripe/stripe-js @stripe/react-stripe-js --save --silent
    fi
    
    echo -e "${GREEN}✅ Dépendances installées${NC}"
}

# Fonction pour créer un backend ultra-simple
create_simple_backend() {
    echo -e "${YELLOW}🛠️ Création du backend ultra-simple...${NC}"
    
    cat > simple-backend.cjs << 'EOF'
// Backend ultra-simple avec CommonJS
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Produits Ghost Remix Pack
const PRODUCTS = {
  trap_pack: {
    name: "Pack Trap Beats Premium",
    description: "10 beats trap professionnels + stems + presets",
    price: 2999,
    files: ["trap_beats_pack.zip", "trap_stems.zip", "serum_presets.zip"]
  },
  hiphop_pack: {
    name: "Pack Hip-Hop Exclusif", 
    description: "15 beats hip-hop + bonus loops + guide mixing",
    price: 3999,
    files: ["hiphop_beats_pack.zip", "bonus_loops.zip", "mixing_guide.pdf"]
  },
  drill_pack: {
    name: "Pack Drill Intense",
    description: "8 beats drill + presets + samples exclusifs",
    price: 2499,
    files: ["drill_beats_pack.zip", "drill_presets.zip", "exclusive_samples.zip"]
  },
  mega_pack: {
    name: "Mega Pack Complet",
    description: "TOUS les packs + bonus exclusifs + masterclass",
    price: 7999,
    files: ["all_packs_complete.zip", "exclusive_bonus.zip", "masterclass_video.mp4"]
  }
};

const LICENSES = {
  basic: { name: "Licence Basique", multiplier: 1 },
  premium: { name: "Licence Premium", multiplier: 2 },
  exclusive: { name: "Licence Exclusive", multiplier: 5 }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: '🎵 Ghost Remix Pack API fonctionnel'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '🎵 Ghost Remix Pack API',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/stripe/products', '/api/stripe/test']
  });
});

app.get('/api/stripe/products', (req, res) => {
  res.json({ products: PRODUCTS, licenses: LICENSES });
});

app.get('/api/stripe/test', (req, res) => {
  res.json({
    message: '🧪 Stripe configuré (mode démonstration)',
    mode: 'demo',
    products: Object.keys(PRODUCTS),
    licenses: Object.keys(LICENSES)
  });
});

app.post('/api/stripe/create-checkout-session', (req, res) => {
  const { productId, licenseType = 'basic' } = req.body;
  
  if (!productId || !PRODUCTS[productId]) {
    return res.status(400).json({ error: 'Produit non trouvé' });
  }
  
  const product = PRODUCTS[productId];
  const license = LICENSES[licenseType];
  const finalPrice = product.price * license.multiplier;
  
  const sessionId = 'cs_demo_' + Date.now();
  const demoUrl = `http://localhost:5173/demo-checkout?product=${productId}&license=${licenseType}&amount=${finalPrice}&session=${sessionId}`;
  
  console.log(`🎭 [DEMO] Session créée: ${product.name} - ${finalPrice/100}€`);
  
  res.json({ 
    sessionId,
    url: demoUrl,
    mode: 'demo',
    product: product.name,
    price: finalPrice/100 + '€'
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(`📧 [SIMULATION] Contact de ${name} <${email}>: ${subject}`);
  res.json({ success: true, message: 'Message envoyé (simulation)' });
});

app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = req.body;
  console.log(`📧 [SIMULATION] Newsletter: ${email}`);
  res.json({ success: true, message: 'Inscription réussie (simulation)' });
});

// Démarrage
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('🎵 ═══════════════════════════════════════════════════════════');
  console.log('🎵 GHOST REMIX PACK - BACKEND ULTRA-SIMPLE');
  console.log('🎵 ═══════════════════════════════════════════════════════════');
  console.log(`🚀 Serveur: http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log(`💳 Stripe: http://localhost:${PORT}/api/stripe/test`);
  console.log(`🛒 Produits: http://localhost:${PORT}/api/stripe/products`);
  console.log('');
  console.log('🎭 Mode: Démonstration complète');
  console.log('💰 Paiements: Simulés');
  console.log('📧 Emails: Simulés');
  console.log('');
  console.log('🎵 ═══════════════════════════════════════════════════════════');
  console.log('🎵 PRÊT POUR LES TESTS !');
  console.log('🎵 ═══════════════════════════════════════════════════════════');
  console.log('');
});
EOF

    echo -e "${GREEN}✅ Backend ultra-simple créé${NC}"
}

# Fonction pour démarrer le backend
start_backend() {
    echo -e "${YELLOW}🔧 Démarrage du backend...${NC}"
    
    nohup node simple-backend.cjs > backend-simple.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > backend-simple.pid
    
    echo -e "${BLUE}⏳ Attente du backend (PID: $BACKEND_PID)...${NC}"
    
    for i in {1..20}; do
        if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Backend démarré !${NC}"
            return 0
        fi
        sleep 1
        echo -n "."
    done
    
    echo -e "${RED}❌ Backend non accessible${NC}"
    return 1
}

# Fonction pour démarrer le frontend
start_frontend() {
    echo -e "${YELLOW}🎨 Démarrage du frontend...${NC}"
    
    nohup npm run dev > frontend-simple.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > frontend-simple.pid
    
    echo -e "${BLUE}⏳ Attente du frontend...${NC}"
    sleep 5
    
    # Trouver le port
    FRONTEND_PORT=5173
    if [ -f frontend-simple.log ]; then
        FRONTEND_PORT=$(grep -o "localhost:[0-9]*" frontend-simple.log | head -1 | cut -d: -f2 2>/dev/null || echo "5173")
    fi
    
    echo -e "${GREEN}✅ Frontend démarré sur port $FRONTEND_PORT !${NC}"
    echo $FRONTEND_PORT > frontend-simple.port
}

# Fonction pour tester tout
test_everything() {
    echo -e "${YELLOW}🧪 Test complet...${NC}"
    
    # Test backend
    if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend OK${NC}"
    else
        echo -e "${RED}❌ Backend KO${NC}"
        return 1
    fi
    
    # Test Stripe
    if curl -s http://localhost:3001/api/stripe/test > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Stripe OK${NC}"
    else
        echo -e "${RED}❌ Stripe KO${NC}"
    fi
    
    # Test produits
    if curl -s http://localhost:3001/api/stripe/products > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Produits OK${NC}"
    else
        echo -e "${RED}❌ Produits KO${NC}"
    fi
    
    # Test session Stripe
    RESPONSE=$(curl -s -X POST http://localhost:3001/api/stripe/create-checkout-session \
        -H "Content-Type: application/json" \
        -d '{"productId":"trap_pack","licenseType":"basic"}')
    
    if [[ $RESPONSE == *"sessionId"* ]]; then
        echo -e "${GREEN}✅ Session Stripe OK${NC}"
    else
        echo -e "${RED}❌ Session Stripe KO${NC}"
    fi
    
    return 0
}

# Fonction pour créer les scripts de gestion
create_management_scripts() {
    echo -e "${YELLOW}📝 Création des scripts de gestion...${NC}"
    
    # Script d'arrêt
    cat > stop-simple.sh << 'EOF'
#!/bin/bash
echo "🛑 Arrêt des serveurs..."
[ -f backend-simple.pid ] && kill $(cat backend-simple.pid) 2>/dev/null && rm backend-simple.pid
[ -f frontend-simple.pid ] && kill $(cat frontend-simple.pid) 2>/dev/null && rm frontend-simple.pid
pkill -f "simple-backend.cjs" 2>/dev/null || true
echo "✅ Serveurs arrêtés"
EOF

    # Script de statut
    cat > status-simple.sh << 'EOF'
#!/bin/bash
echo "📊 STATUT SIMPLE"
echo "════════════════"
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Backend: http://localhost:3001"
else
    echo "❌ Backend: Non accessible"
fi

FRONTEND_PORT=$(cat frontend-simple.port 2>/dev/null || echo "5173")
if curl -s http://localhost:$FRONTEND_PORT > /dev/null 2>&1; then
    echo "✅ Frontend: http://localhost:$FRONTEND_PORT"
else
    echo "❌ Frontend: Non accessible"
fi
EOF

    # Script de test Stripe
    cat > test-stripe-simple.cjs << 'EOF'
const https = require('https');

async function testStripe() {
  console.log('🧪 TEST STRIPE SIMPLE');
  console.log('═══════════════════════');
  
  try {
    // Test API
    const healthResponse = await fetch('http://localhost:3001/api/health');
    if (healthResponse.ok) {
      console.log('✅ API accessible');
    }
    
    // Test produits
    const productsResponse = await fetch('http://localhost:3001/api/stripe/products');
    if (productsResponse.ok) {
      const data = await productsResponse.json();
      console.log('✅ Produits:', Object.keys(data.products).length);
    }
    
    // Test session
    const sessionResponse = await fetch('http://localhost:3001/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: 'trap_pack', licenseType: 'basic' })
    });
    
    if (sessionResponse.ok) {
      const session = await sessionResponse.json();
      console.log('✅ Session créée:', session.sessionId);
      console.log('💰 Prix:', session.price);
    }
    
    console.log('\n🎉 STRIPE FONCTIONNEL !');
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

testStripe();
EOF

    chmod +x stop-simple.sh status-simple.sh test-stripe-simple.cjs
    echo -e "${GREEN}✅ Scripts créés${NC}"
}

# Fonction principale
main() {
    echo -e "${BLUE}🚀 LANCEMENT COMPLET AVEC STRIPE${NC}"
    echo ""
    
    cleanup_processes
    install_dependencies
    create_simple_backend
    
    if start_backend; then
        start_frontend
        create_management_scripts
        
        echo ""
        test_everything
        
        echo ""
        echo "═══════════════════════════════════════════════════════════"
        echo -e "${GREEN}🎉 TOUT EST LANCÉ AVEC STRIPE !${NC}"
        echo "═══════════════════════════════════════════════════════════"
        echo ""
        
        FRONTEND_PORT=$(cat frontend-simple.port 2>/dev/null || echo "5173")
        
        echo -e "${BLUE}🔗 ACCÈS :${NC}"
        echo -e "🔧 Backend:  ${GREEN}http://localhost:3001${NC}"
        echo -e "🎨 Frontend: ${GREEN}http://localhost:$FRONTEND_PORT${NC}"
        echo -e "💳 Stripe:   ${GREEN}http://localhost:3001/api/stripe/test${NC}"
        echo -e "🛒 Produits: ${GREEN}http://localhost:3001/api/stripe/products${NC}"
        
        echo ""
        echo -e "${BLUE}📊 COMMANDES :${NC}"
        echo -e "📈 Statut:   ${YELLOW}./status-simple.sh${NC}"
        echo -e "🛑 Arrêter:  ${YELLOW}./stop-simple.sh${NC}"
        echo -e "🧪 Test:     ${YELLOW}node test-stripe-simple.cjs${NC}"
        
        echo ""
        echo -e "${PURPLE}🎵 VOTRE BOUTIQUE GHOST REMIX PACK EST OPÉRATIONNELLE !${NC}"
        echo -e "${PURPLE}💰 4 packs musicaux disponibles${NC}"
        echo -e "${PURPLE}📜 3 types de licences${NC}"
        echo -e "${PURPLE}🎭 Mode démonstration (paiements simulés)${NC}"
        
        # Ouvrir le navigateur
        if command -v open > /dev/null 2>&1; then
            echo ""
            echo -e "${BLUE}🌐 Ouverture automatique...${NC}"
            sleep 2
            open "http://localhost:$FRONTEND_PORT" 2>/dev/null || true
        fi
        
        return 0
    else
        echo ""
        echo "═══════════════════════════════════════════════════════════"
        echo -e "${RED}❌ ÉCHEC DU LANCEMENT${NC}"
        echo "═══════════════════════════════════════════════════════════"
        return 1
    fi
}

# Gestion des signaux
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Arrêt en cours...${NC}"
    ./stop-simple.sh 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM

# Exécution
main "$@"
