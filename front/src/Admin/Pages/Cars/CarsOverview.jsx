import React, { useState, useEffect, useContext, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  FaCar,
  FaChargingStation,
  FaRoad,
  FaExclamationTriangle,
  FaChevronRight,
  FaBatteryThreeQuarters,
} from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import * as S from "./CarsOverview.styles";
import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../../../api/reqService";

ChartJS.register(ArcElement, Tooltip, Legend);

const CarsOverview = () => {
  const { auth } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        setLoading(true);
        const response = await axiosAuth.getActual(
          `/api/admin/settings?page=1&limit=100`
        );
        const actualCars =
          response?.cars ||
          response?.carList ||
          (Array.isArray(response) ? response : []);
        setCars(actualCars);
      } catch (error) {
        console.error("Data loading failed", error);
        setCars([]);
      } finally {
        setTimeout(() => setLoading(false), 600); // 부드러운 전환 효과
      }
    };
    fetchAllCars();
  }, []);

  const summary = useMemo(() => {
    if (!cars.length)
      return { total: 0, avgKm: 0, avgEff: 0, maintenanceCount: 0 };
    const total = cars.length;
    const totalKm = cars.reduce(
      (acc, car) => acc + (parseFloat(car.carDriving || car.CARDRIVING) || 0),
      0
    );
    const totalEff = cars.reduce(
      (acc, car) =>
        acc + (parseFloat(car.carEfficiency || car.CAREFFICIENCY) || 0),
      0
    );
    const maint = cars.filter((c) =>
      ["R", "정비중"].includes(c.carStatus || c.CARSTATUS)
    ).length;
    return {
      total,
      avgKm: Math.round(totalKm / total).toLocaleString(),
      avgEff: (totalEff / total).toFixed(1),
      maintenanceCount: maint,
    };
  }, [cars]);

  const statusData = {
    labels: ["이용 가능", "이용 중"],
    datasets: [
      {
        data: [
          cars.filter((c) =>
            ["Y", "대기중"].includes(c.carStatus || c.CARSTATUS)
          ).length,
          cars.filter((c) =>
            ["N", "이용중"].includes(c.carStatus || c.CARSTATUS)
          ).length,
        ],
        backgroundColor: ["#10b981", "#6366f1"],
        hoverOffset: 20,
        borderWidth: 0,
        borderRadius: 5,
      },
    ],
  };

  const lowBatteryCars = cars
    .filter((c) => Number(c.battery || c.BATTERY) < 40)
    .sort(
      (a, b) => Number(a.battery || a.BATTERY) - Number(b.battery || b.BATTERY)
    )
    .slice(0, 4);

  if (loading)
    return <S.LoadingWrapper>운영 데이터를 분석 중입니다...</S.LoadingWrapper>;

  return (
    <S.Container>
      <S.PageHeader>
        <S.PageTitle>운영 차량 종합 관제</S.PageTitle>
        <S.LastUpdated>실시간 데이터 업데이트 됨</S.LastUpdated>
      </S.PageHeader>

      <S.StatRow>
        <StatItem
          icon={<FaCar />}
          label="전체 차량"
          value={summary.total}
          sub="대"
          desc="등록 차량 기준"
        />
        <StatItem
          icon={<FaRoad />}
          label="평균 주행거리"
          value={summary.avgKm}
          sub="km"
          desc="누적 평균 데이터"
        />
        <StatItem
          icon={<FaChargingStation />}
          label="평균 전비"
          value={summary.avgEff}
          sub="km/kWh"
          desc="최적 성능 기준"
        />
        <StatItem
          icon={<FaExclamationTriangle />}
          label="정비 필요"
          value={summary.maintenanceCount}
          sub="대"
          desc="즉시 점검 권고"
          isWarning={summary.maintenanceCount > 0}
        />
      </S.StatRow>

      <S.MainGrid>
        <S.Card>
          <S.CardHeader>
            <h3>
              차량 이용 통계 <span>Status Overview</span>
            </h3>
          </S.CardHeader>
          <S.ChartContainer>
            <S.ChartWrapper>
              <Doughnut
                data={statusData}
                options={{
                  maintainAspectRatio: false,
                  cutout: "84%",
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        padding: 30,
                        font: { size: 12, weight: "700", family: "Pretendard" },
                      },
                    },
                    tooltip: {
                      backgroundColor: "#1e293b",
                      padding: 12,
                      cornerRadius: 10,
                      titleFont: { size: 14 },
                      bodyFont: { size: 13 },
                    },
                  },
                }}
              />
              <S.DonutCenter>
                <div className="num">{summary.total}</div>
                <div className="label">Units</div>
              </S.DonutCenter>
            </S.ChartWrapper>
          </S.ChartContainer>
        </S.Card>

        <S.SideColumn>
          <S.Card>
            <S.CardHeader>
              <h3>
                배터리 관리 <FaBatteryThreeQuarters />
              </h3>
            </S.CardHeader>
            {lowBatteryCars.length === 0 ? (
              <S.EmptyState>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>✅</div>
                모든 차량의 충전 상태가 양호합니다.
              </S.EmptyState>
            ) : (
              lowBatteryCars.map((car, idx) => (
                <S.BatteryProgress key={idx} $idx={idx}>
                  <div className="label-group">
                    <span className="car-name">
                      {car.carName || car.CARNAME}
                    </span>
                    <span className="battery-val">
                      {car.battery || car.BATTERY}%
                    </span>
                  </div>
                  <S.ProgressBar>
                    <S.ProgressFill $width={car.battery || car.BATTERY} />
                  </S.ProgressBar>
                </S.BatteryProgress>
              ))
            )}
          </S.Card>

          <S.ActionCard>
            <h3>Operational Insights</h3>
            <p>
              현재 <strong>{summary.maintenanceCount}대</strong>의 차량이 점검
              대기 중입니다. 안정적인 셰어링 운영을 위해 상세 점검 이력을 확인해
              주세요.
            </p>
            <S.ActionButton onClick={() => navigate("/admin/cars/settings")}>
              관리 센터 바로가기 <FaChevronRight />
            </S.ActionButton>
          </S.ActionCard>
        </S.SideColumn>
      </S.MainGrid>
    </S.Container>
  );
};

const StatItem = ({ icon, label, value, sub, desc, isWarning }) => (
  <S.StatCard $isWarning={isWarning}>
    <S.IconWrapper $isWarning={isWarning}>{icon}</S.IconWrapper>
    <S.StatContent>
      <div className="label">{label}</div>
      <div className="value-group">
        <span className="value">{value}</span>
        <span className="unit">{sub}</span>
      </div>
      <div className="desc">{desc}</div>
    </S.StatContent>
  </S.StatCard>
);

export default CarsOverview;
