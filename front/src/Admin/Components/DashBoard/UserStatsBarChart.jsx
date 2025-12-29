import React, { useState, useEffect, useContext, useMemo } from "react";
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
import { AuthContext } from "../../../context/AuthContext";
import { axiosAuth } from "../../../api/reqService";
import {
  ChartContainer,
  UserChartTitle,
  KpiGrid,
  KpiCard,
  KpiValue,
  KpiLabel,
  ChartWrapper,
} from "./UserStatsBarChart.styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserStatsBarChart = ({ unit = "month" }) => {
  const { auth } = useContext(AuthContext);
  const [chartData, setChartData] = useState({
    approved: [],
    waiting: [],
    labels: [],
  });
  const [kpiStats, setKpiStats] = useState({
    totalActiveUsers: 0,
    waitingLicenseCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKpiData = async () => {
      if (!auth?.accessToken) return;
      try {
        const res = await axiosAuth.getActual(`/api/admin/users/kpi`);
        if (res) {
          setKpiStats({
            totalActiveUsers: res.totalActiveUsers || 0,
            waitingLicenseCount: res.waitingLicenseCount || 0,
          });
        }
      } catch (err) {
        console.error("KPI 데이터 실패:", err);
      }
    };
    fetchKpiData();
  }, [auth?.accessToken]);

  useEffect(() => {
    const fetchTrendData = async () => {
      if (!auth?.accessToken) return;
      try {
        setIsLoading(true);
        const rawData = await axiosAuth.getActual(
          `/api/admin/users/license/trend?unit=${unit}`
        );

        const mappedData = {};
        if (Array.isArray(rawData)) {
          rawData.forEach((d) => {
            const label = d.DATALABEL || d.dataLabel;
            const approved = Number(d.APPROVEDCOUNT || d.approvedCount || 0);
            const pending = Number(d.PENDINGCOUNT || d.pendingCount || 0);
            if (label) mappedData[label] = { approved, pending };
          });
        }

        const TREND_COUNT = 6;
        const today = new Date();
        const finalLabels = [];
        const finalApproved = [];
        const finalWaiting = [];

        for (let i = TREND_COUNT - 1; i >= 0; i--) {
          let date = new Date(today.getFullYear(), today.getMonth() - i, 1);
          const label = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`;
          finalLabels.push(label.split("-").slice(1).join("/")); // '05/20' 형식으로 노출

          const dataPoint = mappedData[label];
          finalApproved.push(dataPoint ? dataPoint.approved : 0);
          finalWaiting.push(dataPoint ? dataPoint.pending : 0);
        }

        setChartData({
          labels: finalLabels,
          approved: finalApproved,
          waiting: finalWaiting,
        });
      } catch (err) {
        console.error("추이 데이터 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendData();
  }, [unit, auth?.accessToken]);

  const data = useMemo(
    () => ({
      labels: chartData.labels,
      datasets: [
        {
          label: "승인 완료",
          data: chartData.approved,
          backgroundColor: "#6b4ce6",
          borderRadius: 6,
          barThickness: 15,
        },
        {
          label: "승인 대기",
          data: chartData.waiting,
          backgroundColor: "#ffb8b8",
          borderRadius: 6,
          barThickness: 15,
        },
      ],
    }),
    [chartData]
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 12, weight: "600" },
        },
      },
      tooltip: {
        padding: 12,
        backgroundColor: "#2d3436",
        cornerRadius: 10,
      },
    },
    scales: {
      x: {
        stacked: false, // 겹치지 않고 나란히 배치
        grid: { display: false },
        ticks: { font: { size: 12, weight: "500" }, color: "#b2bec3" },
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: { color: "#f1f2f6" },
        ticks: { font: { size: 11 }, color: "#b2bec3", stepSize: 5 },
      },
    },
  };

  if (isLoading)
    return (
      <ChartContainer>
        <p>데이터 로딩 중...</p>
      </ChartContainer>
    );

  return (
    <ChartContainer>
      <UserChartTitle>사용자 현황 및 면허 승인 추이</UserChartTitle>

      <KpiGrid>
        <KpiCard $primary={true}>
          <KpiLabel>총 활성 사용자</KpiLabel>
          <KpiValue>
            {kpiStats.totalActiveUsers.toLocaleString()}
            <span>명</span>
          </KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiLabel>면허 인증 대기</KpiLabel>
          <KpiValue $isWaiting={kpiStats.waitingLicenseCount > 0}>
            {kpiStats.waitingLicenseCount.toLocaleString()}
            <span>건</span>
          </KpiValue>
        </KpiCard>
      </KpiGrid>

      <ChartWrapper>
        <Bar options={options} data={data} />
      </ChartWrapper>
    </ChartContainer>
  );
};

export default UserStatsBarChart;
