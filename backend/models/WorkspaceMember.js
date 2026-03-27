const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkspaceMember = sequelize.define('WorkspaceMember', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'Member',
  },
  roleColor: {
    type: DataTypes.STRING,
    defaultValue: 'bg-slate-100 text-slate-700',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Online',
  },
  statusColor: {
    type: DataTypes.STRING,
    defaultValue: 'text-emerald-500',
  },
  avatar: {
    type: DataTypes.STRING,
  }
});

module.exports = WorkspaceMember;
