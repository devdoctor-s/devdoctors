const Order = require('../models/order.model');

const isOrderOwner = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        if (order.user.toString() === req.user._id.toString()) {
            return next(); // allow access to the route
        }
        return res.status(403).send({ message: 'You do not have permission to access this order' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
};

module.exports = { isOrderOwner };
