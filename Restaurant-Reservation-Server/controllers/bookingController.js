const Booking = require('../models/bookingModel');

// Handle booking creation
exports.createBooking = async (req, res) => {
  const { guestName, email, phone, restaurantName, guestCount, mealType, date, time, hoursIn, slots, notes, specialRequest, totalPrice } = req.body;

  console.log("Attempt to create booking!!");

  try {
    // Create a new booking with the status set as "Pending"
    const newBooking = new Booking({
      guestName,
      email,
      phone,
      restaurantName,
      guestCount,
      mealType,
      date,
      time,
      hoursIn,
      slots,
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

  console.log(req.body); 

  try 
  {
    // Find and update the booking with the paymentId and status
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentId, status },  // Update the paymentId and status (e.g., "Paid")
      { new: true }  // Return the updated booking document
    );

    if (!updatedBooking) 
    {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};

// Controller function to get bookings by user's email
exports.getBookingsByEmail = async (req, res) => {
  try {
    const email = req.query.email; // Extract email from query parameter
    console.log(email)
    if (!email) 
    {
      return res.status(400).json({ message: "Email is required" });
    }

    // Fetch bookings from database where email matches
    const bookings = await Booking.find({ email: email });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this email" });
    }

    // Send the bookings in the response
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to get bookings by user's email or all bookings
exports.getAllBookings = async (req, res) => {
  try {
    // Extract email from query parameter
    const email = req.query.email; 
    
    // If email is provided, fetch bookings by email; else, fetch all bookings
    let bookings;
    if (email) {
      bookings = await Booking.find({ email: email });  // Fetch bookings by email
    } else {
      bookings = await Booking.find();  // Fetch all bookings if no email is provided
    }

    // If no bookings are found, return an appropriate response
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    // Send the bookings in the response
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get bookings for a specific date range (today, upcoming, custom)
exports.getBookingsByDate = async (req, res) => {
  try {
    const { from } = req.query; // Get "from" date from query params
    console.log("From: ",from);
    

    // Default: Fetch bookings from today onwards
    let startDate = from ? new Date(from) : new Date();
    startDate.setHours(0, 0, 0, 0); // Start of the day

    // Fetch all bookings from startDate onwards
    const bookings = await Booking.find({ date: { $gte: startDate } }).sort({ date: 1 }); // Sort by date (oldest first)

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};