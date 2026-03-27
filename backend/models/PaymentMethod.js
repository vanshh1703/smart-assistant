const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PaymentMethod = sequelize.define('PaymentMethod', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cardType: {
    type: DataTypes.STRING,
    defaultValue: 'Visa'
  },
  last4: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiry: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cardholderName: {
    type: DataTypes.STRING
  },
  billingEmail: {
    type: DataTypes.STRING
  },
  vatNumber: {
    type: DataTypes.STRING
  }
});

module.exports = PaymentMethod;
