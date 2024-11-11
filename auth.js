// auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = "randomanything";

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded info to the req for use in other handlers
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token!" });
  }
}

module.exports = auth;
