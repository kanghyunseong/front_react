import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaInfoCircle,
  FaCar,
  FaBatteryFull,
} from "react-icons/fa";
import * as S from "./CarsRegistration.styles";
import { AuthContext } from "../../../context/AuthContext";
import { axiosAuth } from "../../../api/reqService";

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
  const [carContent, setCarContent] = useState("");
  const [byteCount, setByteCount] = useState(0);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setRange(Math.round(bat * eff).toString());
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
    if (!carName) return alert("차량 이름은 필수입니다.");
    if (!carContent) return alert("차량 설명을 입력해주세요.");
    if (!auth?.accessToken) {
      alert("인증 정보가 없습니다. 다시 로그인해주세요.");
      return navigate("/members/login");
    }

    const carData = {
      carName,
      carDriving: km || "0",
      carSize: type,
      battery: battery || "0",
      carEfficiency: efficiency || "0",
      carSeet: seats || "0",
      carContent: carContent,
    };

    setLoading(true);
    try {
      await axiosAuth.create("/api/admin/settings", carData, file);
      alert("차량이 성공적으로 등록되었습니다.");
      navigate("/admin/cars/settings");
    } catch (err) {
      console.error("등록 실패:", err);
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        navigate("/members/login");
      } else {
        alert(`등록 실패: ${err.response?.data?.message || "서버 오류"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.PageWrapper>
      <S.TitleSection>
        <h2>Cars Registration</h2>
        <p>운영할 차량의 제원 및 상세 정보를 등록하세요.</p>
      </S.TitleSection>

      <S.Container>
        <S.SectionTitle>
          <FaCar /> 기본 정보
        </S.SectionTitle>
        <S.FormGroup>
          <S.InputBox>
            <S.Label>Car Name</S.Label>
            <S.Input
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="예: 아이오닉 6"
            />
          </S.InputBox>
          <S.InputBox>
            <S.Label>Km (Driving)</S.Label>
            <S.Input
              type="number"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              placeholder="0"
            />
          </S.InputBox>
        </S.FormGroup>

        <S.FormGroup>
          <S.InputBox>
            <S.Label>Type (Size)</S.Label>
            <S.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="소형">소형</option>
              <option value="중형">중형</option>
              <option value="대형">대형</option>
            </S.Select>
          </S.InputBox>
          <S.InputBox>
            <S.Label>Seats (인승)</S.Label>
            <S.Input
              type="number"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              placeholder="0"
            />
          </S.InputBox>
        </S.FormGroup>

        <S.SectionTitle>
          <FaBatteryFull /> 성능 및 상세 제원
        </S.SectionTitle>
        <S.FormGroup>
          <S.InputBox>
            <S.Label>Battery (kWh)</S.Label>
            <S.Input
              type="number"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
              placeholder="0.0"
            />
          </S.InputBox>
          <S.InputBox>
            <S.Label>Efficiency (km/kWh)</S.Label>
            <S.Input
              type="number"
              step="0.1"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              placeholder="0.0"
            />
          </S.InputBox>
        </S.FormGroup>

        <S.FullWidthBox>
          <S.Label>Range (Auto Calculated)</S.Label>
          <S.RangeDisplay>
            <span className="val">{range}</span>
            <span className="unit">Km 주행 가능</span>
            <FaInfoCircle className="info-icon" />
          </S.RangeDisplay>
        </S.FullWidthBox>

        <S.FullWidthBox style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <S.Label style={{ margin: 0 }}>Car Description</S.Label>
            <S.ByteInfo $error={byteCount > 4000}>
              {byteCount} / 4000 Bytes
            </S.ByteInfo>
          </div>
          <S.TextArea
            value={carContent}
            onChange={handleContentChange}
            placeholder="차량의 옵션, 사고 유무, 관리 상태 등을 자유롭게 작성하세요."
            $error={byteCount > 4000}
          />
        </S.FullWidthBox>

        <S.SectionTitle style={{ marginTop: "30px" }}>
          <FaCloudUploadAlt /> 이미지 등록
        </S.SectionTitle>
        <S.UploadBox
          onClick={() => document.getElementById("carImgInput").click()}
          $hasPreview={!!preview}
        >
          <input
            type="file"
            id="carImgInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <div className="upload-placeholder">
              <FaCloudUploadAlt size={40} />
              <p>차량 이미지를 업로드하세요</p>
              <span>지원 형식: SVG, PNG, JPG</span>
            </div>
          )}
        </S.UploadBox>

        <S.ButtonGroup>
          <S.Button onClick={() => navigate(-1)}>Cancel</S.Button>
          <S.Button $primary onClick={handleSave} disabled={loading}>
            {loading ? "등록 중..." : "Register Car"}
          </S.Button>
        </S.ButtonGroup>
      </S.Container>
    </S.PageWrapper>
  );
};

export default CarsRegistration;
