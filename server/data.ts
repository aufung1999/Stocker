import type { Stock } from '../src/types';

type NewsItem = {
  id: string;
  title: string;
  source: string;
  time: string;
};

const toPrice = (value: number) => Number(value.toFixed(2));

const generateHistory = (basePrice: number, points = 30) => {
  const history = [];
  let currentPrice = basePrice;
  const now = new Date();

  for (let i = points; i >= 0; i -= 1) {
    const time = new Date(now.getTime() - i * 60000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    currentPrice *= 1 + (Math.random() * 0.01 - 0.005);
    history.push({ time, price: toPrice(currentPrice) });
  }

  return history;
};

const seedStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 182.45,
    change: 1.25,
    changePercent: 0.68,
    history: generateHistory(180),
    marketCap: '2.8T',
    volume: '52M',
    peRatio: 28.4,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 195.3,
    change: -4.12,
    changePercent: -2.06,
    history: generateHistory(200),
    marketCap: '620B',
    volume: '110M',
    peRatio: 45.2,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 720.15,
    change: 15.42,
    changePercent: 2.18,
    history: generateHistory(700),
    marketCap: '1.7T',
    volume: '45M',
    peRatio: 92.1,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 145.1,
    change: 0.85,
    changePercent: 0.59,
    history: generateHistory(144),
    marketCap: '1.8T',
    volume: '22M',
    peRatio: 25.6,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 405.2,
    change: 2.1,
    changePercent: 0.52,
    history: generateHistory(403),
    marketCap: '3.0T',
    volume: '18M',
    peRatio: 36.8,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 175.4,
    change: -1.2,
    changePercent: -0.68,
    history: generateHistory(176),
    marketCap: '1.8T',
    volume: '35M',
    peRatio: 58.4,
  },
];

const initialPrices = new Map(seedStocks.map((stock) => [stock.symbol, stock.price]));

export const newsItems: NewsItem[] = [
  { id: 'fed-cuts', title: 'Fed Chair hints at potential rate cuts by late Q3', source: 'Bloomberg', time: '12m ago' },
  { id: 'nvda-ai', title: 'NVIDIA surges as AI demand shows no signs of slowing', source: 'Reuters', time: '45m ago' },
  { id: 'apple-eu', title: 'Apple faces new antitrust probe in EU region', source: 'TechCrunch', time: '2h ago' },
];

let stocks = seedStocks;

const tickStock = (stock: Stock): Stock => {
  const volatility = 0.0015;
  const changeFactor = 1 + (Math.random() * volatility * 2 - volatility);
  const newPrice = stock.price * changeFactor;
  const diff = newPrice - stock.price;
  const startPrice = initialPrices.get(stock.symbol) ?? stock.price;
  const now = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return {
    ...stock,
    price: toPrice(newPrice),
    change: toPrice(stock.change + diff),
    changePercent: Number((((newPrice - startPrice) / startPrice) * 100).toFixed(2)),
    history: [...stock.history.slice(1), { time: now, price: toPrice(newPrice) }],
  };
};

export const getStocks = () => {
  stocks = stocks.map(tickStock);
  return stocks;
};

export const getStock = (symbol: string) =>
  getStocks().find((stock) => stock.symbol.toLowerCase() === symbol.toLowerCase());

export const getPortfolioSummary = () => {
  const activeStocks = getStocks();
  const totalBalance = activeStocks.reduce((total, stock) => total + stock.price * 10, 0);
  const dailyProfit = activeStocks.reduce((total, stock) => total + stock.change * 10, 0);

  return {
    totalBalance: toPrice(totalBalance),
    dailyProfit: toPrice(dailyProfit),
    activeTrades: activeStocks.length,
    buyingPower: 12400,
  };
};

export const getPrediction = (symbol: string) => {
  const stock = getStock(symbol);

  if (!stock) {
    return null;
  }

  const signal = stock.changePercent >= 0 ? 'Strong Buy' : 'Watch';
  const confidence = Math.min(95, Math.max(55, Math.round(72 + Math.abs(stock.changePercent) * 4)));

  return {
    symbol: stock.symbol,
    signal,
    confidence,
    summary: `${stock.symbol} shows a ${signal.toLowerCase()} signal based on current momentum and volume patterns.`,
  };
};
