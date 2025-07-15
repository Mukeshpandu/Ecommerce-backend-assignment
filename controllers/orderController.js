const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ msg: 'Cart is empty' });
        }

        // Calculate total amount
        const totalAmount = cart.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);

        // Create new order
        const newOrder = new Order({
            user: req.user.id,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalAmount
        });

        await newOrder.save();

        // Clear the cart after ordering
        cart.items = [];
        await cart.save();

        res.status(201).json({ msg: 'Order placed successfully', order: newOrder });
    } catch (err) {
        res.status(500).json({ msg: 'Error placing order', error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching orders', error: err.message });
    }
};
