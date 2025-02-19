// controllers/storage-controller.js
const Storage = require('../models/storage');

// Create or update a storage entry
exports.createOrUpdateStorage = async (req, res) => {
    try {
        const { product, quantity, location } = req.body;

        // Check if storage entry exists for the product
        let storage = await Storage.findOne({ product });

        if (storage) {
            // Update quantity if storage entry exists
            storage.quantity += quantity;
            if (location) storage.location = location;
            await storage.save();
        } else {
            // Create a new storage entry if it doesn't exist
            storage = new Storage({ product, quantity, location });
            await storage.save();
        }

        res.status(201).json(storage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all storage entries
exports.getAllStorage = async (req, res) => {
    try {
        const storageEntries = await Storage.find().populate('product');
        res.status(200).json(storageEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a storage entry by product ID
exports.getStorageByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const storage = await Storage.findOne({ product: productId }).populate('product');

        if (!storage) {
            return res.status(404).json({ message: 'Storage entry not found for the given product ID' });
        }

        res.status(200).json(storage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update storage quantity by product ID
exports.updateStorageQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity, location } = req.body;

        const storage = await Storage.findOne({ product: productId });

        if (!storage) {
            return res.status(404).json({ message: 'Storage entry not found for the given product ID' });
        }

        storage.quantity = quantity;
        if (location) storage.location = location;
        await storage.save();

        res.status(200).json(storage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a storage entry by product ID
exports.deleteStorageEntry = async (req, res) => {
    try {
        const { productId } = req.params;

        const storage = await Storage.findOneAndDelete({ product: productId });

        if (!storage) {
            return res.status(404).json({ message: 'Storage entry not found for the given product ID' });
        }

        res.status(200).json({ message: 'Storage entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
