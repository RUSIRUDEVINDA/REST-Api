// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST /api/products
router.post('/', productController.createProduct);

// GET /api/products
router.get('/', productController.getProducts);

// GET /api/products/:id
router.get('/:id', productController.getProduct);

// PUT /api/products/:id
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id
router.delete('/:id', productController.deleteProduct);

module.exports = router;
