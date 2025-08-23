import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function StockChart({ stockData }) {
  if (!stockData || stockData.length === 0) return <p>No stock data available.</p>;

  const labels = stockData.map((s) => s.date);
  const data = {
    labels,
    datasets: [
      {
        label: "Close Price",
        data: stockData.map((s) => s.close),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return <Line data={data} />;
}
