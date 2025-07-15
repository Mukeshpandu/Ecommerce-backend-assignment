const Product = require('../models/Product');

// Get all products (with optional search and pagination)
exports.getAllProducts = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query;

        const query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive
        }

        if (category) {
            query.category = { $regex: category, $options: 'i' };
        }

        const total = await Product.countDocuments(query);

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / limit),
            products
        });
    } catch (err) {
        res.status(500).json({ msg: "Error fetching products", error: err.message });
    }
};


// Add product (Admin only)
exports.addProduct = async (req, res) => {
    try {
        const { name, category, price, description, stock } = req.body;
        const product = new Product({ name, category, price, description, stock });
        await product.save();
        res.status(201).json({ msg: "Product added successfully", product });
    } catch (err) {
        res.status(500).json({ msg: "Error adding product", error: err.message });
    }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ msg: "Product not found" });
        res.json({ msg: "Product updated", product: updated });
    } catch (err) {
        res.status(500).json({ msg: "Error updating product", error: err.message });
    }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ msg: "Product not found" });
        res.json({ msg: "Product deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Error deleting product", error: err.message });
    }
};
