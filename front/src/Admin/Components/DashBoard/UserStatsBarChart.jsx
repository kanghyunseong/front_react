import React, { useState, useEffect, useContext } from "react";
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
import axios from "axios";

import { AuthContext } from "../../../context/AuthContext";
import {
  ChartContainer,
  UserChartTitle,
  KpiGrid,
  KpiCard,
  KpiValue,
  KpiLabel,
} from "./UserStatsBarChart.styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 컴포넌트 이름을 기능에 맞게 LicenseStatusBarChart로 사용합니다.
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
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  // 1. 차트 트렌드 데이터 로딩 및 프론트엔드 보정 로직
  useEffect(() => {
    const fetchTrendData = async () => {
      setIsLoading(true);

      // --- 1. 데이터 가져오기 (API 또는 더미) ---
      let rawData = [];
      const TREND_MONTHS = 6; // 트렌드에 표시할 개월 수

      if (!auth.accessToken) {
        // 더미 데이터: 6개월치 데이터가 있다고 가정
        rawData = [
          { DATALABEL: "2025-06", APPROVED_COUNT: 500, PENDING_COUNT: 50 },
          { DATALABEL: "2025-07", APPROVED_COUNT: 550, PENDING_COUNT: 40 },
          { DATALABEL: "2025-08", APPROVED_COUNT: 600, PENDING_COUNT: 30 },
          { DATALABEL: "2025-09", APPROVED_COUNT: 610, PENDING_COUNT: 25 },
          { DATALABEL: "2025-10", APPROVED_COUNT: 630, PENDING_COUNT: 20 },
          { DATALABEL: "2025-11", APPROVED_COUNT: 650, PENDING_COUNT: 15 }, // 현재 달 데이터
        ];
      } else {
        try {
          const res = await axios.get(
            `http://localhost:8081/admin/api/users/license/trend?unit=${unit}`,
            { headers: { Authorization: `Bearer ${auth.accessToken}` } }
          );
          rawData = res.data;
        } catch (err) {
          console.error("면허 상태 차트 데이터 로딩 실패:", err);
          rawData = [];
        }
      }

      // --- 2. 데이터 보정 및 매핑 로직 (막대 그래프 렌더링 필수) ---

      const mappedData = {};
      rawData.forEach((d) => {
        const approved = Number(d.APPROVEDCOUNT) || 0;
        const pending = Number(d.PENDINGCOUNT) || 0;
        mappedData[d.DATALABEL] = { approved, pending };
      });

      const today = new Date();
      const finalLabels = [];
      const finalApproved = [];
      const finalWaiting = [];

      // 현재 달을 기준으로 TREND_MONTHS 개월 전까지 순회
      for (let i = TREND_MONTHS - 1; i >= 0; i--) {
        let date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        // YYYY-MM 형식으로 레이블 생성
        const label = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

        finalLabels.push(label);

        const dataPoint = mappedData[label];

        if (dataPoint) {
          // API 데이터가 있으면 실제 값 사용
          finalApproved.push(dataPoint.approved);
          finalWaiting.push(dataPoint.pending);
        } else {
          // 데이터가 없으면 0으로 채워서 막대가 0으로라도 그려지게 함
          finalApproved.push(0);
          finalWaiting.push(0);
        }
      }

      // 3. 상태 업데이트
      setChartData({
        labels: finalLabels,
        approved: finalApproved,
        waiting: finalWaiting,
      });
      setIsLoading(false);
    };
    fetchTrendData();
  }, [unit, auth.accessToken]);

  // 2. KPI 데이터 로딩 (변화 없음)
  useEffect(() => {
    const fetchKpiData = async () => {
      // ... (기존 KPI 로직 유지)
      if (!auth.accessToken) {
        setKpiStats({ totalActiveUsers: 15500, waitingLicenseCount: 85 });
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:8081/admin/api/users/kpi`,
          { headers: { Authorization: `Bearer ${auth.accessToken}` } }
        );
        setKpiStats(res.data);
      } catch (err) {
        console.error("KPI 데이터 로딩 실패:", err);
      }
    };
    fetchKpiData();
  }, [auth.accessToken]);

  // 3. 차트 데이터 객체 완성 및 안전한 초기화 적용
  const data = {
    labels: chartData.labels || [],
    datasets: [
      {
        label: "✅ 승인된 사용자",
        data: chartData.approved || [],
        type: "bar",
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "⏳ 대기 중인 사용자",
        data: chartData.waiting || [],
        backgroundColor: "rgba(255, 159, 64, 0.8)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
    scales: {
      x: { grid: { display: false }, stacked: false },
      y: {
        beginAtZero: true,
        stacked: false,
        minBarLength: 3, // 막대가 0에 가까울 때 사라지는 것 방지
      },
    },
  };

  // 4. 로딩 중 UI 표시
  if (isLoading) {
    return (
      <ChartContainer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <p>📊 데이터를 불러오는 중입니다...</p>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      {/* 📊 KPI 섹션 */}
      <UserChartTitle>🚗 사용자 KPI & 면허 승인 추이</UserChartTitle>

      <KpiGrid>
        <KpiCard $primary={true}>
          <KpiLabel>총 활성 사용자</KpiLabel>
          <KpiValue>{kpiStats.totalActiveUsers.toLocaleString()} 명</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiLabel>면허 인증 대기</KpiLabel>
          <KpiValue $isWaiting={kpiStats.waitingLicenseCount > 0}>
            {kpiStats.waitingLicenseCount.toLocaleString()} 건
          </KpiValue>
        </KpiCard>
      </KpiGrid>

      {/* 📈 차트 섹션 */}
      <div
        style={{
          position: "relative",
          height: "400px",
          width: "100%",
          marginTop: "30px",
        }}
      >
        <Bar options={options} data={data} />
      </div>
    </ChartContainer>
  );
};

export default UserStatsBarChart; // 컴포넌트명은 LicenseStatusBarChart로 변경했으나, export는 요청대로 UserStatsBarChart로 유지합니다.
