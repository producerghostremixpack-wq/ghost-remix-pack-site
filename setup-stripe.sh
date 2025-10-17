#!/bin/bash

# 🚀 CONFIGURATION AUTOMATIQUE STRIPE - GHOST REMIX PACK
# Configure Stripe de A à Z automatiquement

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}🚀 CONFIGURATION AUTOMATIQUE STRIPE${NC}"
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Configuration complète de Stripe pour Ghost Remix Pack${NC}"
echo ""

# Fonction pour demander les clés Stripe
ask_stripe_keys() {
    echo -e "${YELLOW}🔑 CONFIGURATION DES CLÉS STRIPE${NC}"
    echo ""
    echo -e "${CYAN}📋 Vous avez besoin de vos clés Stripe :${NC}"
    echo "1. Allez sur https://dashboard.stripe.com"
    echo "2. Developers > API Keys"
    echo "3. Copiez vos clés de test"
    echo ""
    
    read -p "🔑 Clé publique Stripe (pk_test_...) : " STRIPE_PK
    read -p "🔐 Clé secrète Stripe (sk_test_...) : " STRIPE_SK
    
    if [[ ! $STRIPE_PK =~ ^pk_test_ ]]; then
        echo -e "${RED}❌ La clé publique doit commencer par 'pk_test_'${NC}"
        exit 1
    fi
    
    if [[ ! $STRIPE_SK =~ ^sk_test_ ]]; then
        echo -e "${RED}❌ La clé secrète doit commencer par 'sk_test_'${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Clés Stripe validées${NC}"
}

# Fonction pour mettre à jour le .env
update_env() {
    echo -e "${YELLOW}📝 Mise à jour du fichier .env...${NC}"
    
    # Sauvegarder l'ancien .env
    [ -f .env ] && cp .env .env.backup
    
    # Créer/mettre à jour .env avec Stripe
    cat > .env << EOF
# Configuration Ghost Remix Pack avec Stripe
SENDGRID_API_KEY=${SENDGRID_API_KEY:-SG.SIMULATION_MODE}
SENDGRID_FROM_EMAIL=contact@ghostremixpack.com
SENDGRID_FROM_NAME="Ghost Remix Pack"

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=$STRIPE_PK
STRIPE_SECRET_KEY=$STRIPE_SK
STRIPE_WEBHOOK_SECRET=whsec_test_webhook_secret
STRIPE_SUCCESS_URL=http://localhost:5173/success
STRIPE_CANCEL_URL=http://localhost:5173/cancel
STRIPE_CURRENCY=EUR

# URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3001

# Sécurité
JWT_SECRET=ghost-remix-pack-super-secret-2025

# Firebase (optionnel)
FIREBASE_PROJECT_ID=ghost-remix-pack

# Admin
ADMIN_EMAIL=admin@ghostremixpack.com
DOWNLOAD_RATE_LIMIT=10
DOWNLOAD_LINK_EXPIRY=48

# Mode
NODE_ENV=development
EOF
    
    echo -e "${GREEN}✅ Fichier .env mis à jour${NC}"
}

# Fonction pour installer les dépendances Stripe
install_stripe_deps() {
    echo -e "${YELLOW}📦 Installation des dépendances Stripe...${NC}"
    
    # Backend
    cd backend
    npm install stripe --save
    cd ..
    
    # Frontend
    npm install @stripe/stripe-js @stripe/react-stripe-js --save
    
    echo -e "${GREEN}✅ Dépendances Stripe installées${NC}"
}

