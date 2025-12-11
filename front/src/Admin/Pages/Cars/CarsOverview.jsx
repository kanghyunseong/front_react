import React, { useState, useEffect, useContext, useMemo } from "react";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaCar, FaChargingStation, FaRoad, FaTools } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import * as S from "./CarsOverview.styles";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CarsOverview = () => {
  const { auth } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCars = async () => {
      if (!auth || !auth.accessToken) return;
      try {
        const response = await axios.get(
          "http://localhost:8081/admin/api/settings?page=1&limit=100",
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        );
        setCars(response.data.cars || []);
      } catch (error) {
        console.error("대시보드 데이터 로딩 실패:", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          alert(
            "세션이 만료되었거나 접근 권한이 없습니다. 로그인 페이지로 이동합니다."
          );
          navigate("/members/login");
        } else {
          alert("데이터를 불러오는 데 실패했습니다. 서버 상태를 확인해주세요.");
          setCars([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAllCars();
  }, [auth]);

  const summary = useMemo(() => {
    if (cars.length === 0)
      return { total: 0, avgKm: 0, avgEff: 0, maintenanceCount: 0 };
    const total = cars.length;
    const totalKm = cars.reduce(
      (acc, car) => acc + (parseFloat(car.carDriving) || 0),
      0
    );
    const totalEff = cars.reduce(
      (acc, car) => acc + Number(car.carEfficiency || 0),
      0
    );
    const maint = cars.filter(
      (c) => c.carStatus === "R" || c.carStatus === "정비중"
    ).length;
    return {
      total: total,
      avgKm: Math.round(totalKm / total).toLocaleString(),
      avgEff: (totalEff / total).toFixed(1),
      maintenanceCount: maint,
    };
  }, [cars]);

  const statusChartData = useMemo(() => {
    const statusCount = { Available: 0, Rented: 0, Maintenance: 0 };
    cars.forEach((car) => {
      if (car.carStatus === "Y" || car.carStatus === "대기중")
        statusCount.Available++;
      else if (car.carStatus === "N" || car.carStatus === "이용중")
        statusCount.Rented++;
      else if (car.carStatus === "R" || car.carStatus === "정비중")
        statusCount.Maintenance++;
      else statusCount.Available++;
    });
    return {
      labels: ["Available", "Rented"],
      datasets: [
        {
          data: [statusCount.Available, statusCount.Rented],
          backgroundColor: ["#10B981", "#6B4CE6"],
          borderWidth: 0,
          cutout: "75%",
        },
      ],
    };
  }, [cars]);

  const typeChartData = useMemo(() => {
    const typeCount = { Small: 0, Medium: 0, Large: 0 };
    cars.forEach((car) => {
      const size = car.carSize || "";
      if (size === "소형" || size === "Small") typeCount.Small++;
      else if (size === "중형" || size === "Medium") typeCount.Medium++;
      else if (size === "대형" || size === "Large") typeCount.Large++;
    });
    return {
      labels: ["Small (소형)", "Medium (중형)", "Large (대형)"],
      datasets: [
        {
          data: [typeCount.Small, typeCount.Medium, typeCount.Large],
          backgroundColor: ["#A78BFA", "#8B5CF6", "#6B4CE6"],
          borderWidth: 1,
        },
      ],
    };
  }, [cars]);

  const mileageChartData = useMemo(() => {
    const buckets = [0, 0, 0, 0, 0];
    cars.forEach((car) => {
      const km = Number(car.carDriving || 0);
      if (km < 10000) buckets[0]++;
      else if (km < 30000) buckets[1]++;
      else if (km < 50000) buckets[2]++;
      else if (km < 100000) buckets[3]++;
      else buckets[4]++;
    });
    return {
      labels: ["< 10k", "10k-30k", "30k-50k", "50k-100k", "100k+"],
      datasets: [
        {
          label: "Vehicles",
          data: buckets,
          backgroundColor: "#6B4CE6",
          borderRadius: 4,
          barThickness: 20,
        },
      ],
    };
  }, [cars]);

  const { efficiencyChartData, lowBatteryCars } = useMemo(() => {
    const sortedByEff = [...cars]
      .sort((a, b) => Number(b.carEfficiency) - Number(a.carEfficiency))
      .slice(0, 5);
    const effData = {
      labels: sortedByEff.map((c) => c.carName),
      datasets: [
        {
          label: "km/kWh",
          data: sortedByEff.map((c) => c.carEfficiency),
          backgroundColor: sortedByEff.map((_, i) =>
            i === 0 ? "#10B981" : "#D1FAE5"
          ),
          borderRadius: 4,
          barThickness: 15,
          indexAxis: "y",
        },
      ],
    };
    const lowBat = cars.filter((c) => Number(c.battery) < 40).slice(0, 3);
    return { efficiencyChartData: effData, lowBatteryCars: lowBat };
  }, [cars]);

  if (loading) return <S.NoData>대시보드 데이터를 분석 중입니다...</S.NoData>;

  return (
    <div>
      <S.PageTitle>Cars / Overview</S.PageTitle>

      <S.Row>
        <StatBox
          icon={<FaCar />}
          label="Total Cars"
          value={summary.total}
          sub="Registered"
        />
        <StatBox
          icon={<FaRoad />}
          label="Avg. Mileage"
          value={`${summary.avgKm} km`}
          sub="Average"
        />
        <StatBox
          icon={<FaChargingStation />}
          label="Avg. Efficiency"
          value={`${summary.avgEff} km/kWh`}
          sub="Performance"
        />
      </S.Row>

      <S.Container>
        <S.Column flex={2}>
          <S.Row>
            <S.Card>
              <h3>Fleet Status</h3>
              <S.ChartContainer height="200px">
                {cars.length > 0 ? (
                  <>
                    <Doughnut
                      data={statusChartData}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "right",
                            labels: { boxWidth: 10, font: { size: 24 } },
                          },
                        },
                      }}
                    />
                    <S.DonutOverlay>
                      <S.OverlayValue>{summary.total}</S.OverlayValue>
                      <S.OverlayLabel>Total</S.OverlayLabel>
                    </S.DonutOverlay>
                  </>
                ) : (
                  <S.NoData>No Data</S.NoData>
                )}
              </S.ChartContainer>
            </S.Card>

            <S.Card>
              <h3>Fleet Type (Size)</h3>
              <S.ChartContainer height="200px">
                {cars.length > 0 ? (
                  <Pie
                    data={typeChartData}
                    options={{
                      maintainAspectRatio: false,
                      plugins: { legend: { position: "right" } },
                    }}
                  />
                ) : (
                  <S.NoData>No Data</S.NoData>
                )}
              </S.ChartContainer>
            </S.Card>
          </S.Row>

          <S.Card>
            <h3>Mileage Distribution</h3>
            <S.ChartContainer height="200px">
              <Bar
                data={mileageChartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { grid: { borderDash: [5, 5] } },
                    x: { grid: { display: false } },
                  },
                }}
              />
            </S.ChartContainer>
          </S.Card>
        </S.Column>

        <S.Column flex={1}>
          <S.Card>
            <h3>Top Efficiency Models</h3>
            <S.SubText>km per kWh (Higher is better)</S.SubText>
            <S.ChartContainer height="250px">
              <Bar
                data={efficiencyChartData}
                options={{
                  indexAxis: "y",
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { display: false },
                    y: { grid: { display: false } },
                  },
                }}
              />
            </S.ChartContainer>
          </S.Card>

          <S.Card>
            <h3>Low Battery Alert ⚠️</h3>
            {lowBatteryCars.length === 0 ? (
              <S.SafeMessage>모든 차량의 배터리가 충분합니다.</S.SafeMessage>
            ) : (
              <S.List>
                {lowBatteryCars.map((car, idx) => (
                  <S.ListItem key={idx}>
                    <span>{car.carName}</span>
                    <S.BatteryLevel>{car.battery}%</S.BatteryLevel>
                  </S.ListItem>
                ))}
              </S.List>
            )}
          </S.Card>
        </S.Column>
      </S.Container>
    </div>
  );
};

const StatBox = ({ icon, label, value, sub, isWarning }) => (
  <S.StatCard>
    <S.IconWrapper $isWarning={isWarning}>{icon}</S.IconWrapper>
    <S.StatInfo>
      <S.StatLabel>{label}</S.StatLabel>
      <S.StatValue>{value}</S.StatValue>
      <S.StatSub $isWarning={isWarning}>{sub}</S.StatSub>
    </S.StatInfo>
  </S.StatCard>
);

export default CarsOverview;
