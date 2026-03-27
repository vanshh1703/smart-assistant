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
const ActivityLog = require('./ActivityLog');
const Meeting = require('./Meeting');
const MeetingPivot = require('./MeetingPivot');
const MeetingExtraction = require('./MeetingExtraction');
const MeetingAttendee = require('./MeetingAttendee');
const KnowledgeAsset = require('./KnowledgeAsset');
const KnowledgeInsight = require('./KnowledgeInsight');
const KnowledgeBaseStat = require('./KnowledgeBaseStat');

// Associations
Project.hasMany(Task, { as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(Project);

Project.hasMany(Member, { as: 'members', onDelete: 'CASCADE' });
Member.belongsTo(Project);

Project.hasMany(Insight, { as: 'insights', onDelete: 'CASCADE' });
Insight.belongsTo(Project);

Project.hasMany(ActivityLog, { as: 'logs', onDelete: 'CASCADE' });
ActivityLog.belongsTo(Project);

User.hasMany(Session, { as: 'sessions', onDelete: 'CASCADE' });
Session.belongsTo(User);

User.hasMany(NotificationPreference, { as: 'notificationPreferences', onDelete: 'CASCADE' });
NotificationPreference.belongsTo(User);

// Billing Associations
SubscriptionPlan.hasMany(BillingAccount, { as: 'accounts', onDelete: 'CASCADE' });
BillingAccount.belongsTo(SubscriptionPlan);

Meeting.hasMany(MeetingPivot, { as: 'pivots', onDelete: 'CASCADE' });
MeetingPivot.belongsTo(Meeting);

Meeting.hasMany(MeetingExtraction, { as: 'extractions', onDelete: 'CASCADE' });
MeetingExtraction.belongsTo(Meeting);

Meeting.hasMany(MeetingAttendee, { as: 'attendees', onDelete: 'CASCADE' });
MeetingAttendee.belongsTo(Meeting);

KnowledgeAsset.hasOne(KnowledgeInsight, { as: 'insight', onDelete: 'CASCADE' });
KnowledgeInsight.belongsTo(KnowledgeAsset);

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
  Invoice,
  ActivityLog,
  Meeting,
  MeetingPivot,
  MeetingExtraction,
  MeetingAttendee,
  KnowledgeAsset,
  KnowledgeInsight,
  KnowledgeBaseStat
};
