const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv');
dotenv.config(); 
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const Booking = require('../models/bookingModel');


console.log("id:",PAYPAL_CLIENT_ID, "secret:", PAYPAL_CLIENT_SECRET);

paypal.configure({
  mode: 'sandbox', // 'sandbox' or 'live'
  client_id: PAYPAL_CLIENT_ID,
  client_secret: PAYPAL_CLIENT_SECRET,
});

// Create payment and return approval URL
exports.createPayment = (req, res) => {
  const { totalPrice, bookingId, description } = req.body;

  const paymentData = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: `http://10.196.0.124:5000/success/bookingId=${bookingId}`,
      cancel_url: 'http://10.196.0.124:5000/cancel',
    },
    transactions: [
      {
        amount: {
          total: totalPrice,
          currency: 'USD',
        },
        description: description,
      },
    ],
  };

  paypal.payment.create(paymentData, async (error, payment) => {
    if (error) 
    {
      console.log(error);
      return res.status(500).json({ message: 'Payment creation failed', error });
    } 
    else 
    {
      // Update booking with paymentId (PayPal Payment ID)
        const paymentId = payment.id;
        const booking = await Booking.findById(bookingId);
        if (booking) 
        {
          await Booking.findByIdAndUpdate(bookingId, { paymentId, status: 'Pending Payment' });
        }
      
            // Send approval URL back to client
        //   for (let i = 0; i < payment.links.length; i++) 
        //   {
        //     if (payment.links[i].rel === 'approval_url') 
        //     {
        //       res.json({ approvalUrl: payment.links[i].href });
        //     }
        //   }

        console.log("payment", payment)
        res.status(200).send(payment);
    }
  });
};

// Handle payment success and update booking status
exports.paymentSuccess = async (req, res) => {
  const { paymentId, PayerID, bookingId } = req.query;

  const executePaymentData = {
    payer_id: PayerID,
  };

  paypal.payment.execute(paymentId, executePaymentData, async (error, payment) => {
    if (error) 
    {
      console.log(error);
      return res.status(500).json({ message: 'Payment execution failed', error });
    } else {
      // Update booking status to "Paid" after successful payment
      await Booking.findByIdAndUpdate(bookingId, { status: 'Paid' });
      res.json({ message: 'Payment successful', payment });
    }
  });
};

// Handle payment cancellation
exports.paymentCancel = (req, res) => {
  res.status(200).json({ message: 'Payment cancelled' });
};
