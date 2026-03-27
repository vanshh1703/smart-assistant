const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KnowledgeBaseStat = sequelize.define('KnowledgeBaseStat', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  indexSizeUsed: {
    type: DataTypes.FLOAT, // 4.2 (GB)
  },
  indexSizeTotal: {
    type: DataTypes.FLOAT, // 10 (GB)
  },
  totalAssets: {
    type: DataTypes.INTEGER, // 128
  },
  totalEntities: {
    type: DataTypes.INTEGER, // 14000
  }
});

module.exports = KnowledgeBaseStat;
