import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
    {
        clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
        inventoryItemId: { type: mongoose.Schema.Types.ObjectId, required: true },
        assignedAt: { type: Date, default: Date.now },
        returnDate: { type: Date },
        status: {
            type: String,
            enum: ['ACTIVE', 'RETURNED', 'EXPIRED'],
            default: 'ACTIVE',
        },
    },
    { timestamps: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;
