import type { Stock } from '../types';
import { cn } from '../lib/utils';

interface WatchlistProps {
  stocks: Stock[];
  onSelect: (s: Stock) => void;
  selectedSymbol: string;
}

export const Watchlist = ({ stocks, onSelect, selectedSymbol }: WatchlistProps) => (
  <aside className="w-full lg:w-80 lg:shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0a0a0a] flex flex-col max-h-80 lg:max-h-none">
    <div className="p-4 border-b border-white/10 flex items-center justify-between">
      <h2 className="font-bold text-sm text-white uppercase tracking-widest">Watchlist</h2>
      <button className="text-[10px] font-bold text-blue-500 uppercase cursor-pointer">View All</button>
    </div>
    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
      {stocks.map((stock) => (
        <button
          key={stock.symbol}
          onClick={() => onSelect(stock)}
          className={cn(
            "w-full flex items-center justify-between p-3 rounded-xl transition-all group border border-transparent cursor-pointer",
            selectedSymbol === stock.symbol ? "bg-white/10 border-white/10" : "hover:bg-white/5"
          )}
        >
          <div className="flex items-center gap-3 text-left">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold border",
              selectedSymbol === stock.symbol ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-white/40 group-hover:text-white"
            )}>
              {stock.symbol[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{stock.symbol}</p>
              <p className="text-[10px] text-white/40 truncate w-24">{stock.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">${stock.price.toFixed(2)}</p>
            <p className={cn(
              "text-[10px] font-bold",
              stock.change >= 0 ? "text-emerald-400" : "text-rose-400"
            )}>
              {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </p>
          </div>
        </button>
      ))}
    </div>
  </aside>
);
