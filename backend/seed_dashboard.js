const { DashboardMetric, DashboardInsight, DashboardAlert, ProductivityScore, Project, Task, Member } = require('./models');

const seedDashboard = async () => {
  try {
    // Clear old dashboard-only data
    await DashboardMetric.destroy({ where: {} });
    await DashboardInsight.destroy({ where: {} });
    await DashboardAlert.destroy({ where: {} });
    await ProductivityScore.destroy({ where: {} });

    // Seed Metrics
    await DashboardMetric.bulkCreate([
      { label: 'Completion', value: '84%', percentage: 84, trend: '', color: 'bg-blue-600' },
      { label: 'Deep Work', value: '4.2h', percentage: 0, trend: '+12%', color: 'bg-emerald-500' }
    ]);

    // Seed AI Insights
    await DashboardInsight.bulkCreate([
      { title: 'Project Phoenix: Architecture Review', description: 'Critical path bottleneck identified. Priority elevation recommended due to 24h deadline.', severity: 'High Risk', actionLabel: 'Apply Fix', iconType: 'Zap', colorTheme: 'indigo-600' },
      { title: 'Delegate "Icon System" to Marcus', description: 'Marcus has 4 hours of unallocated deep work today. Delegate now to maintain velocity.', severity: 'Suggestion', actionLabel: 'Delegate', iconType: 'User', colorTheme: 'blue-600' }
    ]);

    // Seed Alerts
    await DashboardAlert.bulkCreate([
      { label: 'Phoenix Final Specs', date: 'Today', severity: 'Urgent', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
      { label: 'Design System Update', date: 'In 3 days', severity: 'Normal', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' }
    ]);

    // Seed Productivity Score (7 days)
    await ProductivityScore.bulkCreate([
      { day: 'M', score: 35 },
      { day: 'T', score: 60 },
      { day: 'W', score: 45 },
      { day: 'T', score: 80, isCurrent: true },
      { day: 'F', score: 55 },
      { day: 'S', score: 70 },
      { day: 'S', score: 40 }
    ]);

    // Ensure we have at least 3 active projects
    const projectCount = await Project.count();
    if (projectCount < 3) {
      const p1 = await Project.create({ name: 'SPAI Dashboard', status: 'Active' });
      const p2 = await Project.create({ name: 'Phoenix Redesign', status: 'Active' });
      const p3 = await Project.create({ name: 'Analytics API', status: 'Active' });
      
      // Add some tasks
      await Task.create({ title: 'Finish Chart Logic', status: 'In Progress', ProjectId: p1.id });
      await Task.create({ title: 'Critical Bug Fix', status: 'Critical', ProjectId: p2.id });
    }

    console.log('Dashboard data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDashboard();
