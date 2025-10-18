import express from 'express';
import * as contactController from '../controllers/contact-controller.js';

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Envoyer un message de contact
 * @access  Public
 */
router.post('/', contactController.sendContactMessage);

export default router;
