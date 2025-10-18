/**
 * @desc    Envoyer un message de contact
 * @route   POST /api/contact
 * @access  Public
 */
export const sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validation basique
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Tous les champs sont requis'
        }
      });
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Format d\'email invalide'
        }
      });
    }
    
    // Ici, vous devriez envoyer l'email via Nodemailer + Zimbra OVH
    // Pour cet exemple, on simule juste l'envoi
    console.log('📧 Email de contact reçu:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });
    
    // Simuler l'envoi d'email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès',
      data: {
        email,
        subject,
        sentAt: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};
