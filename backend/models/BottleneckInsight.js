const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BottleneckInsight = sequelize.define('BottleneckInsight', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  severity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  actionLabel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  colorTheme: {
    type: DataTypes.STRING,
    allowNull: false
  },
  iconName: {
    type: DataTypes.STRING,
    defaultValue: 'Clock'
  }
});

module.exports = BottleneckInsight;
