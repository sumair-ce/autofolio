const jwt = require('jsonwebtoken');

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    const err = new Error('JWT_SECRET is not configured');
    err.status = 500;
    throw err;
  }

  return process.env.JWT_SECRET;
};

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    const token = authHeader.slice(7).trim();
    const decoded = jwt.verify(token, getJwtSecret());

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
    };

    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, error: 'Invalid or expired token' });
    }

    next(err);
  }
};

module.exports = { requireAuth, getJwtSecret };
