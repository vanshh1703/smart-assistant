const { AnalyticsStat, ProductivityTrend, BottleneckInsight, PerformanceBenchmark } = require('./models');

const seedAnalytics = async () => {
  try {
    await AnalyticsStat.destroy({ where: {} });
    await AnalyticsStat.create({
      overallRate: 84,
      completed: 142,
      inProgress: 48,
      backlog: 12
    });

    await ProductivityTrend.destroy({ where: {} });
    await ProductivityTrend.bulkCreate([
      { day: 'MON', completedTasks: 45, newRequests: 20 },
      { day: 'TUE', completedTasks: 52, newRequests: 35 },
      { day: 'WED', completedTasks: 38, newRequests: 42 },
      { day: 'THU', completedTasks: 65, newRequests: 25 },
      { day: 'FRI', completedTasks: 48, newRequests: 30 },
      { day: 'SAT', completedTasks: 20, newRequests: 15 },
      { day: 'SUN', completedTasks: 60, newRequests: 30 }
    ]);

    await BottleneckInsight.destroy({ where: {} });
    await BottleneckInsight.bulkCreate([
      { title: 'Review Cycle Lag', severity: 'High Severity', description: 'The "Final QA" stage is averaging 18.4 hrs delay per task.', actionLabel: 'Apply Fix', colorTheme: 'border-red-500 text-red-600 bg-red-50', iconName: 'Clock' },
      { title: 'Overallocated Member', severity: 'Resource Alert', description: 'Alex Rivera is assigned 4 critical-path items simultaneously.', actionLabel: 'Redistribute', colorTheme: 'border-blue-500 text-blue-600 bg-blue-50', iconName: 'Users' },
      { title: 'Sync Automation', severity: 'Workflow Tip', description: 'Manual standup updates takes 45 mins daily. Automating via SPAI Voice.', actionLabel: 'Enable AI', colorTheme: 'border-purple-500 text-purple-600 bg-purple-50', iconName: 'TrendingUp' }
    ]);

    await PerformanceBenchmark.destroy({ where: {} });
    await PerformanceBenchmark.bulkCreate([
      { name: 'Jordan Doe', avatar: 'jordan', tasksCompleted: 42, focusScore: 85, color: 'bg-blue-600', avgVelocity: '3.2 days', trendRotation: 0, trendColor: 'text-blue-500' },
      { name: 'Sarah Kim', avatar: 'sarah', tasksCompleted: 38, focusScore: 72, color: 'bg-indigo-600', avgVelocity: '2.8 days', trendRotation: 90, trendColor: 'text-blue-500' },
      { name: 'Marcus Wong', avatar: 'marcus', tasksCompleted: 29, focusScore: 94, color: 'bg-purple-600', avgVelocity: '4.1 days', trendRotation: 180, trendColor: 'text-red-400' }
    ]);

    console.log('Analytics data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedAnalytics();
