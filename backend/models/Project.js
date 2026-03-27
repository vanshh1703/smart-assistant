const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
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
  badge: {
    type: DataTypes.STRING, // e.g., 'Active Project'
  },
  projectIdStr: {
    type: DataTypes.STRING, // e.g., 'SPAI-882'
  },
  color: {
    type: DataTypes.STRING, // for UI matching
  },
  timelineRisk: {
    type: DataTypes.STRING,
    defaultValue: 'Low',
  },
  timelineRiskPercent: {
    type: DataTypes.INTEGER,
    defaultValue: 20,
  },
  codeQuality: {
    type: DataTypes.INTEGER,
    defaultValue: 98,
  },
  openIssues: {
    type: DataTypes.INTEGER,
    defaultValue: 14,
  },
  openIssuesPercent: {
    type: DataTypes.INTEGER,
    defaultValue: 65,
  },
  velocityTitle: {
    type: DataTypes.STRING,
    defaultValue: 'Velocity Spike',
  },
  velocitySubtitle: {
    type: DataTypes.STRING,
    defaultValue: '+15% week-over-week',
  }
});

module.exports = Project;
