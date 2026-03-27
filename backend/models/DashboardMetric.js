const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DashboardMetric = sequelize.define('DashboardMetric', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING, // 'Completion', 'Deep Work'
  },
  value: {
    type: DataTypes.STRING, // '84', '4.2h'
  },
  percentage: {
    type: DataTypes.INTEGER, // for progress bar
  },
  trend: {
    type: DataTypes.STRING, // '+12%'
  },
  color: {
    type: DataTypes.STRING, // 'bg-blue-500'
  }
});

module.exports = DashboardMetric;
