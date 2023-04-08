const Service = require('../models/service.model');

// Create a new service
const createService = async (req, res) => {
  try {
    const { user, serviceItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;
    const newService = new Service({
      user,
      serviceItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('user', 'name email');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('user', 'name email');
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service by ID
const updateService = async (req, res) => {
  try {
    const { user, serviceItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        user,
        serviceItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice
      },
      { new: true }
    );
    if (updatedService) {
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a service by ID
const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (deletedService) {
      res.json({ message: 'Service deleted' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};
