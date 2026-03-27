const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Meeting = sequelize.define('Meeting', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateStr: {
    type: DataTypes.STRING, // e.g., 'Dec 14, 2023'
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING, // e.g., '45m'
  },
  featuredExtract: {
    type: DataTypes.TEXT, // The "Neural Extract" quote
  },
  alignmentFactor: {
    type: DataTypes.INTEGER, // e.g., 92
    defaultValue: 90,
  },
  sentiment: {
    type: DataTypes.STRING, // 'Positive', 'Focus Required'
    defaultValue: 'Positive',
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = Meeting;
