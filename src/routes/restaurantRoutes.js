const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const authMiddleware = require("../middlewares/authMiddleware");

// Restaurant routes
router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.post(
  "/:id/recipe",
  authMiddleware.authenticate,
  restaurantController.addRecipe
);
router.put(
  "/:id/recipe",
  authMiddleware.authenticate,
  restaurantController.updateRecipe
);
router.get("/:id/recipe", restaurantController.getRecipe);
// Add more restaurant routes as needed

module.exports = router;
