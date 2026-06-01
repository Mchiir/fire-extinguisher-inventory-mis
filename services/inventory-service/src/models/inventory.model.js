import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema(
    {
        serialNumber: { type: String, required: true, unique: true },
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        manufacturingDate: { type: Date, required: true },
        expiryDate: { type: Date, required: true },
        status: {
            type: String,
            enum: ['IN_STOCK', 'ASSIGNED', 'EXPIRED', 'UNDER_MAINTENANCE'],
            default: 'IN_STOCK',
        },
        quantity: { type: Number, default: 1 }, // Standard is 1 for serialized items, but allow for bulk if needed
    },
    { timestamps: true }
);

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
export default InventoryItem;
