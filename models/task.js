import { DataTypes } from 'sequelize';

class TaskModel {
    constructor(id, title, description = null, categoryId = null, dateStart = null, dateStop = null, dueDate = null, importanceLevel = null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.categoryId = categoryId;
        this.dateStart = dateStart;
        this.dateStop = dateStop;
        this.dueDate = dueDate;
        this.importanceLevel = importanceLevel;
    }
}

const Task = (sequelize) => sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dateStart: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dateStop: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  importanceLevel: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  freezeTableName: true
});

export { Task, TaskModel };
