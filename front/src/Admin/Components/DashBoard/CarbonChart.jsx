import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, PointElement, LineElement, Filler } from "chart.js";
import styled from "styled-components";

ChartJS.register(PointElement, LineElement, Filler);

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  flex: 2;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const CarbonChart = () => {
  const data = {
    labels: ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
    datasets: [
      {
        label: "Carbon Savings",
        data: [40, 42, 60, 45, 55, 50, 80, 45, 50, 65],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Carbon Savings</h3>
        <select>
          <option>This Month</option>
        </select>
      </div>
      <div style={{ height: "200px" }}>
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};

export default CarbonChart;
