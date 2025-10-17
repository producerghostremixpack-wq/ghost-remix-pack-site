import express from 'express';
import newsletterService from '../services/newsletter.js';

const router = express.Router();

/**
 * POST /api/newsletter/subscribe
 * Inscrire un email à la newsletter
 */
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    console.log(`📧 Demande d'inscription newsletter: ${email}`);

    // Validation des données
    if (!email) {
      return res.status(400).json({
        success: false,
        errorType: 'invalid',
        message: 'Email requis'
      });
    }

    // Appeler le service newsletter
    const result = await newsletterService.subscribe(email);

    // Retourner le résultat
    if (result.success) {
      res.status(200).json(result);
    } else {
      const statusCode = result.errorType === 'duplicate' ? 409 : 400;
      res.status(statusCode).json(result);
    }

  } catch (error) {
    console.error('❌ Erreur route newsletter/subscribe:', error);
    
    res.status(500).json({
      success: false,
      errorType: 'server',
      message: 'Erreur serveur interne'
    });
  }
});

/**
 * GET /api/newsletter/confirm
 * Confirmer l'inscription (double opt-in)
 */
router.get('/confirm', async (req, res) => {
  try {
    const { email, token } = req.query;

    console.log(`✅ Demande de confirmation newsletter: ${email}`);

    // Validation des paramètres
    if (!email || !token) {
      return res.status(400).json({
        success: false,
        message: 'Email et token requis'
      });
    }

    // Appeler le service newsletter
    const result = await newsletterService.confirmSubscription(email, token);

    // Retourner le résultat
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }

  } catch (error) {
    console.error('❌ Erreur route newsletter/confirm:', error);
    
    res.status(500).json({
      success: false,
      message: 'Erreur serveur interne'
    });
  }
});

/**
 * POST /api/newsletter/unsubscribe
 * Désinscrire un email de la newsletter
 */
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    console.log(`📧 Demande de désinscription newsletter: ${email}`);

    // Validation des données
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email requis'
      });
    }

    // Appeler le service newsletter
    const result = await newsletterService.unsubscribe(email);

    // Retourner le résultat
    res.status(200).json(result);

  } catch (error) {
    console.error('❌ Erreur route newsletter/unsubscribe:', error);
    
    res.status(500).json({
      success: false,
      message: 'Erreur serveur interne'
    });
  }
});

/**
 * GET /api/newsletter/unsubscribe
 * Page de désinscription (GET pour les liens email)
 */
router.get('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.query;

    console.log(`📧 Page de désinscription newsletter: ${email}`);

    if (!email) {
      return res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
            <h2>❌ Erreur</h2>
            <p>Email manquant dans l'URL de désinscription.</p>
            <a href="${process.env.FRONTEND_URL}">Retour au site</a>
          </body>
        </html>
      `);
    }

    // Appeler le service newsletter
    const result = await newsletterService.unsubscribe(email);

    // Afficher la page de confirmation
    if (result.success) {
      res.send(`
        <html>
          <head>
            <title>Désinscription confirmée - Ghost Remix Pack</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
              .container { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
              .success { color: #28a745; font-size: 48px; margin-bottom: 20px; }
              h2 { color: #333; margin-bottom: 20px; }
              p { color: #666; line-height: 1.6; margin-bottom: 15px; }
              .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 10px; }
              .button:hover { background: #5a6fd8; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success">✅</div>
              <h2>Désinscription confirmée</h2>
              <p>Votre email <strong>${email}</strong> a été supprimé de notre liste de newsletter.</p>
              <p>Nous sommes tristes de vous voir partir, mais nous respectons votre choix.</p>
              <p>Si vous changez d'avis, vous pouvez vous réinscrire à tout moment sur notre site.</p>
              <a href="${process.env.FRONTEND_URL}" class="button">Retour au site</a>
              <a href="${process.env.FRONTEND_URL}/newsletter" class="button">Se réinscrire</a>
            </div>
          </body>
        </html>
      `);
    } else {
      res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
            <h2>❌ Erreur</h2>
            <p>Erreur lors de la désinscription : ${result.message}</p>
            <a href="${process.env.FRONTEND_URL}">Retour au site</a>
          </body>
        </html>
      `);
    }

  } catch (error) {
    console.error('❌ Erreur page newsletter/unsubscribe:', error);
    
    res.status(500).send(`
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h2>❌ Erreur serveur</h2>
          <p>Une erreur est survenue lors de la désinscription.</p>
          <a href="${process.env.FRONTEND_URL}">Retour au site</a>
        </body>
      </html>
    `);
  }
});

/**
 * GET /api/newsletter/stats
 * Statistiques de la newsletter (admin)
 */
router.get('/stats', async (req, res) => {
  try {
    // TODO: Implémenter les statistiques
    // - Nombre total d'inscrits
    // - Inscriptions par mois
    // - Taux d'ouverture
    // - Taux de clic
    
    res.json({
      success: true,
      stats: {
        totalSubscribers: 0,
        confirmedSubscribers: 0,
        monthlySignups: 0,
        openRate: 0,
        clickRate: 0
      }
    });

  } catch (error) {
    console.error('❌ Erreur route newsletter/stats:', error);
    
    res.status(500).json({
      success: false,
      message: 'Erreur serveur interne'
    });
  }
});

export default router;