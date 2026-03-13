import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ transactions }) => {

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["green", "red"]
      }
    ]
  };

  return (
    <div style={{ width: "400px", marginTop: "30px" }}>
      <h3>Income vs Expense</h3>
      <Pie data={data} />
    </div>
  );
};

export default Charts;