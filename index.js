const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "randomanything";
const auth = require('./auth'); // Correctly import auth middleware
const app = express();
const users = [];

// Middleware to parse JSON payloads
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Sign up route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password }); // Store user credentials
  res.json({ message: "User registered successfully" });
  console.log(users); // Check stored users
});

// Sign in route
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  let founduser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      founduser = users[i];
    }
  }

  if (!founduser) {
    res.json({
      message: "Credentials incorrect"
    });
    return;
  } else {
    const token = jwt.sign({
      username: founduser.username  // Ensure you're passing the correct user
    }, JWT_SECRET);

    res.header("jwt", token);
    res.header("random", "oldskoolmoron");
    res.json({
      token: token
    });
  }
});


// Protected route
// Assuming you're storing users in an array and you can find them by their username
app.get('/me', auth, (req, res) => {
  const user = users.find(u => u.username === req.user.username);
  
  if (user) {
    res.json({
      message: "This is protected data for logged-in users only",
      username: user.username,
      password: user.password  // Send password for display (not recommended for production)
    });
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }
});





// Start server
app.listen(3002, () => {
  console.log("server is running on port 3002");
});
