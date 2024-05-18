
// src/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUserProfile = async (req, res) => {
  try {
    // Fetch user profile based on the authenticated user's ID
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email, password, healthState } = req.body;

    // Fetch user based on the authenticated user's ID
    let user = await User.findById(req.user.id);

    // Update user profile fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (healthState) user.healthState = healthState;

    // Save updated user profile to the database
    await user.save();

    res.json({ message: "User profile updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    // Fetch orders associated with the authenticated user
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getUserMealPlan = async (req, res) => {
  try {
    // Fetch meal plan associated with the authenticated user
    // You would need to implement the logic for fetching the meal plan from the database
    res.json({ message: "Implement logic for fetching user meal plan" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateUserMealPlan = async (req, res) => {
  try {
    const { meals } = req.body;

    // Update user meal plan based on the authenticated user's ID
    // You would need to implement the logic for updating the user meal plan in the database
    res.json({ message: "Implement logic for updating user meal plan" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
