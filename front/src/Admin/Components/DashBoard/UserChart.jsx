import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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

        const currentData = dummyData[unit] || dummyData.month;
        const total = currentData.values.reduce((acc, cur) => acc + cur, 0);

        setChartData({
          labels: currentData.labels,
          values: currentData.values,
        });
        setTotalCount(total);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:8081/admin/api/users/trend?unit=${unit}`,
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
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        tension: 0,
        pointRadius: 6,
        pointBackgroundColor: "red",
      },
    ],
  };

  // UserChart.js 내부의 options 객체 정의 부분

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: {
          color: "rgba(255,255,255,0.8)",
          font: {
            size: 14, // ✨ 변경: X축 폰트 크기 증가
            weight: "bold", // ✨ 추가: X축 폰트 굵게
          },
        },
        grid: { display: false },
      },
      y: {
        ticks: { display: false },
        grid: {
          color: "rgba(255,255,255,0.1)",
          borderDash: [5, 5],
          drawBorder: false,
        },
        beginAtZero: true,
      },
    },
    backgroundColor: "transparent",
  };

  // 버튼 렌더링 헬퍼 (Styled Component 사용)
  const renderButton = (type, label) => (
    <FilterButton
      $active={unit === type} // $active prop으로 활성화 상태 전달
      onClick={() => setUnit(type)}
    >
      {label}
    </FilterButton>
  );

  return (
    // Styled Components 적용
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
        {/* 차트 라이브러리 wrapper */}
        <div style={{ height: "100%", width: "100%" }}>
          <Line data={data} options={options} />
        </div>
      </ChartSection>
    </Container>
  );
};

export default UserChart;
