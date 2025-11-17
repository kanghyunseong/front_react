import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import * as S from "./CarsSettings.styles";

const CarsSettings = () => {
  const navigate = useNavigate();

  const cars = [
    {
      name: "아이오닉 6",
      km: "14200",
      battery: "98%",
      efficiency: "5.2", // 전비 (km/kWh)
      batteryRemaining: "72", // 배터리 잔량 (kWh)
      status: "예약 완료",
      range: "350Km",
      type: "Large",
    },
    {
      name: "Billing #345-Nov",
      km: "14500",
      battery: "98%",
      efficiency: "5.8",
      batteryRemaining: "68",
      status: "예약 불가",
      range: "350Km",
      type: "Small",
    },
    {
      name: "Billing #213-Oct",
      km: "14600",
      battery: "98%",
      efficiency: "5.5",
      batteryRemaining: "70",
      status: "예약 전",
      range: "350Km",
      type: "Large",
    },
  ];

  const handleEditClick = (car) => {
    navigate("/admin/cars/edit", { state: { carData: car } });
  };

  return (
    <div>
      <h2 style={{ marginBottom: "10px", color: "#6B4CE6" }}>
        Cars/Cars Settings
      </h2>
      <h3 style={{ marginBottom: "20px" }}>Enumeration</h3>

      <S.ListContainer>
        <S.ListHeader>
          <div style={{ flex: 2 }}>차종</div>
          <div style={{ flex: 1 }}>키로수</div>
          <div style={{ flex: 1 }}>충전량</div>
          <div style={{ flex: 1 }}>전비</div>
          <div style={{ flex: 1 }}>배터리 잔량</div>
          <div style={{ flex: 1 }}>예약 여부</div>
          <div style={{ flex: 1 }}>주행가능거리</div>
          <div style={{ width: "100px" }}></div>
        </S.ListHeader>

        {cars.map((car, idx) => (
          <S.ListItem key={idx}>
            <S.CarInfo>
              <input type="checkbox" style={{ marginRight: "10px" }} />
              <div className="img-placeholder"></div>
              <span>{car.name}</span>
            </S.CarInfo>
            <S.InfoText>{car.km} Km</S.InfoText>
            <S.InfoText>{car.battery}</S.InfoText>
            <S.InfoText>{car.efficiency} km/kWh</S.InfoText>
            <S.InfoText>{car.batteryRemaining} kWh</S.InfoText>
            <S.InfoText>{car.status}</S.InfoText>
            <S.InfoText>{car.range}</S.InfoText>

            <S.ActionGroup>
              <S.EditButton onClick={() => handleEditClick(car)}>
                수정하기
              </S.EditButton>
              <S.DeleteButton>
                <FaTimes />
              </S.DeleteButton>
            </S.ActionGroup>
          </S.ListItem>
        ))}
      </S.ListContainer>
    </div>
  );
};

export default CarsSettings;
