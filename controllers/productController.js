// controllers/productController.js
const Product = require('../models/Product');

// Create product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, owner } = req.body;

    if (!name || price === undefined || !owner) {
      return res.status(400).json({ error: 'name, price, and owner are required' });
    }

    const product = new Product({
      name,
      description,
      price,
      owner
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Get all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate('owner', 'name email') // show owner info
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Get product by ID
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('owner', 'name email');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Update product
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
