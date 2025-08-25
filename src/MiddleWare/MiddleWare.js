

/**
 * Middleware to protect routes with JWT authentication
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @param {Function} next - Callback to proceed to the next middleware
 * @param {Array} allowedRoles
 */
const { TOKENTYPE, ROLE } = require('../JWT Service/Enums');
const jwtService = require('../JWT Service/JwtService');
const toGentrateRefreshToken = require('../Service/RefreshTokenService');

const authenticate = (req, res, next) => {
    // const token = req.headers['authorization'];
   
const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('token ')
    ? authHeader.split(' ')[1]
    : null;
     console.log(token,"token")
    if (!token) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

      try {
        const decoded = jwtService.verifyToken(token);
        console.log(decoded,"Decodew")
        
                if (decoded) {
                    req.user = decoded;
                    return next();
                } else {
                    return res.status(403).json({ error: 'Forbidden: Invalid token' });
                }
         
           
           


    } catch (error) {
       
        console.error("JWT verification failed:", error);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }

};

module.exports = { authenticate };