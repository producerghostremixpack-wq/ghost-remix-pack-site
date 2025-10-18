import bcrypt from 'bcrypt';
import * as userService from '../services/user-service.js';
import { NotFoundError, ConflictError, ValidationError } from '../middlewares/error-handler.js';

/**
 * @desc    Récupérer la liste des utilisateurs avec pagination
 * @route   GET /api/users
 * @access  Private (Admin)
 */
export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const result = await userService.getAllUsers(page, limit);
    
    res.json({
      success: true,
      data: result.users,
      pagination: result.pagination,
      message: 'Utilisateurs récupérés avec succès'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Récupérer un utilisateur par son ID
 * @route   GET /api/users/:id
 * @access  Private
 */
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const user = await userService.getUserById(id);
    
    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé');
    }
    
    res.json({
      success: true,
      data: user,
      message: 'Utilisateur récupéré avec succès'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Créer un nouvel utilisateur
 * @route   POST /api/users
 * @access  Public
 */
export const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    
    // Vérifier si l'email existe déjà
    const existingUser = await userService.getUserByEmail(userData.email);
    if (existingUser) {
      throw new ConflictError('Cet email est déjà utilisé');
    }
    
    // Créer l'utilisateur
    const result = await userService.createUser(userData);
    
    res.status(201).json({
      success: true,
      data: {
        user: result.user,
        token: result.token
      },
      message: 'Utilisateur créé avec succès'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mettre à jour un utilisateur
 * @route   PUT /api/users/:id
 * @access  Private
 */
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Vérifier que l'utilisateur existe
    const user = await userService.getUserById(id);
    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé');
    }
    
    // Vérifier les permissions (admin ou propriétaire)
    if (req.user.role !== 'admin' && req.user.id !== id) {
      throw new ForbiddenError('Vous n\'avez pas les permissions pour modifier cet utilisateur');
    }
    
    // Mettre à jour l'utilisateur
    const updatedUser = await userService.updateUser(id, updateData);
    
    res.json({
      success: true,
      data: updatedUser,
      message: 'Utilisateur mis à jour avec succès'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Supprimer un utilisateur
 * @route   DELETE /api/users/:id
 * @access  Private (Admin)
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Vérifier que l'utilisateur existe
    const user = await userService.getUserById(id);
    if (!user) {
      throw new NotFoundError('Utilisateur non trouvé');
    }
    
    // Supprimer l'utilisateur
    await userService.deleteUser(id);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
