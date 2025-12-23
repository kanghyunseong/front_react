import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, // X축 (카테고리형: Jan, Feb, Mar...)
  LinearScale, // Y축 (숫자형: 0, 100, 200...)
  PointElement, // 점 (데이터 포인트)
  LineElement, // 선 (데이터 연결선)
  Title, // 차트 제목
  Tooltip, // 마우스 올렸을 때 정보
  Legend, // 범례 (데이터셋 설명)
} from "chart.js";
import axios from "axios";

import { AuthContext } from "../../../context/AuthContext";

import {
  Container,
  InfoSection,
  ChartSection,
  ButtonContainer,
  FilterButton,
  TotalCount,
  SubText,
  SectionTitle,
} from "./UserChart.styles";

// Chart.js에 필요한 컴포넌트 등록 (사용하려면 필수!)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserChart = () => {
  const { auth } = useContext(AuthContext);

  const [unit, setUnit] = useState("month");
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [totalCount, setTotalCount] = useState(0);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  useEffect(() => {
    const fetchData = async () => {
      if (!auth.accessToken) {
        const dummyData = {
          day: {
            labels: ["01", "02", "03", "04", "05"],
            values: [5, 10, 3, 8, 12],
          },
          month: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            values: [120, 190, 300, 50, 200, 30],
          },
          year: { labels: ["2023", "2024", "2025"], values: [500, 1200, 350] },
        };

        // 현재 선택된 unit에 맞는 데이터 가져오기
        const currentData = dummyData[unit] || dummyData.month;
        // 총합 계산 (reduce 사용)
        const total = currentData.values.reduce((acc, cur) => acc + cur, 0);

        setChartData({
          labels: currentData.labels,
          values: currentData.values,
        });
        setTotalCount(total);
        return;
      }
      // 로그인 했으면 실제 API 호출
      try {
        const res = await axios.get(
          `${apiUrl}/admin/api/users/trend?unit=${unit}`,
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        );

        const data = res.data;
        const labels = data.map((d) => d.DATALABEL);
        const values = data.map((d) => {
          const countValue = Number(d.COUNT);
          // 만약 countValue가 숫자가 아니면 (NaN) 0으로 처리합니다.
          return isNaN(countValue) ? 0 : countValue;
        });
        const total = values.reduce((acc, cur) => acc + cur, 0);

        setChartData({ labels, values });
        setTotalCount(total);
      } catch (err) {
        console.error("차트 데이터 로딩 실패:", err);
      }
    };

    fetchData();
  }, [unit, auth.accessToken]);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "dataLabel",
        data: chartData.values,
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 3,
        borderDash: [8, 4],
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        tension: 0,
        pointRadius: 6,
        pointBackgroundColor: "red",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: {
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: { display: false },
      },
      y: {
        ticks: { display: false },
        grid: {
          color: "rgba(0,0,0,0.1)",
          borderDash: [5, 5],
          drawBorder: false,
        },
        beginAtZero: true,
      },
    },
    backgroundColor: "transparent",
  };
  const renderButton = (type, label) => (
    <FilterButton $active={unit === type} onClick={() => setUnit(type)}>
      {label}
    </FilterButton>
  );

  return (
    <Container>
      <InfoSection>
        <div>
          <ButtonContainer>
            {renderButton("day", "Day")}
            {renderButton("month", "Month")}
            {renderButton("year", "Year")}
          </ButtonContainer>

          <TotalCount>{isNaN(totalCount) ? 0 : totalCount}</TotalCount>
          <SubText>New Users ({unit})</SubText>
        </div>

        <div>
          <SectionTitle>Active</SectionTitle>
          <SubText>Trend Stats</SubText>
        </div>
      </InfoSection>

      <ChartSection>
        <div style={{ height: "100%", width: "100%" }}>
          <Line data={data} options={options} />
        </div>
      </ChartSection>
    </Container>
  );
};

export default UserChart;
