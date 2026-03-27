import React, { useState } from 'react';
import Modal from './Modal';
import { Plus, Check, Layout, Clock, User } from 'lucide-react';

const AddTaskModal = ({ isOpen, onClose, onAdd, projectId }) => {
  const [formData, setFormData] = useState({
    title: '',
    tag: 'Dev',
    status: 'Review Needed',
    priority: 'Medium',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ title: '', tag: 'Dev', status: 'Review Needed', priority: 'Medium', description: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Task Title</label>
          <input 
            type="text" 
            required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="e.g. Refactor Auth Flow"
            className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
           <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
            <select 
              value={formData.tag}
              onChange={(e) => setFormData({...formData, tag: e.target.value})}
              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none appearance-none cursor-pointer"
            >
              <option>Dev</option>
              <option>Design</option>
              <option>Product</option>
              <option>QA</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Priority</label>
            <select 
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none appearance-none cursor-pointer"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
          <div className="flex gap-3">
             {['Review Needed', 'Active Sprint', 'Completed'].map(state => (
               <button
                 key={state}
                 type="button"
                 onClick={() => setFormData({...formData, status: state})}
                 className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all border-2 ${
                   formData.status === state 
                   ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                   : 'bg-white border-slate-50 text-slate-400 hover:border-slate-100'
                 }`}
               >
                 {state}
               </button>
             ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Notes</label>
          <textarea 
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none resize-none"
            placeholder="Add context for the team..."
          />
        </div>

        <div className="pt-4">
           <button 
             type="submit"
             className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
           >
             <Plus size={18} strokeWidth={4} />
             Confirm Task
           </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
