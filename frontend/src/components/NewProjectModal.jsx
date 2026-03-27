import React, { useState } from 'react';
import { X, Zap, Layout, Activity, Sparkles, Check } from 'lucide-react';

const NewProjectModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Development');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { name: 'Development', icon: <Zap size={18} />, color: 'bg-blue-600' },
    { name: 'Design', icon: <Layout size={18} />, color: 'bg-indigo-600' },
    { name: 'Analytics', icon: <Activity size={18} />, color: 'bg-purple-600' },
    { name: 'AI Research', icon: <Sparkles size={18} />, color: 'bg-emerald-600' }
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError('Project name is required');
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: name, 
          status: 'Active',
          badge: 'New Initiative',
          projectIdStr: `SPAI-${Math.floor(Math.random() * 900) + 100}`,
          color: 'bg-blue-600'
        })
      });

      if (!response.ok) throw new Error('Failed to create project');

      setName('');
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-6 right-6">
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-400 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10">
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter mb-2">Initiate Project</h2>
          <p className="text-slate-500 font-bold mb-8 italic text-sm">Define the core parameters for the new workspace nexus.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Project Name</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Project Phoenix"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Select Domain</label>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategory(cat.name)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                      category === cat.name 
                      ? 'border-slate-800 bg-white shadow-xl shadow-slate-200/50' 
                      : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-8 h-8 ${cat.color} text-white rounded-lg flex items-center justify-center shadow-lg`}>
                      {cat.icon}
                    </div>
                    <span className={`text-xs font-black ${category === cat.name ? 'text-slate-800' : 'text-slate-400 uppercase tracking-tighter'}`}>
                      {cat.name}
                    </span>
                    {category === cat.name && <Check size={14} className="ml-auto text-slate-800" strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && <p className="mt-6 text-red-500 text-[10px] font-black uppercase text-center tracking-widest bg-red-50 py-3 rounded-xl border border-red-100">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-10 bg-slate-800 hover:bg-slate-900 text-white font-black py-5 rounded-3xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? 'Transmitting Data...' : (
              <>
                Initialize Nexus
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
