const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST route for deleting a user
router.post('/:userId', async (req, res) => {
  try {
    // Delete the user by ID
    await User.findByIdAndDelete(req.params.userId);

    // Clear the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      // Redirect to the home page after user deletion
      res.redirect('/');
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
