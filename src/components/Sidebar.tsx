import { LayoutDashboard, Briefcase, Globe, PieChart, Settings, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (t: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'portfolio', icon: Briefcase, label: 'Portfolio' },
    { id: 'markets', icon: Globe, label: 'Markets' },
    { id: 'analytics', icon: PieChart, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-20 lg:w-64 border-r border-white/10 bg-[#0a0a0a] flex flex-col transition-all duration-300">
      <nav className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative cursor-pointer",
              activeTab === item.id 
                ? "bg-blue-600/10 text-blue-500" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn("w-5 h-5 shrink-0", activeTab === item.id && "animate-pulse")} />
            <span className="hidden lg:block font-medium text-sm">{item.label}</span>
            {activeTab === item.id && (
              <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full" />
            )}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <div className="hidden lg:block bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl p-4">
          <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">Upgrade To Pro</p>
          <p className="text-[11px] text-white/60 mb-3">Get advanced real-time signals and AI insights.</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold py-2 rounded-lg transition-colors cursor-pointer">
            Get Pro Now
          </button>
        </div>
        <button className="lg:hidden w-full flex justify-center py-3 text-white/40 hover:text-white cursor-pointer">
          <TrendingUp className="w-5 h-5 text-blue-500" />
        </button>
      </div>
    </aside>
  );
};
