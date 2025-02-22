// controllers/product-controller.js
const Product = require('../models/products');
const axios = require("axios");
const cheerio = require("cheerio");

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNewProductInfo = async (req, res) => {
    try {
      const { barcode } = req.query; // Obtener código de barras de la query string
  
      if (!barcode) {
        return res.status(400).json({ error: "Barcode is required" });
      }
  
      const product = await getProductInfo(barcode);
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
};

const getProductInfo = async (barcode) => {
    try {
      const url = `https://go-upc.com/search?q=${barcode}`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
  
      const productName = $(".product-name").text().trim();
      const category = $(".item-category").text().trim();
      const volume = $(".item-details").text().trim();
      const ean = $("td.metadata-label:contains('EAN')").next().text().trim();
      const brand = $("td.metadata-label:contains('Brand')").next().text().trim();
      const productCategory = $("td.metadata-label:contains('Category')").next().text().trim();
      const description = $("h2:contains('Description')").next().text().trim();
      const countries = $("h2:contains('Additional Attributes')").next().find("li").text().replace("Countries:", "").trim();
      const imageUrl = $(".product-image img").first().attr("src");
  
      return {
        productName,
        category,
        volume,
        ean,
        brand,
        productCategory,
        description,
        countries,
        imageUrl,
      };
    } catch (error) {
      console.error("❌ Error obteniendo el producto:", error.message);
      return null;
    }
};