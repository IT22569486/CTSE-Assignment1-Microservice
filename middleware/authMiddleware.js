const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || process.env.AUTH_JWT_SECRET || process.env.ACCESS_TOKEN_SECRET;

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  return req.headers['x-auth-token'] || req.headers.token || null;
};

const protect = (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  if (!JWT_SECRET) {
    console.error('JWT secret not configured on this service');
    return res.status(500).json({ message: 'Authentication secret is not configured' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      _id: decoded.id,
      role: decoded.role || 'customer',
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = { protect, adminOnly };
