const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KnowledgeAsset = sequelize.define('KnowledgeAsset', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING, // e.g., 'pdf', 'docx', 'png'
  },
  size: {
    type: DataTypes.STRING, // e.g., '4.2 MB'
  },
  matchPercent: {
    type: DataTypes.INTEGER, // e.g., 98
  },
  lastModified: {
    type: DataTypes.STRING, // e.g., '2 days ago'
  },
  extractExcerpt: {
    type: DataTypes.TEXT, // The "..." preview text
  },
  accentColor: {
    type: DataTypes.STRING, // bg-blue-600, etc.
  },
  iconType: {
    type: DataTypes.STRING, // 'FileText', 'Layout'
  }
});

module.exports = KnowledgeAsset;
