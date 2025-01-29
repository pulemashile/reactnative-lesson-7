const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());  // Middleware for parsing JSON
app.use(cors());  // Enable cross-origin requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// API routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

module.exports = app;
