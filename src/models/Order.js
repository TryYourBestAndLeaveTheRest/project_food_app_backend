const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      quantity: { type: Number, required: true },
      // Add more fields as needed
    },
  ],
  totalPrice: { type: Number, required: true },
  // Add more fields as needed
});

module.exports = mongoose.model("Order", orderSchema);
