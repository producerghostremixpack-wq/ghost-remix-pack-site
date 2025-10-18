import express from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/auth-middleware.js';
import { validateCreateUser, validateUpdateUser, validationMiddleware } from '../validators/user-validator.js';
import * as userController from '../controllers/user-controller.js';

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Récupérer la liste des utilisateurs (avec pagination)
 * @access  Private (Admin uniquement)
 */
router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  userController.getUsers
);

/**
 * @route   GET /api/users/:id
 * @desc    Récupérer un utilisateur par son ID
 * @access  Private
 */
router.get(
  '/:id',
  authenticateToken,
  userController.getUserById
);

/**
 * @route   POST /api/users
 * @desc    Créer un nouvel utilisateur
 * @access  Public
 */
router.post(
  '/',
  validateCreateUser,
  validationMiddleware,
  userController.createUser
);

/**
 * @route   PUT /api/users/:id
 * @desc    Mettre à jour un utilisateur
 * @access  Private
 */
router.put(
  '/:id',
  authenticateToken,
  validateUpdateUser,
  validationMiddleware,
  userController.updateUser
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Supprimer un utilisateur
 * @access  Private (Admin uniquement)
 */
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  userController.deleteUser
);

export default router;
