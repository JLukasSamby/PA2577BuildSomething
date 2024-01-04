const axios = require('axios');

// Sample verification service URL (replace it with the actual URL)
const VERIFICATION_SERVICE_URL = process.env.VERIFICATION_SERVICE_URL || 'http://localhost:4000/verify-token';

const verifyToken = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.session.token;

    if (!token) {
      throw new Error('Unauthorized - Token missing');
    }

    // Log the token for debugging
    console.log('Token:', token);

    // Make a request to the verification service to verify the token
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const verificationResponse = await axios.get(VERIFICATION_SERVICE_URL, {
      withCredentials: false,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Log the verification response for debugging
    console.log('Verification Response:', verificationResponse.data);

    // If verification is successful, attach user information to the request object
    req.user = verificationResponse.data;

    next();
  } catch (error) {
    // Log the error for debugging
    console.error('Error:', error.message);

    // Handle errors from the verification service or other errors
    return res.redirect('/');
  }
};


module.exports = verifyToken;
