import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  Check,
  ArrowRight,
  Plus,
  Filter,
  Layout,
  Sparkles,
  Clock,
  MoreVertical,
  MessageSquare,
  Zap,
  Activity,
  ChevronRight,
  AlertCircle,
  Search,
  Layers
} from 'lucide-react';
import AddTaskModal from '../components/AddTaskModal';
import InviteMemberModal from '../components/InviteMemberModal';

const Projects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // --- Backend Integration State ---
  const [project, setProject] = useState({
    title: '', description: '', badge: '', projectIdStr: '',
    timelineRisk: '', timelineRiskPercent: 0, codeQuality: 0, openIssues: 0, openIssuesPercent: 0,
    velocityTitle: '', velocitySubtitle: '', tasks: [], members: [], insights: []
  });
  const [error, setError] = useState(null);

  // Modal States
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sliderProgress, setSliderProgress] = useState(0);
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  const fetchProjectData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects/default/active');
      if (!res.ok) throw new Error('Failed to fetch project data');
      const data = await res.json();
      setProject(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchProjectData();
  }, []);

  // Sync slider to the task's actual progress when modal opens
  useEffect(() => {
    if (selectedTask) setSliderProgress(selectedTask.progress || 0);
  }, [selectedTask]);

  const handleAddTask = async (taskData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${project.id}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (!res.ok) throw new Error('Failed to create task');
      await fetchProjectData(); // Refresh data
      setIsAddTaskOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleInvite = async (memberData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${project.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
      });
      if (!res.ok) throw new Error('Failed to invite member');
      await fetchProjectData(); // Refresh data
      setIsInviteOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update task status');
      await fetchProjectData();
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const updateProgress = async (taskId, newProgress) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}/progress`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: newProgress })
      });
      if (!res.ok) throw new Error('Failed to update progress');
      await fetchProjectData();
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(prev => ({ ...prev, progress: newProgress }));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Group tasks by status
  const tasksByStatus = {
    'Review Needed': project.tasks.filter(t => t.status === 'Review Needed'),
    'Active Sprint': project.tasks.filter(t => t.status === 'Active Sprint'),
    'Completed': project.tasks.filter(t => t.status === 'Completed')
  };

  const statusFlow = {
    'Review Needed': { next: 'Active Sprint', nextLabel: 'Move to Active Sprint', nextIcon: '▶' },
    'Active Sprint': { next: 'Completed', nextLabel: 'Mark as Complete', nextIcon: '✓' },
    'Completed': { next: 'Review Needed', nextLabel: 'Reopen Task', nextIcon: '↩' }
  };

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
                 <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg">{project.badge}</span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-lg border border-slate-100">ID: {project.projectIdStr}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter">{project.title}</h1>
              <p className="text-slate-500 max-w-2xl leading-relaxed font-bold opacity-80 text-sm md:text-base">
                {project.description}
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
               <button 
                  onClick={() => setIsAddTaskOpen(true)}
                  className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
                >
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
                  {project.insights && project.insights.map((insight, idx) => (
                    <div key={insight.id} className={`${idx === 0 ? 'bg-[#F1F5F9]/50 rounded-[2.2rem]' : 'bg-[#F1F5F9]/50 rounded-4xl'} p-7 border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-xl transition-all group/card cursor-pointer flex flex-col justify-between h-full`}>
                      <div>
                        <div className="flex justify-between items-center mb-8">
                          <span className={`px-2.5 py-1 ${insight.type === 'Urgent Priority' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'} text-[9px] font-black rounded-lg uppercase tracking-widest`}>
                            {insight.type}
                          </span>
                          <div className="flex items-center gap-1.5 font-sans font-black text-[10px] text-indigo-600 tracking-tighter">
                            {insight.metricLabel} <span className="text-sm">{insight.metricValue}</span>
                          </div>
                        </div>
                        <h3 className={`font-black text-slate-800 text-lg ${insight.type === 'Urgent Priority' ? 'group-hover/card:text-indigo-600' : 'group-hover/card:text-blue-600'} transition-colors mb-3 tracking-tight`}>
                          {insight.title}
                        </h3>
                        <p className="text-slate-400 text-sm font-bold leading-relaxed mb-8 opacity-90">{insight.description}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-100/50 pt-5 mt-auto">
                        {insight.type === 'Urgent Priority' ? (
                          <>
                            <div className="flex -space-x-2">
                              {(insight.assignedUsers || []).map((u, i) => (
                                <img key={i} src={`https://i.pravatar.cc/100?u=${u.u}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="User" />
                              ))}
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Clock size={12} strokeWidth={3} /> {insight.dueTime}</span>
                          </>
                        ) : (
                          <span className="text-[11px] font-black text-blue-600 tracking-tight flex items-center gap-1 group-hover/card:translate-x-1 transition-transform uppercase">Review Suggestion <ArrowRight size={14} strokeWidth={3} /></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Task Grid Management */}
              <section className="bg-white rounded-[2.8rem] p-10 shadow-sm border border-slate-50">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-4">
                     <h2 className="text-2xl font-black text-slate-800 tracking-tighter">Project Workflow</h2>
                     <div className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black rounded-lg uppercase tracking-widest border border-slate-100">Kanban Board</div>
                   </div>
                   <div className="flex gap-2">
                     <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        <input type="text" placeholder="Search tasks..." className="pl-11 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-[11px] font-black uppercase tracking-widest focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all w-[240px] outline-none shadow-inner" />
                     </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* Column: Review Needed */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2 mb-6">
                       <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-lg shadow-amber-100"></div>
                         <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Review Needed</h3>
                       </div>
                       <span className="w-6 h-6 bg-amber-50 text-amber-600 text-[10px] font-black rounded-full flex items-center justify-center">
                         {tasksByStatus['Review Needed'].length}
                       </span>
                    </div>

                    {tasksByStatus['Review Needed'].length === 0 && (
                      <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No tasks here</p>
                      </div>
                    )}

                    {tasksByStatus['Review Needed'].map((task) => (
                      <div key={task.id} className="bg-slate-50 p-5 rounded-3xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all group">
                         <div className="flex justify-between items-start mb-4">
                            <span className={`px-2.5 py-1 ${task.tag === 'Design' ? 'text-indigo-600 bg-indigo-50' : 'text-blue-600 bg-blue-50'} text-[9px] font-black uppercase tracking-widest rounded-lg`}>{task.tag || 'Task'}</span>
                            <span className="w-5 h-5 bg-amber-100 text-amber-600 text-[8px] font-black rounded-full flex items-center justify-center">!</span>
                         </div>
                         <h4
                           className="font-black text-slate-800 text-sm mb-4 leading-snug cursor-pointer hover:text-amber-600 transition-colors"
                           onClick={() => setSelectedTask(task)}
                         >{task.title}</h4>
                         {task.description && <p className="text-[11px] text-slate-400 font-bold mb-4 leading-relaxed">{task.description}</p>}
                         <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                           <div className="flex -space-x-1.5">
                             {(task.assignedUsers || []).map((u, n) => (
                               <img key={n} src={`https://i.pravatar.cc/100?u=${u.u}`} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" alt="Avatar" />
                             ))}
                           </div>
                           <button
                             onClick={() => moveTask(task.id, 'Active Sprint')}
                             className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-sm shadow-blue-100"
                           >
                             ▶ Move to Active
                           </button>
                         </div>
                      </div>
                    ))}
                  </div>

                  {/* Column: Active Sprint */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2 mb-6">
                       <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-lg shadow-blue-100"></div>
                         <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Active Sprint</h3>
                       </div>
                       <span className="w-6 h-6 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full flex items-center justify-center">
                         {tasksByStatus['Active Sprint'].length}
                       </span>
                    </div>

                    {tasksByStatus['Active Sprint'].length === 0 && (
                      <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No tasks here</p>
                      </div>
                    )}

                    {tasksByStatus['Active Sprint'].map((task) => (
                      <div key={task.id} className="bg-white p-5 rounded-3xl border-2 border-blue-500 shadow-lg shadow-blue-50/50 group hover:shadow-blue-100 transition-all">
                         <div className="flex justify-between items-center mb-4">
                           <span className="bg-blue-600 text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest">In Progress</span>
                           <span className="text-[10px] font-black text-blue-600">{task.progress || 0}%</span>
                         </div>
                         <h4
                           className="font-black text-slate-800 text-sm mb-2 leading-snug cursor-pointer hover:text-blue-600 transition-colors"
                           onClick={() => setSelectedTask(task)}
                         >{task.title}</h4>
                         {task.description && <p className="text-[11px] text-slate-400 font-bold mb-4 leading-relaxed">{task.description}</p>}
                         <div className="w-full h-1.5 bg-blue-50 rounded-full overflow-hidden mb-4">
                           <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${task.progress || 0}%` }}></div>
                         </div>
                         <div className="flex items-center justify-between pt-3 border-t border-blue-50">
                           <div className="flex -space-x-1.5">
                             {(task.assignedUsers || []).map((u, n) => (
                               <img key={n} src={`https://i.pravatar.cc/100?u=${u.u}`} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" alt="Avatar" />
                             ))}
                           </div>
                           <button
                             onClick={() => moveTask(task.id, 'Completed')}
                             className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all active:scale-95 shadow-sm shadow-emerald-100"
                           >
                             ✓ Mark Complete
                           </button>
                         </div>
                      </div>
                    ))}
                  </div>

                  {/* Column: Completed */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2 mb-6">
                       <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-100"></div>
                         <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Completed</h3>
                       </div>
                       <span className="w-6 h-6 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full flex items-center justify-center">
                         {tasksByStatus['Completed'].length}
                       </span>
                    </div>

                    {tasksByStatus['Completed'].length === 0 && (
                      <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No tasks yet</p>
                      </div>
                    )}

                    {tasksByStatus['Completed'].map((task) => (
                      <div key={task.id} className="bg-emerald-50/60 p-5 rounded-3xl border border-emerald-100 group hover:shadow-md transition-all">
                         <div className="flex items-center gap-2 mb-3">
                           <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                             <Check size={10} strokeWidth={4} className="text-white" />
                           </div>
                           <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Done</span>
                         </div>
                         <h4
                           className="font-black text-slate-500 text-sm mb-1 line-through cursor-pointer hover:text-slate-800 hover:no-underline transition-colors"
                           onClick={() => setSelectedTask(task)}
                         >{task.title}</h4>
                         <div className="flex items-center justify-between pt-3 border-t border-emerald-100 mt-3">
                           <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Finished</span>
                           <button
                             onClick={() => moveTask(task.id, 'Review Needed')}
                             className="flex items-center gap-1 px-2.5 py-1.5 bg-white text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all active:scale-95 border border-slate-200"
                           >
                             ↩ Reopen
                           </button>
                         </div>
                      </div>
                    ))}
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
                    {project.members.map((member) => (
                       <div key={member.id} className="flex items-center justify-between group cursor-default">
                          <div className="flex items-center gap-4">
                             <div className="relative">
                               <img src={`https://i.pravatar.cc/100?u=${member.avatarId}`} className="w-11 h-11 rounded-2xl border-2 border-white shadow-sm" alt="User" />
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

                  <button 
                    onClick={() => setIsInviteOpen(true)}
                    className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                     Invite Partner <Plus size={14} strokeWidth={3} />
                  </button>
               </section>

               {/* Project Health Radar */}
               <section className="bg-white rounded-[2.8rem] p-8 shadow-sm border border-slate-50 flex flex-col justify-between min-h-[400px]">
                  <div>
                    <h3 className="text-[18px] font-black text-slate-800 tracking-tight mb-2 uppercase">Project Health</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 border-b border-slate-50 pb-4">Real-time Diagnostics</p>
                    
                     <div className="space-y-8">
                        <div className="flex flex-col gap-3 group">
                          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                              <span>Timeline Risk</span>
                              <span className="text-emerald-500">{project.timelineRisk}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden p-0.5">
                              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${project.timelineRiskPercent}%` }}></div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 group">
                          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                              <span>Code Quality</span>
                              <span className="text-blue-600">{project.codeQuality}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden p-0.5">
                              <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${project.codeQuality}%` }}></div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 group">
                          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                              <span>Open Issues</span>
                              <span className="text-amber-500">{project.openIssues}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden p-0.5">
                              <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: `${project.openIssuesPercent}%` }}></div>
                          </div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-10 p-6 bg-blue-50/50 rounded-4xl border border-blue-100 relative overflow-hidden group/alert cursor-pointer flex items-center justify-between">
                     <div className="relative z-10 flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center text-blue-600">
                           <Activity size={18} strokeWidth={3} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-800 uppercase tracking-tighter">{project.velocityTitle}</p>
                          <p className="text-[10px] font-bold text-blue-600/70 uppercase">{project.velocitySubtitle}</p>
                        </div>
                     </div>
                     <ChevronRight size={16} className="text-blue-600 opacity-50 transition-transform group-hover/alert:translate-x-1" strokeWidth={3} />
                  </div>
               </section>

               {/* Activity Log Toggle */}
               <button 
                 onClick={() => setIsLogsOpen(true)}
                 className="w-full py-4 text-[11px] font-black text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest border-2 border-dashed border-slate-200 rounded-4xl hover:border-slate-800 hover:bg-white active:scale-98"
               >
                  View full activity log
               </button>
            </aside>
          </div>
        </main>
      </div>

      <AddTaskModal 
        isOpen={isAddTaskOpen} 
        onClose={() => setIsAddTaskOpen(false)} 
        onAdd={handleAddTask}
        projectId={project.id}
      />
      <InviteMemberModal 
        isOpen={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)} 
        onInvite={handleInvite}
      />

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedTask(null)} />
          
          {/* Modal Panel */}
          <div className="relative bg-white rounded-[2.5rem] p-10 w-full max-w-lg shadow-2xl shadow-slate-900/20 border border-slate-100">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg ${
                    selectedTask.status === 'Review Needed' ? 'bg-amber-50 text-amber-600' :
                    selectedTask.status === 'Active Sprint' ? 'bg-blue-600 text-white' :
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    {selectedTask.status}
                  </span>
                  {selectedTask.tag && (
                    <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg ${selectedTask.tag === 'Design' ? 'text-indigo-600 bg-indigo-50' : 'text-blue-600 bg-blue-50'}`}>
                      {selectedTask.tag}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-snug">{selectedTask.title}</h2>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="ml-4 w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all text-xl font-black shrink-0"
              >
                ×
              </button>
            </div>

            {/* Description */}
            {selectedTask.description ? (
              <p className="text-sm font-bold text-slate-500 leading-relaxed mb-8 p-5 bg-slate-50 rounded-2xl">
                {selectedTask.description}
              </p>
            ) : (
              <p className="text-xs font-black text-slate-300 uppercase tracking-widest mb-8 p-5 bg-slate-50 rounded-2xl">No description provided.</p>
            )}

            {/* Progress Slider (only for Active Sprint) */}
            {selectedTask.status === 'Active Sprint' && (
              <div className="mb-8">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  <span>Progress</span>
                  <span className="text-blue-600">{sliderProgress}%</span>
                </div>
                {/* Live slider bar */}
                <div className="relative w-full h-3 bg-blue-50 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-none"
                    style={{ width: `${sliderProgress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderProgress}
                  onChange={(e) => setSliderProgress(Number(e.target.value))}
                  onMouseUp={(e) => updateProgress(selectedTask.id, Number(e.target.value))}
                  onTouchEnd={(e) => updateProgress(selectedTask.id, sliderProgress)}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            )}

            {/* Assignees */}
            {(selectedTask.assignedUsers || []).length > 0 && (
              <div className="mb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Assigned To</p>
                <div className="flex -space-x-2">
                  {selectedTask.assignedUsers.map((u, i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${u.u}`} className="w-9 h-9 rounded-full border-2 border-white shadow-sm" alt="Avatar" />
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-slate-100">
              {selectedTask.status === 'Review Needed' && (
                <button
                  onClick={() => { moveTask(selectedTask.id, 'Active Sprint'); setSelectedTask(null); }}
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
                >
                  ▶ Move to Active Sprint
                </button>
              )}
              {selectedTask.status === 'Active Sprint' && (
                <>
                  <button
                    onClick={() => { moveTask(selectedTask.id, 'Review Needed'); setSelectedTask(null); }}
                    className="py-4 px-6 bg-slate-50 text-slate-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
                  >
                    ← Back to Review
                  </button>
                  <button
                    onClick={() => { moveTask(selectedTask.id, 'Completed'); setSelectedTask(null); }}
                    className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-100"
                  >
                    ✓ Mark as Complete
                  </button>
                </>
              )}
              {selectedTask.status === 'Completed' && (
                <button
                  onClick={() => { moveTask(selectedTask.id, 'Review Needed'); setSelectedTask(null); }}
                  className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
                >
                  ↩ Reopen Task
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Activity Log Modal */}
      {isLogsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsLogsOpen(false)} />
          
          <div className="relative bg-[#F8FAFC] rounded-[3rem] w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-white flex flex-col">
            {/* Modal Header */}
            <div className="p-10 pb-6 flex justify-between items-center bg-white border-b border-slate-100">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                     <Activity size={22} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Project Activity</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Full Transaction Log</p>
                  </div>
               </div>
               <button 
                 onClick={() => setIsLogsOpen(false)}
                 className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-800 hover:bg-slate-100 transition-all font-black text-xl flex items-center justify-center"
               >
                 ×
               </button>
            </div>

            {/* Logs List */}
            <div className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar">
               {project.logs && project.logs.length > 0 ? (
                 project.logs.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).map((log, i) => (
                   <div key={log.id} className="relative pl-10 group">
                      {/* Timeline Line */}
                      {i !== project.logs.length - 1 && (
                        <div className="absolute left-[19px] top-10 bottom-[-24px] w-0.5 bg-slate-100 group-hover:bg-blue-100 transition-colors" />
                      )}
                      
                      {/* Dot */}
                      <div className={`absolute left-0 top-1.5 w-10 h-10 rounded-full border-4 border-[#F8FAFC] flex items-center justify-center shadow-sm z-10 transition-transform group-hover:scale-110 ${
                        log.type === 'alert' ? 'bg-amber-100 text-amber-600' :
                        log.type === 'complete' ? 'bg-emerald-100 text-emerald-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                         {log.type === 'alert' ? <AlertCircle size={14} strokeWidth={3} /> :
                          log.type === 'complete' ? <Check size={14} strokeWidth={4} /> :
                          <Clock size={14} strokeWidth={3} />}
                      </div>

                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all group-hover:shadow-md group-hover:border-blue-50">
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="font-black text-slate-800 text-[15px] tracking-tight">{log.action}</h4>
                           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap ml-4">
                             {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                           </span>
                        </div>
                        <p className="text-slate-500 text-[12px] font-bold leading-relaxed mb-4">{log.details}</p>
                        <div className="flex items-center gap-2">
                           <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-[8px] font-black text-slate-400 uppercase">
                              {log.user.charAt(0)}
                           </div>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">By {log.user}</span>
                        </div>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                       <Activity size={40} />
                    </div>
                    <p className="text-sm font-black text-slate-300 uppercase tracking-widest">No activity logged yet</p>
                 </div>
               )}
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100">
               <button 
                 onClick={() => setIsLogsOpen(false)}
                 className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
               >
                 Close History
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

