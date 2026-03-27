import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  Search, 
  Sparkles, 
  FileText, 
  Download, 
  Share2, 
  ExternalLink,
  Plus,
  ArrowUpRight,
  TrendingUp,
  MessageSquare,
  Files,
  Zap,
  Layout,
  Upload,
  ChevronRight,
  Maximize2,
  Clock
} from 'lucide-react';

const KnowledgeBase = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900 relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-6 md:p-10 max-w-[1600px] mx-auto w-full">
          
          {/* Header Section */}
          <div className="text-center mb-16 pt-8">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">The Library of Insights</h1>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
              Harness the power of semantic search to find answers hidden within your workspace documentation.
            </p>
          </div>

          {/* Search Hero */}
          <div className="max-w-4xl mx-auto mb-20 relative px-4">
            <div className="bg-white rounded-4xl p-4 shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center group focus-within:ring-4 focus-within:ring-blue-50 transition-all">
              <div className="pl-6 pr-4 text-slate-300 group-focus-within:text-[#2563EB] transition-colors">
                <Search size={22} />
              </div>
              <input 
                type="text" 
                placeholder="Ask a question about your documents..." 
                className="flex-1 py-4 bg-transparent border-none focus:outline-none text-slate-800 font-bold placeholder:text-slate-300 placeholder:font-bold"
              />
              <button className="bg-[#2563EB] text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 mr-1 active:scale-95">
                <Zap size={18} fill="currentColor" />
                Search
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-3 items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Try Asking:</span>
              {[
                "What were the key takeaways from the Q3 strategy doc?",
                "Find the contract terms for the Phoenix Project"
              ].map((chip, i) => (
                <button key={i} className="px-5 py-2.5 bg-blue-50/50 text-[#2563EB] text-[11px] font-bold rounded-full border border-blue-100/50 hover:bg-blue-100 transition-all hover:-translate-y-0.5 shadow-sm italic">
                  "{chip}"
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-12">
            
            {/* Left Archive Column */}
            <div className="space-y-12">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-xl font-black text-slate-800">Recent Knowledge Assets</h2>
                <div className="flex gap-2 text-slate-300">
                  <button className="p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm hover:text-slate-600 transition-all"><Layout size={18} /></button>
                  <button className="p-2.5 bg-[#2563EB] text-white rounded-xl shadow-lg shadow-blue-100"><Files size={18} /></button>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Product_Roadmap_2024_v2.pdf", meta: "Modified 2 days ago • 4.2 MB", match: "98% Match", color: "bg-blue-50 text-[#2563EB]", icon: <FileText /> },
                  { title: "Client_Feedback_Synthesis.docx", meta: "Modified 5 hours ago • 1.1 MB", match: "82% Match", color: "bg-orange-50 text-orange-600", icon: <FileText /> },
                  { title: "Workspace_Architecture_Diagram.png", meta: "Uploaded Oct 12 • 8.5 MB", match: "75% Match", color: "bg-purple-50 text-purple-600", icon: <Layout /> },
                ].map((asset, i) => (
                  <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:translate-x-2 transition-all cursor-pointer group relative overflow-hidden">
                    <div className="flex items-start gap-6 relative z-10">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${asset.color}`}>
                        {React.cloneElement(asset.icon, { size: 24 })}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-[15px] font-black text-slate-800 group-hover:text-[#2563EB] transition-colors">{asset.title}</h3>
                          <span className="text-[9px] font-black uppercase tracking-widest bg-blue-50/50 text-[#2563EB] px-3 py-1 rounded-lg">
                            {asset.match}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 mb-4">{asset.meta}</p>
                        <p className="text-[13px] text-slate-500 leading-relaxed font-medium line-clamp-2">
                          "...the integration of AI agents into the core workspace is slated for Q3. We will prioritize <span className="text-slate-900 font-bold underline decoration-indigo-200 underline-offset-4">semantic search capabilities</span> to ensure users can retrieve cross-platform data instantly..."
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expand Banner */}
              <div className="bg-indigo-600 bg-linear-to-br from-indigo-600 to-blue-700 rounded-[3rem] p-12 text-white relative overflow-hidden group shadow-2xl shadow-indigo-100">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10 max-w-xl">
                  <h3 className="text-3xl font-black mb-4 tracking-tight">Expand Your Knowledge</h3>
                  <p className="opacity-70 text-sm font-medium leading-relaxed mb-10">
                    Drop any files here to index them into your private SPAI vault. Supported: PDF, DOCX, XLSX, TXT, PNG, JPG.
                  </p>
                  <button className="bg-white text-[#2563EB] px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 active:scale-95">
                    <Upload size={18} />
                    Upload Files
                  </button>
                </div>
                
                <div className="absolute bottom-[-20%] right-[-5%] opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <Zap size={240} fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Right Sidepanel Column */}
            <div className="space-y-8">
              
              <section className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-sm sticky top-10">
                <div className="flex items-center justify-between mb-10">
                   <div className="flex items-center gap-3">
                     <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                       <FileText size={18} />
                     </span>
                     <span className="text-xs font-black text-slate-800 truncate max-w-[140px]">Product_Roadma...</span>
                   </div>
                   <button className="p-2 text-slate-300 hover:text-slate-600 transition-all">
                     <Maximize2 size={16} />
                   </button>
                </div>

                <div className="space-y-10">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={16} className="text-indigo-600" />
                      <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">Executive Summary</span>
                    </div>
                    <p className="text-[13px] text-slate-600 leading-[1.8] font-medium opacity-80">
                      This document outlines the strategic vision for the SPAI platform through the 2024 calendar year. Our focus is squarely on reducing the friction between data ingestion and actionable insights.
                    </p>
                  </div>

                  <div className="bg-indigo-50/50 rounded-2xl p-6 ring-1 ring-indigo-100/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={14} className="text-indigo-600" />
                      <span className="text-indigo-600 text-[9px] font-black uppercase tracking-widest">Relevant Insight</span>
                    </div>
                    <p className="text-[11px] text-slate-700 leading-relaxed font-bold italic">
                      "The integration of semantic search allows for querying documents using natural language questions rather than just keyword matching."
                    </p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Section 2: Market Positioning. We aim to differentiate from legacy document management systems by offering a "Curated Workspace" experience where the AI acts as an editorial layer.
                    </p>
                    
                    <button className="w-full py-6 bg-slate-900 rounded-3xl group overflow-hidden relative active:scale-[0.98] transition-all">
                       <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                       <div className="flex items-center justify-center gap-3 relative z-10">
                         <Layout size={16} className="text-blue-400" />
                         <span className="text-white font-black text-xs">View Full Diagram</span>
                       </div>
                    </button>

                    <p className="text-[10px] text-slate-400 leading-relaxed font-medium italic">
                      Appendix A: Project Milestones. The rollout of the knowledge base infrastructure is the highest priority item in the Q1-Q2 transition phase.
                    </p>
                  </div>

                  <div className="pt-8 space-y-4">
                    <button className="w-full py-4 bg-[#2563EB] text-white rounded-2xl font-black text-xs shadow-lg shadow-blue-100 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all active:scale-95">
                      <MessageSquare size={16} />
                      Chat with this Document
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                       <button className="py-3 bg-slate-50 text-slate-600 font-black text-[10px] rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-all uppercase tracking-widest">
                         <Download size={14} />
                         Download
                       </button>
                       <button className="py-3 bg-slate-50 text-slate-600 font-black text-[10px] rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-all uppercase tracking-widest">
                         <Share2 size={14} />
                         Share
                       </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Usage Card */}
              <section className="bg-[#F8FAFC] border border-white rounded-[2.5rem] p-10 space-y-10">
                 <div>
                   <div className="flex justify-between items-center mb-4">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Knowledge Usage</span>
                     <span className="text-[10px] font-black text-slate-800">4.2 GB / 10 GB</span>
                   </div>
                   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-[#2563EB] rounded-full w-[42%] shadow-[0_0_10px_rgba(37,99,235,0.3)]"></div>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm text-center group hover:border-[#2563EB] transition-all">
                     <p className="text-[22px] font-black text-slate-800 mb-1 group-hover:text-[#2563EB] transition-colors">128</p>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Documents</p>
                   </div>
                   <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm text-center group hover:border-[#2563EB] transition-all">
                     <p className="text-[22px] font-black text-slate-800 mb-1 group-hover:text-[#2563EB] transition-colors">14k</p>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pages Indexed</p>
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

export default KnowledgeBase;
