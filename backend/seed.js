const { sequelize, Project, Task, Member, Insight, User, Session, NotificationPreference, WorkspaceMember, ProductivityTrend, AnalyticsStat, BottleneckInsight, PerformanceBenchmark, SubscriptionPlan, BillingAccount, PaymentMethod, Invoice, ActivityLog, Meeting, MeetingPivot, MeetingExtraction, MeetingAttendee } = require('./models');

const seed = async () => {
  try {
    // alter:true safely updates schema without dropping existing data
    await sequelize.sync({ alter: true });

    // --- Guard: Only seed if the Project table is empty ---
    const existingProjects = await Project.count();
    if (existingProjects > 0) {
      console.log(`Database already has ${existingProjects} project(s). Skipping seed to preserve existing data.`);
      return;
    }

    console.log('Empty database detected. Running full seed...');
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

    // SETTINGS / GLOBAL SEED DATA
    const user = await User.create({
      firstName: 'Alex',
      lastName: 'Thompson',
      email: 'alex.t@spai-works.com',
      password: 'hashed_password_placeholder', // Mocked
      avatar: 'alex',
      role: 'Admin',
      accountType: 'Pro Account',
      title: 'Product Lead @ SPAI',
      securityScore: 85,
      is2FAEnabled: false
    });

    await Session.bulkCreate([
      { UserId: user.id, deviceName: 'MacBook Pro 16"', location: 'San Francisco, USA', status: 'Active now', iconUrl: 'Monitor' },
      { UserId: user.id, deviceName: 'iPhone 15 Pro', location: 'San Francisco, USA', status: '2 hours ago', iconUrl: 'Smartphone' }
    ]);

    await NotificationPreference.bulkCreate([
      { UserId: user.id, type: 'email', title: 'Email Alerts', description: 'Project updates and billing reports.', active: true, color: 'bg-[#2563EB]', icon: 'Mail', customBg: '' },
      { UserId: user.id, type: 'push', title: 'Push Notifications', description: 'Real-time collaboration alerts.', active: true, color: 'bg-[#2563EB]', icon: 'Zap', customBg: '' },
      { UserId: user.id, type: 'ai', title: 'AI Insight Alerts', description: 'Predictive risk & smart suggestions.', active: false, color: 'bg-[#8b5cf6]', icon: 'Sparkles', customBg: 'bg-purple-50' }
    ]);

    await WorkspaceMember.bulkCreate([
      { name: 'Alex Thompson', email: 'alex.t@spai-works.com', role: 'Admin', roleColor: 'bg-slate-100 text-slate-700', status: 'Online', statusColor: 'text-emerald-500', avatar: 'alex' },
      { name: 'Sarah Kolis', email: 'sarah.k@spai-works.com', role: 'Manager', roleColor: 'bg-slate-100 text-slate-700', status: 'Away', statusColor: 'text-slate-400', avatar: 'sarah' },
      { name: 'Mila Jensen', email: 'mila.j@spai-works.com', role: 'Member', roleColor: 'bg-slate-100 text-slate-700', status: 'Online', statusColor: 'text-emerald-500', avatar: 'mila' }
    ]);

    // Seeding Analytics Data
    await ProductivityTrend.bulkCreate([
      { day: 'MON', completedTasks: 45, newRequests: 35 },
      { day: 'TUE', completedTasks: 65, newRequests: 25 },
      { day: 'WED', completedTasks: 30, newRequests: 45 },
      { day: 'THU', completedTasks: 50, newRequests: 35 },
      { day: 'FRI', completedTasks: 85, newRequests: 10 },
      { day: 'SAT', completedTasks: 70, newRequests: 25 },
      { day: 'SUN', completedTasks: 60, newRequests: 30 },
    ]);

    await AnalyticsStat.create({
      overallRate: 84,
      completed: 142,
      inProgress: 48,
      backlog: 12
    });

    await BottleneckInsight.bulkCreate([
      { title: 'Review Cycle Lag', severity: 'High Severity', description: 'The "Final QA" stage is averaging 18.4 hrs delay per task.', actionLabel: 'Apply Fix', colorTheme: 'border-red-500 text-red-600 bg-red-50', iconName: 'Clock' },
      { title: 'Overallocated Member', severity: 'Resource Alert', description: 'Alex Rivera is assigned 4 critical-path items simultaneously.', actionLabel: 'Redistribute', colorTheme: 'border-blue-500 text-blue-600 bg-blue-50', iconName: 'Users' },
      { title: 'Sync Automation', severity: 'Workflow Tip', description: 'Manual standup updates takes 45 mins daily. Automating via SPAI Voice.', actionLabel: 'Enable AI', colorTheme: 'border-purple-500 text-purple-600 bg-purple-50', iconName: 'TrendingUp' }
    ]);

    await PerformanceBenchmark.bulkCreate([
      { name: 'Jordan Doe', avatar: 'jordan', tasksCompleted: 42, focusScore: 85, color: 'bg-blue-600', avgVelocity: '3.2 days', trendRotation: 0, trendColor: 'text-blue-500' },
      { name: 'Sarah Kim', avatar: 'sarah', tasksCompleted: 38, focusScore: 72, color: 'bg-indigo-600', avgVelocity: '2.8 days', trendRotation: 90, trendColor: 'text-blue-500' },
      { name: 'Marcus Wong', avatar: 'marcus', tasksCompleted: 29, focusScore: 94, color: 'bg-purple-600', avgVelocity: '4.1 days', trendRotation: 180, trendColor: 'text-red-400' }
    ]);

    // Seeding Billing Data
    const basicPlan = await SubscriptionPlan.create({
      name: 'Basic', price: '$19', desc: 'For individual creators', features: ['5 Active Projects', 'Basic AI Summaries', '5GB Cloud Storage'], btnText: 'Downgrade', isActive: false, color: 'bg-slate-100 text-slate-500', accent: null
    });
    
    const proPlan = await SubscriptionPlan.create({
      name: 'Pro', price: '$49', desc: 'For growing startups', features: ['Unlimited Projects', '100GB Storage', 'Advanced AI Analytics', 'Priority Support'], btnText: 'Active', isActive: true, color: 'bg-blue-600 text-white', accent: 'border-blue-500 ring-4 ring-blue-50'
    });

    const entPlan = await SubscriptionPlan.create({
      name: 'Enterprise', price: '$149', desc: 'Scale without limits', features: ['Dedicated Account Manager', 'Custom API Access', 'SOC2 Compliance Tools'], btnText: 'Upgrade Now', isActive: false, color: 'bg-slate-900 text-white', accent: null
    });

    await BillingAccount.create({
      renewalDateStr: 'Oct 12, 2023',
      creditsUsed: 8420,
      creditsTotal: 10000,
      optimizationTip: "You're utilizing 84% of your Pro Plan credits. Switching to the Enterprise plan could save you up to 15% on overage costs next month.",
      SubscriptionPlanId: proPlan.id
    });

    await PaymentMethod.create({
      cardType: 'Visa',
      last4: '4242',
      expiry: '12/25',
      cardholderName: 'Alex Rivera',
      billingEmail: 'billing@spai.io',
      vatNumber: ''
    });

    await Invoice.bulkCreate([
      { invoiceIdStr: 'INV-2023-009', dateStr: 'Sep 12, 2023', amountStr: '$49.00', status: 'Paid' },
      { invoiceIdStr: 'INV-2023-008', dateStr: 'Aug 12, 2023', amountStr: '$49.00', status: 'Paid' },
      { invoiceIdStr: 'INV-2023-007', dateStr: 'Jul 12, 2023', amountStr: '$49.00', status: 'Paid' },
      { invoiceIdStr: 'INV-2023-006', dateStr: 'Jun 12, 2023', amountStr: '$19.00', status: 'Paid' }
    ]);

    // --- Create Project Activity Logs ---
    await ActivityLog.bulkCreate([
      {
        ProjectId: project.id,
        action: 'Project Blueprint Finalized',
        details: 'Initial system architecture approved by stakeholders.',
        user: 'Alex Rivera',
        type: 'complete',
        timestamp: new Date(Date.now() - 3600000 * 48) // 48h ago
      },
      {
        ProjectId: project.id,
        action: 'Core Infrastructure Deploy',
        details: 'Staging environment is live and operational.',
        user: 'Sarah Chen',
        type: 'update',
        timestamp: new Date(Date.now() - 3600000 * 24) // 24h ago
      },
      {
        ProjectId: project.id,
        action: 'Design System Update',
        details: 'Color tokens and typography scales synchronized.',
        user: 'Jordan Smith',
        type: 'update',
        timestamp: new Date(Date.now() - 3600000 * 12) // 12h ago
      },
      {
        ProjectId: project.id,
        action: 'Critical Bug Resolved',
        details: 'Fixed auth token expiration handling in mobile view.',
        user: 'Alex Rivera',
        type: 'alert',
        timestamp: new Date(Date.now() - 3600000 * 2) // 2h ago
      }
    ]);

    // --- Create Meeting Summaries ---
    const meeting1 = await Meeting.create({
      title: 'Neo-Bank: Q1 Product Roadmap & Strategy Alignment',
      dateStr: 'Dec 14, 2023',
      duration: '45m',
      featuredExtract: '"The integration of AI portfolio curation is 15% ahead of schedule. We are shifting from acquisition-heavy focus to \'User Retainment\' efficiency for the Q1-Q2 transition."',
      alignmentFactor: 92,
      sentiment: 'Positive',
      isFeatured: true
    });

    await MeetingPivot.bulkCreate([
      { MeetingId: meeting1.id, title: 'User Retainment Priority', body: 'Stakeholders reached consensus to deprioritize acquisition-spend by 30% in favor of developing advanced churn-prediction models.' },
      { MeetingId: meeting1.id, title: 'API v3 Stability Launch', body: 'The backend architecture for v3 is certified stable for a closed-beta start next Tuesday. Documentation sync is pending.' },
      { MeetingId: meeting1.id, title: 'Clean Editorial UI aesthetics', body: 'Approval granted for removing all table-lines in favor of whitespace-driven hierarchical depth across the dashboard.' }
    ]);

    await MeetingExtraction.bulkCreate([
      { MeetingId: meeting1.id, title: 'Update PRD Document', assignee: 'Alex', priority: 'High', color: 'bg-emerald-500' },
      { MeetingId: meeting1.id, title: 'Refactor UI Grids', assignee: 'Marcus', priority: 'Medium', color: 'bg-blue-500' },
      { MeetingId: meeting1.id, title: 'API Beta Certification', assignee: 'Sarah', priority: 'Critical', color: 'bg-red-500' }
    ]);

    await MeetingAttendee.bulkCreate([
      { MeetingId: meeting1.id, name: 'Alex', avatar: 'https://i.pravatar.cc/100?u=meet1' },
      { MeetingId: meeting1.id, name: 'Sarah', avatar: 'https://i.pravatar.cc/100?u=meet2' },
      { MeetingId: meeting1.id, name: 'Marcus', avatar: 'https://i.pravatar.cc/100?u=meet3' },
      { MeetingId: meeting1.id, name: 'Jordan', avatar: 'https://i.pravatar.cc/100?u=meet4' }
    ]);

    // Past Meetings
    const meeting2 = await Meeting.create({
      title: 'Weekly Sync: Marketing v Development',
      dateStr: 'Dec 10, 2023',
      duration: '25m',
      featuredExtract: 'Discussed bridging the gap between feature-release velocity and marketing-campaign cycles.',
      alignmentFactor: 88,
      sentiment: 'Positive',
      isFeatured: false
    });

    const meeting3 = await Meeting.create({
      title: 'Client Kickoff: Atlas Venture Capital',
      dateStr: 'Dec 08, 2023',
      duration: '1h 12m',
      featuredExtract: 'Established communication protocols and shared product-vision for the upcoming funding round.',
      alignmentFactor: 75,
      sentiment: 'Focus Required',
      isFeatured: false
    });

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();
