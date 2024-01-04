const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET route for user update form
router.get('/', (req, res) => {
  res.render('update', { userId: req.session.loggedInUser._id });
});

// POST route for updating a user
router.post('/', async (req, res) => {
  try {
    // profile the existing user
    const existingUser = await User.findById(req.session.loggedInUser._id);

    // Update only the fields that have changed
    if (req.body.username && req.body.username !== existingUser.username) {
      existingUser.username = req.body.username;
    }
    if (req.body.name && req.body.name !== existingUser.name) {
      existingUser.name = req.body.name;
    }
    if (req.body.email && req.body.email !== existingUser.email) {
      existingUser.email = req.body.email;
    }
    if (req.body.password && req.body.password !== existingUser.password) {
      existingUser.password = req.body.password;
    }

    // Save the updated user
    const updatedUser = await existingUser.save();

    // Update the session if the username is changed
    if (req.body.username) {
      req.session.loggedInUser.username = req.body.username;
    }

    // Redirect to the home page
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
