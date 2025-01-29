const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to create PayPal order
router.post('/create-order', paymentController.createOrder);

// Route to capture PayPal payment
router.post('/capture-payment', paymentController.capturePayment);

module.exports = router;
