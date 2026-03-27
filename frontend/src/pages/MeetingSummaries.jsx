import React, { useState } from 'react';
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
  Files
} from 'lucide-react';

const MeetingSummaries = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900 relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />

        <main className="p-6 md:p-10 max-w-[1600px] mx-auto w-full">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
            <div>
              <p className="text-[#2563EB] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Curation Workspace</p>
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-none">Meeting Summaries</h1>
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none px-6 py-3 bg-white border border-slate-100 text-slate-600 font-bold text-sm rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                Export Archive
              </button>
              <button className="flex-1 lg:flex-none px-8 py-3 bg-[#2563EB] text-white font-bold text-sm rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95">
                <Upload size={18} strokeWidth={2.5} />
                Upload Recording
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10">
            {/* Left Content Column */}
            <div className="space-y-10">

              {/* Featured Summary Card */}
              <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="flex items-center gap-4">
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm shadow-indigo-100">AI Analysis</span>
                    <span className="text-slate-400 text-xs font-bold flex items-center gap-2">
                      <Clock size={14} />
                      Dec 14, 2023 • 45 mins
                    </span>
                  </div>
                  <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                    <Share2 size={20} />
                  </button>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-10 leading-tight">Q1 Product Roadmap & Strategy Alignment</h2>

                {/* AI Insight Box */}
                <div className="bg-indigo-50/50 border-l-4 border-indigo-500 p-8 rounded-3xl mb-12 ring-1 ring-indigo-100/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={18} className="text-indigo-600 transition-transform group-hover:scale-110" />
                    <span className="text-indigo-600 text-[11px] font-bold uppercase tracking-[0.2em]">Executive Insight</span>
                  </div>
                  <p className="text-[15px] text-slate-700 leading-relaxed font-medium">
                    "The team is currently <span className="text-indigo-700 font-bold">15% ahead</span> of the technical debt clearance schedule, allowing for an earlier launch of the <span className="text-slate-900 font-bold italic">Smart Search</span> feature by approximately two weeks."
                  </p>
                </div>

                {/* Key Points */}
                <div className="mb-14">
                  <h3 className="text-[12px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-indigo-200"></span>
                    Key Points
                  </h3>
                  <ul className="space-y-8">
                    {[
                      "Consensus reached on shifting the focus toward **User Retainment** metrics for the first half of Q1, deprioritizing aggressive user acquisition.",
                      "Engineering confirmed that the new **API v3** architecture is stable enough for internal beta testing starting next Monday.",
                      "Design team presented the **Editorial UI** concept; stakeholders approved the move toward a cleaner, line-free aesthetic."
                    ].map((point, i) => (
                      <li key={i} className="flex gap-6 group items-start">
                        <span className="shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600 font-bold text-xs shadow-sm ring-1 ring-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          {i + 1}
                        </span>
                        <p className="text-[15px] text-slate-600 leading-relaxed pt-1"
                          dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<b class="text-slate-900 font-extrabold">$1</b>') }}>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Decisions Made */}
                  <div>
                    <h3 className="text-[12px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-indigo-200"></span>
                      Decisions Made
                    </h3>
                    <div className="space-y-4">
                      <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Technical Strategy</p>
                        <p className="text-[14px] font-bold text-slate-800 leading-relaxed">Adopt GraphQL for all new feature endpoints to reduce mobile data overhead.</p>
                      </div>
                      <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Hiring Plan</p>
                        <p className="text-[14px] font-bold text-slate-800 leading-relaxed">Approve headcount for 2 Senior Backend Engineers and 1 Lead Product Designer.</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Items */}
                  <div>
                    <h3 className="text-[12px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-indigo-200"></span>
                      Action Items
                    </h3>
                    <div className="space-y-3">
                      {[
                        { text: "Draft technical requirements for API v3 migration", tag: "High Prio", tagColor: "bg-red-50 text-red-600", checked: false },
                        { text: "Schedule follow-up with infrastructure", tag: "Done", tagColor: "bg-emerald-50 text-emerald-600", checked: true },
                        { text: "Update the Notion roadmap", tag: "Design", tagColor: "bg-blue-50 text-blue-600", checked: false },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-sm transition-all group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${item.checked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white group-hover:border-indigo-400'
                              }`}>
                              {item.checked && <CheckCircle2 size={12} />}
                            </div>
                            <span className={`text-[13px] font-bold transition-all truncate max-w-[140px] ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                              {item.text}
                            </span>
                          </div>
                          <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded tracking-tighter ${item.tagColor}`}>
                            {item.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Recent Archive Table */}
              <section className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-50 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-extrabold text-[#111827]">Recent Archive</h3>
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"><Search size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"><MoreHorizontal size={18} /></button>
                  </div>
                </div>

                <div className="min-w-[700px]">
                  {/* Grid Header */}
                  <div className="grid grid-cols-[3fr_1fr_1.2fr_1fr_60px] gap-8 border-b border-slate-100 pb-6 mb-4 px-6">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-left">Meeting Title</p>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-left">Date</p>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-left">Attendees</p>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-left">Status</p>
                    <div></div>
                  </div>

                  {/* Grid Body */}
                  <div className="divide-y divide-slate-50">
                    {[
                      { title: "Weekly Sync: Growth & Marketing", sub: "4 Key Decisions", date: "Dec 12, 2023", status: "reviewed", statusColor: "bg-blue-50 text-[#2563EB]" },
                      { title: "Security Audit: Post-Mortem", sub: "12 Action Items", date: "Dec 10, 2023", status: "processing", statusColor: "bg-indigo-50 text-indigo-600" },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-[3fr_1fr_1.2fr_1fr_60px] gap-8 py-8 px-6 group hover:bg-slate-50/50 transition-all items-center rounded-3xl">
                        <div className="pr-6">
                          <p className="text-[15px] font-black text-slate-800 mb-1.5 group-hover:text-[#2563EB] transition-colors">{row.title}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{row.sub}</p>
                        </div>
                        <div className="pr-4">
                          <p className="text-xs font-bold text-slate-500">{row.date}</p>
                        </div>
                        <div className="pr-4">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map(j => (
                              <img key={j} src={`https://i.pravatar.cc/150?u=${i * 10 + j}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="User" />
                            ))}
                            <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[9px] font-black text-white tracking-widest">+3</div>
                          </div>
                        </div>
                        <div className="pr-4">
                          <span className={`inline-block text-[9px] font-black uppercase px-3 py-1.5 rounded-lg tracking-widest shadow-sm ${row.statusColor}`}>
                            {row.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-[#2563EB] hover:border-blue-100 hover:shadow-sm transition-all flex items-center justify-center group/btn active:scale-90">
                            <ExternalLink size={18} className="group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Right Sidebar Column */}
            <div className="space-y-8">

              {/* Process New Meeting Card */}
              <section className="bg-white rounded-[2.5rem] p-8 border-2 border-dashed border-slate-100 hover:border-blue-200 transition-all group flex flex-col items-center text-center cursor-pointer">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#2563EB] mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-50">
                  <Upload size={24} />
                </div>
                <h3 className="font-extrabold text-slate-900 mb-2">Process New Meeting</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-8 px-4">
                  Drag your .mp4, .wav, or .pdf notes here to generate a curated summary.
                </p>
                <button className="w-full py-3.5 bg-slate-50 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-100 transition-all">
                  Select Files
                </button>
              </section>

              {/* Efficiency Pulse Card */}
              <section className="bg-indigo-600 bg-linear-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-indigo-100 isolation-auto">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>

                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] mb-8 opacity-70 relative z-10">Efficiency Pulse</p>

                <div className="flex items-baseline gap-2 mb-4 relative z-10">
                  <span className="text-5xl font-extrabold tracking-tighter">84%</span>
                  <span className="text-xs font-bold opacity-80">Finalized</span>
                </div>

                <p className="text-xs leading-relaxed opacity-80 font-medium mb-10 relative z-10">
                  Your meetings are becoming more concise. Average duration decreased by 12m.
                </p>

                <div className="flex justify-between items-center pt-6 border-t border-white/10 relative z-10">
                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Summ.</span>
                  <span className="text-lg font-extrabold">142</span>
                </div>
              </section>

              {/* Contextually Related */}
              <section className="bg-gray-400 rounded-[2.5rem] p-8 border border-white">
                <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-6 px-2">Contextually Related</h3>
                <div className="space-y-3">
                  {[
                    { title: "Project Alpha Roadmap", sub: "Related Project", icon: <TrendingUp className="text-indigo-600" /> },
                    { title: "API Documentation v2", sub: "Related Resource", icon: <Files className="text-blue-600" /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl hover:bg-slate-50 transition-all cursor-pointer shadow-sm group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                          {React.cloneElement(item.icon, { size: 18 })}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{item.title}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{item.sub}</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MeetingSummaries;
