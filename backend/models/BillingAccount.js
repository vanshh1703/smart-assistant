const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BillingAccount = sequelize.define('BillingAccount', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  renewalDateStr: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creditsUsed: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  creditsTotal: {
    type: DataTypes.INTEGER,
    defaultValue: 10000
  },
  optimizationTip: {
    type: DataTypes.TEXT
  }
});

module.exports = BillingAccount;
