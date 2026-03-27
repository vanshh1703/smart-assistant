const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PerformanceBenchmark = sequelize.define('PerformanceBenchmark', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tasksCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  focusScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: 'bg-blue-600'
  },
  avgVelocity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  trendRotation: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  trendColor: {
    type: DataTypes.STRING,
    defaultValue: 'text-blue-500'
  }
});

module.exports = PerformanceBenchmark;
