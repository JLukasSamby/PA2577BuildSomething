const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// GET route for user creation form
router.get('/', (req, res) => {
  res.render('register');
});

// POST route for creating a user
router.post('/', async (req, res) => {
  try {
    // Check uniqueness of email
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.render('register', { error: 'Email already in use' });
    }

    // Check uniqueness of username
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) {
      return res.render('register', { error: 'Username already exists' });
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user instance
    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    const user = await User.findOne({ _id: newUser._id });
    // Store user information in session
    req.session.loggedInUser = {
      _id: user._id,
      username: user.username,
    };

    res.status(201).redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
