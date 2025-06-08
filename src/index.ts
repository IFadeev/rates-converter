import express from 'express';
import cors from 'cors';
import axios from 'axios';
import type { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://rates-converter-0b1o.onrender.com';

const allowedOrigins = [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS error: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

app.disable('etag');
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

interface RawRatesResponse {
  merchant?: Record<string, Record<string, string>>;
  [key: string]: any;
}

interface ParsedRate {
  code: string;
  rate: string;
}

app.get('/rates', async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get<RawRatesResponse>('https://api.coingate.com/api/v2/rates');
    const allData = response.data;
    const merchantRates = allData.merchant;

    if (!merchantRates || typeof merchantRates !== 'object') {
      res.json([]);
      return;
    }

    const parsed: ParsedRate[] = Object.entries(merchantRates).map(([code, nested]) => {
      const usdValue = nested['USD'] ?? '0';
      return { code, rate: usdValue };
    });

    res.json(parsed);
  } catch (err: any) {
    if (err.response) {
      res.status(err.response.status).json({
        error: true,
        status: err.response.status,
        message: err.response.data || err.response.statusText,
      });
      return;
    }
    res.status(500).json({
      error: true,
      message: err.message || 'Unknown error',
    });
  }
});

app.get('/', (_req: Request, res: Response) => {
  res.send('CoinGate Proxy is running.');
});

app.listen(PORT, () => {
  console.log(`Proxy ready for requests from ${FRONTEND_URL} on port ${PORT}`);
});
