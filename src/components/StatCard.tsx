import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export const StatCard = ({ label, value, change, isPositive }: StatCardProps) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all group overflow-hidden relative">
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
    <p className="text-xs text-white/40 font-medium mb-1 uppercase tracking-wider">{label}</p>
    <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
    <div className={cn(
      "flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full w-fit",
      isPositive ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
    )}>
      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {change}
    </div>
  </div>
);
