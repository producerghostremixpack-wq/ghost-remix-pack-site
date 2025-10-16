import express from 'express';
import { sendContactEmail } from '../services/email.js';
import { saveContact } from '../services/firebase.js';

const router = express.Router();

/**
 * POST /api/contact
 * Envoyer un email de contact
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Nom, email et message sont requis' 
      });
    }

    console.log('📧 Nouveau message de contact:', email);

    // Sauvegarder dans Firebase
    const contactId = await saveContact({
      name,
      email,
      subject: subject || 'Contact',
      message,
      timestamp: new Date().toISOString(),
    });
    console.log('✅ Contact sauvegardé:', contactId);

    // Envoyer l'email
    await sendContactEmail({ name, email, subject, message });
    console.log('✅ Email de contact envoyé');

    res.json({ 
      success: true,
      message: 'Message envoyé avec succès',
      contactId
    });

  } catch (error) {
    console.error('❌ Erreur contact:', error.message);
    res.status(500).json({ 
      error: 'Erreur lors de l\'envoi du message',
      message: error.message 
    });
  }
});

export default router;

