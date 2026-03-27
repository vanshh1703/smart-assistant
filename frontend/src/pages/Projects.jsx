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
  AlertCircle
} from 'lucide-react';

const Projects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900 relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-6 md:p-10 max-w-[1600px] mx-auto w-full">
          {/* Project Header */}
          <div className="flex flex-col xl:flex-row justify-between items-start gap-8 mb-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#4B5563] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Internal</span>
                <span className="text-[#9CA3AF] text-[10px] font-bold tracking-widest uppercase">Project ID: SPAI-882</span>
              </div>
              <h1 className="text-[#111827] text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Neo-Bank Mobile Interface</h1>
              <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">
                Designing the high-fidelity prototype for the digital wealth management suite including real-time stock integration and AI portfolio curation.
              </p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <button className="flex items-center gap-2 bg-white border border-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
                <Filter size={18} />
                <span>Filter</span>
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
                <Layout size={18} className="rotate-90" />
                <span>Gantt View</span>
              </button>
              <button className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                <Plus size={18} strokeWidth={3} />
                <span>Add Task</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10">
            {/* Left Column */}
            <div className="space-y-10">
              {/* AI Prioritization Section */}
              <section className="bg-[#F5F3FF] rounded-4xl p-8 md:p-10 border border-[#E9E5FF] relative overflow-hidden">
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-indigo-900 tracking-tight">AI Task Prioritization</h2>
                    <p className="text-indigo-600/70 text-xs font-bold uppercase tracking-widest mt-1">Based on deadline proximity and team capacity</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {/* AI Card 1 */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group/card cursor-pointer">
                    <div className="flex justify-between items-center mb-6">
                      <span className="bg-[#FFF1F2] text-[#E11D48] text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">Urgent</span>
                      <span className="text-indigo-600 text-[10px] font-bold">98% Match</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover/card:text-indigo-600 transition-colors mb-3">Finalize Crypto Wallet API Integration</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">The backend team is waiting on the schema mapping to begin testing...</p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                      </div>
                      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase">Due in 4h</span>
                    </div>
                  </div>

                  {/* AI Card 2 */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group/card cursor-pointer">
                    <div className="flex justify-between items-center mb-6">
                      <span className="bg-[#EEF2FF] text-[#4F46E5] text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">Strategic</span>
                      <span className="text-indigo-600 text-[10px] font-bold">85% Match</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover/card:text-indigo-600 transition-colors mb-3">Accessibility Audit for Dark Mode</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">Address contrast ratio issues reported in the latest design review...</p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                      </div>
                      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase">Due Tomorrow</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Active Tasks Section */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">Active Tasks</h2>
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-100">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-all rounded-lg"><Layout size={18} /></button>
                    <button className="p-1.5 text-blue-600 bg-white shadow-sm rounded-lg border border-gray-100"><Layout size={18} className="rotate-90" /></button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Task Item 1 */}
                  <div className="bg-white p-5 rounded-4xl border border-slate-50 shadow-sm hover:border-blue-100 hover:shadow-md transition-all group flex items-center gap-6">
                    <div className="w-7 h-7 rounded-lg border-2 border-slate-200 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-[15px]">Design system token mapping</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">Created 2 days ago • Sprint 4</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-bold text-slate-700">In Progress</span>
                    </div>
                    <div className="hidden sm:block bg-[#F3F4F6] text-[#6B7280] px-3 py-1 rounded-md text-[10px] font-bold tracking-wider">MEDIUM</div>
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Assignee" />
                  </div>

                  {/* Task Item 2 */}
                  <div className="bg-white p-5 rounded-4xl border border-slate-50 shadow-sm hover:border-red-100 hover:shadow-md transition-all group flex items-center gap-6">
                    <div className="w-7 h-7 rounded-lg border-2 border-slate-200 flex items-center justify-center">
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-[15px]">User interview analysis - Phase 1</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">Created 4 days ago • Research</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                      <span className="text-xs font-bold text-slate-700">Blocked</span>
                    </div>
                    <div className="hidden sm:block bg-[#EEF2FF] text-[#4338CA] px-3 py-1 rounded-md text-[10px] font-bold tracking-wider">HIGH</div>
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Assignee" />
                  </div>

                  {/* Task Item 3 */}
                  <div className="bg-white p-5 rounded-4xl border border-slate-50 shadow-sm flex items-center gap-6">
                    <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center text-white">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-400 text-[15px]">Stakeholder review deck</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">Completed 1 hour ago</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs font-bold text-slate-700">Done</span>
                    </div>
                    <div className="hidden sm:block bg-[#F3F4F6] text-[#6B7280] px-3 py-1 rounded-md text-[10px] font-bold tracking-wider">LOW</div>
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Assignee" />
                  </div>
                  
                  {/* Insert placeholder */}
                  <div className="border-2 border-dashed border-slate-200 p-5 rounded-4xl flex items-center justify-center gap-3 text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/20 cursor-pointer transition-all group">
                    <Plus size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold tracking-tight">Insert new task here</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Upcoming Milestones */}
              <section className="bg-white rounded-4xl p-8 border border-slate-50 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-slate-900 tracking-tight">Upcoming Milestones</h3>
                  <button className="text-blue-600 p-1.5 hover:bg-blue-50 rounded-lg transition-all">
                    <ArrowUpRight size={20} />
                  </button>
                </div>

                <div className="space-y-10 relative before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white bg-blue-600 shadow-sm z-10 transition-transform hover:scale-125 cursor-pointer"></div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Oct 24, 2023</span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">Beta Launch Prototype</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">High-fidelity screens ready for review</p>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white bg-slate-200 shadow-sm z-10"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Oct 31, 2023</span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">User Acceptance Testing</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">Recruiting 10 external beta testers</p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white bg-slate-200 shadow-sm z-10"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nov 15, 2023</span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">Production Handover</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">Final assets and documentation delivery</p>
                  </div>
                </div>
              </section>

              {/* Project Discussion */}
              <section className="bg-white rounded-4xl border border-slate-50 shadow-sm flex flex-col h-[550px]">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={18} className="text-[#2563EB]" />
                    <h3 className="text-sm font-bold text-slate-900">Project Discussion</h3>
                  </div>
                  <div className="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-7 h-7 rounded-full border-2 border-white shadow-sm" alt="User" />
                    <div className="w-7 h-7 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white tracking-widest">+4</div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-white">
                  {/* Incoming message */}
                  <div className="flex gap-3">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" className="w-8 h-8 rounded-full border border-slate-100" alt="Sarah" />
                    <div className="flex flex-col gap-1 max-w-[85%]">
                      <p className="text-[10px] font-bold text-[#2563EB]">Sarah Chen</p>
                      <div className="bg-[#F3F4F6] p-4 rounded-2xl rounded-tl-none ring-1 ring-slate-100">
                        <p className="text-[13px] text-slate-700 leading-relaxed font-medium">Does anyone have the latest SVG for the crypto icons? The ones in Figma seem to be outdated.</p>
                        <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tight">10:42 AM</p>
                      </div>
                    </div>
                  </div>

                  {/* Outgoing message */}
                  <div className="flex flex-col items-end gap-1 ml-auto max-w-[85%]">
                    <div className="bg-[#2563EB] p-4 rounded-2xl rounded-tr-none shadow-lg shadow-blue-100/50">
                      <p className="text-[13px] text-white leading-relaxed font-medium">I&apos;ve just uploaded them to the assets folder in the Knowledge Base section!</p>
                      <p className="text-[9px] font-bold text-blue-200 mt-2 uppercase tracking-tight text-right">10:45 AM</p>
                    </div>
                  </div>

                  {/* AI Message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md">
                      <Sparkles size={14} />
                    </div>
                    <div className="flex flex-col gap-1 max-w-[85%]">
                      <p className="text-[10px] font-bold text-indigo-600">SPAI Bot</p>
                      <div className="bg-[#F5F3FF] p-4 rounded-2xl rounded-tl-none ring-1 ring-indigo-50 italic">
                        <p className="text-[12px] text-indigo-800 leading-relaxed font-medium">I&apos;ve detected a potential conflict in the API migration schedule.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-slate-50">
                  <div className="relative flex items-center">
                    <Plus size={18} className="absolute left-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="w-full bg-[#F3F4F6] border-none rounded-2xl py-3 pl-12 pr-12 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                    <Send size={18} className="absolute right-4 text-[#2563EB] cursor-pointer" />
                  </div>
                </div>
              </section>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Projects;
