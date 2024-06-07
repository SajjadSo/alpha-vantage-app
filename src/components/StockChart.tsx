import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip
} from "chart.js";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

interface StockChartProps {
  data: {
    [key: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const dates = Object.keys(data).reverse();
  const closePrices = dates.map(date => parseFloat(data[date]["4. close"]));

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Closing Price",
        data: closePrices,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            return `Closing Price: $${context.parsed.y}`;
          }
        }
      }
    },
    hover: {
      mode: "nearest" as const,
      intersect: true
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date"
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Price (USD)"
        }
      }
    }
  };

  return (
    <div className="mt-4">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StockChart;
