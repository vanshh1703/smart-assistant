const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MeetingAttendee = sequelize.define('MeetingAttendee', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING, // Image URL
  }
});

module.exports = MeetingAttendee;
