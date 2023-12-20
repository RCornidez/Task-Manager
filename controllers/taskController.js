import db from "../db.js";

const { Task, Category, TimeTracking } = db.models;

export default class TaskController {

    // Create a new task
    async createTask(req, res) {
        try {
            const newTask = await Task.create(req.body);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get all tasks that are not completed
    async getTasks(req, res) {
        try {
            const tasks = await Task.findAll({
                where: { dateStop: null }, // Only select tasks where dateStop is null (not completed)
                include: [Category, TimeTracking] // Include associated Category and TimeTracking models
            });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a specific task by ID
    async getTaskById(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
                res.json(task);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update a task
    async updateTask(req, res) {
        try {
            const updatedTask = await Task.update(req.body, {
                where: { id: req.params.id }
            });
            if (updatedTask) {
                res.json(updatedTask);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete a task
    async deleteTask(req, res) {
        try {
            const taskToDelete = await Task.destroy({
                where: { id: req.params.id }
            });
            if (taskToDelete) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
