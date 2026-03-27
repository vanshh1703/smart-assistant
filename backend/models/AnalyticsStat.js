const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AnalyticsStat = sequelize.define('AnalyticsStat', {
  overallRate: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  completed: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  inProgress: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  backlog: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = AnalyticsStat;
