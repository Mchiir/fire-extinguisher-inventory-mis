import cron from 'node-cron';
import fetch from 'node-fetch';
import notificationService from './notification.service.js';
import logger from '../utils/logger.js';

export const initCronJobs = () => {
    // Run daily at 08:00
    cron.schedule('0 8 * * *', async () => {
        logger.info('Running daily expiration check job...');
        await checkExpirations();
    });

    // For demo purposes, also run every hour
    cron.schedule('0 * * * *', async () => {
        logger.info('Running hourly expiration check job...');
        await checkExpirations();
    });
};

async function checkExpirations() {
    try {
        // 1. Get all active assignments
        const response = await fetch(`${process.env.ASSIGNMENT_SERVICE_URL}`);
        if (!response.ok) throw new Error('Failed to fetch assignments');
        const assignments = await response.json();

        const activeAssignments = assignments.filter(a => a.status === 'ACTIVE');

        for (const assignment of activeAssignments) {
            // Mocking expiration logic: If assigned more than 11 months ago (assuming 1 year interval)
            // In a real app, we'd check against product maintenance interval or expiry date in inventory.
            // For this MIS, we'll just check if it's nearing "expiry" based on a fixed interval for demo.

            const now = new Date();
            const assignedAt = new Date(assignment.assignedAt);
            const monthsDiff = (now.getFullYear() - assignedAt.getFullYear()) * 12 + (now.getMonth() - assignedAt.getMonth());

            if (monthsDiff >= 11) {
                await notificationService.createNotification({
                    clientId: assignment.clientId,
                    assignmentId: assignment._id,
                    message: `Reminder: Your fire extinguisher assigned on ${assignedAt.toLocaleDateString()} is nearing its maintenance/expiration date.`
                });
            }
        }
    } catch (err) {
        logger.error('Error in checkExpirations cron job:', err);
    }
}
