import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Base de données simulée (à remplacer par une vraie DB)
let users = [
  {
    id: '1',
    email: 'admin@ghostremixpack.com',
    password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqJQ8v6p5u', // password: Admin123!
    nom: 'Admin',
    prenom: 'Ghost',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

/**
 * Récupérer tous les utilisateurs avec pagination
 * 
 * @param {number} page - Numéro de page
 * @param {number} limit - Nombre d'éléments par page
 * @returns {Promise<Object>} Liste des utilisateurs et infos de pagination
 */
export const getAllUsers = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  
  const paginatedUsers = users.slice(offset, offset + limit);
  
  // Ne pas retourner les mots de passe
  const usersWithoutPassword = paginatedUsers.map(({ password, ...user }) => user);
  
  return {
    users: usersWithoutPassword,
    pagination: {
      page,
      limit,
      total: users.length,
      totalPages: Math.ceil(users.length / limit)
    }
  };
};

/**
 * Récupérer un utilisateur par son ID
 * 
 * @param {string} id - ID de l'utilisateur
 * @returns {Promise<Object|null>} Utilisateur ou null
 */
export const getUserById = async (id) => {
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return null;
  }
  
  // Ne pas retourner le mot de passe
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Récupérer un utilisateur par son email
 * 
 * @param {string} email - Email de l'utilisateur
 * @returns {Promise<Object|null>} Utilisateur ou null
 */
export const getUserByEmail = async (email) => {
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return null;
  }
  
  // Ne pas retourner le mot de passe
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Créer un nouvel utilisateur
 * 
 * @param {Object} userData - Données de l'utilisateur
 * @param {string} userData.email - Email
 * @param {string} userData.password - Mot de passe
 * @param {string} userData.nom - Nom
 * @param {string} userData.prenom - Prénom (optionnel)
 * @param {string} userData.role - Rôle (optionnel, défaut: 'user')
 * @returns {Promise<Object>} Utilisateur créé avec token JWT
 */
export const createUser = async (userData) => {
  // Hash du mot de passe
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  
  // Créer l'utilisateur
  const newUser = {
    id: String(users.length + 1),
    email: userData.email,
    password: hashedPassword,
    nom: userData.nom,
    prenom: userData.prenom || '',
    role: userData.role || 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  users.push(newUser);
  
  // Générer le token JWT
  const token = generateToken(newUser);
  
  // Ne pas retourner le mot de passe
  const { password, ...userWithoutPassword } = newUser;
  
  return {
    user: userWithoutPassword,
    token
  };
};

/**
 * Mettre à jour un utilisateur
 * 
 * @param {string} id - ID de l'utilisateur
 * @param {Object} updateData - Données à mettre à jour
 * @returns {Promise<Object>} Utilisateur mis à jour
 */
export const updateUser = async (id, updateData) => {
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return null;
  }
  
  // Mettre à jour les données
  users[userIndex] = {
    ...users[userIndex],
    ...updateData,
    updatedAt: new Date()
  };
  
  // Ne pas retourner le mot de passe
  const { password, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
};

/**
 * Supprimer un utilisateur
 * 
 * @param {string} id - ID de l'utilisateur
 * @returns {Promise<void>}
 */
export const deleteUser = async (id) => {
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
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
