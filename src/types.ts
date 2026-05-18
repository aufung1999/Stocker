export interface StockHistory {
  time: string;
  price: number;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  history: StockHistory[];
  marketCap: string;
  volume: string;
  peRatio: number;
}
