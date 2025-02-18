const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
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
  
  status: { 
    type: String, 
    enum: ['prending', 'approved', 'canceled', 'overdue'],
    default: 'Pending' 
  },
  paymentId: String, // PayPal Payment ID
  notification_status: {
    adminSeen: { type: Boolean, default: false },
    guestNotified: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
