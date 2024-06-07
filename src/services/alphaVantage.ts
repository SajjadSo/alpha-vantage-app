import { API_KEY, BASE_URL } from "../configs/config";

export const fetchTimeSeriesDaily = async (symbol: string) => {
  const response = await fetch(`${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
  const data = await response.json();
  return data;
};
