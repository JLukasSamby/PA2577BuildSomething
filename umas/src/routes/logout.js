const express = require('express');
const router = express.Router();

// POST route for user logout
router.post('/', (req, res) => {
  // Clear the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    // Redirect to the home page after logout
    res.redirect('/');
  });
});

module.exports = router;
