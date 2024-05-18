// src/controllers/orderController.js
const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    // Create a new order
    const order = new Order({
      buyer: req.user.id,
      items,
      totalPrice,
      status: "initiated", // Set initial status to 'initiated'
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getOrderById = async (req, res) => {
  try {
    // Fetch order by ID from the database
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Check if the provided status is valid
    const validStatuses = ["initiated", "accepted", "delivered", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find the order by ID and update its status
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated successfully", order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
