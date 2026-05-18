import type { Stock } from '../types';

interface MarketStatsProps {
  selectedStock: Stock;
}

export const MarketStats = ({ selectedStock }: MarketStatsProps) => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6">
    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Market Stats</h3>
    <div className="space-y-4">
      {[
        { label: 'Market Cap', value: selectedStock.marketCap },
        { label: 'Volume (24h)', value: selectedStock.volume },
        { label: 'P/E Ratio', value: selectedStock.peRatio },
        { label: 'Avg Vol', value: '45.2M' },
      ].map((stat) => (
        <div key={stat.label} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0 font-mono">
          <span className="text-white/40 text-xs uppercase tracking-tight font-sans font-medium">{stat.label}</span>
          <span className="text-sm font-bold text-white/90">{stat.value}</span>
        </div>
      ))}
    </div>
  </div>
);
