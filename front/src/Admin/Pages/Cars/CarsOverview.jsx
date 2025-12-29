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
        setLoading(false);
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
        backgroundColor: ["#00d1b2", "#6c5ce7"],
        hoverOffset: 12,
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  };

  const lowBatteryCars = cars
    .filter((c) => Number(c.battery || c.BATTERY) < 40)
    .sort(
      (a, b) => Number(a.battery || a.BATTERY) - Number(b.battery || b.BATTERY)
    )
    .slice(0, 4);

  if (loading) return <S.LoadingWrapper>분석 중입니다...</S.LoadingWrapper>;

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
          desc="성능 최적화 상태"
        />
        <StatItem
          icon={<FaExclamationTriangle />}
          label="정비 필요"
          value={summary.maintenanceCount}
          sub="대"
          desc="정비 필요 차량"
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
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        font: { size: 13, weight: "600" },
                        padding: 20,
                      },
                    },
                  },
                }}
              />
              <S.DonutCenter>
                <div className="num">{summary.total}</div>
                <div className="label">Total Units</div>
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
              <S.EmptyState>모든 차량의 충전 상태가 양호합니다.</S.EmptyState>
            ) : (
              lowBatteryCars.map((car, idx) => (
                <S.BatteryProgress key={idx}>
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
            <h3>Quick Action</h3>
            <p>
              현재 <strong>{summary.maintenanceCount}대</strong>의 차량이 정비
              상태로 확인됩니다. 운영 효율 향상을 위해 관리 센터에서 상세 상태를
              확인하세요.
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
