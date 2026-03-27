import React, { useState } from 'react';
import Modal from './Modal';
import { UserPlus, Star, Shield, Layout, Clock, User, MessageSquare } from 'lucide-react';

const InviteMemberModal = ({ isOpen, onClose, onInvite }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Contributor',
    status: 'Idle'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onInvite(formData);
    setFormData({ name: '', role: 'Contributor', status: 'Idle' });
  };

  const roles = [
    { name: 'Admin', color: 'bg-red-500', icon: <Shield size={14} /> },
    { name: 'Contributor', color: 'bg-blue-600', icon: <Star size={14} /> },
    { name: 'Viewer', color: 'bg-slate-300', icon: <Layout size={14} /> }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Teammate">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Member Name</label>
          <div className="relative">
            <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Full Name"
              className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl text-[13px] font-black text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
           <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Project Role</label>
           <div className="grid grid-cols-1 gap-4">
              {roles.map(role => (
                <button
                  key={role.name}
                  type="button"
                  onClick={() => setFormData({...formData, role: role.name})}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all group ${
                    formData.role === role.name 
                    ? 'bg-blue-50 border-blue-600 shadow-lg shadow-blue-50' 
                    : 'bg-white border-slate-50 hover:border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${formData.role === role.name ? role.color : 'bg-slate-50'} rounded-xl flex items-center justify-center text-white transition-colors`}>
                      {role.icon}
                    </div>
                    <span className={`text-[12px] font-black uppercase tracking-tight ${formData.role === role.name ? 'text-blue-600' : 'text-slate-400'}`}>
                      {role.name}
                    </span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                    formData.role === role.name ? 'bg-blue-600 border-blue-600 scale-110' : 'bg-white border-slate-200'
                  }`}>
                     {formData.role === role.name && <Check size={12} className="text-white mx-auto mt-0.5" strokeWidth={4} />}
                  </div>
                </button>
              ))}
           </div>
        </div>

        <div className="pt-6">
           <button 
             type="submit"
             className="w-full py-5 bg-slate-900 border border-slate-800 text-white rounded-4xl font-black text-[12px] uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
           >
             <UserPlus size={18} strokeWidth={3} />
             Send Invitation
           </button>
           <p className="text-[10px] text-center text-slate-300 font-bold uppercase tracking-widest mt-6">Members will be notified via SPAI Dashboard</p>
        </div>
      </form>
    </Modal>
  );
};

// Internal Check Icon helper
const Check = ({ size, className, strokeWidth }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default InviteMemberModal;
