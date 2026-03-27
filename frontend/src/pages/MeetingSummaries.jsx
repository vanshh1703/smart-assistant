import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
  Upload,
  Share2,
  Sparkles,
  CheckCircle2,
  Plus,
  ChevronRight,
  Search,
  FileText,
  MoreHorizontal,
  ExternalLink,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Files,
  Zap,
  Play,
  Download,
  MoreVertical,
  Activity,
  ArrowRight,
  Mic,
  Users,
  Calendar,
  Layout,
  Check
} from 'lucide-react';

const MeetingSummaries = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/meetings');
        if (!res.ok) throw new Error('Failed to fetch meetings');
        const data = await res.json();
        setMeetings(data);
      } catch (err) {
        console.error('Error fetching meetings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  // Use the most recent featured meeting, or just the first one as featured
  const featuredMeeting = meetings.find(m => m.isFeatured) || meetings[0];
  const pastMeetings = meetings.filter(m => m.id !== featuredMeeting?.id);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900 relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />

        <main className="p-6 md:p-10 max-w-[1500px] mx-auto w-full text-slate-800">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
                    <Zap size={18} fill="white" strokeWidth={0} />
                 </span>
                 <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em]">Neural Curation</p>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">Meeting Summaries</h1>
              <p className="text-slate-500 text-lg font-bold opacity-80 max-w-xl leading-relaxed">
                Automatically extracting action items and strategic pivots from every conversation. Your workspace memory, infinitely searchable.
              </p>
            </div>
            
            <div className="flex items-center gap-4 w-full lg:w-auto mt-6 lg:mt-0">
              <button className="flex-1 lg:flex-none px-6 py-4 bg-white border border-slate-100 text-slate-600 font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-95 group">
                <Download size={16} className="inline mr-2 group-hover:mb-1 transition-all" />
                Archive
              </button>
              <button className="flex-1 lg:flex-none px-10 py-4 bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95">
                <Upload size={18} strokeWidth={3} />
                Upload Recording
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex bg-white rounded-[3rem] border border-slate-50 shadow-sm p-32 items-center justify-center font-black text-slate-300 uppercase tracking-[0.5em] animate-pulse">
              Neural Sync in Progress...
            </div>
          ) : !featuredMeeting ? (
            <div className="flex bg-white rounded-[3rem] border border-slate-50 shadow-sm p-32 items-center justify-center font-black text-slate-300 uppercase tracking-[0.5em]">
              No Meetings Found
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-12">
            {/* Left Content Column */}
            <div className="space-y-12">

              {/* Featured Summary Card (Primary AI Analysis) */}
              <section className="bg-white rounded-[3rem] p-10 md:p-14 border border-slate-50 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>

                <div className="flex justify-between items-start mb-14 relative z-10 transition-transform group-hover:translate-x-1 duration-700">
                  <div className="flex flex-wrap items-center gap-5">
                    <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-xl shadow-slate-200">Featured Analysis</span>
                    <span className="text-slate-400 text-[11px] font-black flex items-center gap-2 uppercase tracking-tight">
                      <Calendar size={14} strokeWidth={2.5} />
                      {featuredMeeting.dateStr}
                    </span>
                    <span className="text-slate-400 text-[11px] font-black flex items-center gap-2 uppercase tracking-tight">
                       <Clock size={14} strokeWidth={2.5} />
                       {featuredMeeting.duration} Duration
                    </span>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-white hover:shadow-sm transition-all rounded-xl border border-transparent hover:border-slate-100">
                       <Share2 size={20} strokeWidth={2.5} />
                     </button>
                     <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-white hover:shadow-sm transition-all rounded-xl border border-transparent hover:border-slate-100">
                       <MoreVertical size={20} strokeWidth={2.5} />
                     </button>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter mb-12 leading-[1.1] relative z-10">{featuredMeeting.title}</h2>
                
                {/* Neural Extract Box */}
                <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative shadow-2xl shadow-indigo-100 mb-14 overflow-hidden group/ neural">
                  <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent"></div>
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <Sparkles size={20} className="text-white" fill="white" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Extract</span>
                  </div>
                  <p className="text-[17px] leading-relaxed font-black relative z-10 italic">
                    {featuredMeeting.featuredExtract}
                  </p>
                </div>

                {/* Structured Key Decisions */}
                <div className="mb-14 relative z-10 px-2 leading-relaxed">
                   <div className="flex items-center gap-4 mb-10">
                      <div className="h-[2px] w-12 bg-indigo-600 shrink-0"></div>
                      <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-[0.3em]">Mission Critical Pivots</h3>
                   </div>
                    <div className="space-y-10 font-bold">
                      {(featuredMeeting.pivots || []).map((pivot, i) => (
                        <div key={pivot.id} className="flex gap-8 group">
                           <div className="w-10 h-10 rounded-2xl bg-[#F1F5F9] flex items-center justify-center shrink-0 shadow-sm border border-slate-50 text-slate-800 font-black text-xs transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-100 group-hover:scale-110">
                              0{i+1}
                           </div>
                           <div className="pt-1.5 space-y-2">
                             <h4 className="text-[16px] font-black text-slate-800 tracking-tight transition-colors group-hover:text-blue-600 uppercase">{pivot.title}</h4>
                             <p className="text-[15px] text-slate-400 group-hover:text-slate-500 transition-colors leading-relaxed font-bold opacity-90">{pivot.body}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-50 relative z-10 flex items-center justify-between">
                   <div className="flex gap-4">
                      <button className="px-8 py-4 bg-slate-900 text-white rounded-[1.4rem] font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-95 flex items-center gap-3">
                         <Play size={16} fill="white" />
                         Listen Recording
                      </button>
                      <button className="px-8 py-4 bg-slate-50 text-slate-600 rounded-[1.4rem] font-black text-[11px] uppercase tracking-widest border border-slate-100 hover:bg-white hover:shadow-sm transition-all active:scale-95 flex items-center gap-3 group/btn">
                         <FileText size={16} />
                         Transcript
                         <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                   </div>
                    <div className="flex -space-x-3">
                      {(featuredMeeting.attendees || []).map((att) => (
                        <img key={att.id} src={att.avatar} className="w-9 h-9 rounded-full border-4 border-white shadow-sm ring-1 ring-slate-100" alt={att.name} />
                      ))}
                    </div>
                </div>
              </section>

              {/* Browse Past Summaries */}
              <div className="flex items-center justify-between px-6 pt-4">
                 <h3 className="text-xl font-black text-slate-800 tracking-tight">Previous Archives</h3>
                 <div className="flex gap-2">
                    <button className="bg-white p-3 border border-slate-50 rounded-xl text-slate-300 hover:text-slate-800 shadow-sm transition-all"><Layout size={18} strokeWidth={2.5} /></button>
                    <button className="bg-blue-600 p-3 rounded-xl text-white shadow-xl shadow-blue-100"><Files size={18} strokeWidth={2.5} /></button>
                 </div>
              </div>

              <div className="space-y-6 pb-20 px-2 transition-all">
                {pastMeetings.map((item) => (
                   <div key={item.id} className="bg-white rounded-4xl p-8 border border-slate-50 shadow-sm hover:shadow-2xl hover:translate-x-3 transition-all cursor-pointer group flex items-center justify-between" onClick={() => { /* Potential to swap featured */ }}>
                      <div className="flex items-center gap-8 px-2 max-w-[70%]">
                         <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all border border-transparent group-hover:border-blue-100">
                            {item.title.toLowerCase().includes('sync') ? <Mic size={24} strokeWidth={2.5} /> : <Users size={24} strokeWidth={2.5} />}
                         </div>
                         <div className="space-y-1">
                            <h4 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors uppercase truncate">{item.title}</h4>
                            <div className="flex items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
                               <span>{item.dateStr}</span>
                               <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                               <span>{item.duration}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         {item.sentiment === "Positive" ? (
                            <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-emerald-100">High Velocity</span>
                         ) : (
                            <span className="bg-amber-50 text-amber-600 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-amber-100">Needs Sync</span>
                         )}
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={20} strokeWidth={3} />
                         </div>
                      </div>
                   </div>
                ))}
              </div>
            </div>

            {/* Right Sidepanel Column */}
            <aside className="space-y-10">
              
               {/* Search / Filter Utility */}
               <section className="bg-white rounded-[2.8rem] p-8 shadow-sm border border-slate-50 group/search">
                  <div className="relative mb-6">
                    <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-blue-600 transition-colors" />
                    <input type="text" placeholder="Search insights..." className="w-full bg-slate-50 border-none rounded-2xl py-4.5 pl-14 pr-6 text-sm font-black tracking-tight placeholder:text-slate-300 focus:bg-white focus-within:ring-12 focus-within:ring-blue-50/50 transition-all outline-none shadow-inner" />
                  </div>
                  <div className="flex flex-wrap gap-2 px-2">
                     {['Roadmap', 'Strategy', 'Sprint', 'AI', 'Client'].map(t => (
                       <button key={t} className="px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest rounded-xl text-slate-400 border border-slate-100/50">{t}</button>
                     ))}
                  </div>
               </section>

               {/* AI Task Extractor (Dynamic) */}
               <section className="bg-white rounded-[2.8rem] p-10 border border-slate-50 shadow-sm relative overflow-hidden group/tasks">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-full blur-3xl opacity-60"></div>
                  
                  <div className="flex items-center justify-between mb-10 relative z-10 transition-transform group-hover/tasks:translate-x-1">
                     <div className="flex items-center gap-3">
                        <Sparkles size={18} className="text-indigo-600" strokeWidth={2.5} />
                        <h3 className="text-[18px] font-black text-slate-800 tracking-tight">AI Extractions</h3>
                     </div>
                     <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{(featuredMeeting.extractions || []).length} Items</span>
                  </div>

                  <div className="space-y-8 relative z-10">
                    {(featuredMeeting.extractions || []).map((task) => (
                      <div key={task.id} className="group/item cursor-pointer">
                        <div className="flex items-start gap-5">
                          <div className={`w-3.5 h-3.5 border-4 border-white ${task.color} rounded-full shadow-sm mt-1 transition-transform group-hover/item:scale-125`}></div>
                          <div className="flex-1 space-y-1.5 pt-0.5">
                             <div className="flex justify-between items-center">
                               <p className="text-[13px] font-black text-slate-800 tracking-tight group-hover/item:text-blue-600 transition-colors uppercase">{task.title}</p>
                             </div>
                             <div className="flex items-center justify-between text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                <span>{task.assignee} • {task.priority}</span>
                                <button className="opacity-0 group-hover/item:opacity-100 transition-opacity text-slate-500 hover:text-blue-600">Assign <ArrowUpRight size={10} strokeWidth={4} className="inline ml-1" /></button>
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-12 py-5 bg-[#F8FAFC] hover:bg-white hover:shadow-xl hover:border hover:border-blue-100 transition-all rounded-[1.8rem] text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest border-2 border-dashed border-slate-100">
                     Export to project board
                  </button>
               </section>

               {/* Activity Sentiment Radar */}
               <section className="bg-slate-900 rounded-[2.8rem] p-10 shadow-2xl text-white relative overflow-hidden group/sentiment">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none group-hover/sentiment:scale-125 transition-all duration-1000"></div>
                  
                  <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                       <Activity size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-base font-black tracking-tight uppercase">Health Radar</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Workspace Sync</p>
                    </div>
                  </div>

                  <div className="space-y-10 relative z-10">
                     <div>
                        <div className="flex justify-between items-center mb-4 text-[10px] font-black uppercase tracking-widest px-1">
                           <span className="text-slate-400">Alignment Factor</span>
                           <span className="text-white">{featuredMeeting.alignmentFactor}% {featuredMeeting.alignmentFactor > 80 ? 'High' : 'Normal'}</span>
                        </div>
                        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                           <div 
                             className="h-full bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-1000" 
                             style={{ width: `${featuredMeeting.alignmentFactor}%` }}
                           ></div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center group/mini hover:bg-white/10 transition-all">
                           <p className="text-[32px] font-black text-white mb-2 tracking-tighter shadow-sm line-none">Pos</p>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sentiment</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center group/mini hover:bg-white/10 transition-all">
                           <CirclePulse />
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Team Flow</p>
                        </div>
                     </div>
                  </div>
               </section>

            </aside>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

/* Mini Helper Components */
const CirclePulse = () => (
  <div className="flex items-center justify-center pt-2 relative">
     <div className="w-5 h-5 bg-emerald-500 rounded-full absolute animate-ping opacity-30"></div>
     <div className="w-5 h-5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50 flex items-center justify-center">
        <Check size={12} strokeWidth={4} className="text-white" />
     </div>
  </div>
);

export default MeetingSummaries;
