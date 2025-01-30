const Booking = require('../models/bookingModel');

// Handle booking creation
exports.createBooking = async (req, res) => {
  const { guestName, email, phone, guestCount, mealType, date, time, notes, specialRequest, totalPrice } = req.body;

  console.log("Attempt to create booking!!");

  try {
    // Create a new booking with the status set as "Pending"
    const newBooking = new Booking({
      guestName,
      email,
      phone,
      guestCount,
      mealType,
      date,
      time,
      notes,
      specialRequest,
      totalPrice,
      status: 'Pending',  // Set status to "Pending" initially
    });

    // Save the booking to the database
    await newBooking.save();

    // Respond with success
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Handle updating booking status and paymentId (called after successful payment)
exports.updateBookingStatus = async (req, res) => {
  const { bookingId, paymentId, status } = req.body;

  try {
    // Find and update the booking with the paymentId and status
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentId, status },  // Update the paymentId and status (e.g., "Paid")
      { new: true }  // Return the updated booking document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};