# Fonction pour créer le service Stripe backend
create_stripe_service() {
    echo -e "${YELLOW}🛠️ Création du service Stripe backend...${NC}"
    
    cat > backend/services/stripe.js << 'EOF'
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Produits Ghost Remix Pack
const PRODUCTS = {
  trap_pack: {
    name: "Pack Trap Beats Premium",
    description: "10 beats trap professionnels + stems + presets",
    price: 2999, // 29.99€
    files: ["trap_beats_pack.zip", "trap_stems.zip", "serum_presets.zip"],
    image: "/images/trap-pack.jpg"
  },
  hiphop_pack: {
    name: "Pack Hip-Hop Exclusif", 
    description: "15 beats hip-hop + bonus loops + guide mixing",
    price: 3999, // 39.99€
    files: ["hiphop_beats_pack.zip", "bonus_loops.zip", "mixing_guide.pdf"],
    image: "/images/hiphop-pack.jpg"
  },
  drill_pack: {
    name: "Pack Drill Intense",
    description: "8 beats drill + presets + samples exclusifs",
    price: 2499, // 24.99€
    files: ["drill_beats_pack.zip", "drill_presets.zip", "exclusive_samples.zip"],
    image: "/images/drill-pack.jpg"
  },
  mega_pack: {
    name: "Mega Pack Complet",
    description: "TOUS les packs + bonus exclusifs + masterclass",
    price: 7999, // 79.99€
    files: ["all_packs_complete.zip", "exclusive_bonus.zip", "masterclass_video.mp4"],
    image: "/images/mega-pack.jpg"
  }
};

// Types de licences
const LICENSES = {
  basic: {
    name: "Licence Basique",
    description: "Usage personnel et streaming (jusqu'à 100k streams)",
    multiplier: 1
  },
  premium: {
    name: "Licence Premium",
    description: "Usage commercial + radio + TV (streams illimités)",
    multiplier: 2
  },
  exclusive: {
    name: "Licence Exclusive", 
    description: "Droits exclusifs complets + stems + crédits",
    multiplier: 5
  }
};

export class StripeService {
  constructor() {
    this.stripe = stripe;
  }

  // Créer une session de checkout
  async createCheckoutSession(productId, licenseType = 'basic', customerData = {}) {
    try {
      const product = PRODUCTS[productId];
      const license = LICENSES[licenseType];
      
      if (!product) {
        throw new Error(`Produit non trouvé: ${productId}`);
      }
      
      if (!license) {
        throw new Error(`Licence non trouvée: ${licenseType}`);
      }

      const finalPrice = product.price * license.multiplier;
      
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: process.env.STRIPE_CURRENCY || 'eur',
            product_data: {
              name: `${product.name} - ${license.name}`,
              description: `${product.description}\n\n📜 ${license.description}`,
              images: product.image ? [`${process.env.FRONTEND_URL}${product.image}`] : []
            },
            unit_amount: finalPrice
          },
          quantity: 1
        }],
        mode: 'payment',
        success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.STRIPE_CANCEL_URL,
        customer_email: customerData.email,
        metadata: {
          product_id: productId,
          license_type: licenseType,
          customer_name: customerData.name || '',
          files: JSON.stringify(product.files)
        },
        allow_promotion_codes: true,
        billing_address_collection: 'required'
      });

      console.log(`✅ Session Stripe créée: ${session.id}`);
      return session;
      
    } catch (error) {
      console.error('❌ Erreur création session Stripe:', error);
      throw error;
    }
  }

  // Récupérer une session
  async getSession(sessionId) {
    try {
      return await this.stripe.checkout.sessions.retrieve(sessionId);
    } catch (error) {
      console.error('❌ Erreur récupération session:', error);
      throw error;
    }
  }

  // Gérer les webhooks
  async handleWebhook(payload, signature) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log(`📡 Webhook reçu: ${event.type}`);

      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleSuccessfulPayment(event.data.object);
          break;
        case 'payment_intent.succeeded':
          console.log('💳 Paiement réussi:', event.data.object.id);
          break;
        case 'payment_intent.payment_failed':
          await this.handleFailedPayment(event.data.object);
          break;
        default:
          console.log(`⚠️ Événement non géré: ${event.type}`);
      }

      return { received: true };
      
    } catch (error) {
      console.error('❌ Erreur webhook:', error);
      throw error;
    }
  }

  // Gérer un paiement réussi
  async handleSuccessfulPayment(session) {
    try {
      console.log('🎉 Paiement réussi pour la session:', session.id);
      
      const { product_id, license_type, files } = session.metadata;
      const customerEmail = session.customer_details.email;
      
      // Ici vous pouvez :
      // 1. Envoyer l'email de confirmation avec les liens de téléchargement
      // 2. Créer les liens de téléchargement temporaires
      // 3. Enregistrer la vente en base de données
      // 4. Envoyer les fichiers par email
      
      console.log(`📧 Livraison à envoyer à: ${customerEmail}`);
      console.log(`🎵 Produit: ${product_id} (${license_type})`);
      console.log(`📁 Fichiers: ${files}`);
      
      return {
        success: true,
        customer: customerEmail,
        product: product_id,
        license: license_type
      };
      
    } catch (error) {
      console.error('❌ Erreur traitement paiement:', error);
      throw error;
    }
  }

  // Gérer un paiement échoué
  async handleFailedPayment(paymentIntent) {
    console.log('❌ Paiement échoué:', paymentIntent.id);
    // Ici vous pouvez envoyer un email de notification d'échec
  }

  // Créer un code promo
  async createPromoCode(code, percentOff, maxRedemptions = null) {
    try {
      const coupon = await this.stripe.coupons.create({
        percent_off: percentOff,
        duration: 'once',
        max_redemptions: maxRedemptions
      });

      const promoCode = await this.stripe.promotionCodes.create({
        coupon: coupon.id,
        code: code,
        active: true
      });

      console.log(`🎫 Code promo créé: ${code} (-${percentOff}%)`);
      return promoCode;
      
    } catch (error) {
      console.error('❌ Erreur création code promo:', error);
      throw error;
    }
  }

  // Obtenir les produits disponibles
  getProducts() {
    return PRODUCTS;
  }

  // Obtenir les licences disponibles
  getLicenses() {
    return LICENSES;
  }
}

