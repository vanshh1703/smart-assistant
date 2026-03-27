const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING, // e.g. 'alex'
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'Member',
  },
  accountType: {
    type: DataTypes.STRING,
    defaultValue: 'Free Account',
  },
  title: {
    type: DataTypes.STRING,
  },
  securityScore: {
    type: DataTypes.INTEGER,
    defaultValue: 85,
  },
  is2FAEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = User;
