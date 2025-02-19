const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        barcode: {
            type: String,
            unique: true,
            required: true,
        },
        type: {
            type: String,
            enum: [
                'liquors',
                'cleaning',
                'stationery',
                'fish',
                'vegetables',
                'fried',
                'meat',
                'canned',
                'prepared',
                'others'
            ],
            required: true,
        },
        unitMeasure: {
            type: String,
            enum: ['unit', 'liter', 'kilogram'],
            required: true,
        },
        quantityPerUnit: {
            type: Number,
            required: true,
        },
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
        }
    },
    {
        collection: 'product',
        timestamps: true,
    }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
