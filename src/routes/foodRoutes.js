const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

// Food routes
router.get("/", foodController.getAllFoods);
router.get("/:id", foodController.getFoodById);
router.post("/:id/recipe", foodController.addRecipe);
router.put("/:id/recipe", foodController.updateRecipe);
router.get("/:id/recipe", foodController.getRecipe);
// Add more food routes as needed

module.exports = router;
