import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import axios from "axios"; // axios 임포트
import * as S from "./CarsRegistration.styles";

const CarsRegistration = ({ isEditMode = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedData = location.state?.carData;

  // 상태 변수들
  const [carName, setCarName] = useState("");
  const [km, setKm] = useState("");
  const [type, setType] = useState("Small"); // 기본값 설정 (Select 박스 등으로 변경 고려)
  const [battery, setBattery] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [batteryRemaining, setBatteryRemaining] = useState("");
  const [range, setRange] = useState("0");

  // 이미지 관련 상태
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 수정 모드일 때 데이터 채우기
  useEffect(() => {
    if (isEditMode && passedData) {
      setCarName(passedData.name || "");
      setKm(passedData.km || "");
      setType(passedData.type || "Small");
      if (passedData.battery !== undefined && passedData.battery !== null) {
        // 숫자를 문자로 바꿔서 replace하거나, 그냥 값을 넣음
        setBattery(String(passedData.battery).replace("%", ""));
      } else {
        setBattery("");
      }
      setEfficiency(passedData.efficiency || "");
      setBatteryRemaining(passedData.batteryRemaining || "");

      // 기존 이미지가 있다면 미리보기 설정 (URL이라고 가정)
      if (passedData.image) {
        setPreviewUrl(passedData.image);
      }
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

  // 이미지 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // 파일 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!carName || !km || !battery || !efficiency || !batteryRemaining) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("name", carName);
    formData.append("km", km);
    formData.append("type", type);
    formData.append("battery", battery);
    formData.append("efficiency", efficiency);
    formData.append("batteryRemaining", batteryRemaining);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      let response;
      if (isEditMode) {
        alert("차량 정보가 수정되었습니다. (API 미연동 상태)");
      } else {
        alert("새로운 차량이 등록되었습니다. (API 미연동 상태)");
      }

      // 성공 시 목록 페이지로 이동
      navigate("/admin/cars/settings");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate(-1); // 뒤로 가기
  };

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

        {/* Car Name & Km */}
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

        {/* Type & Battery */}
        <S.FormGroup>
          <div>
            <S.Label>Large / Small</S.Label>
            {/* Select 박스로 변경하는 것이 좋음 */}
            <S.Input
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ height: "42px" }} // 높이 맞춤
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </S.Input>
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

        {/* Efficiency & Battery Remaining */}
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
          <p style={{ fontSize: "12px", color: "#999", marginTop: "5px" }}>
            * 주행가능거리 = 전비 × 배터리 잔량
          </p>
        </div>

        {/* 이미지 업로드 섹션 (등록/수정 모두 가능하도록 변경) */}
        <div style={{ marginBottom: "20px" }}>
          <S.Label>Car Profile Image</S.Label>

          {/* 숨겨진 파일 입력 */}
          <input
            type="file"
            id="carImageInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* 업로드 박스 (클릭 시 파일 선택) */}
          <S.UploadBox
            onClick={() => document.getElementById("carImageInput").click()}
          >
            {previewUrl ? (
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
                <div
                  style={{
                    marginTop: "10px",
                    color: "#6B4CE6",
                    fontWeight: "bold",
                  }}
                >
                  Click to change image
                </div>
              </div>
            ) : (
              <>
                <FaCloudUploadAlt size={30} />
                <div>Click to upload or drag and drop</div>
                <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </>
            )}
          </S.UploadBox>
        </div>

        <S.ButtonGroup>
          <S.Button onClick={handleCancel}>Cancel</S.Button>
          <S.Button $primary onClick={handleSave}>
            {isEditMode ? "Save Change" : "Create Car"}
          </S.Button>
        </S.ButtonGroup>
      </S.Container>
    </div>
  );
};

export default CarsRegistration;
