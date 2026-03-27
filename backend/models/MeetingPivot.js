const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MeetingPivot = sequelize.define('MeetingPivot', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
  }
});

module.exports = MeetingPivot;
