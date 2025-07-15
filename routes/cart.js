const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} = require('../controllers/cartController');
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/role');

// Customer-only routes
router.get('/', auth, allowRoles('customer'), getCart);
router.post('/add', auth, allowRoles('customer'), addToCart);
router.put('/update/:productId', auth, allowRoles('customer'), updateCartItem);
router.delete('/remove/:productId', auth, allowRoles('customer'), removeFromCart);

module.exports = router;
