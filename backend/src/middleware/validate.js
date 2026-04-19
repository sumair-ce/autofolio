const validatePortfolio = (req, res, next) => {
  const { name, template_id } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res
      .status(400)
      .json({ success: false, error: '"name" is required and must be at least 2 characters' });
  }

  if (![1, 2, 3].includes(Number(template_id))) {
    return res
      .status(400)
      .json({ success: false, error: '"template_id" must be 1, 2, or 3' });
  }

  next();
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: '"name" is required and must be at least 2 characters' });
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email.trim().toLowerCase())) {
    return res.status(400).json({ success: false, error: '"email" must be a valid email address' });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ success: false, error: '"password" must be at least 8 characters' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !isValidEmail(email.trim().toLowerCase())) {
    return res.status(400).json({ success: false, error: '"email" must be a valid email address' });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ success: false, error: '"password" is required' });
  }

  next();
};

module.exports = { validatePortfolio, validateSignup, validateLogin };
