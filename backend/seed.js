const { sequelize, Project, Task, Member, Insight } = require('./models');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // Reset DB

    const project = await Project.create({
      title: 'Neo-Bank Mobile Interface',
      description: 'Architecting the digital-first wealth management suite including real-time asset tracking and AI portfolio curation for Gen-Z investors.',
      badge: 'Active Project',
      projectIdStr: 'SPAI-882',
      color: 'bg-slate-900',
      timelineRisk: 'Low',
      timelineRiskPercent: 20,
      codeQuality: 98,
      openIssues: 14,
      openIssuesPercent: 65,
      velocityTitle: 'Velocity Spike',
      velocitySubtitle: '+15% week-over-week'
    });

    // Create AI Insights
    await Insight.bulkCreate([
      {
        projectId: project.id,
        type: 'Urgent Priority',
        title: 'Crypto Wallet API Sync',
        description: 'The node-cluster requires immediate port mapping to resolve latency issues reported in the morning sprint.',
        metricLabel: 'MATCH',
        metricValue: '98%',
        assignedUsers: [{u: 'a'}, {u: 'b'}],
        dueTime: 'Due in 4h'
      },
      {
        projectId: project.id,
        type: 'Efficiency Play',
        title: 'Refactor Auth Middleware',
        description: 'Combining repetitive validation gates into a single-pass service could reduce latency by 15% across all endpoints.',
        metricLabel: 'SAVING',
        metricValue: '2.4h',
        assignedUsers: [],
        dueTime: ''
      }
    ]);

    // Create Tasks
    await Task.bulkCreate([
      { 
        projectId: project.id,
        title: 'Landing Page v2 Feedback', 
        status: 'Review Needed', 
        tag: 'Design', 
        assignedUsers: [{u: 'task00'}, {u: 'task01'}, {u: 'task02'}], 
        commentCount: 4 
      },
      { 
        projectId: project.id,
        title: 'Auth Logic Validation', 
        status: 'Review Needed', 
        tag: 'Dev', 
        assignedUsers: [{u: 'task10'}], 
        commentCount: 5 
      },
      { 
        projectId: project.id,
        title: 'Main Dashboard UI Refinement', 
        description: 'Applying high-fidelity visual updates and backdrop-blur effects.',
        status: 'Active Sprint', 
        tag: 'Dev', 
        progress: 72,
        assignedUsers: [{u: 'blue1'}, {u: 'blue2'}], 
        commentCount: 0
      },
      { 
        projectId: project.id,
        title: 'Style Guide Foundation', 
        description: 'Color palette, typography, and base grids.',
        status: 'Completed', 
        tag: 'Dev', 
        assignedUsers: [], 
        commentCount: 0
      }
    ]);

    // Create Members
    await Member.bulkCreate([
      { projectId: project.id, name: 'Marcus Wong', status: 'In Design', color: 'bg-indigo-500', avatarId: 'team0' },
      { projectId: project.id, name: 'Sarah Kim', status: 'Refactoring API', color: 'bg-emerald-500', avatarId: 'team1' },
      { projectId: project.id, name: 'Jordan Doe', status: 'Idle', color: 'bg-slate-300', avatarId: 'team2' }
    ]);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();
