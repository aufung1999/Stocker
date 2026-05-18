import { Activity, Search, Bell } from 'lucide-react';

export const Header = () => (
  <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a0a] sticky top-0 z-50">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Activity className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">STELLAR</span>
      </div>
      
      <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-80">
        <Search className="w-4 h-4 text-white/40" />
        <input 
          type="text" 
          placeholder="Search symbols, news..." 
          className="bg-transparent border-none outline-none text-sm ml-2 text-white w-full placeholder:text-white/20"
        />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <button className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
        <Bell className="w-5 h-5" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0a0a0a]"></span>
      </button>
      <div className="w-px h-6 bg-white/10 mx-2"></div>
      <div className="flex items-center gap-3 pl-2">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-medium text-white">Alex Rivera</p>
          <p className="text-[10px] text-white/40">Pro Member</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-white/10 overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="avatar" />
        </div>
      </div>
    </div>
  </header>
);
