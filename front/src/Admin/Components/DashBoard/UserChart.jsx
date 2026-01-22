import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useRef,
} from "react";
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
  Filler,
} from "chart.js";
import { AuthContext } from "../../../context/AuthContext";
import { axiosAuth } from "../../../api/reqService";
import {
  Container,
  InfoSection,
  ChartSection,
  ButtonContainer,
  FilterButton,
  TotalCount,
  SubText,
  SectionTitle,
  RightInfo,
} from "./UserChart.styles";
import { ChartContainer } from "./UserStatsBarChart.styles";

// Chart.js에 필요한 컴포넌트 등록 (사용하려면 필수!)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const UserChart = () => {
  const { auth } = useContext(AuthContext);
  const chartRef = useRef(null);
  const [unit, setUnit] = useState("month");
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let labels = [];
        let values = [];

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
            year: {
              labels: ["2023", "2024", "2025"],
              values: [500, 1200, 350],
            },
          };
          const current = dummyData[unit];
          labels = current.labels;
          values = current.values;
        } else {
          const res = await axiosAuth.getActual(
            `/api/admin/users/trend?unit=${unit}`
          );
          labels = res.map((d) => d.DATALABEL);
          values = res.map((d) => Number(d.COUNT) || 0);
        }

        setChartData({ labels, values });
        setTotalCount(values.reduce((acc, cur) => acc + cur, 0));
      } catch (err) {
        console.error("차트 데이터 로딩 실패:", err);
      }
    };
    fetchData();
  }, [unit, auth.accessToken]);

  const data = useMemo(() => {
    return {
      labels: chartData.labels,
      datasets: [
        {
          fill: true,
          label: "신규 가입자",
          data: chartData.values,
          borderColor: "#ff6384",
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );
            gradient.addColorStop(0, "rgba(255, 99, 132, 0.2)");
            gradient.addColorStop(1, "rgba(255, 99, 132, 0)");
            return gradient;
          },
          borderWidth: 4,
          pointRadius: 4,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#ff6384",
          pointBorderWidth: 2,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: "#ff6384",
          pointHoverBorderColor: "#fff",
          tension: 0.4, // 곡선 적용으로 더 부드럽게
        },
      ],
    };
  }, [chartData]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#2d3436",
          padding: 12,
          titleFont: { size: 14, weight: "bold" },
          bodyFont: { size: 13 },
          cornerRadius: 8,
          displayColors: false,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#b2bec3", font: { size: 12, weight: "500" } },
        },
        y: {
          beginAtZero: true,
          grid: { color: "rgba(0,0,0,0.05)", drawBorder: false },
          ticks: { color: "#b2bec3", font: { size: 12 } },
        },
      },
    }),
    []
  );

  const renderButton = useCallback(
    (type, label) => (
      <FilterButton $active={unit === type} onClick={() => setUnit(type)}>
        {label}
      </FilterButton>
    ),
    [unit]
  );

  return (
    <ChartContainer>
      <InfoSection>
        <div>
          <ButtonContainer>
            {renderButton("day", "Day")}
            {renderButton("month", "Month")}
            {renderButton("year", "Year")}
          </ButtonContainer>
          <TotalCount>{totalCount.toLocaleString()}</TotalCount>
          <SubText>Total New Users in this {unit}</SubText>
        </div>

        <RightInfo>
          <SectionTitle>Real-time Active</SectionTitle>
          <SubText>User Growth Trend</SubText>
        </RightInfo>
      </InfoSection>

      <ChartSection>
        <Line data={data} options={options} />
      </ChartSection>
    </ChartContainer>
  );
};

export default UserChart;
