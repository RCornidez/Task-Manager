import { Sequelize } from 'sequelize';
import { Task as TaskModel } from './models/task.js'
import { Category as CategoryModel } from './models/category.js'
import { TimeTracking as TimeTrackingModel } from './models/timeTracking.js'


// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // specify the path to your SQLite database file
});


const Task = TaskModel(sequelize);
const Category = CategoryModel(sequelize);
const TimeTracking = TimeTrackingModel(sequelize);


// Associations defined here, e.g., Task.belongsTo(Category);
// Task and Category associations
Task.belongsTo(Category);
Category.hasMany(Task);

// TimeTracking and Category associations
TimeTracking.belongsTo(Category);
Category.hasMany(TimeTracking);

// TimeTracking and Task one-to-one associations
Task.hasOne(TimeTracking); // Each Task has one TimeTracking
TimeTracking.belongsTo(Task); // Each TimeTracking entry belongs to one Task


const models = {
    Task,
    Category,
    TimeTracking
  }

const db = {
  sequelize, // Sequelize instance
  Sequelize, // Sequelize class
  models
};

export default db;
