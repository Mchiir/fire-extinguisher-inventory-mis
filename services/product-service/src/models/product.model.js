import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        extinguisherType: { type: String, required: true }, // e.g., CO2, Dry Powder, Water
        capacity: { type: String, required: true }, // e.g., 2kg, 5kg
        description: { type: String, required: true },
        price: { type: Number, required: true },
        manufacturer: { type: String, required: true },
        maintenanceInterval: { type: Number, required: true }, // in months
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
