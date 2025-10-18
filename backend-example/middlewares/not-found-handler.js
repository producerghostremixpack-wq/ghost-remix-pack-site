/**
 * Middleware pour gérer les routes non trouvées (404)
 * 
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Route ${req.method} ${req.url} non trouvée`,
      availableEndpoints: {
        health: 'GET /api/health',
        users: 'GET /api/users',
        auth: 'POST /api/auth/login',
        contact: 'POST /api/contact'
      }
    }
  });
};
