import notificationService from '../services/notification.service.js';

class NotificationController {
    async getAllNotifications(req, res, next) {
        try {
            const notifications = await notificationService.getAllNotifications();
            res.status(200).json(notifications);
        } catch (err) {
            next(err);
        }
    }

    async getMyNotifications(req, res, next) {
        try {
            const notifications = await notificationService.getNotificationsByClient(req.user.id);
            res.status(200).json(notifications);
        } catch (err) {
            next(err);
        }
    }

    async deleteNotification(req, res, next) {
        try {
            await notificationService.deleteNotification(req.params.id);
            res.status(200).json({ message: 'Notification deleted' });
        } catch (err) {
            next(err);
        }
    }
}

export default new NotificationController();
