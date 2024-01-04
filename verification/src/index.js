const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;

// Sample secret key (replace it with your actual secret key)
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

app.use(bodyParser.json());  // Parse JSON bodies

// Middleware for token verification
app.get('/', (req, res) => {
    console.log("VERIFICATION TIME!");
  
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];
  
    if (!token) {
      console.log("Token missing");
      return res.status(401).json({ error: 'Unauthorized - Token missing' });
    }
  
    try {
      // Verify the token using the secret key
      console.log("Token:", token);
      const decoded = jwt.verify(token, SECRET_KEY);
      console.log('Decoded Token:', decoded);
  
      // Include user information in the response
      res.json({ userId: decoded.userId });
    } catch (error) {
      console.log("Invalid token");
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  });
  

// Start the verification service
app.listen(PORT, () => {
  console.log(`Verification service is running on port ${PORT}`);
});
