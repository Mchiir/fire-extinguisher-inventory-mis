import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
        assignmentId: { type: mongoose.Schema.Types.ObjectId },
        message: { type: String, required: true },
        sentAt: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ['PENDING', 'SENT', 'FAILED'],
            default: 'SENT', // For simplicity in this mockup, we mark as SENT
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
