import assignmentService from '../services/assignment.service.js';

class AssignmentController {
    async getAllAssignments(req, res, next) {
        try {
            const assignments = await assignmentService.getAllAssignments();
            res.status(200).json(assignments);
        } catch (err) {
            next(err);
        }
    }

    async getAssignmentById(req, res, next) {
        try {
            const assignment = await assignmentService.getAssignmentById(req.params.id);
            res.status(200).json(assignment);
        } catch (err) {
            next(err);
        }
    }

    async createAssignment(req, res, next) {
        try {
            const token = req.headers.authorization;
            const assignment = await assignmentService.createAssignment(req.body, token);
            res.status(201).json(assignment);
        } catch (err) {
            next(err);
        }
    }

    async returnAssignment(req, res, next) {
        try {
            const token = req.headers.authorization;
            const assignment = await assignmentService.returnAssignment(req.params.id, token);
            res.status(200).json(assignment);
        } catch (err) {
            next(err);
        }
    }
}

export default new AssignmentController();
