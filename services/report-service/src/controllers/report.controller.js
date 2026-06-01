import reportService from '../services/report.service.js';

class ReportController {
    async getInventorySummary(req, res, next) {
        try {
            const token = req.headers.authorization;
            const summary = await reportService.getInventorySummary(token);
            res.status(200).json(summary);
        } catch (err) {
            next(err);
        }
    }

    async getAssignmentReport(req, res, next) {
        try {
            const token = req.headers.authorization;
            const report = await reportService.getAssignmentReport(token);
            res.status(200).json(report);
        } catch (err) {
            next(err);
        }
    }

    async getDetailedInventoryReport(req, res, next) {
        try {
            const token = req.headers.authorization;
            const report = await reportService.getDetailedInventoryReport(token);
            res.status(200).json(report);
        } catch (err) {
            next(err);
        }
    }
}

export default new ReportController();
