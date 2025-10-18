import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

// Configuration Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Produits Ghost Remix Pack avec configuration Stripe
const GHOST_PRODUCTS = {
  'pack-house': {
    id: 'pack-house',
    name: 'Pack House Premium',
    description: '15 tracks House WAV + stems + samples exclusifs',
    price: 1500, // Prix en centimes (15€)
    currency: 'eur',
    images: ['https://www.ghostremixpack.com/images/pack-house.jpg'],
    metadata: {
      type: 'pack',
      genre: 'house',
      tracks: '15',
      format: 'WAV + stems + samples'
    }
  },
  'pack-afro': {
    id: 'pack-afro',
    name: 'Pack Afro Vibes',
    description: '12 tracks Afro WAV + percussion loops uniques',
    price: 1800, // Prix en centimes (18€)
    currency: 'eur', 
    images: ['https://www.ghostremixpack.com/images/pack-afro.jpg'],
    metadata: {
      type: 'pack',
      genre: 'afro',
      tracks: '12',
      format: 'WAV + percussion loops'
    }
  },
  'pack-rap': {
    id: 'pack-rap',
    name: 'Pack Rap FR',
    description: '10 instrumentales Rap français + fichiers MIDI',
    price: 2000, // Prix en centimes (20€)
    currency: 'eur',
    images: ['https://www.ghostremixpack.com/images/pack-rap.jpg'],
    metadata: {
      type: 'pack',
      genre: 'rap-fr',
      tracks: '10', 
      format: 'WAV + MIDI'
    }
  },
  'pack-complet': {
    id: 'pack-complet',
    name: 'Pack Complet Ghost',
    description: 'Tous les packs Ghost + bonus exclusifs (Économie 8€)',
    price: 4500, // Prix en centimes (45€)
    currency: 'eur',
    images: ['https://www.ghostremixpack.com/images/pack-complet.jpg'],
    metadata: {
      type: 'bundle',
      genre: 'all',
      tracks: '37+',
      format: 'WAV + stems + MIDI + bonus',
      savings: '8€'
    }
  }
};

/**
 * POST /api/payment/create-checkout-session
 * Créer une session Stripe Checkout pour redirection directe
 */
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { 
      productId, 
      quantity = 1,
      customerInfo = {},
      successUrl,
      cancelUrl 
    } = req.body;

    // Validation
    if (!productId || !GHOST_PRODUCTS[productId]) {
      return res.status(400).json({
        success: false,
        error: 'Produit invalide ou non trouvé'
      });
    }

    const product = GHOST_PRODUCTS[productId];
    
    console.log(`🛒 Création session Stripe Checkout pour: ${product.name}`);
    console.log(`👤 Client: ${customerInfo.email || 'Anonyme'}`);

    // URLs par défaut si non fournies
    const defaultSuccessUrl = `${process.env.FRONTEND_URL || 'https://www.ghostremixpack.com'}/success-stripe?session_id={CHECKOUT_SESSION_ID}`;
    const defaultCancelUrl = `${process.env.FRONTEND_URL || 'https://www.ghostremixpack.com'}`;

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      
      // Informations produit
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.name,
              description: product.description,
              images: product.images,
              metadata: product.metadata
            },
            unit_amount: product.price,
          },
          quantity: quantity,
        },
      ],

      // URLs de redirection
      success_url: successUrl || defaultSuccessUrl,
      cancel_url: cancelUrl || defaultCancelUrl,

      // Informations client
      customer_email: customerInfo.email || undefined,
      
      // Métadonnées pour le webhook
      metadata: {
        productId: productId,
        customerName: customerInfo.name || 'Client Ghost',
        customerEmail: customerInfo.email || '',
        source: 'direct-checkout',
        ...product.metadata
      },

      // Configuration de la session
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
      
      // Options de paiement
      payment_intent_data: {
        metadata: {
          productId: productId,
          productName: product.name,
          customerEmail: customerInfo.email || '',
        }
      },

      // Localisation française
      locale: 'fr',
      
      // Collecte d'adresse (optionnel)
      billing_address_collection: 'auto',
      
      // Taxes (si configuré)
      automatic_tax: {
        enabled: false, // À activer si vous avez configuré les taxes
      },
    });

    console.log(`✅ Session Stripe créée: ${session.id}`);
    console.log(`🔗 URL de paiement: ${session.url}`);

    // Retourner l'URL de redirection
    res.json({
      success: true,
      url: session.url,
      sessionId: session.id,
      message: 'Session de paiement créée avec succès'
    });

  } catch (error) {
    console.error('❌ Erreur création session Checkout:', error.message);
    
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création de la session de paiement',
      message: error.message
    });
  }
});

/**
 * GET /api/payment/products
 * Récupérer la liste des produits disponibles
 */
router.get('/products', (req, res) => {
  try {
    const productsForFrontend = Object.values(GHOST_PRODUCTS).map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price / 100, // Convertir en euros
      currency: product.currency,
      images: product.images,
      metadata: product.metadata
    }));

    res.json({
      success: true,
      products: productsForFrontend,
      count: productsForFrontend.length
    });

  } catch (error) {
    console.error('❌ Erreur récupération produits:', error.message);
    
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des produits'
    });
  }
});

/**
 * GET /api/payment/product/:productId
 * Récupérer les détails d'un produit spécifique
 */
router.get('/product/:productId', (req, res) => {
  try {
    const { productId } = req.params;
    
    if (!GHOST_PRODUCTS[productId]) {
      return res.status(404).json({
        success: false,
        error: 'Produit non trouvé'
      });
    }

    const product = GHOST_PRODUCTS[productId];
    
    res.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price / 100, // Convertir en euros
        currency: product.currency,
        images: product.images,
        metadata: product.metadata
      }
    });

  } catch (error) {
    console.error('❌ Erreur récupération produit:', error.message);
    
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération du produit'
    });
  }
});

/**
 * POST /api/payment/quick-buy
 * Achat rapide en une étape (email + redirect)
 */
router.post('/quick-buy', async (req, res) => {
  try {
    const { productId, email, name } = req.body;

    // Validation
    if (!productId || !email) {
      return res.status(400).json({
        success: false,
        error: 'Produit et email requis pour l\'achat rapide'
      });
    }

    if (!GHOST_PRODUCTS[productId]) {
      return res.status(400).json({
        success: false,
        error: 'Produit invalide'
      });
    }

    // Utiliser la même logique que create-checkout-session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: GHOST_PRODUCTS[productId].currency,
          product_data: {
            name: GHOST_PRODUCTS[productId].name,
            description: GHOST_PRODUCTS[productId].description,
            images: GHOST_PRODUCTS[productId].images,
          },
          unit_amount: GHOST_PRODUCTS[productId].price,
        },
        quantity: 1,
      }],
      success_url: `${process.env.FRONTEND_URL || 'https://www.ghostremixpack.com'}/success-stripe?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://www.ghostremixpack.com'}`,
      customer_email: email,
      metadata: {
        productId: productId,
        customerName: name || 'Client Ghost',
        customerEmail: email,
        source: 'quick-buy',
      },
      locale: 'fr',
    });

    console.log(`⚡ Achat rapide créé: ${session.id} pour ${email}`);

    res.json({
      success: true,
      url: session.url,
      sessionId: session.id,
      message: 'Achat rapide créé avec succès'
    });

  } catch (error) {
    console.error('❌ Erreur achat rapide:', error.message);
    
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'achat rapide'
    });
  }
});

export default router;

