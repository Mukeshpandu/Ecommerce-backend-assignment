const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/role');

// Customer-only routes
router.post('/', auth, allowRoles('customer'), createOrder);
router.get('/history', auth, allowRoles('customer'), getOrders);

module.exports = router;