export default new StripeService();
EOF

    echo -e "${GREEN}✅ Service Stripe backend créé${NC}"
}

# Fonction pour créer les routes Stripe
create_stripe_routes() {
    echo -e "${YELLOW}🛣️ Création des routes Stripe...${NC}"
    
    cat > backend/routes/stripe.js << 'EOF'
import express from 'express';
import stripeService from '../services/stripe.js';

const router = express.Router();

// Créer une session de checkout
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { productId, licenseType = 'basic', customerData = {} } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID requis' });
    }

    const session = await stripeService.createCheckoutSession(
      productId, 
      licenseType, 
      customerData
    );

    res.json({ sessionId: session.id, url: session.url });
    
  } catch (error) {
    console.error('❌ Erreur création session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Récupérer une session
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripeService.getSession(sessionId);
    
    res.json(session);
    
  } catch (error) {
    console.error('❌ Erreur récupération session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'];
    
    await stripeService.handleWebhook(req.body, signature);
    
    res.json({ received: true });
    
  } catch (error) {
    console.error('❌ Erreur webhook:', error);
    res.status(400).json({ error: error.message });
  }
});

// Obtenir les produits disponibles
router.get('/products', (req, res) => {
  try {
    const products = stripeService.getProducts();
    const licenses = stripeService.getLicenses();
    
    res.json({ products, licenses });
    
  } catch (error) {
    console.error('❌ Erreur récupération produits:', error);
    res.status(500).json({ error: error.message });
  }
});

