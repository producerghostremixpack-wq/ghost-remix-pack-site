import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Import des routes
import checkoutRouter from './routes/checkout.js';
import stripeRouter from './routes/stripe.js';import webhookRouter from './routes/webhook.js';
import stripeRouter from './routes/stripe.js';import downloadRouter from './routes/download.js';
import stripeRouter from './routes/stripe.js';import contactRouter from './routes/contact.js';
import stripeRouter from './routes/stripe.js';import newsletterRouter from './routes/newsletter.js';
import stripeRouter from './routes/stripe.js';
// Configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// IMPORTANT : Le webhook Stripe nécessite le raw body
// Activer le webhook si STRIPE_WEBHOOK_SECRET est configuré
if (process.env.STRIPE_WEBHOOK_SECRET) {
  console.log('🔔 Webhook Stripe activé');
  app.use('/api/webhook', express.raw({ type: 'application/json' }));
  app.use('/api/webhook', webhookRouter);
} else {
  console.log('⚠️  Webhook Stripe désactivé (STRIPE_WEBHOOK_SECRET non configuré)');
}

app.use('/api/stripe', stripeRouter);

// Body parser pour les autres routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/checkout', checkoutRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/stripe', stripeRouter);app.use('/api/download', downloadRouter);
app.use('/api/stripe', stripeRouter);app.use('/api/contact', contactRouter);
app.use('/api/stripe', stripeRouter);app.use('/api/newsletter', newsletterRouter);
app.use('/api/stripe', stripeRouter);
// Route de test
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Ghost Remix Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  res.status(500).json({ 
    error: 'Une erreur est survenue',
    message: err.message 
  });
});

// Démarrage du serveur
// IMPORTANT: 0.0.0.0 permet d'écouter sur toutes les interfaces (nécessaire pour Railway)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════╗
║  🚀 Ghost Remix Backend API               ║
║  ✅ Serveur démarré sur port ${PORT}        ║
║  📡 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}  ║
║  🔒 Stripe: ${process.env.STRIPE_SECRET_KEY ? 'Configuré ✅' : 'Non configuré ❌'}    ║
║  🗄️  Firebase: ${process.env.FIREBASE_PROJECT_ID ? 'Configuré ✅' : 'Non configuré ❌'} ║
║  📧 SendGrid: ${process.env.SENDGRID_API_KEY ? 'Configuré ✅' : 'Non configuré ❌'}   ║
╚═══════════════════════════════════════════╝
  `);
});

export default app;

