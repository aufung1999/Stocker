import express from 'express';
import 'dotenv/config';
import { getPortfolioSummary, getPrediction, getStock, getStocks, newsItems } from './data';

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'stocker-api',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/stocks', (_request, response) => {
  response.json({ data: getStocks() });
});

app.get('/api/stocks/:symbol', (request, response) => {
  const stock = getStock(request.params.symbol);

  if (!stock) {
    response.status(404).json({ error: 'Stock not found' });
    return;
  }

  response.json({ data: stock });
});

app.get('/api/portfolio', (_request, response) => {
  response.json({ data: getPortfolioSummary() });
});

app.get('/api/news', (_request, response) => {
  response.json({ data: newsItems });
});

app.get('/api/predictions/:symbol', (request, response) => {
  const prediction = getPrediction(request.params.symbol);

  if (!prediction) {
    response.status(404).json({ error: 'Prediction not found' });
    return;
  }

  response.json({ data: prediction });
});

app.listen(port, () => {
  console.log(`Stocker API listening on http://localhost:${port}`);
});
