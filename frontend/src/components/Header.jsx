import { Search, Bell, Grid, Menu, X } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100/50 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center gap-4 lg:hidden">
        <button 
          onClick={toggleSidebar}
          className="p-2.5 text-gray-500 hover:bg-gray-100/80 rounded-xl transition-all active:scale-95"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative flex-1 max-w-md hidden md:block">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <Search size={18} />
        </span>
        <input 
          type="text" 
          placeholder="Search anything..." 
          className="w-full bg-gray-100/50 border border-transparent rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all placeholder:text-gray-400 font-medium"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* AI Status */}
        <div className="hidden sm:flex items-center gap-2.5 bg-linear-to-r from-purple-50 to-blue-50 px-4 py-2 rounded-2xl border border-purple-100/50 shadow-xs">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping opacity-75"></div>
          </div>
          <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">AI Systems Active</span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 md:gap-5 text-gray-400">
          <button className="p-2 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all relative group">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-100"></span>
          </button>
          <button className="p-2 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
            <Grid size={20} />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4 pl-4 md:pl-8 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-none">Alex Rivers</p>
            <p className="text-[10px] font-bold text-gray-400 mt-1.5 uppercase tracking-widest opacity-80">Lead Architect</p>
          </div>
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-linear-to-tr from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-all blur-sm"></div>
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md relative z-10"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white z-20 shadow-sm"></div>
          </div>
        </div>
      </div>
    </header>

  );
};

export default Header;
