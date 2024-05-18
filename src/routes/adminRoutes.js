const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

// Admin routes
router.get("/users", authMiddleware.authenticate, adminController.getAllUsers);
router.get(
  "/users/:id",
  authMiddleware.authenticate,
  adminController.getUserById
);
router.put(
  "/users/:id",
  authMiddleware.authenticate,
  adminController.updateUser
);
router.delete(
  "/users/:id",
  authMiddleware.authenticate,
  adminController.deleteUser
);
router.get(
  "/orders",
  authMiddleware.authenticate,
  adminController.getAllOrders
);
router.get(
  "/orders/:id",
  authMiddleware.authenticate,
  adminController.getOrderById
);
router.put(
  "/orders/:id/status",
  authMiddleware.authenticate,
  adminController.updateOrderStatus
);
router.post('/update-user/:id',adminController.updateUser)
// Add more admin routes as needed

module.exports = router;
