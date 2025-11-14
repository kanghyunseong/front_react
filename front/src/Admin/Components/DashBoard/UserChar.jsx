import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  background: linear-gradient(135deg, #aa85ff 0%, #8b5cf6 100%);
  border-radius: 15px;
  padding: 20px;
  color: white;
  flex: 2; /* 그리드에서 더 넓게 차지 */
  display: flex;
  justify-content: space-between;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChartSection = styled.div`
  width: 60%;
`;

const UserChar = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Users",
        data: [120, 190, 300, 50, 200, 30],
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        barThickness: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "white" }, grid: { display: false } },
      y: {
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.2)", borderDash: [5, 5] },
      },
    },
  };

  return (
    <Container>
      <InfoSection>
        <div>
          <h3>300</h3>
          <p>Select Pages</p>
        </div>
        <div>
          <h3>35k</h3>
          <p>Users</p>
        </div>
      </InfoSection>
      <ChartSection>
        <Bar data={data} options={options} />
      </ChartSection>
    </Container>
  );
};

export default UserChar;
