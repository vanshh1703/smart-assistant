const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KnowledgeInsight = sequelize.define('KnowledgeInsight', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  summary: {
    type: DataTypes.TEXT, // AI Insight Bar text
  },
  neuralExtract: {
    type: DataTypes.TEXT, // "The integration of semantic search..."
  },
  sectionTitle: {
    type: DataTypes.STRING, // e.g., 'Section 2 • Market Positioning'
  },
  sectionText: {
    type: DataTypes.TEXT, // Detailed context text
  }
});

module.exports = KnowledgeInsight;
