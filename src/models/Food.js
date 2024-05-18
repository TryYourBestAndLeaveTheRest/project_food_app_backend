const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // URL to the image
  isAvailable: { type: Boolean, default: true },
  // Add more fields as needed
});

module.exports = mongoose.model("Food", foodSchema);
