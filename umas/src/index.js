const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const verifyToken = require('./middleware/verifyToken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(bodyParser.json());  // Parse JSON bodies
app.use(session({
  secret: 'your-secret-key', // Replace with a secure secret key
  resave: false,
  saveUninitialized: true,
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  next();
});
app.use(express.static('./src/public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Routes
const registerRoute = require('./routes/register');
const profileRoute = require('./routes/profile');
const updateRoute = require('./routes/update');
const deleteRoute = require('./routes/delete');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const homeRoute = require('./routes/home');

app.use('/register', registerRoute);
app.use('/profile', verifyToken, profileRoute);
app.use('/update', verifyToken, updateRoute);
app.use('/delete', verifyToken, deleteRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/', homeRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/go', (req, res) => {
  res.render('go', { goServiceUrl: process.env.GO_SERVICE_URL || "http://localhost:3000"});
});