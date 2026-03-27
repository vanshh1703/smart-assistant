const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize, Project, Task, Member } = require('./models');

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
        { model: Insight, as: 'insights' }
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
        { model: Insight, as: 'insights' }
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
      projectId: req.params.projectId
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
      projectId: req.params.projectId
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
