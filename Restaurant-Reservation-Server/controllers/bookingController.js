const { createPaypalOrder, capturePaypalPayment } = require('../utils/paypal');
const Booking = require('../models/booking');
const Payment = require('../models/payment');

exports.createOrder = async (req, res) => {
  const { bookingId, amount } = req.body;
  
  try {
    // Create PayPal order
    const order = await createPaypalOrder(amount);
    
    // Save booking with "Pending" status
    const booking = await Booking.findByIdAndUpdate(bookingId, { status: 'Pending' });

    res.json({ orderId: order.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating PayPal order');
  }
};

exports.capturePayment = async (req, res) => {
  const { orderId, payerId, bookingId } = req.body;
  
  try {
    // Capture payment
    const paymentData = await capturePaypalPayment(orderId, payerId);
    
    // Save payment data to MongoDB
    const payment = new Payment({
      bookingId,
      paymentAmount: paymentData.purchase_units[0].amount.value,
      paymentStatus: 'Completed',
      paypalPaymentId: paymentData.id,
    });
    
    await payment.save();
    
    // Update booking status to "Paid"
    await Booking.findByIdAndUpdate(bookingId, { status: 'Paid' });
    
    res.json({ status: 'Payment successful', payment });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error capturing PayPal payment');
  }
};
