const jwt = require('jsonwebtoken');

function secret() {
  return process.env.JWT_SECRET || 'dev-secret-change-me';
}

function sign(payload) {
  return jwt.sign(payload, secret(), { expiresIn: '7d' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secret());
  } catch (err) {
    return null;
  }
}

function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const payload = token ? verifyToken(token) : null;
  if (!payload) return res.status(401).json({ error: 'Unauthorized' });
  req.user = payload;
  next();
}

module.exports = { sign, verifyToken, requireAuth };
