import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler, // 채우기 효과를 위해 필요
} from "chart.js";
import * as S from "./Visualization.styles";

// ChartJS 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Visualization = () => {
  // 1. 꺾은선 차트 데이터 (전체 절감량)
  const lineData = {
    labels: [
      "10",
      "20",
      "30",
      "40",
      "50",
      "60",
      "70",
      "80",
      "90",
      "100",
      "200",
    ],
    datasets: [
      {
        label: "Total Savings",
        data: [15, 22, 20, 35, 28, 40, 32, 35, 28, 35, 18],
        borderColor: "#8b5cf6", // 보라색 선
        backgroundColor: "rgba(139, 92, 246, 0.1)", // 보라색 배경(연하게)
        tension: 0.4, // 곡선 효과
        fill: true, // 아래 채우기
        pointRadius: 0, // 포인트 숨김 (이미지처럼 깔끔하게)
        pointHoverRadius: 5,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // 범례 숨김
    },
    scales: {
      y: { grid: { borderDash: [5, 5] }, beginAtZero: true },
      x: { grid: { display: false } },
    },
  };

  // 2. 스택 바 차트 데이터 (이용 지역별 통계)
  const barData = {
    labels: [
      "Seoul",
      "Busan",
      "Daegu",
      "Incheon",
      "Gwangju",
      "Daejeon",
      "Ulsan",
    ],
    datasets: [
      {
        label: "Type A",
        data: [1200, 500, 800, 800, 1800, 900, 1000],
        backgroundColor: "#6B4CE6", // 진한 보라
        borderRadius: 5,
      },
      {
        label: "Type B",
        data: [2000, 2500, 2800, 2500, 1500, 1800, 3000],
        backgroundColor: "#D8B4FE", // 연한 보라
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { stacked: true, grid: { display: false } }, // 스택 설정
      y: { stacked: true, grid: { borderDash: [5, 5] } },
    },
    barThickness: 20,
  };

  return (
    <S.Container>
      <S.TitleArea>
        <h2>Environments / visualization</h2>
        <p>Environments Visualization</p>
      </S.TitleArea>

      <S.Card>
        <S.ChartTitle>
          Visualization
          <span>Environments Visualization</span>
        </S.ChartTitle>
        <hr
          style={{
            border: "0",
            borderTop: "1px solid #eee",
            marginBottom: "30px",
          }}
        />

        <div style={{ marginBottom: "50px" }}>
          <h4 style={{ marginBottom: "20px" }}>전체 절감량</h4>
          <S.ChartContainer>
            <Line data={lineData} options={lineOptions} />
          </S.ChartContainer>
        </div>

        <div>
          <h4 style={{ marginBottom: "20px" }}>이용 지역별 통계</h4>
          <S.ChartContainer>
            <Bar data={barData} options={barOptions} />
          </S.ChartContainer>
        </div>
      </S.Card>
    </S.Container>
  );
};

export default Visualization;
