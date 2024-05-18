const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// User routes
router.get("/", authMiddleware.authenticate, userController.getUserProfile);
router.put("/", authMiddleware.authenticate, userController.updateUserProfile);
router.get(
  "/:id/orders",
  authMiddleware.authenticate,
  userController.getUserOrders
);
router.get(
  "/:id/mealplan",
  authMiddleware.authenticate,
  userController.getUserMealPlan
);
router.put(
  "/:id/mealplan",
  authMiddleware.authenticate,
  userController.updateUserMealPlan
);
// Add more user routes as needed

module.exports = router;
