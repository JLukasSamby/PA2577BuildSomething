// retrieve.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST route for retrieving a user's profile
router.post('/', async (req, res) => {
  try {
    // Retrieve user data based on the user ID
    const user = await User.findById(req.user.userId);

    // Render the user's profile page
    res.render('profile', { user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
