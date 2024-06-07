import { useState, useCallback } from "react";
import { fetchTimeSeriesDaily } from "../services/alphaVantage";
import { StockData } from "../types/stockData";

export const useFetchStockData = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStockData = useCallback(async (symbol: string) => {
    setLoading(true);
    try {
      const data = await fetchTimeSeriesDaily(symbol);
      if (data["Error Message"]) {
        setError("Invalid symbol");
        setStockData(null);
      } else {
        setStockData(data);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch data");
      setStockData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stockData, error, loading, fetchStockData };
};
