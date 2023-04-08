const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { createOrder, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered } = require('../controllers/order.controller');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.get('/', protect, getAllOrders);
router.put('/:id/deliver', protect, updateOrderToDelivered);

module.exports = router;
