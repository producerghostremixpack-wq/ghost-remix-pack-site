import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userService from '../services/user-service.js';
import { UnauthorizedError, ConflictError } from '../middlewares/error-handler.js';

/**
 * @desc    Connexion utilisateur
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validation basique
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email et mot de passe requis'
        }
      });
    }
    
    // Récupérer l'utilisateur
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Email ou mot de passe incorrect');
    }
    
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Email ou mot de passe incorrect');
    }
    
    // Générer le token JWT
    const token = generateToken(user);
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
          role: user.role
        },
        token
      },
      message: 'Connexion réussie'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Inscription utilisateur
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, nom, prenom } = req.body;
    
    // Validation basique
    if (!email || !password || !nom) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email, mot de passe et nom requis'
        }
      });
    }
    
    // Vérifier si l'email existe déjà
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      throw new ConflictError('Cet email est déjà utilisé');
    }
    
    // Créer l'utilisateur
    const result = await userService.createUser({
      email,
      password,
      nom,
      prenom,
      role: 'user'
    });
    
    res.status(201).json({
      success: true,
      data: {
        user: result.user,
        token: result.token
      },
      message: 'Inscription réussie'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Récupérer les infos de l'utilisateur connecté
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const user = await userService.getUserById(userId);
    
    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé');
    }
    
    res.json({
      success: true,
      data: user,
      message: 'Informations utilisateur récupérées'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Générer un token JWT
 * 
 * @param {Object} user - Utilisateur
 * @returns {string} Token JWT
 */
const generateToken = (user) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
  
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET non configuré');
  }
  
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
