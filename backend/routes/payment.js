import express from 'express';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configuration Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Configuration email Zimbra OVH
let emailTransporter = null;

async function initEmailTransporter() {
  try {
    emailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'ssl0.ovh.net',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SENDGRID_FROM_EMAIL || 'contact@ghostremixpack.com',
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false // Accepter les certificats auto-signés
      }
    });
    
    await emailTransporter.verify();
    console.log('✅ Payment API : Email Zimbra OVH configuré');
  } catch (error) {
    // Email non bloquant - le serveur fonctionne sans
    console.log('ℹ️  Email Zimbra non configuré (optionnel) - Le serveur fonctionne normalement');
  }
}

initEmailTransporter();

// Produits disponibles
const PRODUCTS = {
  'pack-house': {
    id: 'pack-house',
    name: 'Pack House Premium',
    description: '15 tracks House + stems + samples exclusifs',
    price: 1500, // Prix en centimes (15€)
    currency: 'eur',
    images: ['https://www.ghostremixpack.com/images/pack-house.jpg'],
    metadata: {
      type: 'pack',
      genre: 'house',
      tracks: '15',
      format: 'WAV + stems'
    }
  },
  'pack-afro': {
    id: 'pack-afro',
    name: 'Pack Afro Vibes',
    description: '12 tracks Afro + percussion loops uniques',
    price: 1800, // Prix en centimes (18€)
    currency: 'eur',
    images: ['https://www.ghostremixpack.com/images/pack-afro.jpg'],
    metadata: {
      type: 'pack',
      genre: 'afro',
      tracks: '12',
      format: 'WAV + loops'
    }
  },
  'pack-rap': {
    id: 'pack-rap',
    name: 'Pack Rap FR',
    description: '10 instrumentales Rap français + MIDI',
    price: 2000, // Prix en centimes (20€)
    currency: 'eur',
    images: ['https://www.ghostremixpack.com/images/pack-rap.jpg'],
    metadata: {
      type: 'pack',
      genre: 'rap',
      tracks: '10',
      format: 'WAV + MIDI'
    }
  },
  'pack-complet': {
    id: 'pack-complet',
    name: 'Pack Complet Ghost',
    description: 'Tous les packs + bonus exclusifs (Économie 8€)',
    price: 4500, // Prix en centimes (45€)
    currency: 'eur',
    originalPrice: 5300, // Prix original 53€
    images: ['https://www.ghostremixpack.com/images/pack-complet.jpg'],
    metadata: {
      type: 'bundle',
      genre: 'all',
      tracks: '37+',
      format: 'WAV + stems + MIDI + bonus'
    }
  }
};

// Créer Payment Intent
router.post('/create-intent', async (req, res) => {
  try {
    const { productId, customerEmail, customerName } = req.body;

    if (!productId || !PRODUCTS[productId]) {
      return res.status(400).json({
        success: false,
        error: 'Produit invalide'
      });
    }

    const product = PRODUCTS[productId];

    // Créer le Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price,
      currency: product.currency,
      metadata: {
        productId: productId,
        customerEmail: customerEmail || '',
        customerName: customerName || '',
        ...product.metadata
      },
      description: `Ghost Remix Pack - ${product.name}`,
      receipt_email: customerEmail || null,
      setup_future_usage: null, // Paiement unique
    });

    console.log(`💰 Payment Intent créé : ${paymentIntent.id} pour ${product.name}`);

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('❌ Erreur création Payment Intent:', error.message);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création du paiement'
    });
  }
});

// Confirmer le paiement
router.post('/confirm', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        error: 'ID Payment Intent manquant'
      });
    }

    // Récupérer le Payment Intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      
      // Envoyer email de confirmation
      if (emailTransporter && paymentIntent.metadata.customerEmail) {
        await sendPaymentConfirmationEmail(paymentIntent);
      }

      res.json({
        success: true,
        status: paymentIntent.status,
        message: 'Paiement confirmé avec succès !'
      });

    } else {
      res.json({
        success: false,
        status: paymentIntent.status,
        message: 'Paiement non confirmé'
      });
    }

  } catch (error) {
    console.error('❌ Erreur confirmation paiement:', error.message);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la confirmation du paiement'
    });
  }
});