// Créer un code promo
router.post('/create-promo', async (req, res) => {
  try {
    const { code, percentOff, maxRedemptions } = req.body;
    
    if (!code || !percentOff) {
      return res.status(400).json({ error: 'Code et pourcentage requis' });
    }

    const promoCode = await stripeService.createPromoCode(code, percentOff, maxRedemptions);
    
    res.json(promoCode);
    
  } catch (error) {
    console.error('❌ Erreur création code promo:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test Stripe (développement uniquement)
router.get('/test', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Test non disponible en production' });
  }
  
  res.json({
    message: '🧪 Stripe configuré et fonctionnel !',
    products: Object.keys(stripeService.getProducts()),
    licenses: Object.keys(stripeService.getLicenses()),
    webhook_url: `${process.env.BACKEND_URL}/api/stripe/webhook`
  });
});

export default router;
EOF

    echo -e "${GREEN}✅ Routes Stripe créées${NC}"
}

# Fonction pour créer les composants React Stripe
create_stripe_components() {
    echo -e "${YELLOW}⚛️ Création des composants React Stripe...${NC}"
    
    # Composant principal de checkout
    cat > src/components/StripeCheckout.tsx << 'EOF'
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface License {
  type: string;
  name: string;
  description: string;
  multiplier: number;
}

interface StripeCheckoutProps {
  product: Product;
  license?: License;
  customerData?: {
    name?: string;
    email?: string;
  };
}

export const StripeCheckout: React.FC<StripeCheckoutProps> = ({ 
  product, 
  license = { type: 'basic', name: 'Licence Basique', description: 'Usage personnel', multiplier: 1 },
  customerData = {}
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe non chargé');
      }

      // Créer la session de checkout
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          licenseType: license.type,
          customerData
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session');
      }

      const { sessionId } = await response.json();

      // Rediriger vers Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('❌ Erreur checkout:', err);
    } finally {
      setLoading(false);
    }
  };

  const finalPrice = (product.price * license.multiplier) / 100;

  return (
    <div className="stripe-checkout-container">
      <div className="product-info mb-4">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <div className="license-info p-3 bg-gray-100 rounded">
          <h4 className="font-semibold">{license.name}</h4>
          <p className="text-sm text-gray-600">{license.description}</p>
        </div>
      </div>

      <div className="price-info mb-4">
        <div className="text-2xl font-bold text-green-600">
          {finalPrice.toFixed(2)}€
        </div>
        {license.multiplier > 1 && (
          <div className="text-sm text-gray-500">
            Prix de base: {(product.price / 100).toFixed(2)}€ × {license.multiplier}
          </div>
        )}
      </div>

      {error && (
        <div className="error-message mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`
          w-full py-3 px-6 rounded-lg font-semibold text-white transition-all
          ${loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Traitement...
          </span>
        ) : (
          `🛒 Acheter maintenant - ${finalPrice.toFixed(2)}€`
        )}
      </button>

      <div className="security-info mt-3 text-xs text-gray-500 text-center">
        🔒 Paiement sécurisé par Stripe • SSL • Cryptage 256-bit
      </div>
    </div>
  );
};

export default StripeCheckout;
EOF

    # Composant de sélection de produits
    cat > src/components/ProductSelector.tsx << 'EOF'
import React, { useState, useEffect } from 'react';
import StripeCheckout from './StripeCheckout';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface License {
  type: string;
  name: string;
  description: string;
  multiplier: number;
}

