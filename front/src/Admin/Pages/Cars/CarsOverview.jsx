import React from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
} from "chart.js";
import * as S from "./CarsOverview.styles"; // 스타일 임포트

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip
);

const CarsOverview = () => {
  // 데이터 설정 (이전과 동일)
  const lineData = {
    labels: ["25.02", "26.02", "27.02", "28.02", "29.02"],
    datasets: [
      {
        label: "Income",
        data: [100, 120, 150, 130, 90],
        borderColor: "#FF6B6B",
        tension: 0.4,
      },
      {
        label: "Outcome",
        data: [80, 90, 70, 100, 60],
        borderColor: "#6B4CE6",
        tension: 0.4,
      },
    ],
  };

  const dougnutData = {
    labels: ["Men", "Women"],
    datasets: [
      {
        data: [35, 45],
        backgroundColor: ["#6B4CE6", "#D8B4FE"],
        cutout: "70%",
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#6B4CE6" }}>
        Cars / Overview
      </h2>

      <S.Row>
        <S.StatCard>
          <div>
            <div className="number">635</div>
            <div className="label">Carbon Savings</div>
          </div>
          <div className="green">+21.01%</div>
        </S.StatCard>
        <S.StatCard>
          <div>
            <div className="number">123</div>
            <div className="label">Reservation Overview</div>
          </div>
          <div className="green">+4.399%</div>
        </S.StatCard>
      </S.Row>

      <S.Container>
        {/* 왼쪽 */}
        <div>
          <S.Card>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Reservation set</h3>
              <div style={{ fontSize: "12px" }}>● Income ● Outcome</div>
            </div>
            <Line
              data={lineData}
              options={{ plugins: { legend: { display: false } } }}
            />
          </S.Card>

          <S.Row>
            <S.Card style={{ flex: 1 }}>
              <h3>Gender</h3>
              <S.ChartWrapper>
                <Doughnut
                  data={dougnutData}
                  options={{ plugins: { legend: { display: false } } }}
                />
              </S.ChartWrapper>
              <S.Legend>
                <span style={{ color: "#6B4CE6" }}>● Men 35%</span>{" "}
                <span style={{ color: "#D8B4FE" }}>● Women 45%</span>
              </S.Legend>
            </S.Card>
            <S.Card style={{ flex: 1 }}>
              <h3>Age range</h3>
              <Bar
                data={{
                  labels: ["13-17", "18-24", "25-34", "35-44"],
                  datasets: [
                    {
                      data: [50, 60, 70, 80],
                      backgroundColor: "#6B4CE6",
                      borderRadius: 5,
                      barThickness: 10,
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false } },
                    y: { display: false },
                  },
                }}
              />
            </S.Card>
          </S.Row>
        </div>

        {/* 오른쪽 */}
        <div>
          <S.Card style={{ height: "100%" }}>
            <h3>Catalog</h3>
            <S.CatalogList>
              <li>
                <span>Cars Reserves</span> <span className="count">140</span>
              </li>
              <li>
                <span>Cars Reservation</span> <span className="count">115</span>
              </li>
              <li>
                <span>Remainder</span> <span className="count">25</span>
              </li>
            </S.CatalogList>
          </S.Card>
        </div>
      </S.Container>
    </div>
  );
};

export default CarsOverview;
