const sequelize = require('../config/database');
const Project = require('./Project');
const Task = require('./Task');
const Member = require('./Member');
const Insight = require('./Insight');
const User = require('./User');
const Session = require('./Session');
const NotificationPreference = require('./NotificationPreference');
const WorkspaceMember = require('./WorkspaceMember');
const ProductivityTrend = require('./ProductivityTrend');
const AnalyticsStat = require('./AnalyticsStat');
const BottleneckInsight = require('./BottleneckInsight');
const PerformanceBenchmark = require('./PerformanceBenchmark');
const SubscriptionPlan = require('./SubscriptionPlan');
const BillingAccount = require('./BillingAccount');
const PaymentMethod = require('./PaymentMethod');
const Invoice = require('./Invoice');

// Associations
Project.hasMany(Task, { as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(Project);

Project.hasMany(Member, { as: 'members', onDelete: 'CASCADE' });
Member.belongsTo(Project);

Project.hasMany(Insight, { as: 'insights', onDelete: 'CASCADE' });
Insight.belongsTo(Project);

User.hasMany(Session, { as: 'sessions', onDelete: 'CASCADE' });
Session.belongsTo(User);

User.hasMany(NotificationPreference, { as: 'notificationPreferences', onDelete: 'CASCADE' });
NotificationPreference.belongsTo(User);

// Billing Associations
SubscriptionPlan.hasMany(BillingAccount, { as: 'accounts', onDelete: 'CASCADE' });
BillingAccount.belongsTo(SubscriptionPlan);

module.exports = {
  sequelize,
  Project,
  Task,
  Member,
  Insight,
  User,
  Session,
  NotificationPreference,
  WorkspaceMember,
  ProductivityTrend,
  AnalyticsStat,
  BottleneckInsight,
  PerformanceBenchmark,
  SubscriptionPlan,
  BillingAccount,
  PaymentMethod,
  Invoice
};
