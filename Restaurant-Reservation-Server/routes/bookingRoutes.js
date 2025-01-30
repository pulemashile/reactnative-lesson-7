const express = require('express');
const router = express.Router();
const { createBooking, updateBookingStatus } = require('../controllers/bookingController');

// Route to create booking
router.post('/booking', createBooking);

// Route to update booking status and paymentId (after payment)
router.put('/booking/update', updateBookingStatus);

module.exports = router;
