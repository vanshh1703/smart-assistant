import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  Filter, 
  Layout, 
  Plus, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Circle, 
  MoreHorizontal, 
  Sparkles, 
  MessageSquare,
  Send,
  User,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  Search,
  Zap,
  Activity,
  Calendar,
  Layers,
  MoreVertical,
  Check,
  ArrowRight
} from 'lucide-react';

const Projects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900 relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-6 md:p-10 max-w-[1500px] mx-auto w-full">
          
          {/* Projects Header & Controls */}
          <div className="flex flex-col xl:flex-row justify-between items-start gap-10 mb-12">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg">Active Project</span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-lg border border-slate-100">ID: SPAI-882</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter">Neo-Bank Mobile Interface</h1>
              <p className="text-slate-500 max-w-2xl leading-relaxed font-bold opacity-80 text-sm md:text-base">
                Architecting the digital-first wealth management suite including real-time asset tracking and AI portfolio curation for Gen-Z investors.
              </p>
            </div>
            
            <div className="flex items-center gap-4 shrink-0 mt-4 xl:mt-0">
               <div className="flex bg-white p-1.5 rounded-2xl border border-slate-50 shadow-sm">
                  <button className="p-3 bg-slate-50 text-slate-800 rounded-xl shadow-inner transition-all"><Layout size={18} strokeWidth={2.5} /></button>
                  <button className="p-3 text-slate-300 hover:text-slate-600 transition-all"><Layers size={18} /></button>
               </div>
               <button className="flex items-center gap-3 bg-white border border-slate-100 text-slate-700 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                 <Filter size={16} strokeWidth={3} />
                 Filter
               </button>
               <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95">
                 <Plus size={18} strokeWidth={4} />
                 Add Task
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-12">
            {/* Left Column: Management Board */}
            <div className="space-y-12">
              
              {/* AI Strategic Priority Row */}
              <section className="bg-white rounded-[2.8rem] p-10 shadow-sm border border-slate-50 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50 blur-[60px]"></div>
                
                <div className="flex items-center gap-5 mb-10 relative z-10 transition-transform group-hover:translate-x-1 duration-500">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 border border-white/20">
                    <Sparkles size={26} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">AI Strategy Pulse</h2>
                    <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mt-1">Real-time Task Prioritization</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                  {/* AI Recommendation Card 1 */}
                  <div className="bg-[#F1F5F9]/50 rounded-[2.2rem] p-7 border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-xl transition-all group/card cursor-pointer flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-center mb-8">
                        <span className="bg-red-50 text-red-600 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest">Urgent Priority</span>
                        <div className="flex items-center gap-1.5 font-sans font-black text-[10px] text-indigo-600 tracking-tighter">
                           MATCH <span className="text-sm">98%</span>
                        </div>
                      </div>
                      <h3 className="font-black text-slate-800 text-lg group-hover/card:text-indigo-600 transition-colors mb-3 tracking-tight">Crypto Wallet API Sync</h3>
                      <p className="text-slate-400 text-sm font-bold leading-relaxed mb-8 opacity-90">The node-cluster requires immediate port mapping to resolve latency issues reported in the morning sprint.</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100/50 pt-5 mt-auto">
                      <div className="flex -space-x-2">
                        <img src="https://i.pravatar.cc/100?u=a" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="User" />
                        <img src="https://i.pravatar.cc/100?u=b" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="User" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Clock size={12} strokeWidth={3} /> Due in 4h</span>
                    </div>
                  </div>

                  {/* AI Recommendation Card 2 */}
                  <div className="bg-[#F1F5F9]/50 rounded-4xl p-7 border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-xl transition-all group/card cursor-pointer flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-center mb-8">
                        <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest">Efficiency Play</span>
                        <div className="flex items-center gap-1.5 font-sans font-black text-[10px] text-indigo-600 tracking-tighter">
                           SAVING <span className="text-sm">2.4h</span>
                        </div>
                      </div>
                      <h3 className="font-black text-slate-800 text-lg group-hover/card:text-blue-600 transition-colors mb-3 tracking-tight">Refactor Auth Middleware</h3>
                      <p className="text-slate-400 text-sm font-bold leading-relaxed mb-8 opacity-90">Combining repetitive validation gates into a single-pass service could reduce latency by 15% across all endpoints.</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100/50 pt-5 mt-auto">
                       <span className="text-[11px] font-black text-blue-600 tracking-tight flex items-center gap-1 group-hover/card:translate-x-1 transition-transform uppercase">Review Suggestion <ArrowRight size={14} strokeWidth={3} /></span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Task Grid Management */}
              <section className="bg-white rounded-[2.8rem] p-10 shadow-sm border border-slate-50">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-4">
                     <h2 className="text-2xl font-black text-slate-800 tracking-tighter">Project Workflow</h2>
                     <div className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black rounded-lg uppercase tracking-widest border border-slate-100">View: Kanban</div>
                   </div>
                   <div className="flex gap-2">
                     <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        <input type="text" placeholder="Search tasks..." className="pl-11 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-[11px] font-black uppercase tracking-widest focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all w-[240px] outline-none shadow-inner" />
                     </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Category: Review Needed */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between px-4">
                       <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-lg shadow-amber-100"></div>
                         <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Review Needed</h3>
                       </div>
                       <button className="text-slate-300 hover:text-slate-800 transition-colors"><Plus size={16} strokeWidth={3} /></button>
                    </div>

                    {[
                      { title: 'Landing Page v2 Feedback', tag: 'Design', color: 'text-indigo-600 bg-indigo-50', users: 3 },
                      { title: 'Auth Logic Validation', tag: 'Dev', color: 'text-blue-600 bg-blue-50', users: 1 }
                    ].map((task, i) => (
                      <div key={i} className="bg-white p-6 rounded-4xl border border-slate-50 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group">
                         <div className="flex justify-between items-start mb-6">
                            <span className={`px-2.5 py-1 ${task.color} text-[9px] font-black uppercase tracking-widest rounded-lg`}>{task.tag}</span>
                            <button className="text-slate-300 hover:text-slate-800 opacity-0 group-hover:opacity-100 transition-all"><MoreVertical size={16} /></button>
                         </div>
                         <h4 className="font-black text-slate-800 text-[15px] mb-8 leading-snug group-hover:text-amber-600 transition-colors tracking-tight">{task.title}</h4>
                         <div className="flex items-center justify-between">
                            <div className="flex -space-x-1.5">
                               {[...Array(task.users)].map((_, n) => (
                                 <img key={n} src={`https://i.pravatar.cc/100?u=task${i}${n}`} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" alt="Avatar" />
                               ))}
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-300 group-hover:text-slate-800 transition-all">
                               <MessageSquare size={14} />
                               <span className="text-[10px] font-black uppercase font-mono">{i+4}</span>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>

                  {/* Category: In Progress */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between px-4">
                       <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-lg shadow-blue-100"></div>
                         <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Active Sprint</h3>
                       </div>
                    </div>

                    <div className="bg-white p-7 rounded-4xl border-2 border-blue-600 shadow-2xl shadow-blue-50/50 cursor-pointer group hover:translate-y-[-4px] transition-all relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                         <Zap size={40} className="text-blue-600" />
                       </div>
                       <div className="flex justify-between items-center mb-6">
                          <span className="bg-blue-600 text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-blue-100">Active Now</span>
                          <span className="text-[10px] font-black text-blue-600 tracking-tighter">72% DONE</span>
                       </div>
                       <h4 className="font-black text-slate-800 text-[17px] mb-4 tracking-tight">Main Dashboard UI Refinement</h4>
                       <p className="text-xs font-bold text-slate-400 mb-8 leading-relaxed">Applying high-fidelity visual updates and backdrop-blur effects.</p>
                       
                       <div className="w-full h-2 bg-blue-50 rounded-full overflow-hidden p-0.5 mb-6">
                          <div className="h-full bg-blue-600 rounded-full shadow-lg transition-all duration-1000" style={{ width: '72%' }}></div>
                       </div>

                       <div className="flex justify-between items-center pt-2">
                          <div className="flex -space-x-1.5">
                             {[1,2].map(n => (
                               <img key={n} src={`https://i.pravatar.cc/100?u=blue${n}`} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" alt="Avatar" />
                             ))}
                          </div>
                          <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                             <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Open Details</span>
                             <ArrowRight size={12} strokeWidth={3} className="text-blue-600" />
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Category: Done */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between px-4">
                       <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-100"></div>
                         <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Completed</h3>
                       </div>
                    </div>

                    <div className="bg-emerald-50/50 p-6 rounded-4xl border border-emerald-100/50 group grayscale-[0.8] hover:grayscale-0 hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                       <div className="flex items-center gap-3 mb-4 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                          <div className="p-1.5 bg-emerald-100 rounded-lg">
                             <Check size={12} strokeWidth={4} />
                          </div>
                          Completed
                       </div>
                       <h4 className="font-black text-slate-500 group-hover:text-slate-800 transition-colors text-[15px] mb-2 tracking-tight line-through">Style Guide Foundation</h4>
                       <p className="text-[11px] font-bold text-slate-300 group-hover:text-slate-400 transition-colors line-through">Color palette, typography, and base grids.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Project Sidebar */}
            <aside className="space-y-10">
               
               {/* Team Status Card */}
               <section className="bg-white rounded-[2.8rem] p-8 shadow-sm border border-slate-50">
                  <h3 className="text-[18px] font-black text-slate-800 tracking-tight mb-8">Team Collaboration</h3>
                  <div className="space-y-6">
                     {[
                       { name: 'Marcus Wong', status: 'In Design', color: 'bg-indigo-500' },
                       { name: 'Sarah Kim', status: 'Refactoring API', color: 'bg-emerald-500' },
                       { name: 'Jordan Doe', status: 'Idle', color: 'bg-slate-300' }
                     ].map((member, i) => (
                       <div key={i} className="flex items-center justify-between group cursor-default">
                          <div className="flex items-center gap-4">
                             <div className="relative">
                               <img src={`https://i.pravatar.cc/100?u=team${i}`} className="w-11 h-11 rounded-2xl border-2 border-white shadow-sm" alt="User" />
                               <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 ${member.color} rounded-full border-2 border-white shadow-sm`}></div>
                             </div>
                             <div>
                               <p className="text-[14px] font-black text-slate-800 tracking-tight">{member.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.status}</p>
                             </div>
                          </div>
                          <button className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 hover:text-blue-600 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100">
                             <MessageSquare size={16} strokeWidth={3} />
                          </button>
                       </div>
                     ))}
                  </div>

                  <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                     Invite Partner <Plus size={14} strokeWidth={3} />
                  </button>
               </section>

               {/* Project Health Radar */}
               <section className="bg-white rounded-[2.8rem] p-8 shadow-sm border border-slate-50 flex flex-col justify-between min-h-[400px]">
                  <div>
                    <h3 className="text-[18px] font-black text-slate-800 tracking-tight mb-2 uppercase">Project Health</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 border-b border-slate-50 pb-4">Real-time Diagnostics</p>
                    
                    <div className="space-y-8">
                       {[
                         { label: 'Timeline Risk', val: 'Low', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                         { label: 'Code Quality', val: '98%', color: 'text-blue-600', bg: 'bg-blue-50' },
                         { label: 'Open Issues', val: '14', color: 'text-amber-500', bg: 'bg-amber-50' }
                       ].map((stat, i) => (
                         <div key={i} className="flex flex-col gap-3 group">
                            <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                               <span>{stat.label}</span>
                               <span className={stat.color}>{stat.val}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden p-0.5">
                               <div className={`h-full ${stat.color === 'text-blue-600' ? 'bg-blue-600' : stat.color === 'text-emerald-500' ? 'bg-emerald-500' : 'bg-amber-500'} rounded-full transition-all duration-1000`} style={{ width: i === 0 ? '20%' : i === 1 ? '98%' : '65%' }}></div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="mt-10 p-6 bg-blue-50/50 rounded-4xl border border-blue-100 relative overflow-hidden group/alert cursor-pointer flex items-center justify-between">
                     <div className="relative z-10 flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center text-blue-600">
                           <Activity size={18} strokeWidth={3} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-800 uppercase tracking-tighter">Velocity Spike</p>
                          <p className="text-[10px] font-bold text-blue-600/70 uppercase">+15% week-over-week</p>
                        </div>
                     </div>
                     <ChevronRight size={16} className="text-blue-600 opacity-50 transition-transform group-hover/alert:translate-x-1" strokeWidth={3} />
                  </div>
               </section>

               {/* Activity Log Toggle */}
               <button className="w-full py-4 text-[11px] font-black text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest border-2 border-dashed border-slate-200 rounded-4xl hover:border-slate-800 hover:bg-white active:scale-98">
                  View full activity log
               </button>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
