import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartContainer, ChartTitle } from "./CarsStatsBarChart.styles";

// Chart.js 구성 요소 등록 (파일 상단 또는 별도 파일에서 한 번만 수행)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CarsStatsBarChart = () => {
  // 1. 차트 옵션 설정
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "브랜드별 등록 차량 수",
      },
    },
  };

  const labels = ["현대", "기아", "테슬라", "BMW", "벤츠", "아우디"];

  const data = {
    labels,
    datasets: [
      {
        label: "차량 수",
        data: [150, 120, 45, 80, 70, 30], // 각 브랜드의 차량 수
        backgroundColor: "rgba(53, 162, 235, 0.5)", // 막대 색상
      },
    ],
  };

  return (
    <ChartContainer>
      <ChartTitle>🚗 브랜드별 등록 차량 수 통계</ChartTitle>
      <Bar options={options} data={data} />
    </ChartContainer>
  );
};

export default CarsStatsBarChart;
