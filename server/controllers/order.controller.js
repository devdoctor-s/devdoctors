const Order = require('../models/order.model');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user, orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;
    const order = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const { user, orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.user = user;
    order.orderItems = orderItems;
    order.shippingAddress = shippingAddress;
    order.paymentMethod = paymentMethod;
    order.taxPrice = taxPrice;
    order.shippingPrice = shippingPrice;
    order.totalPrice = totalPrice;
    const savedOrder = await order.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
