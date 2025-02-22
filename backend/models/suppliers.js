const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Relación con el modelo User
            required: true,
        },
        representativeName: {
            type: String,
            required: false,
        },
        name: { // Nombre de la empresa
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: false,
        },
        phone: {
            type: Number,
            unique: true,
            required: false,
        },
    },
    {
        collection: 'supplier',
        timestamps: true,
    }
);

// 🔍 Validación: Se debe proporcionar al menos `email` o `phone`
SupplierSchema.pre('validate', function (next) {
    if (!this.email && !this.phone) {
        const error = new Error('Either email or phone must be provided.');
        error.name = 'ValidationError';
        next(error);
    } else {
        next();
    }
});

const Supplier = mongoose.model('Supplier', SupplierSchema);

module.exports = Supplier;
