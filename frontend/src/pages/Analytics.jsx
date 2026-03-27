import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  BarChart2, 
  TrendingUp, 
  AlertCircle, 
  Zap, 
  Clock, 
  Users, 
  ArrowUpRight, 
  MoreHorizontal,
  ChevronDown,
  Download,
  Search,
  Send,
  Sparkles,
  MousePointer2,
  Play
} from 'lucide-react';

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900 relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-6 md:p-10 max-w-[1600px] mx-auto w-full">
          
          {/* Top Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight mb-3">Analytics & Insights</h1>
              <p className="text-slate-500 text-sm font-bold opacity-75">Real-time performance metrics and AI-curated workforce optimization.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-3 bg-blue-50/50 text-[#2563EB] font-black text-xs rounded-xl hover:bg-blue-100/50 transition-all flex items-center gap-2 border border-blue-100 shadow-sm">
                <Clock size={16} />
                Last 30 Days
                <ChevronDown size={14} />
              </button>
              <button className="px-6 py-3 bg-[#2563EB] text-white font-black text-xs rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 active:scale-95">
                <Download size={16} />
                Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-8 mb-10">
            {/* Productivity Trends Card */}
            <section className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm relative overflow-hidden group">
               <div className="flex items-center justify-between mb-12">
                 <div>
                   <h2 className="text-xl font-black text-slate-800 tracking-tight">Productivity Trends</h2>
                   <div className="flex items-center gap-6 mt-3">
                     <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-[#1e40af]"></div>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed Tasks</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-blue-100"></div>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Requests</span>
                     </div>
                   </div>
                 </div>
                 <button className="p-2 text-slate-300 hover:text-slate-600 transition-all"><MoreHorizontal size={20} /></button>
               </div>

               {/* Custom Bar Chart View */}
               <div className="flex items-end justify-between h-[320px] mb-8 gap-2 px-2">
                 {[
                   { day: 'MON', completed: 45, requested: 35 },
                   { day: 'TUE', completed: 65, requested: 25 },
                   { day: 'WED', completed: 30, requested: 45 },
                   { day: 'THU', completed: 50, requested: 35 },
                   { day: 'FRI', completed: 85, requested: 10 },
                   { day: 'SAT', completed: 70, requested: 25 },
                   { day: 'SUN', completed: 60, requested: 30 },
                 ].map((bar, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center gap-6 group/bar">
                      <div className="w-full max-w-[42px] flex flex-col-reverse h-[260px] relative">
                        {/* New Requests */}
                        <div 
                          className="w-full bg-blue-50/80 rounded-t-xl transition-all duration-700" 
                          style={{ height: `${bar.requested}%` }}
                        ></div>
                        {/* Completed Tasks */}
                        <div 
                          className="w-full bg-[#1e40af] rounded-b-xl transition-all duration-700 shadow-md" 
                          style={{ height: `${bar.completed}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 tracking-widest">{bar.day}</span>
                   </div>
                 ))}
               </div>
            </section>

            {/* Task Completion Gauge Card */}
            <section className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-black text-slate-800 tracking-tight self-start mb-12">Task Completion</h2>
              
              <div className="relative w-64 h-64 mb-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="105"
                    stroke="#F1F5F9"
                    strokeWidth="32"
                    fill="transparent"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="105"
                    stroke="#2563EB"
                    strokeWidth="32"
                    fill="transparent"
                    strokeDasharray="660"
                    strokeDashoffset="105"
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center translate-y-2">
                   <h3 className="text-6xl font-black text-slate-800 tracking-tighter">84%</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Overall Rate</p>
                </div>
              </div>

              <div className="w-full space-y-5 px-4">
                 {[
                   { label: 'Completed', count: 142, color: 'bg-[#2563EB]' },
                   { label: 'In Progress', count: 48, color: 'bg-indigo-600' },
                   { label: 'Backlog', count: 12, color: 'bg-slate-200' },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-slate-50 transition-all p-1 rounded-xl">
                     <div className="flex items-center gap-3">
                       <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                       <span className="text-xs font-black text-slate-500 opacity-80">{stat.label}</span>
                     </div>
                     <span className="text-xs font-black text-slate-800">{stat.count}</span>
                   </div>
                 ))}
              </div>
            </section>
          </div>

          {/* Bottleneck Detection Section */}
          <section className="mb-12 relative pt-4">
            <div className="flex items-center gap-4 mb-8 px-4">
              <div className="w-14 h-14 bg-[#8b5cf6] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-100">
                <Sparkles size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Bottleneck Detection</h2>
                <p className="text-[13px] font-bold text-slate-400">AI has identified 3 potential friction points in your current workflow.</p>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Review Cycle Lag', severity: 'High Severity', desc: 'The "Final QA" stage is averaging 18.4 hrs delay per task.', action: 'Apply Fix', color: 'border-red-500 text-red-600 bg-red-50', icon: <Clock /> },
                  { title: 'Overallocated Member', severity: 'Resource Alert', desc: 'Alex Rivera is assigned 4 critical-path items simultaneously.', action: 'Redistribute', color: 'border-blue-500 text-blue-600 bg-blue-50', icon: <Users /> },
                  { title: 'Sync Automation', severity: 'Workflow Tip', desc: 'Manual standup updates takes 45 mins daily. Automating via SPAI Voice.', action: 'Enable AI', color: 'border-purple-500 text-purple-600 bg-purple-50', icon: <TrendingUp /> },
                ].map((card, i) => (
                  <div key={i} className={`p-8 rounded-[2.5rem] bg-white border-l-12 ${card.color.split(' ')[0]} shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 min-h-[240px]`}>
                    <div className="flex justify-between items-start mb-6">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${card.color}`}>{card.severity}</span>
                      <div className="text-slate-400 opacity-50 group-hover:opacity-100 transition-opacity">
                        {React.cloneElement(card.icon, { size: 22 })}
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-3">{card.title}</h3>
                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-10 opacity-75">{card.desc}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest cursor-pointer">View analysis</span>
                        <button className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest flex items-center gap-1 group/btn">
                          {card.action}
                          <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* Team Performance Benchmarks Section */}
          <section className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm overflow-hidden">
             <h2 className="text-xl font-black text-slate-800 tracking-tight mb-12">Team Performance Benchmarks</h2>
             
             <div className="overflow-x-auto">
               <div className="min-w-[800px]">
                 {/* Table Head */}
                 <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr] gap-8 bg-slate-50 py-5 px-8 rounded-2xl mb-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Member</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tasks Completed</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Focus Score</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Avg. Velocity</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Trend</p>
                 </div>

                 {/* Table Body */}
                 <div className="space-y-2">
                   {[
                     { name: 'Jordan Doe', tasks: 42, score: 85, color: 'bg-blue-600', velocity: '3.2 days', trend: <ArrowUpRight className="text-blue-500" /> },
                     { name: 'Sarah Kim', tasks: 38, score: 72, color: 'bg-indigo-600', velocity: '2.8 days', trend: <ArrowUpRight className="rotate-90 text-blue-500" /> },
                     { name: 'Marcus Wong', tasks: 29, score: 94, color: 'bg-purple-600', velocity: '4.1 days', trend: <ArrowUpRight className="rotate-180 text-red-400" /> },
                   ].map((row, i) => (
                     <div key={i} className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr] gap-8 py-5 px-8 hover:bg-slate-50 transition-all cursor-default items-center rounded-4xl group">
                        <div className="flex items-center gap-4">
                          <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border border-white shadow-sm">{row.name.split(' ').map(n => n[0]).join('')}</span>
                          <span className="text-sm font-black text-slate-800">{row.name}</span>
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-black text-slate-700">{row.tasks}</span>
                        </div>
                        <div>
                           <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                             <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.score}%` }}></div>
                           </div>
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-black text-slate-700">{row.velocity}</span>
                        </div>
                        <div className="flex justify-end">
                           <div className="text-blue-500 font-bold">
                             {row.trend}
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Analytics;
