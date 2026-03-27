import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import NewProjectModal from '../components/NewProjectModal';
import { 
  Plus, 
  MoreHorizontal, 
  Clock, 
  CheckCircle2, 
  Circle,
  Layout,
  MessageSquare,
  Sparkles,
  Calendar,
  ChevronRight,
  TrendingUp,
  Activity,
  User,
  ExternalLink,
  FileText,
  CreditCard,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Check
} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [dashRes, meetRes] = await Promise.all([
        fetch('http://localhost:5000/api/dashboard'),
        fetch('http://localhost:5000/api/meetings')
      ]);
      const dashJson = await dashRes.json();
      const meetJson = await meetRes.json();
      setData(dashJson);
      setMeetings(meetJson);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Calendar Logic ---
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date()); // Controls which month is displayed

  if (loading || !data) {
    return (
      <div className="flex bg-[#F8FAFC] min-h-screen items-center justify-center font-black text-slate-400 uppercase tracking-[0.5em]">
        Neural Uplink...
      </div>
    );
  }

  const { summary, metrics, insights, projects, productivity, alerts } = data;

  const navMonth = (direction) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + direction, 1);
    setViewDate(newDate);
  };

  const isSameDay = (d1, d2) => 
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const getDaysInMonthGrid = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Day of the week for the first day (0-6, Sun-Sat)
    // We want Mon-Sun (0-6), so:
    let startDayOffset = firstDay.getDay() - 1;
    if (startDayOffset < 0) startDayOffset = 6; // Sunday becomes index 6

    const days = [];
    // Previous month padding
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOffset; i > 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i + 1));
    }

    // Current month days
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      days.push(new Date(year, month, i));
    }

    // Next month padding (to fill 42 cells)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const daysInGrid = getDaysInMonthGrid();

  const formatDateKey = (d) => `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;

  const meetingsByDate = meetings.reduce((acc, meeting) => {
    const dateKey = meeting.date; // Assuming YYYY-MM-DD
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push({
      title: meeting.title,
      time: meeting.time,
      color: meeting.color || 'bg-blue-500',
      icon: <MessageSquare size={12} />
    });
    return acc;
  }, {});

  const activeEvents = meetingsByDate[formatDateKey(selectedDate)] || [];

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900 relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-6 md:p-10 max-w-[1400px] mx-auto w-full">
          
          {/* Welcome Section */}
          <div className="flex flex-col xl:flex-row justify-between items-start mb-12 gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter mb-4">Good morning, Alex.</h1>
              <p className="text-slate-500 font-bold text-lg opacity-80 leading-relaxed">
                You have <span className="text-blue-600 font-extrabold border-b-2 border-blue-100">{summary.activeProjectsCount} active projects</span> and {summary.criticalDeadlinesCount} critical deadline approaching today.
              </p>
            </div>
            
            <div className="flex gap-6 w-full xl:w-auto">
              {metrics.map((metric, i) => (
                <div key={metric.id} className="bg-white p-6 rounded-4xl shadow-sm border border-slate-50 flex-1 xl:min-w-[180px] group hover:scale-[1.02] transition-all cursor-default">
                  <div className="flex justify-between items-start mb-4">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{metric.label}</p>
                     <ChartPulse color={metric.color} />
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    {metric.trend && (
                      <span className="text-[10px] text-emerald-600 font-black bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1 shrink-0">
                        <TrendingUp size={12} strokeWidth={3} /> {metric.trend}
                      </span>
                    )}
                    <span className="text-3xl font-black text-slate-800 tracking-tighter">{metric.value}</span>
                    {metric.percentage > 0 && (
                      <div className="w-full bg-slate-50 h-2 rounded-full mb-2 p-0.5 overflow-hidden border border-slate-50 max-w-[60px]">
                        <div className={`${metric.color} h-full rounded-full shadow-lg transition-all duration-1000`} style={{ width: `${metric.percentage}%` }}></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10">
            {/* Left Column */}
            <div className="space-y-10">
              
              {/* AI Priority Row */}
              <section className="bg-white rounded-[2.8rem] p-10 shadow-sm border border-slate-50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-white">
                      <Sparkles size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800 tracking-tight">AI Insights</h2>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Smart Priority Queue</p>
                    </div>
                  </div>
                  <button className="text-[11px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-all flex items-center gap-2">
                    Review All <ChevronRight size={14} strokeWidth={3} />
                  </button>
                </div>
                
                <div className="space-y-6 relative z-10">
                  {insights.map((insight) => (
                    <div key={insight.id} className="flex items-center gap-6 p-6 bg-white border border-slate-50 rounded-4xl shadow-[0_15px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer group">
                      <div className={`w-14 h-14 bg-${insight.colorTheme} rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0`}>
                        {insight.iconType === 'Zap' ? <Zap size={24} fill="white" /> : <User size={24} />}
                      </div>
                      <div className="flex-1 pr-6">
                        <h3 className="text-base font-black text-slate-800 mb-1 group-hover:text-blue-600 transition-colors tracking-tight">{insight.title}</h3>
                        <p className="text-sm font-bold text-slate-400 leading-snug">{insight.description}</p>
                      </div>
                      <div className="flex flex-col items-end shrink-0 gap-2">
                         <span className={`px-2.5 py-1 ${insight.severity === 'High Risk' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'} text-[9px] font-black uppercase tracking-widest rounded-lg`}>{insight.severity}</span>
                         <div className="text-[11px] font-black text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            {insight.actionLabel} <ArrowRight size={12} strokeWidth={3} />
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Board Headers Section */}
              <section className="bg-white rounded-[2.8rem] p-10 shadow-sm border border-slate-50">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-3">
                     <h2 className="text-2xl font-black text-slate-800 tracking-tighter">Active Projects</h2>
                     <span className="bg-slate-50 text-slate-400 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-slate-100">4 Active</span>
                   </div>
                   <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                      <button className="p-2 px-4 bg-white text-slate-800 rounded-xl shadow-sm text-[10px] font-black uppercase tracking-widest">Board</button>
                      <button className="p-2 px-4 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors">Grid</button>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                   {projects.slice(0, 3).map((proj, i) => {
                     const totalTasks = proj.tasks?.length || 0;
                     const completedTasks = proj.tasks?.filter(t => t.status === 'Completed').length || 0;
                     const progress = totalTasks > 0 ? Math.round((completedTasks/totalTasks) * 100) : 0;
                     const color = i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-indigo-600' : 'bg-purple-600';

                     return (
                      <div key={proj.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all cursor-pointer group">
                          <div className="flex justify-between items-start mb-8">
                             <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100`}>
                               {i === 0 ? <Zap size={18} fill="white" /> : i === 1 ? <Layout size={18} /> : <Activity size={18} />}
                             </div>
                             <button className="text-slate-300 hover:text-slate-800 transition-colors"><MoreHorizontal size={20} /></button>
                          </div>
                          <h3 className="text-lg font-black text-slate-800 mb-2 truncate group-hover:text-blue-600 transition-colors">{proj.name}</h3>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">{totalTasks - completedTasks} Tasks Remaining</p>
                          
                          <div className="space-y-3">
                             <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
                               <span>Progress</span>
                               <span className="text-slate-800">{progress}%</span>
                             </div>
                             <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-50">
                                <div className={`h-full ${color} rounded-full shadow-sm`} style={{ width: `${progress}%` }}></div>
                             </div>
                          </div>

                          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                              <div className="flex -space-x-2">
                                 {proj.members?.slice(0, 3).map((member, idx) => (
                                   <div key={member.id} className="w-7 h-7 rounded-full border-2 border-white shadow-sm bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400 overflow-hidden">
                                      <img src={`https://i.pravatar.cc/100?u=${member.id}`} alt="avatar" />
                                   </div>
                                 ))}
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors flex items-center gap-1">Open <ArrowUpRight size={12} strokeWidth={3} /></span>
                          </div>
                       </div>
                     );
                   })}
                   
                   {/* Create New Project Card */}
                   <div 
                     onClick={() => setIsModalOpen(true)}
                     className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group hover:bg-white hover:border-blue-200 transition-all cursor-pointer min-h-[300px]"
                   >
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 border border-slate-100 mb-6 group-hover:scale-110 group-hover:text-blue-600 group-hover:shadow-lg transition-all">
                        <Plus size={32} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-lg font-black text-slate-400 group-hover:text-slate-800 transition-colors">Start New Project</h3>
                      <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mt-2 px-6 opacity-0 group-hover:opacity-100 transition-opacity">Launch project wizard</p>
                   </div>
                </div>
              </section>

              {/* Productivity Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <section className="bg-white rounded-[2.8rem] p-10 shadow-sm border border-slate-50">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h2 className="text-xl font-black text-slate-800 tracking-tight">Focus Score</h2>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Consistency Tracker</p>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm border border-white">
                       <Activity size={20} strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between h-44 px-2">
                    {productivity.map((item, i) => (
                      <div key={item.id} className="flex flex-col items-center gap-4 w-7 group">
                        <div className="relative w-full h-full overflow-hidden flex items-end">
                          <div 
                            className={`w-full rounded-2xl transition-all duration-700 delay-200 shadow-sm ${item.isCurrent ? 'bg-blue-600 shadow-xl shadow-blue-100' : 'bg-slate-100 hover:bg-slate-200'}`} 
                            style={{ height: `${item.score}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter group-hover:text-slate-800 transition-colors">
                          {item.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-[2.8rem] p-10 shadow-sm border border-slate-50 overflow-hidden relative group">
                  <div className="flex justify-between items-start mb-10">
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Goal Analytics</h2>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Total: 42</span>
                  </div>
                  
                  <div className="flex items-center gap-12 pt-4">
                    {/* Donut Chart Mockup */}
                    <div className="relative w-36 h-36 shrink-0 group-hover:scale-105 transition-transform duration-500">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F8FAFC" strokeWidth="4"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="45 100" className="transition-all duration-1000"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#818CF8" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-45"  className="transition-all duration-1000 delay-200"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-70"  className="transition-all duration-1000 delay-400"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pb-1">
                        <span className="text-3xl font-black tracking-tighter text-slate-800">12</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Pending</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-5 flex-1">
                      {[
                        { label: 'Development', color: 'bg-blue-600', val: '45%' },
                        { label: 'Reviewing', color: 'bg-indigo-400', val: '25%' },
                        { label: 'Backlog', color: 'bg-amber-500', val: '15%' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between group cursor-default">
                          <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 ${item.color} rounded shadow-sm`}></div>
                            <span className="text-[12px] font-black text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{item.label}</span>
                          </div>
                          <span className="text-[12px] font-black text-slate-800 font-mono">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Sidebar Column */}
            <aside className="space-y-10">
              
              {/* Modern Calendar / Schedule Section */}
              <section className="bg-white rounded-[2.8rem] p-8 shadow-sm border border-slate-50 overflow-hidden group">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Calendar</h3>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => navMonth(-1)}
                      className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-300 hover:text-blue-600 transition-all border border-transparent hover:border-slate-100"
                    >
                      <ChevronRight size={14} strokeWidth={3} className="rotate-180" />
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 min-w-[80px] text-center">
                      {viewDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                    <button 
                      onClick={() => navMonth(1)}
                      className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-300 hover:text-blue-600 transition-all border border-transparent hover:border-slate-100"
                    >
                      <ChevronRight size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-y-2 gap-x-1 mb-6 px-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                    <span key={d} className="text-[9px] font-black text-slate-300 text-center uppercase py-2">{d}</span>
                  ))}
                  {daysInGrid.map((date, idx) => {
                    const isSelected = isSameDay(date, selectedDate);
                    const isToday = isSameDay(date, today);
                    const isCurrentMonth = date.getMonth() === viewDate.getMonth();
                    const hasEvents = meetingsByDate[formatDateKey(date)]?.length > 0;
                    const eventColor = hasEvents ? meetingsByDate[formatDateKey(date)][0].color : 'bg-blue-300';

                    return (
                      <div key={idx} className="flex flex-col items-center gap-0.5">
                         <button 
                           onClick={() => setSelectedDate(date)}
                           className={`w-8 h-8 flex items-center justify-center text-[11px] font-black rounded-xl cursor-pointer transition-all ${
                             isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105' : 
                             isToday ? 'bg-blue-50 text-blue-600 font-extrabold' : 
                             isCurrentMonth ? 'text-slate-800 hover:bg-slate-50' : 'text-slate-200 hover:bg-slate-50/50'
                           }`}
                         >
                           {date.getDate()}
                         </button>
                         <div className="h-1 flex items-center justify-center gap-0.5">
                           {hasEvents && (
                             <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-blue-400' : eventColor}`}></div>
                           )}
                         </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-8 relative pl-2 min-h-[180px]">
                  {activeEvents.length > 0 && <div className="absolute left-[7.5px] top-2 bottom-6 w-0.5 bg-slate-50 border-l border-slate-100"></div>}
                  
                  {activeEvents.length > 0 ? (
                    activeEvents.map((inv, i) => (
                      <div key={i} className="relative pl-8 group/item cursor-pointer">
                        <div className={`absolute left-[-5px] top-1.5 w-3 h-3 rounded-full border-4 border-white shadow-sm transition-all group-hover/item:scale-125 ${inv.color}`}></div>
                        <h4 className="text-sm font-black text-slate-800 tracking-tight group-hover/item:text-blue-600 transition-colors uppercase">{inv.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{inv.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 opacity-40">
                       <Clock size={32} className="text-slate-200 mb-3" />
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No events scheduled</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Deadlines Quick Glance */}
              <section className="bg-white rounded-[2.8rem] p-8 shadow-sm border border-slate-50 overflow-hidden h-fit">
                <div className="flex justify-between items-center mb-8 px-2">
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">Alerts</h3>
                  <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg uppercase tracking-widest">Urgent</span>
                </div>
                
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`flex items-center justify-between p-5 rounded-[1.8rem] ${alert.bg} border ${alert.border} group cursor-pointer transition-all hover:scale-[1.03]`}>
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center ${alert.color}`}>
                             <Calendar size={18} strokeWidth={2.5} />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-800 tracking-tight">{alert.label}</h4>
                            <p className={`text-[10px] font-black uppercase mt-1 tracking-widest ${alert.color}`}>{alert.date}</p>
                          </div>
                       </div>
                       <ChevronRight size={14} className="text-slate-300 group-hover:mr-[-4px] transition-all" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Smart Automation Card (Dark Theme) */}
              <section className="bg-slate-900 rounded-[2.8rem] p-10 shadow-2xl text-white relative overflow-hidden group/smart cursor-default">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none group-hover/smart:scale-125 transition-transform duration-1000"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none"></div>
                 
                 <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/50 text-white">
                       <Sparkles size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-base font-black tracking-tight uppercase">Smart Block</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">AI Recommendation</p>
                    </div>
                 </div>

                 <p className="text-sm font-bold text-slate-300 leading-relaxed font-sans mb-10 relative z-10">
                    &quot;Your peak productivity window today is <span className="text-white border-b border-blue-500/50 font-black">2 PM - 4 PM</span>. I've automatically cleared all meetings during this block.&quot;
                 </p>

                 <div className="relative z-10">
                    <button className="w-full py-4 bg-white/10 hover:bg-white/15 border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] shadow-xl group/btn flex items-center justify-center gap-2">
                       Acknowledge Block <Check size={14} strokeWidth={3} className="text-blue-400" />
                    </button>
                    <button className="w-full mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Adjust Manually</button>
                 </div>
              </section>
            </aside>
          </div>
        </main>
      </div>

      <NewProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData}
      />
    </div>
  );
};

/* Helper Components */
const ChartPulse = ({ color }) => (
  <div className="flex items-center gap-1.5 h-3">
    {[0,1,2].map(i => (
      <div key={i} className={`w-1 h-${i+1} ${color} rounded-full animate-pulse-slow`} style={{ animationDelay: `${i*0.2}s` }}></div>
    ))}
  </div>
);

export default Dashboard;
