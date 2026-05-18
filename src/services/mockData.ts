import type { Stock } from '../types';

export const generateMockHistory = (basePrice: number, points = 30) => {
  const history = [];
  let currentPrice = basePrice;
  const now = new Date();
  
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    currentPrice = currentPrice * (1 + (Math.random() * 0.01 - 0.005));
    history.push({ time, price: parseFloat(currentPrice.toFixed(2)) });
  }
  return history;
};

export const INITIAL_STOCKS: Stock[] = [
  { 
    symbol: 'AAPL', name: 'Apple Inc.', price: 182.45, change: 1.25, changePercent: 0.68, 
    history: generateMockHistory(180), marketCap: '2.8T', volume: '52M', peRatio: 28.4 
  },
  { 
    symbol: 'TSLA', name: 'Tesla, Inc.', price: 195.30, change: -4.12, changePercent: -2.06, 
    history: generateMockHistory(200), marketCap: '620B', volume: '110M', peRatio: 45.2 
  },
  { 
    symbol: 'NVDA', name: 'NVIDIA Corp.', price: 720.15, change: 15.42, changePercent: 2.18, 
    history: generateMockHistory(700), marketCap: '1.7T', volume: '45M', peRatio: 92.1 
  },
  { 
    symbol: 'GOOGL', name: 'Alphabet Inc.', price: 145.10, change: 0.85, changePercent: 0.59, 
    history: generateMockHistory(144), marketCap: '1.8T', volume: '22M', peRatio: 25.6 
  },
  { 
    symbol: 'MSFT', name: 'Microsoft Corp.', price: 405.20, change: 2.10, changePercent: 0.52, 
    history: generateMockHistory(403), marketCap: '3.0T', volume: '18M', peRatio: 36.8 
  },
  { 
    symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 175.40, change: -1.20, changePercent: -0.68, 
    history: generateMockHistory(176), marketCap: '1.8T', volume: '35M', peRatio: 58.4 
  },
];
