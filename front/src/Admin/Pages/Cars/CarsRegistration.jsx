import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import * as S from "./CarsRegistration.styles"; // 스타일 재사용
import { AuthContext } from "../../../context/AuthContext";

const CarsRegistration = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext); // 상태 변수

  const [carName, setCarName] = useState("");
  const [km, setKm] = useState("");
  const [type, setType] = useState("Small");
  const [battery, setBattery] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [range, setRange] = useState("0");
  const [seats, setSeats] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // [자동 계산 로직] (등록 시 입력에 따라 실시간 계산)

  useEffect(() => {
    const bat = parseFloat(battery);
    const eff = parseFloat(efficiency);
    if (!isNaN(bat) && !isNaN(eff) && bat > 0 && eff > 0) {
      const calculatedRange = Math.round(bat * eff);
      setRange(calculatedRange.toString());
    } else {
      setRange("0");
    }
  }, [battery, efficiency]); // [파일 선택]

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }; // [저장] 등록 전용 요청

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
    formData.append("carEfficiency", efficiency || "0"); // 등록 전용 URL 사용: POST /admin/api/settings
    formData.append("carSeet", seats || "0");

    const url = "http://localhost:8081/admin/api/settings";

    if (file) {
      formData.append("file", file);
    }

    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("등록되었습니다.");
        navigate("/admin/cars/settings");
      })
      .catch((err) => {
        console.error("저장 실패:", err);
        alert("저장에 실패했습니다.");
      });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#6B4CE6" }}>
        Cars / Cars Registration
      </h2>
      <S.Container>
        <h3 style={{ marginBottom: "5px" }}>New Car Registration</h3>
        <p style={{ color: "#999", marginBottom: "30px", fontSize: "14px" }}>
          Create new car
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
          <div>
            <S.Label>Seats (인승)</S.Label>
            <S.Input
              type="number"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              placeholder="5"
            />
          </div>
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
            Create Car
          </S.Button>
        </S.ButtonGroup>
      </S.Container>
    </div>
  );
};

export default CarsRegistration;
