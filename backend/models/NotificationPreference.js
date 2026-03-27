const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NotificationPreference = sequelize.define('NotificationPreference', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING, // e.g., 'email', 'push', 'ai'
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  color: {
    type: DataTypes.STRING,
  },
  icon: {
    type: DataTypes.STRING, // e.g., 'Mail', 'Zap', 'Sparkles'
  },
  customBg: {
    type: DataTypes.STRING, // nullable, e.g., 'bg-purple-50'
  }
});

module.exports = NotificationPreference;
