const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'restaurants_reservation_2025'; // Store this securely in environment variables




router.post("/admin-login ", async (req, res) => {
  try 
  {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });

      if (!admin || !(await admin.comparePassword(password))) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      // Run slot cleanup before responding
      await cleanupAndUpdateSlots();

      res.json({ message: "Login successful", token: generateToken(admin._id) });
  } 
  catch (error) { res.status(500).json({ message: "Server error" }); }
});


// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  

  try {
    const userExists = await User.findOne({ email });
    if (userExists) 
    {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      message: 'User created successfully',
      token,     
    });
  } 
  catch (err) 
  {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) 
    {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      message: 'Signin successful',
      token,
      username: user.username
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
