const express = require('express');
const router = express.Router();

const { signup, login, me } = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth');
const { validateSignup, validateLogin } = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimit');

router.post('/signup', authLimiter, validateSignup, signup);
router.post('/login', authLimiter, validateLogin, login);
router.get('/me', requireAuth, me);

module.exports = router;
