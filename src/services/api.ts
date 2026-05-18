import type { Stock } from '../types';

type ApiResponse<T> = {
  data: T;
};

const getJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const body = (await response.json()) as ApiResponse<T>;
  return body.data;
};

export const fetchStocks = () => getJson<Stock[]>('/api/stocks');
