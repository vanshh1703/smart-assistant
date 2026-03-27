const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('Review Needed', 'Active Sprint', 'Completed', 'Critical'),
    defaultValue: 'Review Needed',
  },
  tag: {
    type: DataTypes.STRING, // e.g., 'Dev', 'Design'
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High', 'Urgent'),
    defaultValue: 'Medium',
  },
  dueDateStr: {
    type: DataTypes.STRING, // e.g., 'Due in 4h'
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  assignedUsers: {
    type: DataTypes.JSONB, // Just store avatars for now simplified
    defaultValue: []
  },
  commentCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

module.exports = Task;
