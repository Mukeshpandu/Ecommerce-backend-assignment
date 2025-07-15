const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart) return res.json({ items: [] });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching cart', error: err.message });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [{ product: productId, quantity }] });
        } else {
            const index = cart.items.findIndex(item => item.product.equals(productId));
            if (index > -1) {
                cart.items[index].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }

        await cart.save();
        res.json({ msg: 'Product added to cart', cart });
    } catch (err) {
        res.status(500).json({ msg: 'Error adding to cart', error: err.message });
    }
};

exports.updateCartItem = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        const item = cart.items.find(item => item.product.equals(productId));
        if (!item) return res.status(404).json({ msg: 'Product not in cart' });

        item.quantity = quantity;
        await cart.save();
        res.json({ msg: 'Cart updated', cart });
    } catch (err) {
        res.status(500).json({ msg: 'Error updating cart', error: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        cart.items = cart.items.filter(item => !item.product.equals(productId));
        await cart.save();
        res.json({ msg: 'Item removed from cart', cart });
    } catch (err) {
        res.status(500).json({ msg: 'Error removing from cart', error: err.message });
    }
};
