import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 1. useLocation 임포트
import { FaCloudUploadAlt } from "react-icons/fa";
import * as S from "./CarsRegistration.styles";

const CarsRegistration = ({ isEditMode = false }) => {
  const location = useLocation();
  const passedData = location.state?.carData; // 2. 넘겨받은 데이터 확인

  // 3. 입력 필드 상태 관리 (useState)
  const [carName, setCarName] = useState("");
  const [km, setKm] = useState("");
  const [type, setType] = useState("");

  // 4. 수정 모드이고 데이터가 있다면, 폼에 데이터 채워넣기
  useEffect(() => {
    if (isEditMode && passedData) {
      setCarName(passedData.name);
      setKm(passedData.km);
      setType(passedData.type || "");
    }
  }, [isEditMode, passedData]);

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
            ? "Edit Car name, Km, Large, Small Edit page"
            : "Create new car"}
        </p>

        <S.FormGroup>
          <div>
            <S.Label>Car Name</S.Label>
            {/* value와 onChange 연결 */}
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
            />
          </div>
        </S.FormGroup>

        <div style={{ marginBottom: "20px" }}>
          <S.Label>Large / Small</S.Label>
          <S.Input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Large"
          />
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
