const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/role');

// Public route
router.get('/', getAllProducts);

// Admin-only routes
router.post('/', auth, allowRoles('admin'), addProduct);
router.put('/:id', auth, allowRoles('admin'), updateProduct);
router.delete('/:id', auth, allowRoles('admin'), deleteProduct);

module.exports = router;
