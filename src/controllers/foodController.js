// src/controllers/foodController.js
const Food = require("../models/Food");
const Recipe = require("../models/Recipe");

exports.getAllFoods = async (req, res) => {
  try {
    // Fetch all foods from the database
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getFoodById = async (req, res) => {
  try {
    // Fetch food by ID from the database
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.addRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;

    // Create a new recipe
    const recipe = new Recipe({
      name,
      ingredients,
      instructions,
    });

    // Save the recipe to the database
    await recipe.save();

    // Update the food with the new recipe
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      { recipe: recipe._id },
      { new: true }
    );

    res.json({ message: "Recipe added successfully", food });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;

    // Find the recipe associated with the food ID
    let recipe = await Recipe.findById(req.params.id);

    // Update recipe fields
    if (name) recipe.name = name;
    if (ingredients) recipe.ingredients = ingredients;
    if (instructions) recipe.instructions = instructions;

    // Save updated recipe to the database
    await recipe.save();

    res.json({ message: "Recipe updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getRecipe = async (req, res) => {
  try {
    // Find the recipe associated with the food ID
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
