import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaInfoCircle,
  FaCar,
  FaBatteryFull,
  FaArrowLeft,
  FaEdit,
} from "react-icons/fa";
import axios from "axios";
import * as S from "./CarEdit.styles";
import { AuthContext } from "../../../context/AuthContext";
import { axiosAuth } from "../../../api/reqService";

const CarsEdit = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { carId } = useParams();

  const [formData, setFormData] = useState({
    carName: "",
    km: "",
    type: "소형",
    battery: "",
    efficiency: "",
    seats: "",
    carContent: "",
  });

  const [range, setRange] = useState("0");
  const [byteCount, setByteCount] = useState(0);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  const getByteLength = useCallback((s) => {
    if (!s) return 0;
    return s.split("").reduce((acc, char) => {
      const code = char.charCodeAt(0);
      return acc + (code >> 7 ? 3 : 1);
    }, 0);
  }, []);

  useEffect(() => {
    if (!carId || !auth?.accessToken) return;

    const fetchCarData = async () => {
      try {
        setLoading(true);
        const response = await axiosAuth.getList(
          `/api/admin/settings/${carId}`
        );
        const data = response.data;

        setFormData({
          carName: data.carName || "",
          km: data.carDriving?.toString() || "",
          type: data.carSize || "소형",
          battery: data.battery?.toString() || "",
          efficiency: data.carEfficiency?.toString() || "",
          seats: data.carSeet?.toString() || "",
          carContent: data.carContent || "",
        });

        setByteCount(getByteLength(data.carContent || ""));

        const dbImage = data.carImage || data.CARIMAGE;
        if (dbImage) {
          setPreview(
            dbImage.startsWith("http")
              ? dbImage
              : `${apiUrl}/uploads/${dbImage}`
          );
        }
      } catch (err) {
        alert("정보를 불러올 수 없습니다.");
        navigate("/admin/cars/settings");
      } finally {
        setTimeout(() => setLoading(false), 500); // 부드러운 전환을 위한 아주 짧은 지연
      }
    };

    fetchCarData();
  }, [carId, auth, navigate, apiUrl, getByteLength]);

  useEffect(() => {
    const bat = parseFloat(formData.battery);
    const eff = parseFloat(formData.efficiency);
    if (!isNaN(bat) && !isNaN(eff) && bat > 0 && eff > 0) {
      setRange(Math.round(bat * eff).toLocaleString());
    } else {
      setRange("0");
    }
  }, [formData.battery, formData.efficiency]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "carContent") {
      const currentByte = getByteLength(value);
      if (currentByte > 4000) return;
      setByteCount(currentByte);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    if (!formData.carName || !formData.carContent)
      return alert("필수 항목을 모두 입력해주세요.");

    const submitData = new FormData();

    // 데이터 정제 및 매핑
    Object.entries(formData).forEach(([key, value]) => {
      let fieldName = key;

      // 서버 전달용 필드명 변환 로직
      switch (key) {
        case "km":
          fieldName = "carDriving";
          break;
        case "seats":
          fieldName = "carSeet";
          break;
        case "type":
          fieldName = "carSize";
          break;
        case "efficiency":
          fieldName = "carEfficiency";
          break; // 이 부분이 핵심
        default:
          fieldName = key;
      }

      // null 값 방지 (기본값 0 처리)
      const processedValue = value === "" || value === null ? "0" : value;
      submitData.append(fieldName, processedValue);
    });

    submitData.append("carId", carId);
    if (file) submitData.append("file", file);

    try {
      await axios.put(`${apiUrl}/api/admin/settings/update`, submitData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("차량 정보가 성공적으로 수정되었습니다.");
      navigate("/admin/cars/settings");
    } catch (err) {
      console.error("수정 중 오류 발생:", err);
      alert(err.response?.data?.message || "수정에 실패했습니다.");
    }
  };

  if (loading)
    return <S.LoadingWrapper>차량 정보를 불러오는 중입니다</S.LoadingWrapper>;

  return (
    <S.PageWrapper>
      <S.TitleSection>
        <div className="back-nav" onClick={() => navigate(-1)}>
          <FaArrowLeft /> 돌아가기
        </div>
        <h2>
          Edit Vehicle <span>(ID: {carId})</span>
        </h2>
        <p>차량 정보를 정확하게 수정하여 관리 효율을 높이세요.</p>
      </S.TitleSection>

      <S.Container>
        <S.SectionTitle>
          <FaCar /> 기본 정보
        </S.SectionTitle>
        <S.FormGroup>
          <S.InputBox>
            <S.Label>Car Name</S.Label>
            <S.Input
              name="carName"
              placeholder="예: 아이오닉 5"
              value={formData.carName}
              onChange={handleChange}
            />
          </S.InputBox>
          <S.InputBox>
            <S.Label>Km (Driving)</S.Label>
            <S.Input
              type="number"
              name="km"
              placeholder="누적 주행거리"
              value={formData.km}
              onChange={handleChange}
            />
          </S.InputBox>
        </S.FormGroup>

        <S.FormGroup>
          <S.InputBox>
            <S.Label>Type (Size)</S.Label>
            <S.Select name="type" value={formData.type} onChange={handleChange}>
              <option value="소형">소형</option>
              <option value="중형">중형</option>
              <option value="대형">대형</option>
            </S.Select>
          </S.InputBox>
          <S.InputBox>
            <S.Label>Seats (인승)</S.Label>
            <S.Input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
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
              name="battery"
              value={formData.battery}
              onChange={handleChange}
            />
          </S.InputBox>
          <S.InputBox>
            <S.Label>Efficiency (km/kWh)</S.Label>
            <S.Input
              type="number"
              step="0.1"
              name="efficiency"
              value={formData.efficiency}
              onChange={handleChange}
            />
          </S.InputBox>
        </S.FormGroup>

        <S.FullWidthBox>
          <S.Label>Range (Auto Calculated)</S.Label>
          <S.RangeDisplay>
            <span className="val">{range}</span>
            <span className="unit">Km 주행 가능</span>
            <FaInfoCircle
              className="info-icon"
              title="배터리 용량 × 전비로 계산된 수치입니다."
            />
          </S.RangeDisplay>
        </S.FullWidthBox>

        <S.FullWidthBox style={{ marginTop: "32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <S.Label>
              <FaEdit style={{ marginRight: "6px" }} /> Car Description
            </S.Label>
            <S.ByteInfo $error={byteCount > 3800}>
              <strong>{byteCount.toLocaleString()}</strong> / 4,000 Bytes
            </S.ByteInfo>
          </div>
          <S.TextArea
            name="carContent"
            placeholder="차량의 상세 특징과 옵션 정보를 입력해주세요."
            value={formData.carContent}
            onChange={handleChange}
            $error={byteCount > 3800}
          />
        </S.FullWidthBox>

        <S.SectionTitle style={{ marginTop: "40px" }}>
          <FaCloudUploadAlt /> 이미지 관리
        </S.SectionTitle>
        <S.UploadBox
          onClick={() => document.getElementById("carImgInput").click()}
        >
          <input
            type="file"
            id="carImgInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          {preview ? (
            <div className="preview-container">
              <img src={preview} alt="preview" />
              <div className="overlay">클릭하여 이미지 교체</div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <FaCloudUploadAlt />
              <p>차량 이미지 업로드</p>
              <span>권장 사이즈: 1200 x 800 (px)</span>
            </div>
          )}
        </S.UploadBox>

        <S.ButtonGroup>
          <S.Button onClick={() => navigate(-1)}>Cancel</S.Button>
          <S.Button $primary onClick={handleSave}>
            Update Changes
          </S.Button>
        </S.ButtonGroup>
      </S.Container>
    </S.PageWrapper>
  );
};

export default CarsEdit;
