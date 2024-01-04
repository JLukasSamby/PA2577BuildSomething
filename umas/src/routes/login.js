const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// GET route for user login form
router.get('/', (req, res) => {
  res.render('login');
});

// POST route for user login
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    // Store user information in session
    req.session.loggedInUser = {
      _id: user._id,
      username: user.username,
    };

    // Update logged in status
    req.session.isLoggedIn = true;

    // Assuming authentication is successful, generate a token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    // Include the token in the session for later use
    req.session.token = token;

    // Redirect to the home page
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
