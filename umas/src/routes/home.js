const express = require('express');
const router = express.Router();

// GET route for user login form
router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router;
