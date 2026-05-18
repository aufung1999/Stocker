import { TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { Stock } from '../types';
import { cn } from '../lib/utils';

interface StockChartProps {
  selectedStock: Stock;
}

type ChartTooltipPayload = {
  payload: {
    time: string;
  };
  value: number;
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  const point = payload?.[0] as ChartTooltipPayload | undefined;

  if (active && point) {
    return (
      <div className="bg-[#050505] border border-white/20 p-3 rounded-lg shadow-2xl backdrop-blur-md">
        <p className="text-[10px] text-white/40 uppercase mb-1 font-bold">{point.payload.time}</p>
        <p className="text-sm font-bold text-white">${point.value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export const StockChart = ({ selectedStock }: StockChartProps) => {
  return (
    <div className="xl:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 relative group overflow-hidden">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-bold text-lg text-white">
            {selectedStock.symbol[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{selectedStock.symbol}</h2>
              <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded uppercase font-bold tracking-widest">NasdaqGS</span>
            </div>
            <p className="text-white/40 text-xs font-medium">{selectedStock.name}</p>
          </div>
        </div>
        <div className="text-right">
          <h3 className="text-2xl font-bold">${selectedStock.price.toFixed(2)}</h3>
          <p className={cn(
            "text-sm font-bold flex items-center justify-end gap-1",
            selectedStock.change >= 0 ? "text-emerald-400" : "text-rose-400"
          )}>
            {selectedStock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
          </p>
        </div>
      </div>

      <div className="h-[400px] w-full relative z-10 transition-all">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={selectedStock.history}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={selectedStock.change >= 0 ? "#10b981" : "#f43f5e"} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={selectedStock.change >= 0 ? "#10b981" : "#f43f5e"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }}
              minTickGap={40}
            />
            <YAxis 
              hide
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={selectedStock.change >= 0 ? "#10b981" : "#f43f5e"} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              animationDuration={400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
