import jwt from 'jsonwebtoken';
import { UnauthorizedError } from './error-handler.js';

/**
 * Middleware d'authentification JWT
 * Vérifie la présence et la validité du token
 * 
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
export const authenticateToken = (req, res, next) => {
  try {
    // Récupérer le token depuis le header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      throw new UnauthorizedError('Token d\'authentification manquant');
    }

    // Vérifier et décoder le token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET non configuré');
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Ajouter les infos utilisateur à la requête
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('Token invalide'));
    } else if (error.name === 'TokenExpiredError') {
      next(new UnauthorizedError('Token expiré'));
    } else {
      next(error);
    }
  }
};

/**
 * Middleware pour vérifier les rôles utilisateur
 * 
 * @param {...string} allowedRoles - Rôles autorisés
 * @returns {Function} Middleware Express
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('Utilisateur non authentifié'));
    }

    const userRole = req.user.role || 'user';

    if (!allowedRoles.includes(userRole)) {
      return next(new ForbiddenError('Accès interdit - Rôle insuffisant'));
    }

    next();
  };
};
