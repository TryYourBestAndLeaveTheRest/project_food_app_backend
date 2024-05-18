const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  menu: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      price: { type: Number, required: true },
      // Add more fields as needed
    },
  ],
  // Add more fields as needed
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
