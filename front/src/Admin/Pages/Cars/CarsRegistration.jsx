import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as S from "./CarsRegistration.styles";

const CarsRegistration = ({ isEditMode = false }) => {
  const location = useLocation();
  const passedData = location.state?.carData;

  const [carName, setCarName] = useState("");
  const [km, setKm] = useState("");
  const [type, setType] = useState("");
  const [battery, setBattery] = useState(""); // 충전량 (%)
  const [efficiency, setEfficiency] = useState(""); // 전비 (km/kWh)
  const [batteryRemaining, setBatteryRemaining] = useState(""); // 배터리 잔량 (kWh)
  const [range, setRange] = useState("0"); // 주행가능거리 (계산값)

  // 수정 모드일 때 데이터 채우기
  useEffect(() => {
    if (isEditMode && passedData) {
      setCarName(passedData.name || "");
      setKm(passedData.km || "");
      setType(passedData.type || "");
      setBattery(passedData.battery?.replace("%", "") || "");
      setEfficiency(passedData.efficiency || "");
      setBatteryRemaining(passedData.batteryRemaining || "");
    }
  }, [isEditMode, passedData]);

  // 주행가능거리 자동 계산
  useEffect(() => {
    if (efficiency && batteryRemaining) {
      const calculatedRange = (
        parseFloat(efficiency) * parseFloat(batteryRemaining)
      ).toFixed(1);
      setRange(calculatedRange);
    } else {
      setRange("0");
    }
  }, [efficiency, batteryRemaining]);

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#6B4CE6" }}>
        {isEditMode ? "Cars / Cars Edit" : "Cars / Cars Registration"}
      </h2>

      <S.Container>
        <h3 style={{ marginBottom: "5px" }}>
          {isEditMode ? "Edit Page" : "New Car Registration"}
        </h3>
        <p style={{ color: "#999", marginBottom: "30px", fontSize: "14px" }}>
          {isEditMode
            ? "Edit Car name, Km, Battery, Efficiency information"
            : "Create new car"}
        </p>

        <S.FormGroup>
          <div>
            <S.Label>Car Name</S.Label>
            <S.Input
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="아이오닉 6"
            />
          </div>
          <div>
            <S.Label>Km</S.Label>
            <S.Input
              value={km}
              onChange={(e) => setKm(e.target.value)}
              placeholder="12460"
              type="number"
            />
          </div>
        </S.FormGroup>

        <S.FormGroup>
          <div>
            <S.Label>Large / Small</S.Label>
            <S.Input
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Large"
            />
          </div>
          <div>
            <S.Label>충전량 (%)</S.Label>
            <S.Input
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
              placeholder="98"
              type="number"
              min="0"
              max="100"
            />
          </div>
        </S.FormGroup>

        <S.FormGroup>
          <div>
            <S.Label>전비 (km/kWh)</S.Label>
            <S.Input
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              placeholder="5.2"
              type="number"
              step="0.1"
            />
          </div>
          <div>
            <S.Label>배터리 잔량 (kWh)</S.Label>
            <S.Input
              value={batteryRemaining}
              onChange={(e) => setBatteryRemaining(e.target.value)}
              placeholder="72"
              type="number"
              step="0.1"
            />
          </div>
        </S.FormGroup>

        {/* 주행가능거리 표시 (읽기 전용) */}
        <div style={{ marginBottom: "20px" }}>
          <S.Label>주행가능거리 (자동 계산)</S.Label>
          <S.Input
            value={`${range} Km`}
            readOnly
            style={{
              backgroundColor: "#f5f5f5",
              cursor: "not-allowed",
              fontWeight: "bold",
              color: "#6B4CE6",
            }}
          />
          <p
            style={{
              fontSize: "12px",
              color: "#999",
              marginTop: "5px",
            }}
          >
            * 주행가능거리 = 전비 × 배터리 잔량
          </p>
        </div>

        {/* 등록 모드일 때만 날짜/이미지 업로드 표시 */}
        {!isEditMode && (
          <>
            <S.FormGroup>
              <div>
                <S.Label>Start Date</S.Label>
                <S.Input type="date" />
              </div>
              <div>
                <S.Label>End Date</S.Label>
                <S.Input type="date" />
              </div>
            </S.FormGroup>

            <div>
              <S.Label>Car profile Image</S.Label>
              <S.UploadBox>
                <FaCloudUploadAlt size={30} />
                <div>Click to upload or drag and drop</div>
                <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </S.UploadBox>
            </div>
          </>
        )}

        <S.ButtonGroup>
          <S.Button>Cancel</S.Button>
          <S.Button $primary>
            {isEditMode ? "Save Change" : "Create project"}
          </S.Button>
        </S.ButtonGroup>
      </S.Container>
    </div>
  );
};

export default CarsRegistration;
