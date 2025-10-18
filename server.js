import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import des routes backend  
import contactRouter from './backend/routes/contact.js';
import newsletterRouter from './backend/routes/newsletter.js';
import paymentRouter from './backend/routes/payment.js';
import checkoutDirectRouter from './backend/routes/checkout-direct.js';
import paymentIntentRouter from './backend/routes/payment-intent.js';
import webhookRouter from './backend/routes/webhook.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://www.ghostremixpack.com',
    'https://ghostremixpack.com'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Routes API
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/payment', checkoutDirectRouter);
app.use('/api/payment', paymentIntentRouter);
app.use('/api/webhook', webhookRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Ghost Remix Pack API',
    timestamp: new Date().toISOString(),
    payment_system: 'Stripe + Zimbra OVH',
    version: '2.0.0'
  });
});

// Catch-all pour React Router (doit être en dernier)
// Note: On utilise app.use pour servir index.html pour toutes les routes non-API
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Ghost Remix Pack API démarrée sur port ${PORT}`);
  console.log(`💳 Système paiement Stripe opérationnel`);
  console.log(`📧 Emails Zimbra OVH configuré`);
  console.log(`🌐 Railway deployment ready`);
});
