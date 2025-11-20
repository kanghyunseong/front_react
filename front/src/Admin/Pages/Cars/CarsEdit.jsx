import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import * as S from "./CarsRegistration.styles";
import { AuthContext } from "../../../context/AuthContext";

const CarsEdit = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { carId } = useParams();

  const [carName, setCarName] = useState("");
  const [km, setKm] = useState("");
  const [type, setType] = useState("Small");
  const [battery, setBattery] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [range, setRange] = useState("0");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (!carId) {
      console.error("❌ 차량 ID가 없습니다. 수정 페이지 진입 오류.");
      return;
    }

    if (!auth || !auth.accessToken) {
      console.log("⏳ 토큰을 기다리는 중...");
      return;
    }

    axios
      .get(`http://localhost:8081/admin/api/settings/${carId}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((response) => {
        console.log("✅ 데이터 로드 성공:", response.data);
        const data = response.data; // 상태 업데이트
        setCarName(data.carName || "");
        setKm(data.carDriving || "");
        setType(data.carSize || "Small");
        setBattery(data.battery ? String(data.battery) : "");
        setEfficiency(data.carEfficiency ? String(data.carEfficiency) : "");

        // 로드 후 즉시 주행 가능 거리 계산 (자동계산 로직 복원)
        const bat = parseFloat(data.battery);
        const eff = parseFloat(data.carEfficiency);
        if (!isNaN(bat) && !isNaN(eff) && bat > 0 && eff > 0) {
          setRange(String(Math.round(bat * eff)));
        }

        if (data.carImage) {
          setPreview(data.carImage);
        }
      })
      .catch((err) => {
        console.error("❌ 상세 정보 로딩 실패:", err);
        alert("차량 정보를 불러올 수 없거나 권한이 없습니다.");
      });
  }, [carId, auth]); // carId와 auth가 변경될 때만 실행 // ============================================================= // 2. [자동 계산 로직] 배터리 또는 전비 변경 시 주행 가능 거리 계산 // =============================================================

  useEffect(() => {
    const bat = parseFloat(battery);
    const eff = parseFloat(efficiency);

    if (!isNaN(bat) && !isNaN(eff) && bat > 0 && eff > 0) {
      const calculatedRange = Math.round(bat * eff);
      setRange(calculatedRange.toString());
    } else {
      setRange("0");
    }
  }, [battery, efficiency]); // 파일 변경 핸들러 (동일)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }; // ============================================================= // 3. [저장] 수정 요청 (Update 전용) // =============================================================

  const handleSave = () => {
    if (!carName) {
      alert("필수 정보를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("carName", carName);
    formData.append("carDriving", km || "0");
    formData.append("carSize", type || "Small");
    formData.append("battery", battery || "0");
    formData.append("carEfficiency", efficiency || "0");

    // 수정 모드이므로 carId는 필수입니다.
    formData.append("carId", carId);

    if (file) {
      formData.append("file", file);
    }

    // 수정 전용 경로 사용: POST /admin/api/settings/update
    axios
      .post(`http://localhost:8081/admin/api/settings/update`, formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("차량이 수정되었습니다.");
        navigate("/admin/cars/settings");
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        alert("수정에 실패했습니다.");
      });
  };

  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#6B4CE6" }}>
        Cars / Cars Edit
      </h2>

      <S.Container>
        <h3 style={{ marginBottom: "5px" }}>Edit Page (ID: {carId})</h3>

        <p style={{ color: "#999", marginBottom: "30px", fontSize: "14px" }}>
          Edit Car name, Km, Battery, Efficiency information
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
            <S.Label>Km (Driving)</S.Label>
            <S.Input
              type="number"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              placeholder="12345"
            />
          </div>
        </S.FormGroup>
        <S.FormGroup>
          <div>
            <S.Label>Type (Large/Small)</S.Label>
            <S.Input
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ height: "42px" }}
            >
              <option value="소형">소형</option>
              <option value="중형">중형</option>
              <option value="대형">대형</option>
            </S.Input>
          </div>
          <div>
            <S.Label>Battery (kWh)</S.Label>
            <S.Input
              type="number"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
              placeholder="77.4"
            />
          </div>
        </S.FormGroup>
        <S.FormGroup>
          <div>
            <S.Label>Efficiency (km/kWh)</S.Label>
            <S.Input
              type="number"
              step="0.1"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              placeholder="5.2"
            />
          </div>
          <div>
            <S.Label>Range (Auto Calculated)</S.Label>
            <S.Input
              value={`${range} Km`}
              readOnly
              style={{
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
                color: "#6B4CE6",
              }}
            />
          </div>
        </S.FormGroup>
        <div style={{ marginBottom: "20px" }}>
          <S.Label>Car Profile Image</S.Label>
          <input
            type="file"
            id="carImgInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <S.UploadBox
            onClick={() => document.getElementById("carImgInput").click()}
          >
            {preview ? (
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
                <div
                  style={{ marginTop: "5px", fontSize: "12px", color: "#999" }}
                >
                  Click to change image
                </div>
              </div>
            ) : (
              <>
                <FaCloudUploadAlt size={30} />
                <div>Click to upload</div>
                <p style={{ fontSize: "12px", color: "#ccc" }}>SVG, PNG, JPG</p>
              </>
            )}
          </S.UploadBox>
        </div>
        <S.ButtonGroup>
          <S.Button onClick={handleCancel}>Cancel</S.Button>
          <S.Button $primary onClick={handleSave}>
            Save Change
          </S.Button>
        </S.ButtonGroup>
      </S.Container>
    </div>
  );
};

export default CarsEdit;
