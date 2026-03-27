const sequelize = require('../config/database');
const Project = require('./Project');
const Task = require('./Task');
const Member = require('./Member');
const Insight = require('./Insight');

// Associations
Project.hasMany(Task, { as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(Project);

Project.hasMany(Member, { as: 'members', onDelete: 'CASCADE' });
Member.belongsTo(Project);

Project.hasMany(Insight, { as: 'insights', onDelete: 'CASCADE' });
Insight.belongsTo(Project);

module.exports = {
  sequelize,
  Project,
  Task,
  Member,
  Insight
};
