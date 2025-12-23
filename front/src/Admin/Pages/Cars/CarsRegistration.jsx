import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import * as S from "./CarsRegistration.styles";
import { AuthContext } from "../../../context/AuthContext";

const CarsRegistration = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [carName, setCarName] = useState("");
  const [km, setKm] = useState("");
  const [type, setType] = useState("소형");
  const [battery, setBattery] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [range, setRange] = useState("0");
  const [seats, setSeats] = useState("");
  const [loading, setLoading] = useState(false);

  const [carContent, setCarContent] = useState("");
  const [byteCount, setByteCount] = useState(0);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  const getByteLength = (s) => {
    let b = 0;
    if (!s) return 0;
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      b += c >> 7 ? 3 : 1;
    }
    return b;
  };

  const handleContentChange = (e) => {
    const val = e.target.value;
    const currentByte = getByteLength(val);

    if (currentByte > 4000) {
      alert("작성 가능한 최대 글자 수(4000 Byte)를 초과했습니다.");
      return;
    }
    setCarContent(val);
    setByteCount(currentByte);
  };

  useEffect(() => {
    const bat = parseFloat(battery);
    const eff = parseFloat(efficiency);
    if (!isNaN(bat) && !isNaN(eff) && bat > 0 && eff > 0) {
      const calculatedRange = Math.round(bat * eff);
      setRange(calculatedRange.toString());
    } else {
      setRange("0");
    }
  }, [battery, efficiency]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    if (loading) return;

    if (!carName) {
      alert("차량 이름은 필수입니다.");
      return;
    }
    if (!carContent) {
      alert("차량 설명을 입력해주세요.");
      return;
    }
    if (getByteLength(carContent) > 4000) {
      alert("차량 설명이 너무 깁니다. 내용을 줄여주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("carName", carName);
    formData.append("carDriving", km || "0");
    formData.append("carSize", type || "소형");
    formData.append("battery", battery || "0");
    formData.append("carEfficiency", efficiency || "0");
    formData.append("carSeet", seats || "0");
    formData.append("carContent", carContent);

    if (file) {
      formData.append("file", file);
    }

    const token = auth?.accessToken;
    if (!token) {
      alert("인증 정보가 없습니다. 다시 로그인해주세요.");
      navigate("/members/login");
      return;
    }

    const url = `${apiUrl}/admin/api/settings`;
    setLoading(true);
    try {
      await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("차량이 성공적으로 등록되었습니다.");
      navigate("/admin/cars/settings");
    } catch (err) {
      console.error("저장 실패:", err);

      if (err.response) {
        const status = err.response.status;
        const serverMsg = err.response.data.message;

        if (status === 401 || status === 403) {
          alert(
            "세션이 만료되었거나 접근 권한이 없습니다. 로그인 페이지로 이동합니다."
          );
          navigate("/members/login");
        } else if (status === 413) {
          alert("파일 용량이 너무 큽니다. 10MB 이하의 이미지를 사용해주세요.");
        } else {
          alert(`등록 실패: ${serverMsg || "서버 내부 오류가 발생했습니다."}`);
        }
      } else {
        alert("네트워크 연결 오류 또는 서버 응답을 받을 수 없습니다.");
      }
    } finally {
      setLoading(false);
    }
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
        <h3
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid #eee",
            paddingBottom: "10px",
          }}
        >
          New Car Registration
        </h3>

        <S.FormGroup>
          <div>
            <S.Label>Car Name</S.Label>
            <S.Input
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="예: 아이오닉 6"
            />
          </div>

          <div>
            <S.Label>Km (Driving)</S.Label>
            <S.Input
              type="number"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              placeholder="주행거리 (km)"
            />
          </div>
        </S.FormGroup>

        <S.FormGroup>
          <div>
            <S.Label>Type (Size)</S.Label>
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
              placeholder="배터리 용량"
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
              placeholder="전비"
            />
          </div>

          <div>
            <S.Label>Range (Auto Calculated)</S.Label>
            <S.Input
              value={`${range} Km`}
              readOnly
              style={{
                backgroundColor: "#f3f0ff",
                fontWeight: "bold",
                color: "#6B4CE6",
              }}
            />
          </div>
        </S.FormGroup>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <S.Label style={{ marginBottom: 0 }}>Car Description</S.Label>
            <S.ByteInfo $error={byteCount > 4000}>
              {byteCount} / 4000 Bytes
            </S.ByteInfo>
          </div>

          <S.TextArea
            value={carContent}
            onChange={handleContentChange}
            placeholder="차량에 대한 상세 설명을 입력하세요."
            $error={byteCount > 4000}
          />
          {byteCount > 4000 && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              작성 가능한 용량을 초과했습니다. 내용을 줄여주세요.
            </p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <S.Label>Seats (인승)</S.Label>
          <S.Input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            placeholder="탑승 가능 인원"
          />
        </div>

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
              <>
                <img src={preview} alt="preview" />
                <div
                  style={{ marginTop: "10px", fontSize: "12px", color: "#999" }}
                >
                  Click to change image
                </div>
              </>
            ) : (
              <>
                <FaCloudUploadAlt size={30} />
                <div style={{ marginTop: "10px" }}>Click to upload</div>
                <p>SVG, PNG, JPG</p>
              </>
            )}
          </S.UploadBox>
        </div>

        <S.ButtonGroup>
          <S.Button onClick={handleCancel}>Cancel</S.Button>
          <S.Button $primary onClick={handleSave}>
            {loading ? "등록 중..." : "Create Car"}
          </S.Button>
        </S.ButtonGroup>
      </S.Container>
    </div>
  );
};

export default CarsRegistration;
