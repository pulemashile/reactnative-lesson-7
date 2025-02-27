const Restaurant = require("../models/restaurantModel");

// Function to create a default restaurant if none exist
exports.createDefaultRestaurant = async (req, res) => {
    console.log("attemp create default")
    try {
      const count = await Restaurant.countDocuments();
      if (count === 0) 
      {
        const defaultRestaurant = new Restaurant({
          name: "Vault 101 Diner",
          description: "A classic American diner in the post-apocalyptic world.",
          location: "Vault 101, Wasteland",
          address: "Somewhere underground, USA",
          cuisine: "American",
          rating: 4.5,
          image: "https://example.com/vault101.jpg",
          isAvailable: true,
          gallery: [
            "https://example.com/diner1.jpg",
            "https://example.com/diner2.jpg"
          ],
          menu: [
            {
              images: ["https://example.com/burger.jpg"],
              name: "Radroach Burger",
              description: "A juicy burger made with the finest wasteland ingredients.",
              price: 10.99
            },
            {
              images: ["https://example.com/soda.jpg"],
              name: "Nuka-Cola",
              description: "A refreshing post-apocalyptic soda.",
              price: 2.99
            }
          ],
          openingHours: {
            mondayToFriday: "9:00 AM - 9:00 PM",
            saturday: "10:00 AM - 10:00 PM",
            sunday: "Closed"
          },
          availableSlots: {
            "2025-02-16": ["12:00 PM", "6:00 PM"],
            "2025-02-17": ["1:00 PM", "7:00 PM"]
          },
          reviews: [
            {
              user: "Lone Wanderer",
              rating: 5,
              review: "Best food in the Wasteland!"
            },
            {
              user: "Vault Dweller",
              rating: 4,
              review: "Great service, but the Radroach Burger was a bit too real."
            }
          ],
          contactUs: "vault101@falloutdiner.com",
          readMore: "Visit our secret underground location for a meal you'll never forget.",
          owner: {
            profileImg: "https://example.com/owner.jpg",
            name: "Mr. Handy",
            position: "Restaurant Manager"
          }
        });
  
        await defaultRestaurant.save();
        return res.status(201).json({ message: "✅ Default restaurant added!", restaurant: defaultRestaurant });
      } else {
        return res.status(200).json({ message: "⚡ Restaurants already exist, skipping default restaurant creation." });
      }
    } catch (error) {
      console.error("❌ Error creating default restaurant:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

// Fetch all restaurants
exports.getAllRestaurants = async (req, res) => {
  try 
  {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } 
  catch (error) {  res.status(500).json({ message: "Server error", error }); }
};

// Fetch a single restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try 
    {
      const restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
      res.status(200).json(restaurant);
    } 
    catch (error) { res.status(500).json({ message: "Server error", error }); }
};

// Add a new restaurant
exports.createRestaurant = async (req, res) => {
  console.log("Add|Create Restaurant");  
  try 
  {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json({ message: "Restaurant added successfully", restaurant: newRestaurant });
  } 
  catch (error) { res.status(500).json({ message: "Failed to add restaurant", error }); }
};

// Update an existing restaurant
exports.updateRestaurant = async (req, res) => {
  try 
  {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRestaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json({ message: "Restaurant updated", restaurant: updatedRestaurant });
  } 
  catch (error) { res.status(500).json({ message: "Failed to update restaurant", error }); }
};

// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete restaurant", error });
  }
};


exports.removeSlot = async (req, res) => {
  console.log("Attempting to remove slot...");

  const restaurantId = req.params.id; // Using ID from params
  const { date, time, tableId } = req.body;
  

  try {
      // Convert date to "YYYY-MM-DD" format
      const formattedDate = new Date(date).toISOString().split('T')[0];

      // Find the restaurant by ID
      const restaurant = await Restaurant.findById(restaurantId);

      if (!restaurant) { return res.status(404).json({ message: "Restaurant not found" }); }
      console.log("Restaurant found:", restaurant);

      // Ensure availableSlots exists
      if (!restaurant.availableSlots || 
          !restaurant.availableSlots[formattedDate] || 
          !restaurant.availableSlots[formattedDate][time]) {
          return res.status(400).json({ message: "Time slot not available for the specified date" });
      }
      console.log("Available Slots for", formattedDate, time, ":", restaurant.availableSlots[formattedDate][time]);

      // Find and remove the table from the slot
      const slot = restaurant.availableSlots[formattedDate][time];
      const tableIndex = slot.indexOf(tableId);

      console.log("Table Index:", tableIndex);
      console.log("Table to remove:", tableId);

      if (tableIndex === -1) { return res.status(400).json({ message: "Table not available for booking" }); }

      slot.splice(tableIndex, 1); // Remove the table
      console.log("Updated Slots:", restaurant.availableSlots[formattedDate][time]);

      // Clean up: If no tables left, remove the time slot
      /*if (slot.length === 0) 
      {
          delete restaurant.availableSlots[formattedDate][time];

          // If no more time slots exist for the date, remove the date
          if (Object.keys(restaurant.availableSlots[formattedDate]).length === 0) {
              delete restaurant.availableSlots[formattedDate];
          }
      }*/

      // Force Mongoose to recognize the update
      restaurant.markModified(`availableSlots.${formattedDate}.${time}`);

      // Save updated restaurant document
      await restaurant.save();
      console.log("Restaurant saved successfully");

      res.status(200).json({ message: "Table removed from available slots" });

  } catch (error) {
      console.error("Error removing slot:", error);
      res.status(500).json({ message: "Server error" });
  }
};

exports.addSlot = async (req, res) => {
  console.log("🔄 Attempting to add a slot...");

  const { restaurantId } = req.params;
  const { date, time, tableId } = req.body;

  try 
  {
    const formattedDate = new Date(date).toISOString().split("T")[0]; // Ensure YYYY-MM-DD format
    
    // Find the restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Ensure the date exists in availableSlots
    if (!restaurant.availableSlots[formattedDate]) {
        restaurant.availableSlots[formattedDate] = {};
    }

    // Ensure the time slot exists
    if (!restaurant.availableSlots[formattedDate][time]) {
        restaurant.availableSlots[formattedDate][time] = [];
    }

    // Add table only if it’s not already available
    if (!restaurant.availableSlots[formattedDate][time].includes(tableId)) {
        restaurant.availableSlots[formattedDate][time].push(tableId);
    } else {
        return res.status(400).json({ message: "Table is already available in this slot" });
    }

    restaurant.markModified("availableSlots"); // Force Mongoose to detect changes
    await restaurant.save();

    res.status(200).json({ message: "Table added to the available slots", updatedSlots: restaurant.availableSlots[formattedDate][time] });
  } 
  catch (error) 
  {
    console.error("Error adding slot:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the restaurant by ID and return only the availableSlots field
    const restaurant = await Restaurant.findById(id).select("availableSlots");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json({ availableSlots: restaurant.availableSlots });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
