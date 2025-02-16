const express = require("express");
const router = express.Router();
const { 
    createDefaultRestaurant,    
    createRestaurant, 
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    removeSlot,
    addSlot, 
} = require("../controllers/restaurantController");
const Restaurant = require("../models/restaurantModel");

router.post("/default", createDefaultRestaurant); // Fetch all restaurants
// Function to clean outdated slots and update availability
const cleanupAndUpdateSlots = async () => {
    console.log("Cleaning outdated slots and refreshing availability...");
    const today = new Date().toISOString().split("T")[0];
    console.log(today)
  
    const restaurants = await Restaurant.find();
  
    for (const restaurant of restaurants) 
    {
        // Remove past slots
        Object.keys(restaurant.availableSlots).forEach(date => {
          if (date < today) delete restaurant.availableSlots[date];
        });
  
        restaurant.markModified("availableSlots");
        await restaurant.save();
    }
    console.log("Slots updated successfully.");
};

const updateAvailableSlots = async () => {
    console.log("Running daily slot update...");

    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];

    try {
        const restaurants = await Restaurant.find();

        for (const restaurant of restaurants) {
            console.log(`🔍 Processing ${restaurant.name}`);

            // ✅ Step 1: Remove outdated slots
            Object.keys(restaurant.availableSlots).forEach(date => {
                if (date < formattedToday) {
                    console.log(`🗑️ Removing old slot: ${date}`);
                    delete restaurant.availableSlots[date];
                }
            });

            // ✅ Step 2: Generate slots based on opening & closing time
            for (let i = 0; i < 7; i++) {
                const futureDate = new Date(today);
                futureDate.setDate(today.getDate() + i);
                const formattedFutureDate = futureDate.toISOString().split("T")[0];

                if (!restaurant.availableSlots[formattedFutureDate]) {
                    console.log(`🆕 Adding slots for ${formattedFutureDate}`);

                    const slots = {};
                    const openingHour = restaurant.openingTime || "09:00"; // Default 09:00
                    const closingHour = restaurant.closingTime || "21:00"; // Default 21:00

                    const startTime = parseInt(openingHour.split(":")[0]);
                    const endTime = parseInt(closingHour.split(":")[0]);

                    for (let hour = startTime; hour <= endTime; hour++) {
                        const timeSlot = `${hour.toString().padStart(2, "0")}:00`;
                        slots[timeSlot] = ["Table-1", "Table-2", "Table-3", "Table-4", "Table-5",
                                           "Table-6", "Table-7", "Table-8", "Table-9", "Table-10"];
                    }

                    restaurant.availableSlots[formattedFutureDate] = slots;
                }
            }

            restaurant.markModified("availableSlots"); // ✅ Ensure Mongoose detects changes
            await restaurant.save(); // ✅ Save updates
            console.log(`✅ Slots updated for ${restaurant.name}`);
        }

        console.log("🎉 Daily slot update complete.");
    } catch (error) {
        console.error("❌ Error updating slots:", error);
    }
};
  
router.post("/refresh_slots", async (req, res) => {
    try 
    {
        await cleanupAndUpdateSlots(); // Call the function that removes old slots
        await updateAvailableSlots();
        res.json({ message: "Slots updated successfully!" });
    } 
    catch (error) 
    {
        console.error("Error updating slots:", error);
        res.status(500).json({ message: "Error updating slots" }); 
    }
});

router.get("/", getAllRestaurants); // Fetch all restaurants
router.get("/:id", getRestaurantById); // Fetch a single restaurant by ID
router.post("/", createRestaurant); // Add a new restaurant
router.put("/:id", updateRestaurant); // Update a restaurant
router.delete("/:id", deleteRestaurant); // Delete a restaurant


// Endpoint to remove a table from the available slots for a specific date and time
router.patch('/remove_slot/:id', removeSlot);
router.patch("/add_slot/:restaurantId", addSlot);


module.exports = router;
