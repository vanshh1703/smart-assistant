import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Folder, 
  FileText, 
  BookOpen, 
  BarChart2, 
  Settings, 
  CreditCard,
  Plus,
  X,
  Zap
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Folder size={20} />, label: 'Projects', path: '/projects' },
    { icon: <FileText size={20} />, label: 'Meeting Summaries', path: '/summaries' },
    { icon: <BookOpen size={20} />, label: 'Knowledge Base', path: '/knowledge' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', path: '/analytics' },
  ];

  const systemItems = [
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <CreditCard size={20} />, label: 'Billing', path: '/billing' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className={`
        w-64 h-screen bg-white border-r border-gray-100 flex flex-col p-6 fixed left-0 top-0 z-50 
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between mb-10 px-2 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <Zap size={22} fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 leading-none">SPAI</h1>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest opacity-80">Smart Assistant</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar -mx-6 px-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4 mt-2">Main Menu</p>
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 relative ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600 font-bold' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              {isActive(item.path) && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600"></div>
              )}
              <span className={isActive(item.path) ? 'text-blue-600' : 'text-gray-400'}>
                {item.icon}
              </span>
              <span className="text-sm">
                {item.label}
              </span>
            </Link>
          ))}

          <div className="pt-8 pb-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">Configuration</p>
          </div>

          {systemItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 relative ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600 font-bold' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              {isActive(item.path) && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600"></div>
              )}
              <span className={isActive(item.path) ? 'text-blue-600' : 'text-gray-400'}>
                {item.icon}
              </span>
              <span className="text-sm">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* New Project Button */}
        <div className="pt-6 shrink-0">
          <button className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white py-3.5 px-6 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:shadow-blue-200 transition-all active:scale-95">
            <Plus size={18} strokeWidth={3} />
            <span>New Project</span>
          </button>
        </div>
      </div>

    </>
  );
};

export default Sidebar;

