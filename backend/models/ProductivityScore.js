const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductivityScore = sequelize.define('ProductivityScore', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  day: {
    type: DataTypes.STRING, // 'M', 'T', 'W', 'T', 'F', 'S', 'S'
  },
  score: {
    type: DataTypes.INTEGER, // e.g., 85
  },
  isCurrent: {
    type: DataTypes.BOOLEAN, // Today's score highlight
    defaultValue: false,
  }
});

module.exports = ProductivityScore;
