import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  flex: 1;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  min-width: 250px;
`;

const SmallBarChart = ({ title, color }) => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu"],
    datasets: [
      {
        data: [30, 10, 25, 15],
        backgroundColor: [color, "#E0E7FF", color, "#E0E7FF"],
        borderRadius: 5,
        barThickness: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } },
    },
  };

  return (
    <Card>
      <h3>{title}</h3>
      <div style={{ height: "150px" }}>
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
};

export default SmallBarChart;
