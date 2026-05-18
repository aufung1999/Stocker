import { ArrowUpRight } from 'lucide-react';
import type { Stock } from '../types';

interface AIPredictionProps {
  selectedStock: Stock;
}

export const AIPrediction = ({ selectedStock }: AIPredictionProps) => (
  <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4">
      <ArrowUpRight className="text-blue-500 w-12 h-12 opacity-10 group-hover:scale-110 transition-transform" />
    </div>
    <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">AI Prediction</h3>
    <p className="text-white/80 text-sm leading-relaxed mb-6">
      Based on current momentum and volume patterns, {selectedStock.symbol} shows a <span className="text-emerald-400 font-bold uppercase underline decoration-2 underline-offset-4">Strong Buy</span> signal for the next session.
    </p>
    <div className="flex gap-2">
      <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer">
        Buy {selectedStock.symbol}
      </button>
      <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-3 rounded-xl transition-all active:scale-95 cursor-pointer">
        Analyze
      </button>
    </div>
  </div>
);
