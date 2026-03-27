const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize, Project, Task, Member, Insight, User, Session, NotificationPreference, WorkspaceMember, ProductivityTrend, AnalyticsStat, BottleneckInsight, PerformanceBenchmark, SubscriptionPlan, BillingAccount, PaymentMethod, Invoice, ActivityLog, Meeting, MeetingPivot, MeetingExtraction, MeetingAttendee, KnowledgeAsset, KnowledgeInsight, KnowledgeBaseStat, DashboardMetric, DashboardInsight, DashboardAlert, ProductivityScore } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
// Get project with all tasks and members
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        { model: Task, as: 'tasks' },
        { model: Member, as: 'members' },
        { model: Insight, as: 'insights' },
        { model: ActivityLog, as: 'logs' }
      ]
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// For simplicity, a route to get the first/default project
app.get('/api/projects/default/active', async (req, res) => {
  try {
    const project = await Project.findOne({
      include: [
        { model: Task, as: 'tasks' },
        { model: Member, as: 'members' },
        { model: Insight, as: 'insights' },
        { model: ActivityLog, as: 'logs' }
      ],
      order: [['createdAt', 'ASC']]
    });
    if (!project) return res.status(404).json({ error: 'No projects seeded' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Task
app.post('/api/projects/:projectId/tasks', async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      ProjectId: req.params.projectId
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Invite Member
app.post('/api/projects/:projectId/members', async (req, res) => {
  try {
    const member = await Member.create({
      ...req.body,
      ProjectId: req.params.projectId
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update task progress percentage
app.patch('/api/tasks/:id/progress', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    const progress = Math.min(100, Math.max(0, parseInt(req.body.progress)));
    await task.update({ progress });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/tasks/:id/status', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    const { status } = req.body;
    const valid = ['Review Needed', 'Active Sprint', 'Completed', 'Critical'];
    if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status' });
    await task.update({ status });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- User / Settings Routes ---
// Get full profile including sessions and preferences
app.get('/api/user/profile', async (req, res) => {
  try {
    const user = await User.findOne({
      include: [
        { model: Session, as: 'sessions' },
        { model: NotificationPreference, as: 'notificationPreferences' }
      ]
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const members = await WorkspaceMember.findAll();
    res.json({ ...user.toJSON(), workspaceMembers: members });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile details
app.patch('/api/user/profile', async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update notification preference
app.patch('/api/user/notifications/:id', async (req, res) => {
  try {
    const pref = await NotificationPreference.findByPk(req.params.id);
    if (!pref) return res.status(404).json({ error: 'Preference not found' });
    
    await pref.update({ active: req.body.active });
    res.json(pref);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update password (mock)
app.post('/api/user/password', async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // In a real app we'd verify current password and hash the new one
    await user.update({ password: req.body.newPassword });
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle 2FA
app.patch('/api/user/2fa', async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    await user.update({ is2FAEnabled: req.body.is2FAEnabled });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Workspace Member
app.post('/api/workspace-members', async (req, res) => {
  try {
    const member = await WorkspaceMember.create({
      ...req.body
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- Analytics Routes ---
app.get('/api/analytics', async (req, res) => {
  try {
    const trends = await ProductivityTrend.findAll({ order: [['id', 'ASC']] });
    const stat = await AnalyticsStat.findOne(); // Assuming single row for global stats
    const bottlenecks = await BottleneckInsight.findAll({ order: [['id', 'ASC']] });
    const benchmarks = await PerformanceBenchmark.findAll({ order: [['id', 'ASC']] });
    
    res.json({
      trends,
      stat,
      bottlenecks,
      benchmarks
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Billing Routes ---
app.get('/api/billing', async (req, res) => {
  try {
    const plans = await SubscriptionPlan.findAll({ order: [['id', 'ASC']] });
    const account = await BillingAccount.findOne({ include: [{ model: SubscriptionPlan }] });
    const payment = await PaymentMethod.findOne();
    const invoices = await Invoice.findAll();
    
    res.json({
      plans,
      account,
      payment,
      invoices
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/billing/payment-method', async (req, res) => {
  try {
    const payment = await PaymentMethod.findOne();
    if (!payment) return res.status(404).json({ error: 'Payment method not found' });
    
    await payment.update(req.body);
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Meeting Summary Routes ---
app.get('/api/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.findAll({
      include: [
        { model: MeetingPivot, as: 'pivots' },
        { model: MeetingExtraction, as: 'extractions' },
        { model: MeetingAttendee, as: 'attendees' }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Analytics Routes ---
app.get('/api/analytics', async (req, res) => {
  try {
    const trends = await ProductivityTrend.findAll({ order: [['id', 'ASC']] });
    const stat = await AnalyticsStat.findOne();
    const bottlenecks = await BottleneckInsight.findAll();
    const benchmarks = await PerformanceBenchmark.findAll();

    res.json({
      trends,
      stat,
      bottlenecks,
      benchmarks
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Knowledge Base Routes ---
app.get('/api/knowledge', async (req, res) => {
  try {
    const assets = await KnowledgeAsset.findAll({
      include: [{ model: KnowledgeInsight, as: 'insight' }],
      order: [['createdAt', 'DESC']]
    });
    const stats = await KnowledgeBaseStat.findOne();
    
    res.json({ assets, stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Dashboard Routes ---
app.get('/api/dashboard', async (req, res) => {
  try {
    const metrics = await DashboardMetric.findAll();
    const insights = await DashboardInsight.findAll();
    const alerts = await DashboardAlert.findAll();
    const productivity = await ProductivityScore.findAll({ order: [['id', 'ASC']] });
    
    // Aggregating Projects
    const projects = await Project.findAll({
      include: [
        { model: Task, as: 'tasks' },
        { model: Member, as: 'members' }
      ]
    });

    const activeProjectsCount = projects.length;
    // Mock critical deadlines for now or filter tasks
    const criticalDeadlinesCount = await Task.count({ where: { status: 'Critical' } }) || 1;

    res.json({
      summary: {
        activeProjectsCount,
        criticalDeadlinesCount
      },
      metrics,
      insights,
      projects,
      productivity,
      alerts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL Connected...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log('Error: ' + err));
