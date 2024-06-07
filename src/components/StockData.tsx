import React from "react";
import { useFetchStockData } from "../hooks/useFetchStockData";
import { useFormInput } from "../hooks/useFormInput";
import Input from "./Input";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import StockChart from "./StockChart";
import { StockData as StockDataType } from "../types/stockData";

const StockData: React.FC = () => {
  const symbolInput = useFormInput("");
  const { stockData, error, loading, fetchStockData } = useFetchStockData();

  const handleFetchData = () => {
    fetchStockData(symbolInput.value);
  };

  const renderStockData = (data: StockDataType) => {
    const timeSeries = data["Time Series (Daily)"];
    const dates = Object.keys(timeSeries);

    return (
      <div>
        <h2 className="text-xl font-semibold">Stock Data for {data["Meta Data"]["2. Symbol"]}</h2>
        <h4 className="text-sm font-semibold">Information: {data["Meta Data"]["1. Information"]}</h4>
        <h4 className="text-xs font-semibold">Last Refreshed: {data["Meta Data"]["3. Last Refreshed"]}</h4>
        <br />

        <StockChart data={timeSeries} />

        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Open</th>
              <th className="px-4 py-2">High</th>
              <th className="px-4 py-2">Low</th>
              <th className="px-4 py-2">Close</th>
              <th className="px-4 py-2">Volume</th>
            </tr>
          </thead>
          <tbody>
            {dates.map(date => (
              <tr key={date}>
                <td className="border px-4 py-2">{date}</td>
                <td className="border px-4 py-2">{timeSeries[date]["1. open"]}</td>
                <td className="border px-4 py-2">{timeSeries[date]["2. high"]}</td>
                <td className="border px-4 py-2">{timeSeries[date]["3. low"]}</td>
                <td className="border px-4 py-2">{timeSeries[date]["4. close"]}</td>
                <td className="border px-4 py-2">{timeSeries[date]["5. volume"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Alpha Vantage Stock Data</h1>
      <form>
        <div className="space-y-2">
          <Input {...symbolInput} placeholder="Enter stock symbol" />
          <Button onClick={handleFetchData} disabled={loading}>
            {loading ? <LoadingSpinner /> : "Fetch Data"}
          </Button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {stockData && renderStockData(stockData)}
    </div>
  );
};

export default StockData;