// Fonction d'envoi d'email de confirmation
async function sendPaymentConfirmationEmail(paymentIntent) {
  try {
    const product = PRODUCTS[paymentIntent.metadata.productId];
    const customerEmail = paymentIntent.metadata.customerEmail;
    const customerName = paymentIntent.metadata.customerName || 'Client';
    const amount = (paymentIntent.amount / 100).toFixed(2);

    const emailContent = {
      from: `"👻 Ghost Remix Pack" <${process.env.SENDGRID_FROM_EMAIL}>`,
      to: customerEmail,
      subject: `🎉 Paiement confirmé - ${product.name} (${amount}€)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0B0B0F, #141420); color: #F5F5F7; padding: 25px; border-radius: 15px;">
          
          <div style="text-align: center; background: linear-gradient(135deg, #9B5CF6, #00E5FF); padding: 30px; border-radius: 15px; margin-bottom: 25px;">
            <h1 style="color: white; margin: 0; font-size: 36px; text-shadow: 0 0 20px rgba(255,255,255,0.5);">👻 GHOST REMIX PACK</h1>
            <p style="color: rgba(255,255,255,0.95); margin: 15px 0; font-size: 18px; font-weight: bold;">PAIEMENT CONFIRMÉ !</p>
            <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin-top: 20px;">
              <p style="color: white; margin: 0; font-size: 16px;">🚀 Vos packs Ghost sont prêts !</p>
            </div>
          </div>
          
          <div style="background: rgba(20, 20, 32, 0.9); padding: 30px; border-radius: 15px; border: 2px solid rgba(155, 92, 246, 0.4);">
            <h2 style="color: #00E5FF; margin-top: 0; font-size: 24px;">Salut ${customerName} ! 👋</h2>
            
            <div style="background: linear-gradient(135deg, #22C55E, #10B981); padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center;">
              <h3 style="color: white; margin: 0; font-size: 22px;">✅ PAIEMENT DE ${amount}€ CONFIRMÉ !</h3>
              <p style="color: rgba(255,255,255,0.95); margin: 15px 0 0 0; font-size: 16px;">
                Votre commande "${product.name}" a été traitée avec succès !<br>
                📧 Téléchargements envoyés depuis Zimbra OVH
              </p>
            </div>

            <div style="background: rgba(155, 92, 246, 0.2); padding: 20px; border-radius: 12px; margin: 20px 0;">
              <h4 style="color: #9B5CF6; margin: 0 0 15px 0;">🎵 VOTRE COMMANDE :</h4>
              <ul style="color: #F5F5F7; margin: 0; line-height: 2; padding-left: 25px;">
                <li><strong>✅ Produit :</strong> ${product.name}</li>
                <li><strong>✅ Description :</strong> ${product.description}</li>
                <li><strong>✅ Format :</strong> ${product.metadata.format}</li>
                <li><strong>✅ Montant :</strong> ${amount}€</li>
                <li><strong>✅ ID Transaction :</strong> ${paymentIntent.id}</li>
              </ul>
            </div>
            
            <div style="background: rgba(0, 229, 255, 0.15); padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center;">
              <h4 style="color: #00E5FF; margin: 0 0 15px 0;">📥 TÉLÉCHARGEMENT IMMÉDIAT :</h4>
              <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 15px 0;">
                <p style="color: #F5F5F7; margin: 0; font-size: 16px; font-weight: bold;">
                  🔗 Liens de téléchargement sécurisés valides 30 jours
                </p>
                <div style="margin-top: 15px;">
                  <a href="https://www.ghostremixpack.com/download?token=${paymentIntent.id}&product=${paymentIntent.metadata.productId}" 
                     style="background: linear-gradient(135deg, #9B5CF6, #00E5FF); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                    📥 Télécharger ${product.name}
                  </a>
                </div>
                <p style="color: #B0B0C0; margin: 10px 0 0 0; font-size: 12px;">
                  Format : WAV haute qualité + stems + bonus
                </p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 25px; padding: 20px; background: rgba(20, 20, 32, 0.9); border-radius: 15px;">
            <h3 style="color: #00E5FF; margin-top: 0;">📞 Support & Contact</h3>
            <p style="color: #F5F5F7; font-size: 16px; margin: 15px 0;">
              📧 <a href="mailto:${process.env.SENDGRID_FROM_EMAIL}" style="color: #9B5CF6; text-decoration: none; font-weight: bold;">${process.env.SENDGRID_FROM_EMAIL}</a>
            </p>
            <p style="color: #B0B0C0; font-size: 14px;">
              🌐 https://www.ghostremixpack.com • 🎵 Support client premium
            </p>
          </div>
          
        </div>
      `,
      text: `
👻 GHOST REMIX PACK - PAIEMENT CONFIRMÉ !

Salut ${customerName} !

✅ PAIEMENT DE ${amount}€ CONFIRMÉ !
Votre commande "${product.name}" a été traitée avec succès !

🎵 VOTRE COMMANDE :
• Produit : ${product.name}
• Description : ${product.description}
• Format : ${product.metadata.format}
• Montant : ${amount}€
• ID Transaction : ${paymentIntent.id}

📥 TÉLÉCHARGEMENT IMMÉDIAT :
Liens de téléchargement sécurisés valides 30 jours

Télécharger : https://www.ghostremixpack.com/download?token=${paymentIntent.id}&product=${paymentIntent.metadata.productId}

Support : ${process.env.SENDGRID_FROM_EMAIL}
Site : https://www.ghostremixpack.com

👻 Ghost Remix Pack - Paiement via Stripe + Zimbra OVH
      `
    };

    const result = await emailTransporter.sendMail(emailContent);
    
    console.log(`✅ Email de confirmation envoyé à ${customerEmail} (ID: ${result.messageId})`);

    // Email de notification admin
    const adminEmail = {
      from: `"💰 Ghost Sales" <${process.env.SENDGRID_FROM_EMAIL}>`,
      to: process.env.SENDGRID_FROM_EMAIL,
      subject: `💰 Nouvelle vente - ${amount}€ (${product.name})`,
      html: `
        <h2>💰 Nouvelle vente confirmée !</h2>
        <p><strong>Produit :</strong> ${product.name}</p>
        <p><strong>Client :</strong> ${customerName} (${customerEmail})</p>
        <p><strong>Montant :</strong> ${amount}€</p>
        <p><strong>ID Transaction :</strong> ${paymentIntent.id}</p>
        <p><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</p>
        
        <hr>
        <p><strong>Actions à faire :</strong></p>
        <ul>
          <li>Préparer les fichiers de téléchargement</li>
          <li>Vérifier la qualité des liens</li>
          <li>Suivre la satisfaction client</li>
        </ul>
      `,
      text: `
Nouvelle vente confirmée !

Produit : ${product.name}
Client : ${customerName} (${customerEmail})
Montant : ${amount}€
ID Transaction : ${paymentIntent.id}
Date : ${new Date().toLocaleString('fr-FR')}

Actions à faire :
- Préparer les fichiers de téléchargement
- Vérifier la qualité des liens
- Suivre la satisfaction client
      `
    };

    await emailTransporter.sendMail(adminEmail);
    console.log(`✅ Notification admin envoyée pour vente ${amount}€`);

  } catch (error) {
    console.error('❌ Erreur envoi email confirmation:', error.message);
  }
}

// Récupérer les produits disponibles
router.get('/products', (req, res) => {
  try {
    const productsForFrontend = Object.values(PRODUCTS).map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price / 100, // Convertir en euros
      originalPrice: product.originalPrice ? product.originalPrice / 100 : null,
      currency: product.currency,
      images: product.images,
      metadata: product.metadata
    }));

    res.json({
      success: true,
      products: productsForFrontend
    });

  } catch (error) {
    console.error('❌ Erreur récupération produits:', error.message);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des produits'
    });
  }
});

// Route de test
router.get('/test', (req, res) => {
  res.json({
    service: '💳 Ghost Remix Pack Payment API',
    status: 'Opérationnel',
    stripe_configured: !!process.env.STRIPE_SECRET_KEY,
    email_configured: !!emailTransporter,
    products_count: Object.keys(PRODUCTS).length,
    timestamp: new Date().toISOString()
  });
});

export default router;