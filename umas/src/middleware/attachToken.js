// src/middleware/attachToken.js
const attachToken = (req, res, next) => {
  try {
    // Get the token from the session if available
    const token = req.session.token;

    // Attach the token to the Authorization header
    if (token) {
      req.headers['Authorization'] = `Bearer ${token}`;
    } else {
      // Log a warning if no token is found
      console.warn('Warning: No token found in session');
    }

    next();
  } catch (error) {
    // Log any unexpected errors
    console.error('Error in attachToken middleware:', error);

    // Pass the error to the next middleware
    next(error);
  }
};

module.exports = attachToken;
