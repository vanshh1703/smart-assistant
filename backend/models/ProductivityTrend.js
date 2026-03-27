const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductivityTrend = sequelize.define('ProductivityTrend', {
  day: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completedTasks: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  newRequests: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = ProductivityTrend;
