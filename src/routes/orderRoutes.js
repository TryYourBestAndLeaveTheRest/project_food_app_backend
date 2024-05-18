const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

// Order routes
router.post("/", authMiddleware.authenticate, orderController.createOrder);
router.get("/", authMiddleware.authenticate, orderController.getAllOrders);
router.get("/:id", authMiddleware.authenticate, orderController.getOrderById);
router.put(
  "/:id/status",
  authMiddleware.authenticate,
  orderController.updateOrderStatus
);
// Add more order routes as needed

module.exports = router;
