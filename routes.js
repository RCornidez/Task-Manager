import express from 'express';
import TaskController from './controllers/taskController.js';
import CategoryController from './controllers/categoryController.js';
import TimeTrackingController from './controllers/timeTrackingController.js';

const router = express.Router();
const taskController = new TaskController();
const categoryController = new CategoryController();
const timeTrackingController = new TimeTrackingController();

// Task routes
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

// Category routes
router.post('/category', categoryController.createCategory);
router.get('/category', categoryController.getCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.put('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

// TimeTracking routes
router.post('/time', timeTrackingController.createTimeTracking);
router.get('/time', timeTrackingController.getTimeTrackings);
router.get('/time/category-data', timeTrackingController.getCategoryTimeData);
router.get('/time/:id', timeTrackingController.getTimeTrackingById);
router.put('/time/:id', timeTrackingController.updateTimeTracking);
router.put('/time/task/:taskId', timeTrackingController.updateTimeTrackingByTask);
router.delete('/time/:id', timeTrackingController.deleteTimeTracking);


export default router;
