const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  meals: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      // Add more fields as needed
    },
  ],
  // Add more fields as needed
});

module.exports = mongoose.model("MealPlan", mealPlanSchema);
