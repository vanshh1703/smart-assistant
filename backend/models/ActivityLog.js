const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ActivityLog = sequelize.define('ActivityLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false, // e.g., 'Task Created', 'Status Updated'
  },
  details: {
    type: DataTypes.TEXT,
  },
  user: {
    type: DataTypes.STRING, // Name or ID of user who did it
  },
  type: {
    type: DataTypes.STRING, // 'update', 'alert', 'complete'
    defaultValue: 'update',
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

module.exports = ActivityLog;
