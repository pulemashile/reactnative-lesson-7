const express = require("express");
const router = express.Router();
const { 
    createDefaultRestaurant,    
    createRestaurant, 
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant, 
} = require("../controllers/restaurantController");

router.post("/default", createDefaultRestaurant); // Fetch all restaurants
router.get("/", getAllRestaurants); // Fetch all restaurants
router.get("/:id", getRestaurantById); // Fetch a single restaurant by ID
router.post("/", createRestaurant); // Add a new restaurant
router.put("/:id", updateRestaurant); // Update a restaurant
router.delete("/:id", deleteRestaurant); // Delete a restaurant

module.exports = router;
