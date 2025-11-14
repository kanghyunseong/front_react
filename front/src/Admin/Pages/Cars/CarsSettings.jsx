import React from "react";
import { useNavigate } from "react-router-dom"; // 1. useNavigate 임포트
import { FaTimes } from "react-icons/fa";
import * as S from "./CarsSettings.styles";

const CarsSettings = () => {
  const navigate = useNavigate(); // 2. 네비게이트 훅 사용

  const cars = [
    {
      name: "아이오닉 6",
      km: "14200",
      battery: "98%",
      status: "예약 완료",
      range: "350Km",
      type: "Large",
    },
    {
      name: "Billing #345-Nov",
      km: "14500",
      battery: "98%",
      status: "예약 불가",
      range: "350Km",
      type: "Small",
    },
    {
      name: "Billing #213-Oct",
      km: "14600",
      battery: "98%",
      status: "예약 전",
      range: "350Km",
      type: "Large",
    },
  ];

  // 3. 수정 버튼 핸들러 함수 추가
  const handleEditClick = (car) => {
    // state에 car 데이터를 담아서 보냄
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
            <S.InfoText>{car.status}</S.InfoText>
            <S.InfoText>{car.range}</S.InfoText>

            <S.ActionGroup>
              {/* 4. onClick 이벤트 연결 */}
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