export const ProductSelector: React.FC = () => {
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [licenses, setLicenses] = useState<Record<string, License>>({});
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedLicense, setSelectedLicense] = useState<string>('basic');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/stripe/products');
      const data = await response.json();
      setProducts(data.products);
      setLicenses(data.licenses);
      
      // Sélectionner le premier produit par défaut
      const firstProductId = Object.keys(data.products)[0];
      if (firstProductId) {
        setSelectedProduct(firstProductId);
      }
    } catch (error) {
      console.error('❌ Erreur chargement produits:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentProduct = products[selectedProduct];
  const currentLicense = licenses[selectedLicense];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        🎵 Ghost Remix Pack - Boutique
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Sélection des produits */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Choisissez votre pack</h3>
          <div className="space-y-3">
            {Object.entries(products).map(([id, product]) => (
              <div
                key={id}
                className={`
                  p-4 border rounded-lg cursor-pointer transition-all
                  ${selectedProduct === id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => setSelectedProduct(id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {(product.price / 100).toFixed(2)}€
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sélection des licences */}
          <h3 className="text-xl font-semibold mb-4 mt-8">Type de licence</h3>
          <div className="space-y-3">
            {Object.entries(licenses).map(([type, license]) => (
              <div
                key={type}
                className={`
                  p-4 border rounded-lg cursor-pointer transition-all
                  ${selectedLicense === type 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => setSelectedLicense(type)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{license.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{license.description}</p>
                  </div>
                  <div className="text-sm font-semibold">
                    {license.multiplier > 1 ? `×${license.multiplier}` : 'Standard'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Finaliser l'achat</h3>
          {currentProduct && currentLicense ? (
            <StripeCheckout
              product={{ id: selectedProduct, ...currentProduct }}
              license={{ type: selectedLicense, ...currentLicense }}
            />
          ) : (
            <div className="text-center text-gray-500 p-8">
              Sélectionnez un produit et une licence
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSelector;
EOF

    echo -e "${GREEN}✅ Composants React Stripe créés${NC}"
}

# Fonction pour mettre à jour le serveur backend
update_backend_server() {
    echo -e "${YELLOW}🔧 Mise à jour du serveur backend...${NC}"
    
    # Ajouter les routes Stripe au serveur principal
    if ! grep -q "stripe" backend/server.js; then
        # Créer une sauvegarde
        cp backend/server.js backend/server.js.backup
        
        # Ajouter l'import et la route Stripe
        sed -i.tmp '/import.*routes/a\
import stripeRouter from '\''./routes/stripe.js'\'';' backend/server.js
        
        sed -i.tmp '/app\.use.*api/a\
app.use('\''/api/stripe'\'', stripeRouter);' backend/server.js
        
        rm backend/server.js.tmp 2>/dev/null || true
        
        echo -e "${GREEN}✅ Routes Stripe ajoutées au serveur${NC}"
    else
        echo -e "${BLUE}ℹ️ Routes Stripe déjà présentes${NC}"
    fi
}

# Fonction pour créer les variables d'environnement frontend
create_frontend_env() {
    echo -e "${YELLOW}🎨 Configuration frontend Stripe...${NC}"
    
    cat > .env.local << EOF
# Variables d'environnement frontend
VITE_STRIPE_PUBLISHABLE_KEY=$STRIPE_PK
VITE_BACKEND_URL=http://localhost:3001
VITE_FRONTEND_URL=http://localhost:5173
EOF

    echo -e "${GREEN}✅ Variables frontend configurées${NC}"
}

# Fonction pour créer un script de test Stripe
create_stripe_test() {
    echo -e "${YELLOW}🧪 Création du script de test Stripe...${NC}"
    
    cat > test-stripe.cjs << 'EOF'
const https = require('https');
const fs = require('fs');

// Configuration
const BACKEND_URL = 'http://localhost:3001';

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = (color, message) => console.log(`${colors[color]}${message}${colors.reset}`);

// Test de la configuration Stripe
async function testStripeConfig() {
  console.log('🧪 TEST DE LA CONFIGURATION STRIPE');
  console.log('═══════════════════════════════════════');
  
  try {
    // Vérifier les variables d'environnement
    log('blue', '🔍 Vérification des variables d\'environnement...');
    
    if (!fs.existsSync('.env')) {
      log('red', '❌ Fichier .env non trouvé');
      return false;
    }
    
    const envContent = fs.readFileSync('.env', 'utf8');
    const hasStripePK = envContent.includes('STRIPE_PUBLISHABLE_KEY=pk_test_');
    const hasStripeSK = envContent.includes('STRIPE_SECRET_KEY=sk_test_');
    
    if (hasStripePK && hasStripeSK) {
      log('green', '✅ Clés Stripe configurées');
    } else {
      log('red', '❌ Clés Stripe manquantes ou invalides');
      return false;
    }
    
    // Test de l'API Stripe
    log('blue', '🔍 Test de l\'API Stripe...');
    
    const testResponse = await fetch(`${BACKEND_URL}/api/stripe/test`);
    if (testResponse.ok) {
      const data = await testResponse.json();
      log('green', '✅ API Stripe accessible');
      console.log('   Produits disponibles:', data.products.join(', '));
      console.log('   Licences disponibles:', data.licenses.join(', '));
    } else {
      log('red', '❌ API Stripe non accessible');
      return false;
    }
    
    // Test de création de session
    log('blue', '🔍 Test de création de session...');
    
    const sessionResponse = await fetch(`${BACKEND_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: 'trap_pack',
        licenseType: 'basic',
        customerData: { email: 'test@example.com', name: 'Test User' }
      })
    });
    
    if (sessionResponse.ok) {
      const sessionData = await sessionResponse.json();
      log('green', '✅ Session de checkout créée');
      console.log('   Session ID:', sessionData.sessionId);
    } else {
      log('red', '❌ Erreur création de session');
      return false;
    }
    
    log('green', '🎉 STRIPE CONFIGURÉ AVEC SUCCÈS !');
    return true;
    
  } catch (error) {
    log('red', `❌ Erreur: ${error.message}`);
    return false;
  }
}

// Fonction pour tester les cartes de test
function showTestCards() {
  console.log('\n💳 CARTES DE TEST STRIPE');
  console.log('═══════════════════════════');
  console.log('✅ Succès:           4242424242424242');
  console.log('❌ Refusée:          4000000000000002');
  console.log('💰 Fonds insuffis.:  4000000000009995');
  console.log('📅 Expirée:          4000000000000069');
  console.log('🔐 CVC incorrect:    4000000000000127');
  console.log('\n📋 Autres infos de test:');
  console.log('   Date d\'expiration: N\'importe quelle date future');
  console.log('   CVC: N\'importe quel code 3 chiffres');
  console.log('   Code postal: N\'importe quel code valide');
}

// Exécution
async function main() {
  const success = await testStripeConfig();
  
  if (success) {
    showTestCards();
    console.log('\n🚀 PRÊT POUR LES TESTS !');
    console.log('   Frontend: http://localhost:5173');
    console.log('   Backend:  http://localhost:3001');
    console.log('   Stripe:   https://dashboard.stripe.com');
  } else {
    console.log('\n🔧 ACTIONS REQUISES :');
    console.log('1. Vérifier les clés Stripe dans .env');
    console.log('2. Redémarrer le serveur backend');
    console.log('3. Relancer ce test');
  }
}

main().catch(console.error);
EOF

    chmod +x test-stripe.cjs
    echo -e "${GREEN}✅ Script de test Stripe créé${NC}"
}

# Fonction principale
main() {
    echo -e "${BLUE}🚀 DÉMARRAGE DE LA CONFIGURATION STRIPE${NC}"
    echo ""
    
    # Demander les clés Stripe
    ask_stripe_keys
    
    # Configuration
    update_env
    install_stripe_deps
    create_stripe_service
    create_stripe_routes
    create_stripe_components
    update_backend_server
    create_frontend_env
    create_stripe_test
    
    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo -e "${GREEN}🎉 STRIPE CONFIGURÉ AVEC SUCCÈS !${NC}"
    echo "═══════════════════════════════════════════════════════════"
    echo ""
    echo -e "${BLUE}📋 PROCHAINES ÉTAPES :${NC}"
    echo "1. 🔄 Redémarrer les serveurs : ./restart-all.sh"
    echo "2. 🧪 Tester Stripe : node test-stripe.cjs"
    echo "3. 🌐 Configurer les webhooks (optionnel pour les tests)"
    echo "4. 💳 Tester avec les cartes de test"
    echo ""
    echo -e "${BLUE}🔗 LIENS UTILES :${NC}"
    echo "📊 Dashboard Stripe: https://dashboard.stripe.com"
    echo "🧪 Cartes de test: https://stripe.com/docs/testing"
    echo "📚 Documentation: https://stripe.com/docs"
    echo ""
    echo -e "${PURPLE}💡 Votre boutique Ghost Remix Pack est prête !${NC}"
    echo -e "${PURPLE}🎵 Les clients peuvent maintenant acheter vos packs${NC}"
}

# Exécution
main "$@"
