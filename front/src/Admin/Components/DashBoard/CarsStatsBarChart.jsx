import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../../../context/AuthContext";
import { axiosAuth } from "../../../api/reqService";
import {
  ChartContainer,
  ChartHeader,
  ChartTitle,
  SubText,
} from "./CarsStatsBarChart.styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CarsStatsBarChart = () => {
  const { auth } = useContext(AuthContext);
  const chartRef = useRef(null);
  const [chartDataState, setChartDataState] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth || !auth.accessToken) {
        setLoading(false);
        return;
      }
      try {
        const response = await axiosAuth.getActual(
          `/api/admin/settings/daily-stats`
        );
        const data = response;

        if (!data || data.length === 0) {
          setChartDataState({ labels: ["데이터 없음"], datasets: [] });
          return;
        }

        setChartDataState({
          labels: data.map((d) => d.date.split("-").slice(1).join("/")), // 날짜 형식 최적화 (MM/DD)
          datasets: [
            {
              label: "예약 건수",
              data: data.map((d) => d.count),
              // 마지막 데이터 포인트 강조
              backgroundColor: data.map((_, i) =>
                i === data.length - 1 ? "#6B4CE6" : "rgba(107, 76, 230, 0.2)"
              ),
              hoverBackgroundColor: "#5639cc",
              borderRadius: 6,
              borderSkipped: false,
              barThickness: 18,
            },
          ],
        });
      } catch (err) {
        console.error("데이터 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [auth]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#2d3436",
          titleFont: { size: 12, weight: "bold" },
          bodyFont: { size: 12 },
          padding: 12,
          cornerRadius: 10,
          displayColors: false,
          callbacks: {
            label: (context) => ` ${context.parsed.y}건 예약됨`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          border: { display: false },
          ticks: {
            stepSize: 1,
            color: "#b2bec3",
            font: { size: 11 },
          },
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
            drawTicks: false,
          },
        },
        x: {
          border: { display: false },
          grid: { display: false },
          ticks: {
            color: "#636e72",
            font: { size: 11, weight: "600" },
          },
        },
      },
      animation: {
        duration: 1500,
        easing: "easeOutQuart",
      },
    }),
    []
  );

  if (loading) {
    return (
      <ChartContainer
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <p style={{ fontSize: "14px", color: "#6b4ce6" }}>
          통계 데이터를 불러오는 중...
        </p>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>최근 7일 예약 추이</ChartTitle>
        <SubText>업데이트: 방금 전</SubText>
      </ChartHeader>

      <div style={{ height: "200px", width: "100%", marginTop: "auto" }}>
        <Bar ref={chartRef} options={options} data={chartDataState} />
      </div>
    </ChartContainer>
  );
};

export default CarsStatsBarChart;
