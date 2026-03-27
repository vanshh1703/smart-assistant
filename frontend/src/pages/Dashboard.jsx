import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
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
  CreditCard
} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans text-gray-900 relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-4 md:p-8 pb-12">
          {/* Welcome Row */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Good morning, Alex.</h1>
              <p className="text-gray-500 mt-2 font-medium text-sm md:text-base">
                You have <span className="text-blue-600 font-bold">4 active projects</span> and 1 urgent deadline today.
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex-1 md:min-w-[140px]">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Completion</p>
                <div className="flex items-end gap-2">
                  <span className="text-xl md:text-2xl font-bold">84%</span>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full mb-1.5 max-w-[60px] md:max-w-[80px]">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex-1 md:min-w-[140px]">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Deep Work</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl md:text-2xl font-bold">4.2h</span>
                  <span className="text-[10px] text-green-500 font-bold bg-green-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shrink-0">
                    <TrendingUp size={10} /> +12%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              
              {/* AI Recommendations */}
              <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <Sparkles size={14} />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Layout size={14} />
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 tracking-tight leading-none">AI Recommendations</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 bg-purple-50 rounded-2xl border border-purple-100 group cursor-pointer hover:bg-purple-100 transition-all duration-300">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                      <Clock size={20} />
                    </div>
                    <div className="flex-1 pr-6">
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Prioritize "Project Phoenix" architecture review</h3>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">Due to an upcoming deadline in 24h and high complexity rating.</p>
                    </div>
                    <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="w-full h-full bg-linear-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-[10px] font-bold">AI Visual</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 animate-pulse-slow border border-gray-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                      <User size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">Delegate "Asset Export" to Sarah</h3>
                      <p className="text-sm text-gray-500 mt-1">She has the highest bandwidth today based on meeting schedules.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Project Board */}
              <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Project Board</h2>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"><Activity size={20} /></button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"><Layout size={20} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* TO DO Column */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">To Do</span>
                        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors"><Plus size={16} /></button>
                    </div>
                    
                    {/* Task Card 1 */}
                    <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
                      <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded-md mb-3 inline-block uppercase tracking-tight">High</span>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">Define API Endpoints for Mobile App</h4>
                      <div className="flex items-center justify-between mt-auto">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-6 h-6 rounded-full border border-white" alt="Avatar" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Oct 12</span>
                      </div>
                    </div>

                    {/* Task Card 2 */}
                    <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md mb-3 inline-block uppercase tracking-tight">Design</span>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">Moodboard for Dashboard v2</h4>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-tighter overflow-hidden">
                          AN
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Oct 15</span>
                      </div>
                    </div>
                  </div>

                  {/* IN PROGRESS Column */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">In Progress</span>
                        <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
                      </div>
                    </div>
                    
                    {/* Task Card 1 (Active) */}
                    <div className="bg-white border-2 border-blue-600 p-5 rounded-2xl shadow-lg shadow-blue-50 cursor-pointer">
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md mb-3 inline-block uppercase tracking-tight">Dev</span>
                      <h4 className="font-bold text-gray-900 mb-3">Database Schema Migration</h4>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex -space-x-2">
                          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-6 h-6 rounded-full border-2 border-white shadow-sm" alt="Avatar" />
                          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-6 h-6 rounded-full border-2 border-white shadow-sm" alt="Avatar" />
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase">Oct 10</span>
                      </div>
                    </div>
                  </div>

                  {/* DONE Column */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs font-bold uppercase tracking-widest">Done</span>
                        <span className="bg-gray-100 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">8</span>
                      </div>
                    </div>
                    
                    {/* Completed Item */}
                    <div className="p-5 border border-gray-100 bg-gray-50/50 rounded-2xl opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                      <h4 className="font-bold text-gray-700 mb-4 line-through">Client Kickoff Meeting</h4>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase">
                        <CheckCircle2 size={12} />
                        <span>Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
                <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 tracking-tight">Productivity Trends</h2>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Last 7 Days</p>
                    </div>
                  </div>
                  
                  {/* Bar Chart Mockup */}
                  <div className="flex items-end justify-between h-40 pt-4 px-2">
                    {[35, 60, 45, 80, 55, 70, 40].map((height, i) => (
                      <div key={i} className="flex flex-col items-center gap-3 w-6 group cursor-pointer">
                        <div className="relative w-full overflow-hidden">
                          <div 
                            className={`w-full rounded-full transition-all duration-700 delay-200 ${i === 3 ? 'bg-blue-600 shadow-lg shadow-blue-100' : 'bg-blue-100 group-hover:bg-blue-200'}`} 
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-8">Task Distribution</h2>
                  <div className="flex items-center gap-10">
                    {/* Donut Chart Mockup */}
                    <div className="relative w-32 h-32 shrink-0">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f3f4f6" strokeWidth="3.5"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeDasharray="45 100"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#a855f7" strokeWidth="3.5" strokeDasharray="30 100" strokeDashoffset="-45"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="25 100" strokeDashoffset="-75"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm font-bold leading-none">12</span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tight mt-1">Tasks</span>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-blue-600 rounded"></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-gray-700">Research</span>
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">(45%)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-purple-500 rounded"></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-gray-700">Design</span>
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">(30%)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-amber-500 rounded"></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-gray-700">Coding</span>
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">(25%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Right Column / Sidebar */}
            <aside className="space-y-8">
              {/* Schedule */}
              <section className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-50 flex flex-col h-fit">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900">Schedule</h3>
                  <div className="flex items-center gap-1.5 text-blue-600 cursor-pointer hover:underline">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Oct 2023</span>
                    <ChevronRight size={14} />
                  </div>
                </div>

                {/* Calendar Grid (Simplified) */}
                <div className="grid grid-cols-7 gap-y-3 gap-x-1 mb-8">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                    <span key={d} className="text-[9px] font-bold text-gray-400 text-center uppercase">{d}</span>
                  ))}
                  {[25, 26, 27, 28, 29, 30, 1].map(n => (
                    <span key={n} className={`text-[10px] font-bold text-center py-1.5 rounded-full ${n === 1 ? 'text-gray-900 border border-gray-100 shadow-sm' : 'text-gray-400/60'}`}>{n}</span>
                  ))}
                  {[2, 3, 4, 5, 6, 7, 8].map(n => (
                    <span key={n} className="text-[10px] font-bold text-center py-1.5 text-gray-900">{n}</span>
                  ))}
                  {[9, 10, 11, 12, 13, 14].map(n => (
                    <span key={n} className={`text-[10px] font-bold text-center py-1.5 rounded-full cursor-pointer transition-all ${n === 10 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-110' : 'text-gray-900 hover:bg-gray-50'}`}>{n}</span>
                  ))}
                </div>

                {/* Timeline Items */}
                <div className="space-y-5 border-l-2 border-dashed border-gray-100 ml-2 pl-6 relative">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full border-2 border-white bg-red-400"></div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Client Review</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">10:00 AM - 11:30 AM</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full border-2 border-white bg-purple-400"></div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Product Sync</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">2:00 PM - 3:00 PM</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Upcoming Deadlines */}
              <section className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-50">
                <h3 className="font-bold text-gray-900 mb-6">Upcoming Deadlines</h3>
                
                <div className="space-y-4">
                  {[
                    { label: 'Final Specs', date: 'Today', icon: <FileText size={16} />, color: 'red' },
                    { label: 'Design System v2', date: 'In 3 days', icon: <Layout size={16} />, color: 'blue' },
                    { label: 'Monthly Report', date: 'In 5 days', icon: <CreditCard size={16} />, color: 'emerald' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl bg-${item.color}-50 text-${item.color}-600`}>
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">{item.label}</h4>
                          <p className={`text-[10px] font-bold uppercase mt-0.5 ${item.date === 'Today' ? 'text-red-500' : 'text-gray-400'}`}>{item.date}</p>
                        </div>
                      </div>
                      <MoreHorizontal size={14} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Smart Insight Card */}
              <section className="bg-gray-900 rounded-[2.5rem] p-8 shadow-xl text-white relative overflow-hidden group">
                {/* Abstract backgrounds */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-700"></div>

                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40">
                    <Sparkles size={16} />
                  </div>
                  <h4 className="font-bold text-sm tracking-tight">Smart Insight</h4>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-medium mb-8 relative z-10 transition-colors group-hover:text-gray-100">
                  &quot;You&apos;ve been most productive between 9 AM and 11 AM this week. I&apos;ve blocked your calendar for Deep Work during these hours tomorrow.&quot;
                </p>

                <button className="w-full py-3.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 relative z-10">
                  Adjust Schedule
                </button>
              </section>

            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
