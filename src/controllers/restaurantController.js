// src/controllers/restaurantController.js
const Restaurant = require("../models/Restaurant");
const Recipe = require("../models/Recipe");

exports.getAllRestaurants = async (req, res) => {
  try {
    // Fetch all restaurants from the database
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    // Fetch restaurant by ID from the database
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
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

    // Update the restaurant with the new recipe
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { $push: { recipes: recipe._id } },
      { new: true }
    );

    res.json({ message: "Recipe added successfully", restaurant });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;

    // Find the recipe associated with the restaurant ID
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
    // Find the recipe associated with the restaurant ID
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
