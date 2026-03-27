const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING, // e.g., 'In Design', 'Idle'
  },
  color: {
    type: DataTypes.STRING, // e.g., 'bg-indigo-500'
  },
  avatarId: {
    type: DataTypes.STRING, // to fetch from pravatar
  }
});

module.exports = Member;
