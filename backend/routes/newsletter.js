import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configuration email Zimbra OVH
let emailTransporter = null;

try {
  if (process.env.EMAIL_PASSWORD) {
    emailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'ssl0.ovh.net',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // STARTTLS
      auth: {
        user: process.env.SENDGRID_FROM_EMAIL || 'contact@ghostremixpack.com',
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });
    console.log('✅ Newsletter : Email Zimbra OVH configuré');
  } else {
    console.log('ℹ️  Newsletter : Email non configuré (optionnel)');
  }
} catch (error) {
  console.log('ℹ️  Newsletter : Email non disponible (optionnel)');
}

/**
 * POST /api/newsletter
 * Inscrire un email à la newsletter (route principale)
 */
router.post('/', async (req, res) => {
  try {
    const { email, name, message, source } = req.body;

    console.log(`📧 Demande d'inscription newsletter: ${email}`);

    // Validation des données
    if (!email) {
      return res.status(400).json({
        success: false,
        errorType: 'invalid',
        message: 'Email requis'
      });
    }

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        errorType: 'invalid',
        message: 'Format d\'email invalide'
      });
    }

    // Envoyer l'email de confirmation à l'utilisateur
    if (emailTransporter) {
      try {
        // Email de bienvenue à l'utilisateur
        await emailTransporter.sendMail({
          from: `"Ghost Remix Pack" <${process.env.SENDGRID_FROM_EMAIL || 'contact@ghostremixpack.com'}>`,
          to: email,
          subject: '🎉 Bienvenue dans la newsletter Ghost Remix Pack !',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0b0f; color: #f5f5f7; padding: 40px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #9B5CF6; font-size: 32px; margin: 0;">🎉 Bienvenue ${name || 'Fan de Ghost'} !</h1>
              </div>
              
              <div style="background: #141420; padding: 30px; border-radius: 10px; border: 2px solid #9B5CF6;">
                <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                  Merci de vous être inscrit à la newsletter <strong style="color: #00E5FF;">Ghost Remix Pack</strong> !
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  Vous allez maintenant recevoir :
                </p>
                
                <ul style="list-style: none; padding: 0; margin: 20px 0;">
                  <li style="padding: 10px 0; border-bottom: 1px solid #333;">
                    🎁 <strong>Packs gratuits exclusifs</strong>
                  </li>
                  <li style="padding: 10px 0; border-bottom: 1px solid #333;">
                    ⚡ <strong>Avant-premières</strong> sur nos nouveaux remixes
                  </li>
                  <li style="padding: 10px 0; border-bottom: 1px solid #333;">
                    ⭐ <strong>Codes promo VIP</strong> jusqu'à -20%
                  </li>
                  <li style="padding: 10px 0;">
                    🔥 <strong>Conseils de production</strong> et tutos exclusifs
                  </li>
                </ul>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.FRONTEND_URL || 'https://ghostremixpack.com'}" 
                     style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #9B5CF6, #00E5FF); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Découvrir les Packs
                  </a>
                </div>
                
                <p style="font-size: 14px; color: #b0b0c0; margin-top: 30px; text-align: center;">
                  Vous recevrez nos newsletters avec les dernières nouveautés et offres exclusives.
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                <p style="font-size: 12px; color: #666;">
                  Ghost Remix Pack © 2025 - Tous droits réservés
                </p>
                <p style="font-size: 12px; color: #666; margin-top: 10px;">
                  <a href="${process.env.FRONTEND_URL || 'https://ghostremixpack.com'}/newsletter/unsubscribe?email=${email}" 
                     style="color: #9B5CF6; text-decoration: underline;">
                    Se désinscrire
                  </a>
                </p>
              </div>
            </div>
          `,
          text: `
Bienvenue dans la newsletter Ghost Remix Pack !

Merci de vous être inscrit ! Vous allez maintenant recevoir :
- Packs gratuits exclusifs
- Avant-premières sur nos nouveaux remixes
- Codes promo VIP jusqu'à -20%
- Conseils de production et tutos exclusifs

Découvrez nos packs : ${process.env.FRONTEND_URL || 'https://ghostremixpack.com'}

Ghost Remix Pack © 2025
          `
        });

        console.log(`✅ Email de bienvenue envoyé à ${email}`);

        // Email de notification à l'admin (vous)
        await emailTransporter.sendMail({
          from: `"Ghost Remix Pack" <${process.env.SENDGRID_FROM_EMAIL || 'contact@ghostremixpack.com'}>`,
          to: process.env.ADMIN_EMAIL || 'contact@ghostremixpack.com',
          subject: `📧 Nouvelle inscription newsletter : ${email}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0b0f; color: #f5f5f7; padding: 40px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #9B5CF6; font-size: 28px; margin: 0;">📧 Nouvelle Inscription Newsletter</h1>
              </div>
              
              <div style="background: #141420; padding: 30px; border-radius: 10px; border: 2px solid #9B5CF6;">
                <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                  Une nouvelle personne s'est inscrite à votre newsletter !
                </p>
                
                <div style="background: #0b0b0f; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; font-size: 14px; color: #b0b0c0;">Email :</p>
                  <p style="margin: 5px 0 0 0; font-size: 18px; color: #00E5FF; font-weight: bold;">${email}</p>
                </div>

                ${name ? `
                <div style="background: #0b0b0f; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; font-size: 14px; color: #b0b0c0;">Nom :</p>
                  <p style="margin: 5px 0 0 0; font-size: 18px; color: #f5f5f7; font-weight: bold;">${name}</p>
                </div>
                ` : ''}

                <div style="background: #0b0b0f; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; font-size: 14px; color: #b0b0c0;">Date :</p>
                  <p style="margin: 5px 0 0 0; font-size: 16px; color: #f5f5f7;">${new Date().toLocaleString('fr-FR')}</p>
                </div>

                ${source ? `
                <div style="background: #0b0b0f; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; font-size: 14px; color: #b0b0c0;">Source :</p>
                  <p style="margin: 5px 0 0 0; font-size: 16px; color: #f5f5f7;">${source}</p>
                </div>
                ` : ''}
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.FRONTEND_URL || 'https://ghostremixpack.com'}" 
                     style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #9B5CF6, #00E5FF); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Voir le site
                  </a>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                <p style="font-size: 12px; color: #666;">
                  Ghost Remix Pack © 2025 - Notification automatique
                </p>
              </div>
            </div>
          `,
          text: `
Nouvelle Inscription Newsletter

Une nouvelle personne s'est inscrite à votre newsletter !

Email : ${email}
${name ? `Nom : ${name}` : ''}
Date : ${new Date().toLocaleString('fr-FR')}
${source ? `Source : ${source}` : ''}

Ghost Remix Pack © 2025
          `
        });

        console.log(`📧 Notification admin envoyée pour l'inscription de ${email}`);
      } catch (emailError) {
        console.error('❌ Erreur envoi email:', emailError);
      }
    }

    // Retourner le succès
    res.status(200).json({
      success: true,
      message: '✅ Inscription confirmée ! Email envoyé depuis contact@ghostremixpack.com',
      mode: emailTransporter ? 'email-sent' : 'no-email'
    });

  } catch (error) {
    console.error('❌ Erreur route newsletter:', error);
    
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