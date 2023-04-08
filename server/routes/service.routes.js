const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { createService, getServiceById, updateServiceToPaid, getMyServices, getAllServices, updateServiceToDelivered } = require('../controllers/service.controller');

router.post('/', protect, createService);
router.get('/myservices', protect, getMyServices);
router.get('/:id', protect, getServiceById);
router.put('/:id/pay', protect, updateServiceToPaid);
router.get('/', protect, getAllServices);
router.put('/:id/deliver', protect, updateServiceToDelivered);

module.exports = router;
