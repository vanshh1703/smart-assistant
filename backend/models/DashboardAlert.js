const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DashboardAlert = sequelize.define('DashboardAlert', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING, // 'Phoenix Final Specs'
  },
  date: {
    type: DataTypes.STRING, // 'Today', 'In 3 days'
  },
  severity: {
    type: DataTypes.STRING, // 'Urgent', 'Normal'
  },
  color: {
    type: DataTypes.STRING, // 'text-red-600', 'text-blue-600'
  },
  bg: {
    type: DataTypes.STRING, // 'bg-red-50', 'bg-blue-50'
  },
  border: {
    type: DataTypes.STRING, // 'border-red-100', 'border-blue-100'
  }
});

module.exports = DashboardAlert;
