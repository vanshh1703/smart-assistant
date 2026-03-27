const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DashboardInsight = sequelize.define('DashboardInsight', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING, // 'Project Phoenix: Architecture Review'
  },
  description: {
    type: DataTypes.TEXT, // 'Critical path bottleneck...'
  },
  severity: {
    type: DataTypes.STRING, // 'High Risk'
  },
  actionLabel: {
    type: DataTypes.STRING, // 'Apply Fix'
  },
  iconType: {
    type: DataTypes.STRING, // 'Zap', 'User'
  },
  colorTheme: {
    type: DataTypes.STRING, // 'indigo-600', 'blue-600'
  }
});

module.exports = DashboardInsight;
