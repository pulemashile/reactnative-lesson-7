const express = require('express');
const router = express.Router();
const { 
    createBooking, 
    updateBookingStatus, 
    getBookingsByEmail, 
    getAllBookings, 
    getBookingsByDate
} = require('../controllers/bookingController');

// Route to create booking
router.post('/booking', createBooking);

// Route to update booking status and paymentId (after payment)
router.put('/booking/update', updateBookingStatus);

// Route to get bookings by user's email
router.get('/bookings', getBookingsByEmail);
router.get('/all-bookings', getAllBookings);
router.get('/bookings/date', getBookingsByDate);

module.exports = router;
