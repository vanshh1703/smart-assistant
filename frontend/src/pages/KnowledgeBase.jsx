import React, { useState, useEffect } from 'react';
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
  Clock,
  ArrowRight,
  Check
} from 'lucide-react';

const KnowledgeBase = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [data, setData] = useState({ assets: [], stats: null });
  const [loading, setLoading] = useState(true);
  const [activeAsset, setActiveAsset] = useState(null);

  useEffect(() => {
    const fetchKnowledge = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/knowledge');
        if (!res.ok) throw new Error('Failed to fetch knowledge base');
        const json = await res.json();
        setData(json);
        if (json.assets.length > 0) {
          setActiveAsset(json.assets[0]);
        }
      } catch (err) {
        console.error('Error fetching knowledge:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchKnowledge();
  }, []);

  if (loading) {
    return (
      <div className="flex bg-[#F8FAFC] min-h-screen items-center justify-center font-black text-slate-400 uppercase tracking-[0.5em]">
        Neural Sync...
      </div>
    );
  }

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900 relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-6 md:p-10 max-w-[1500px] mx-auto w-full">
          
          {/* Header Section */}
          <div className="text-center mb-16 pt-10">
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter mb-6">The Library of Insights</h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-bold opacity-80">
              Harness the power of semantic search to find answers hidden within your workspace documentation.
            </p>
          </div>

          {/* Search Hero */}
          <div className="max-w-4xl mx-auto mb-24 relative px-4">
            <div className="bg-white rounded-4xl p-4 shadow-2xl shadow-slate-200/40 border border-slate-50 flex items-center group focus-within:ring-12 focus-within:ring-blue-50/50 transition-all duration-500">
              <div className="pl-6 pr-4 text-slate-300 group-focus-within:text-blue-600 transition-colors">
                <Search size={26} strokeWidth={3} />
              </div>
              <input 
                type="text" 
                placeholder="Ask a question about your documents..." 
                className="flex-1 py-5 bg-transparent border-none focus:outline-none text-slate-800 text-lg font-black tracking-tight placeholder:text-slate-300 placeholder:font-black"
              />
              <button className="bg-blue-600 text-white px-10 py-4.5 rounded-[1.8rem] font-black text-[13px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-3 mr-1 active:scale-95">
                <Zap size={20} fill="currentColor" strokeWidth={0} />
                Search
              </button>
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-4 items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mr-2">Try Asking:</span>
              {[
                "What were the key takeaways from the Q3 strategy doc?",
                "Find the contract terms for the Phoenix Project"
              ].map((chip, i) => (
                <button key={i} className="px-6 py-3 bg-white text-blue-600 text-[11px] font-black rounded-full border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all hover:-translate-y-1 shadow-sm italic uppercase tracking-tight">
                  "{chip}"
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-12">
            
            {/* Left Archive Column */}
            <div className="space-y-12">
              <div className="flex items-center justify-between px-6">
                <h2 className="text-2xl font-black text-slate-800 tracking-tighter">Knowledge Assets</h2>
                <div className="flex gap-3">
                   <div className="flex p-1 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <button className="p-2.5 px-5 bg-slate-50 text-slate-800 rounded-xl shadow-inner transition-all"><Layout size={18} strokeWidth={2.5} /></button>
                      <button className="p-2.5 px-5 text-slate-300 hover:text-slate-600 transition-all"><Files size={18} /></button>
                   </div>
                </div>
              </div>

              <div className="space-y-8">
                {data.assets.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 font-black uppercase tracking-widest bg-white rounded-[2.8rem] border border-slate-50">
                    No Assets Indexed
                  </div>
                ) : (
                  data.assets.map((asset) => (
                    <div 
                      key={asset.id} 
                      className={`bg-white rounded-[2.8rem] p-10 border shadow-sm hover:shadow-2xl hover:translate-x-3 transition-all cursor-pointer group relative overflow-hidden ${activeAsset?.id === asset.id ? 'border-blue-200 ring-4 ring-blue-50/20' : 'border-slate-50'}`}
                      onClick={() => setActiveAsset(asset)}
                    >
                      <div className="flex items-start gap-8 relative z-10">
                        <div className={`w-16 h-16 ${asset.accentColor} text-white rounded-[1.6rem] flex items-center justify-center shrink-0 shadow-2xl transition-transform group-hover:rotate-12`}>
                          {asset.iconType === 'Layout' ? <Layout size={28} strokeWidth={2.5} /> : <FileText size={28} strokeWidth={2.5} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors tracking-tight uppercase">{asset.title}</h3>
                            <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
                              {asset.matchPercent}% Match
                            </span>
                          </div>
                          <p className="text-[12px] font-bold text-slate-400 mb-6 uppercase tracking-widest">Modified {asset.lastModified} • {asset.size}</p>
                          <p className="text-[15px] text-slate-500 leading-relaxed font-bold opacity-80 line-clamp-2">
                             {asset.extractExcerpt}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Expand Banner */}
              <div className="bg-slate-900 rounded-[3rem] p-16 text-white relative overflow-hidden group shadow-2xl shadow-indigo-100/20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10 max-w-xl">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                        <Upload size={24} strokeWidth={3} />
                     </div>
                     <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">Knowledge Ingestion</span>
                  </div>
                  <h3 className="text-4xl font-black mb-6 tracking-tighter">Expand Your Private Vault</h3>
                  <p className="opacity-70 text-base font-bold leading-relaxed mb-12">
                    Drop any files here to index them using our neural search engine. Supported: PDF, DOCX, XLSX, TXT, PNG, JPG.
                  </p>
                  <button className="bg-white text-slate-900 px-10 py-5 rounded-[1.8rem] font-black text-[13px] uppercase tracking-widest shadow-2xl hover:shadow-white/10 hover:scale-[1.03] transition-all flex items-center gap-3 active:scale-95 group/btn border border-transparent hover:border-blue-200">
                    <CloudUpload size={20} className="group-hover/btn:mb-1 transition-all" />
                    Upload Documents
                  </button>
                </div>
                
                <div className="absolute bottom-[-10%] right-[-5%] opacity-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-1000">
                  <Zap size={300} fill="currentColor" strokeWidth={0} />
                </div>
              </div>
            </div>

            {/* Right Sidepanel Column */}
            <div className="space-y-10">
              
              <section className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-sm sticky top-10 flex flex-col min-h-[600px] justify-between">
                <div>
                  <div className="flex items-center justify-between mb-12">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
                         <FileText size={20} strokeWidth={2.5} />
                       </div>
                       <div>
                         <span className="text-xs font-black text-slate-800 tracking-tight block truncate max-w-[160px]">{activeAsset?.title || 'No Active Doc'}</span>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Document</span>
                       </div>
                     </div>
                     <button className="p-2.5 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                       <Maximize2 size={18} />
                     </button>
                  </div>

                  <div className="space-y-12">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <Sparkles size={18} className="text-indigo-600" strokeWidth={2.5} />
                        <span className="text-indigo-600 text-[11px] font-black uppercase tracking-[0.2em]">SPAI Insight Bar</span>
                      </div>
                      <p className="text-[14px] text-slate-600 leading-[1.8] font-bold opacity-90">
                        {activeAsset?.insight?.summary || 'No detailed analysis available for this asset.'}
                      </p>
                    </div>

                    <div className="bg-indigo-600 rounded-4xl p-8 text-white relative overflow-hidden group/box shadow-xl shadow-indigo-100">
                      <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent"></div>
                      <div className="flex items-center gap-3 mb-5 relative z-10">
                        <Zap size={18} fill="white" strokeWidth={0} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Neural Extract</span>
                      </div>
                      <p className="text-[13px] leading-relaxed font-black relative z-10 italic">
                        {activeAsset?.insight?.neuralExtract || '"Select an asset to extract neural insights."'}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-tight opacity-60">
                         {activeAsset?.insight?.sectionTitle || 'Analysis breakout'}
                      </p>
                      <p className="text-[14px] text-slate-700 leading-relaxed font-bold">
                         {activeAsset?.insight?.sectionText || 'Click a document index above to preview detailed workforce insights and section-by-section analysis.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-12 space-y-4">
                  <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-100 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all active:scale-95 group/main">
                    <MessageSquare size={18} strokeWidth={2.5} />
                    Interact with AI
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                     <button className="py-4 bg-slate-50 text-slate-600 font-black text-[10px] rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:shadow-sm hover:border hover:border-slate-100 transition-all uppercase tracking-widest">
                       <Download size={14} strokeWidth={3} />
                       Export
                     </button>
                     <button className="py-4 bg-slate-50 text-slate-600 font-black text-[10px] rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:shadow-sm hover:border hover:border-slate-100 transition-all uppercase tracking-widest">
                       <Share2 size={14} strokeWidth={3} />
                       Access
                     </button>
                  </div>
                </div>
              </section>

              {/* Usage Card */}
              <section className="bg-white rounded-[2.8rem] p-10 border border-slate-50 shadow-sm space-y-10 group">
                 <div>
                   <div className="flex justify-between items-center mb-6">
                     <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Neural Index Size</span>
                     <span className="text-[11px] font-black text-slate-800">{data.stats?.indexSizeUsed || 0} GB / {data.stats?.indexSizeTotal || 0} GB</span>
                   </div>
                   <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-50">
                     <div 
                        className="h-full bg-blue-600 rounded-full shadow-lg shadow-blue-100 transition-all duration-1000" 
                        style={{ width: `${(data.stats?.indexSizeUsed / data.stats?.indexSizeTotal) * 100 || 0}%` }}
                      ></div>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                   <div className="bg-[#F8FAFC] p-8 rounded-4xl border border-transparent shadow-inner text-center group/mini hover:bg-white hover:border-blue-100 transition-all">
                     <p className="text-[32px] font-black text-slate-800 mb-1 group-mini-hover:text-blue-600 transition-colors tracking-tighter">{data.stats?.totalAssets || 0}</p>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Assets</p>
                   </div>
                   <div className="bg-[#F8FAFC] p-8 rounded-4xl border border-transparent shadow-inner text-center group/mini hover:bg-white hover:border-blue-100 transition-all">
                     <p className="text-[32px] font-black text-slate-800 mb-1 group-mini-hover:text-blue-600 transition-colors tracking-tighter">{data.stats?.totalEntities > 1000 ? `${(data.stats.totalEntities/1000).toFixed(0)}k` : data.stats?.totalEntities || 0}</p>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Entities</p>
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

/* Helper Component */
const CloudUpload = ({ size, className }) => (
  <div className={`relative ${className}`}>
     <Upload size={size} strokeWidth={3} />
  </div>
);

export default KnowledgeBase;
