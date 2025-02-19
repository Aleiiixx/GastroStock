// routes/product.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new product
router.post('/', authMiddleware, productController.createProduct);

// Get all products
router.get('/', authMiddleware, productController.getAllProducts);

// Get a single product by ID
router.get('/:id', authMiddleware, productController.getProductById);

// Update a product by ID
router.put('/:id', authMiddleware, productController.updateProduct);

// Delete a product by ID
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;