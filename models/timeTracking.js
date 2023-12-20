import { DataTypes, Model } from 'sequelize';


class TimeTrackingModel {
    constructor(id, taskId, dateStart, dateStop) {
        this.id = id;
        this.taskId = taskId;
        this.dateStart = dateStart;
        this.dateStop = dateStop;
    }
}

const TimeTracking = (sequelize) => sequelize.define('TimeTracking', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dateStart: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dateStop: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  freezeTableName: true
});


export { TimeTracking, TimeTrackingModel };
