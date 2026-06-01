import Notification from '../models/notification.model.js';

class NotificationService {
    async getAllNotifications() {
        return await Notification.find().sort({ createdAt: -1 });
    }

    async getNotificationsByClient(clientId) {
        return await Notification.find({ clientId }).sort({ createdAt: -1 });
    }

    async createNotification(notificationData) {
        const notification = new Notification(notificationData);
        return await notification.save();
    }

    async deleteNotification(id) {
        return await Notification.findByIdAndDelete(id);
    }
}

export default new NotificationService();
