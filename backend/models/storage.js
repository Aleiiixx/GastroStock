// models/Storage.js
const mongoose = require('mongoose');

const StorageSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        location: {
            type: String,
            required: false,
        },
    },
    {
        collection: 'storage',
        timestamps: true,
    }
);

const Storage = mongoose.model('Storage', StorageSchema);

module.exports = Storage;
