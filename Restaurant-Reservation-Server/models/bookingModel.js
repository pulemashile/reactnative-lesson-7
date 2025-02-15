const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  guestName: String,
  email: String,
  phone: String,
  restaurantName: String,
  guestCount: Number,
  mealType: String,
  date: Date,
  time: Date,
  hoursIn: Number,
  slots: String,
  notes: String,
  specialRequest: String,
  totalPrice: { type: Number, required: true },
  
  status: { type: String, default: 'Pending' },
  paymentId: String, // PayPal Payment ID
});

module.exports = mongoose.model('Booking', bookingSchema);
