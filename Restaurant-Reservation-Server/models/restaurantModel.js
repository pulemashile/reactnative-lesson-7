const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  images: [String],
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true }
});

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: { type: Number, min: 1, max: 5 },
  review: String
});

const ownerSchema = new mongoose.Schema({
  profileImg: String,
  name: String,
  position: String
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,  
  address: String,
  cuisine: { type: String, required: true },  // Added cuisine field
  rating: { type: Number, default: 0, min: 0, max: 5 },  // Added rating with default & validation
  image: String,  // Added main image field
  isAvailable: { type: Boolean, default: true },  // Added availability field
  gallery: [String],
  menu: [menuItemSchema],
  openingHours: {
    mondayToFriday: String,
    saturday: String,
    sunday: String
  },
  availableSlots: { type: mongoose.Schema.Types.Mixed, default: {} },
  reviews: [reviewSchema],
  contactUs: String,
  readMore: String,
  owner: ownerSchema
});

const restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = restaurant;
