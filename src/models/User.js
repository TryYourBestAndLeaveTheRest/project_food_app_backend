const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "restaurant", "admin"],
    default: "customer",
  },
  balance: { type: Number, default: 0 },
  healthState: { type: String }, // You can further expand this field based on your requirements
  // Add more fields as needed
});

module.exports = mongoose.model("User", userSchema);
