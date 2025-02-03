const jwt = require('jsonwebtoken');
const JWT_SECRET = 'restaurants_reservation_2025'; // Make sure to use environment variables for this

const protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Bearer token

  if (!token) 
  {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try 
  {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id; // Store user ID in request
    next();
  }
  catch (err) 
  {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;
