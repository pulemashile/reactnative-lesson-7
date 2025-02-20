const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require("node-cron");
const axios = require('axios');

const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/auth');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

 // Load environment variables
dotenv.config(); 
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());  // Middleware for parsing JSON
app.use(cors());  // Enable cross-origin requests

console.log(process.env.MONGODB_URI, "",process.env.PORT);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Auth Routes
app.use('/api/auth', authRoutes);
// Protected Route 
app.get('/api/profile', protect, (req, res) => {
  res.json({ message: 'This is a protected route' });
});


// restaurant API routes
app.use("/api/restaurants", restaurantRoutes);

cron.schedule('0 0 * * *', async () => {
    try 
    {
      console.log('Running cron job: Refreshing slots...');
      // Make a POST request to the refresh_slots endpoint
      await axios.post('https://reactnative-lesson-7.onrender.com/api/restaurants/refresh_slots');
      console.log('Slots refreshed successfully.');
    } 
    catch (error) { console.error('Error refreshing slots:', error); }
});

// Payment API routes
app.use('/api', bookingRoutes);
app.use('/api', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
