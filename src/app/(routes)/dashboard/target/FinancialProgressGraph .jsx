import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns"; // Ensure this is correctly installed and imported
import { useFinancialContext } from "../context/FinancialContext";

// Register Chart.js components
Chart.register(...registerables);

const FinancialProgressGraph = () => {
  const { historicalData } = useFinancialContext();

  // Check if historicalData has any entries
  if (historicalData.length === 0) {
    return <div>No historical data available.</div>; // Handle empty historical data
  }

  const labels = historicalData.map((point) => new Date(point.x));
  const data = {
    labels,
    datasets: [
      {
        label: "Total Budget",
        data: historicalData.map((point) => point.totalBudget),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Total Spend",
        data: historicalData.map((point) => point.totalSpend),
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
      {
        label: "Total Income",
        data: historicalData.map((point) => point.totalIncome),
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
          tooltipFormat: 'HH:mm', // Format for tooltip
        },
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount ($)",
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default FinancialProgressGraph;
