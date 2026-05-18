import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { Watchlist } from './components/Watchlist';
import { StockChart } from './components/StockChart';
import { MarketStats } from './components/MarketStats';
import { AIPrediction } from './components/AIPrediction';
import { NewsSection } from './components/NewsSection';
import { INITIAL_STOCKS } from './services/mockData';
import { fetchStocks } from './services/api';
import type { Stock } from './types';
import { cn } from './lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

type AllocationTooltipPayload = {
  payload: {
    symbol: string;
  };
  value: number;
};

export default function App() {
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [selectedStock, setSelectedStock] = useState<Stock>(INITIAL_STOCKS[0]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('1D');

  useEffect(() => {
    let isMounted = true;

    fetchStocks()
      .then((apiStocks) => {
        if (!isMounted || apiStocks.length === 0) {
          return;
        }

        setStocks(apiStocks);
        setSelectedStock(apiStocks[0]);
      })
      .catch(() => {
        // Keep the local mock data available when the API server is not running.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // --- Real-time Price Simulation ---
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(stock => {
        const volatility = 0.0015; // 0.15% max change per tick
        const changeFactor = 1 + (Math.random() * volatility * 2 - volatility);
        const newPrice = stock.price * changeFactor;
        const diff = newPrice - stock.price;
        
        // Add new point to history
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newHistory = [...stock.history.slice(1), { time: now, price: parseFloat(newPrice.toFixed(2)) }];
        
        return {
          ...stock,
          price: parseFloat(newPrice.toFixed(2)),
          change: stock.change + diff,
          changePercent: ((newPrice - INITIAL_STOCKS.find(s => s.symbol === stock.symbol)!.price) / INITIAL_STOCKS.find(s => s.symbol === stock.symbol)!.price) * 100,
          history: newHistory
        };
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Update selected stock when stocks array updates
  useEffect(() => {
    const updated = stocks.find(s => s.symbol === selectedStock.symbol);
    if (updated) setSelectedStock(updated);
  }, [stocks, selectedStock.symbol]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-blue-500/30">
      <Header />
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 min-w-0 overflow-y-auto bg-[#0a0a0a]/50 p-6 space-y-6 custom-scrollbar">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
              <p className="text-white/40 text-sm mt-1">Real-time performance across global indices.</p>
            </div>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
              {['1H', '1D', '1W', '1M', '1Y', 'ALL'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    timeRange === range ? "bg-white/10 text-white shadow-lg" : "text-white/40 hover:text-white"
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Balance" value="$42,850.12" change="+12.5%" isPositive={true} />
            <StatCard label="Daily Profit" value="+$1,420.00" change="+3.2%" isPositive={true} />
            <StatCard label="Active Trades" value="12 Positions" change="-0.8%" isPositive={false} />
            <StatCard label="Buying Power" value="$12,400.00" change="+0.0%" isPositive={true} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <StockChart selectedStock={selectedStock} />
            <div className="space-y-6">
              <MarketStats selectedStock={selectedStock} />
              <AIPrediction selectedStock={selectedStock} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-1 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 px-1">Portfolio Allocation</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={INITIAL_STOCKS}>
                      <Bar 
                        dataKey="peRatio" 
                        fill="#3b82f6" 
                        radius={[6, 6, 0, 0]} 
                      />
                      <XAxis 
                        dataKey="symbol" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: 'rgba(255,255,255,0.2)', fontSize: 10}} 
                      />
                      <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.03)'}} 
                        content={({ active, payload }) => {
                          const point = payload?.[0] as AllocationTooltipPayload | undefined;

                          if (active && point) {
                             return (
                               <div className="bg-[#050505] border border-white/20 p-2 rounded shadow text-[10px]">
                                 {point.payload.symbol}: {point.value}
                               </div>
                             );
                          }
                          return null;
                        }} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>
             <NewsSection />
          </div>
        </main>
        
        <Watchlist 
          stocks={stocks} 
          onSelect={setSelectedStock} 
          selectedSymbol={selectedStock.symbol} 
        />
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
