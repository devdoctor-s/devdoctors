const Service = require('../models/service.model');

const getServiceById = async (req, res, next, id) => {
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        error: 'Service not found'
      });
    }
    req.service = service;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve service'
    });
  }
};

const createService = async (req, res) => {
  const { user, serviceItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;
  try {
    const service = new Service({
      user,
      serviceItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    const savedService = await service.save();
    res.json(savedService);
  } catch (err) {
    return res.status(400).json({
      error: 'Could not create service'
    });
  }
};

const getService = (req, res) => {
  return res.json(req.service);
};

module.exports = { getServiceById, createService, getService };
