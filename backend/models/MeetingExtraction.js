const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MeetingExtraction = sequelize.define('MeetingExtraction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignee: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.STRING, // High, Medium, Critical
  },
  color: {
    type: DataTypes.STRING, // Tailwind text/bg color CSS class
  }
});

module.exports = MeetingExtraction;
