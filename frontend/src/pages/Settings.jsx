import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import InviteMemberModal from '../components/InviteMemberModal';
import { 
  User, 
  Shield, 
  Users, 
  Bell, 
  CreditCard, 
  Camera, 
  Check, 
  ChevronRight, 
  Smartphone, 
  Monitor, 
  MoreVertical, 
  Mail, 
  Lock,
  Plus,
  Sparkles,
  Zap,
  AlertCircle
} from 'lucide-react';

const iconMap = {
  'Monitor': <Monitor />,
  'Smartphone': <Smartphone />,
  'Mail': <Mail />,
  'Zap': <Zap />,
  'Sparkles': <Sparkles />
};

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [activeTab, setActiveTab] = useState('Profile & Security');
  const [userProfile, setUserProfile] = useState({
    firstName: '', lastName: '', email: '', title: '', role: '', accountType: '', avatar: '',
    securityScore: 0, is2FAEnabled: false, sessions: [], workspaceMembers: [], notificationPreferences: []
  });
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/user/profile');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setUserProfile(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 5) return;
    try {
      const res = await fetch('http://localhost:5000/api/user/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: passwordData.newPassword })
      });
      if (res.ok) {
         alert('Password updated successfully');
         setPasswordData({ newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle2FA = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/2fa', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is2FAEnabled: !userProfile.is2FAEnabled })
      });
      if (res.ok) {
        setUserProfile(prev => ({ ...prev, is2FAEnabled: !prev.is2FAEnabled }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
         const updated = await res.json();
         setUserProfile(prev => ({ ...prev, ...updated }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePref = async (pref) => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/notifications/${pref.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !pref.active })
      });
      if (res.ok) {
         setUserProfile(prev => ({
           ...prev,
           notificationPreferences: prev.notificationPreferences.map(p => 
             p.id === pref.id ? { ...p, active: !p.active } : p
           )
         }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInviteMember = async (memberData) => {
    try {
      // In a real app we would send email invites. Here we just instantly create a mock workspace member
      const newMember = {
        name: memberData.name,
        email: `${memberData.name.toLowerCase().replace(' ', '.')}@spai-works.com`,
        role: memberData.role,
        roleColor: memberData.role === 'Admin' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600',
        status: 'Invited',
        statusColor: 'text-amber-500',
        avatar: memberData.name.split(' ')[0].toLowerCase()
      };
      
      const res = await fetch('http://localhost:5000/api/workspace-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember)
      });
      
      if (res.ok) {
         const addedMember = await res.json();
         setUserProfile(prev => ({
           ...prev,
           workspaceMembers: [...prev.workspaceMembers, addedMember]
         }));
         setIsInviteModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900 relative overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-6 md:p-10 max-w-[1400px] mx-auto w-full">
          
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3">Settings</h1>
            <p className="text-slate-500 text-sm font-bold opacity-75">Manage your personal profile, team members, and global application preferences.</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-8 border-b border-slate-100 mb-12">
            {['Profile & Security', 'Team Management', 'Notifications', 'Subscription'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                  activeTab === tab ? 'text-[#2563EB]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2563EB] rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-10">
            
            {/* Top Section: Profile & Security Pulse */}
            {(activeTab === 'Profile & Security') && (
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10">
              
              {/* Profile Details Card */}
              <section className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm relative">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Profile Details</h2>
                    <p className="text-xs font-bold text-slate-400 mt-1">Update your photo and personal details.</p>
                  </div>
                  <button 
                    onClick={handleSaveProfile}
                    className="px-5 py-2.5 bg-slate-50 text-slate-600 font-black text-[10px] rounded-xl hover:bg-slate-100 transition-all uppercase tracking-widest"
                  >
                    Save Changes
                  </button>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-10 mb-12">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-xl">
                      <img src={`https://i.pravatar.cc/150?u=${userProfile.avatar}`} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button className="absolute bottom-1 right-1 w-10 h-10 bg-[#2563EB] text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 active:scale-95 transition-all">
                      <Camera size={16} />
                    </button>
                  </div>

                  <div className="flex-1 pt-4">
                    <h3 className="text-2xl font-black text-slate-800 mb-1">{userProfile.firstName} {userProfile.lastName}</h3>
                    <p className="text-sm font-bold text-slate-400 mb-4">{userProfile.title}</p>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">{userProfile.role}</span>
                       <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-lg">{userProfile.accountType}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">First Name</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-100 transition-all" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-100 transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-100 transition-all" 
                  />
                </div>
              </section>

              {/* Sidebar Column */}
              <div className="space-y-8">
                
                {/* AI Security Pulse Card */}
                <section className="bg-[#8b5cf6] rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-purple-100">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                     <Shield size={20} className="text-white" />
                     <p className="text-[10px] font-black uppercase tracking-[0.2em]">AI Security Pulse</p>
                  </div>
                  
                  <p className="text-sm font-bold leading-relaxed mb-10 relative z-10">
                    Your account security is {userProfile.securityScore}%. {userProfile.is2FAEnabled ? '2FA is active.' : 'Enable 2FA to reach 100% and unlock advanced AI protection.'}
                  </p>
                  
                  <button className="w-full py-4 bg-white/20 backdrop-blur-md rounded-2xl text-white font-black text-[11px] uppercase tracking-widest hover:bg-white/30 transition-all active:scale-95 shadow-lg border border-white/20">
                    Improve Security
                  </button>
                  
                  <div className="absolute bottom-[-10%] right-[-10%] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                    <Shield size={160} />
                  </div>
                </section>

                {/* Active Sessions Card */}
                <section className="bg-[#F8FAFC] border border-white rounded-[2.5rem] p-8">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Active Sessions</h3>
                  <div className="space-y-6">
                    {userProfile.sessions && userProfile.sessions.map((session, i) => (
                      <div key={session.id} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-[#2563EB] transition-colors shadow-sm">
                          {iconMap[session.iconUrl] ? React.cloneElement(iconMap[session.iconUrl], { size: 18 }) : <Monitor size={18} />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-black text-slate-800">{session.deviceName}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                             {session.location} • <span className={session.status === 'Active now' ? 'text-emerald-500' : ''}>{session.status}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
            )}

            {/* Team Management Section */}
            {(activeTab === 'Team Management') && (
            <section className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm overflow-hidden">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                 <div>
                   <h2 className="text-xl font-black text-slate-800 tracking-tight">Team Management</h2>
                   <p className="text-xs font-bold text-slate-400 mt-1">Add members and define their workspace permissions.</p>
                 </div>
                 <button 
                   onClick={() => setIsInviteModalOpen(true)}
                   className="bg-[#2563EB] text-white px-8 py-3.5 rounded-2xl font-black text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 active:scale-95"
                 >
                   <Plus size={16} />
                   Invite Member
                 </button>
               </div>

               <div className="overflow-x-auto">
                 <div className="min-w-[800px]">
                    <div className="grid grid-cols-[3fr_1fr_1.5fr_60px] gap-8 bg-slate-50 py-5 px-8 rounded-2xl mb-6">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Member</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Role</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</p>
                    </div>

                    <div className="space-y-3">
                      {userProfile.workspaceMembers && userProfile.workspaceMembers.map((member) => (
                        <div key={member.id} className="grid grid-cols-[3fr_1fr_1.5fr_60px] gap-8 py-5 px-8 hover:bg-slate-50/50 transition-all cursor-default items-center rounded-3xl group">
                           <div className="flex items-center gap-4 px-2">
                             <img src={`https://i.pravatar.cc/150?u=${member.avatar}`} className="w-10 h-10 rounded-full border border-white shadow-sm" alt="User" />
                             <div>
                               <p className="text-sm font-black text-slate-800">{member.name}</p>
                               <p className="text-[10px] font-bold text-slate-400">{member.email}</p>
                             </div>
                           </div>
                           <div className="text-center">
                             <span className={`px-3 py-1 ${member.roleColor} text-[9px] font-black uppercase tracking-widest rounded-lg`}>{member.role}</span>
                           </div>
                           <div className="flex items-center justify-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${member.statusColor.replace('text', 'bg')}`}></div>
                              <span className={`text-[10px] font-black uppercase tracking-widest ${member.statusColor}`}>{member.status}</span>
                           </div>
                           <div className="flex justify-end pr-2 text-slate-300 hover:text-slate-600 transition-colors">
                             <MoreVertical size={18} />
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>
               </div>
            </section>
            )}

            {/* Bottom Section: Notifications & Security */}
            {(activeTab === 'Notifications' || activeTab === 'Profile & Security') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Notification Preferences Card */}
              {activeTab === 'Notifications' && (
              <section className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm">
                <h2 className="text-xl font-black text-slate-800 tracking-tight mb-10">Notification Preferences</h2>
                <div className="space-y-8">
                  {userProfile.notificationPreferences && userProfile.notificationPreferences.map((pref) => (
                    <div key={pref.id} className={`flex items-center justify-between p-6 rounded-3xl border border-transparent transition-all ${pref.customBg ? pref.customBg : ''}`}>
                      <div className="flex items-center gap-5">
                         <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#2563EB] transition-colors ${pref.customBg ? 'bg-white shadow-sm text-purple-600' : ''}`}>
                            {iconMap[pref.icon] ? React.cloneElement(iconMap[pref.icon], { size: 18 }) : <Mail size={18} />}
                         </div>
                         <div>
                           <p className="text-sm font-black text-slate-800">{pref.title}</p>
                           <p className="text-[10px] font-bold text-slate-400 mt-1">{pref.description}</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => handleTogglePref(pref)}
                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${pref.active ? pref.color : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${pref.active ? 'right-1' : 'left-1'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
              )}

              {/* Security & Authentication Card (also visible on Profile tab) */}
              {activeTab === 'Profile & Security' && (
              <section className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm">
                <h2 className="text-xl font-black text-slate-800 tracking-tight mb-10">Security & Authentication</h2>
                <div className="space-y-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Current Password</label>
                     <input type="password" value="********" readOnly className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-500" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">New Password</label>
                       <input 
                         type="password" 
                         value={passwordData.newPassword}
                         onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                         placeholder="Min 12 chars" 
                         className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 transition-all" 
                       />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Confirm New</label>
                       <input 
                         type="password" 
                         value={passwordData.confirmPassword}
                         onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                         placeholder="Re-type password" 
                         className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 transition-all" 
                       />
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button 
                      onClick={handleUpdatePassword}
                      className="bg-[#2563EB] text-white px-8 py-3.5 rounded-2xl font-black text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
                    >
                      Update Security
                    </button>
                    <button 
                      onClick={handleToggle2FA}
                      className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest hover:text-blue-700 transition-colors"
                    >
                      {userProfile.is2FAEnabled ? 'Disable Two-Factor' : 'Enable Two-Factor'}
                    </button>
                  </div>
                </div>
              </section>
              )}

            </div>
            )}

            {activeTab === 'Subscription' && (
              <div className="bg-white rounded-[2.5rem] p-12 border border-slate-50 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                <CreditCard size={48} className="text-slate-300 mb-6" />
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Billing & Subscriptions</h2>
                <p className="text-slate-500 font-bold mt-2">This feature is currently under development.</p>
              </div>
            )}
            
          </div>
        </main>
      </div>

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteMember}
      />
    </div>
  );
};

export default Settings;
