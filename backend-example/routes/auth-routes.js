import express from 'express';
import * as authController from '../controllers/auth-controller.js';

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Connexion utilisateur
 * @access  Public
 */
router.post('/login', authController.login);

/**
 * @route   POST /api/auth/register
 * @desc    Inscription utilisateur
 * @access  Public
 */
router.post('/register', authController.register);

/**
 * @route   GET /api/auth/me
 * @desc    Récupérer les infos de l'utilisateur connecté
 * @access  Private
 */
router.get('/me', authController.getMe);

export default router;
