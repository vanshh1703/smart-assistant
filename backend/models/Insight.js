const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Insight = sequelize.define('Insight', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM('Urgent Priority', 'Efficiency Play'),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  metricLabel: {
    type: DataTypes.STRING, // e.g., 'MATCH', 'SAVING'
  },
  metricValue: {
    type: DataTypes.STRING, // e.g., '98%', '2.4h'
  },
  assignedUsers: {
    type: DataTypes.JSONB, // for avatars
    defaultValue: []
  },
  dueTime: {
    type: DataTypes.STRING, // e.g., 'Due in 4h'
  }
});

module.exports = Insight;
