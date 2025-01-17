// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
// Add more authentication routes as needed

module.exports = router;
