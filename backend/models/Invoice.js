const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  invoiceIdStr: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateStr: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amountStr: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Paid'
  }
});

module.exports = Invoice;
