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
