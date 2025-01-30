const express = require('express');
const router = express.Router();
const { createPayment, paymentSuccess, paymentCancel } = require('../controllers/paymentController');

router.post('/payment', createPayment);
router.get('/payment/success', paymentSuccess);
router.get('/payment/cancel', paymentCancel);

module.exports = router;
