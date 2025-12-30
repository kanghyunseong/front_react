import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import * as S from "./CarEdit.styles";
import { AuthContext } from "../../../context/AuthContext";

const CarsEdit = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { carId } = useParams();

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
  const [loading, setLoading] = useState(true);
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
      return; // 입력 막기
    }
    setCarContent(val);
    setByteCount(currentByte);
  };

  useEffect(() => {
    if (!carId) return;
    if (!auth || !auth.accessToken) return;

    setLoading(true);

    axios
      .get(`${apiUrl}/api/admin/api/settings/${carId}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((response) => {
        const data = response.data;

        setCarName(data.carName || "");
        setKm(data.carDriving != null ? String(data.carDriving) : "");
        setType(data.carSize || "소형");
        setBattery(data.battery != null ? String(data.battery) : "");
        setEfficiency(
          data.carEfficiency != null ? String(data.carEfficiency) : ""
        );
        setSeats(data.carSeet != null ? String(data.carSeet) : "");
        const content = data.carContent || "";
        setCarContent(content);
        setByteCount(getByteLength(content));
        const bat = data.battery != null ? parseFloat(data.battery) : 0;
        const eff =
          data.carEfficiency != null ? parseFloat(data.carEfficiency) : 0;
        if (bat > 0 && eff > 0) {
          setRange(String(Math.round(bat * eff)));
        } else {
          setRange("0");
        }

        const dbImage = data.carImage || data.CARIMAGE;
        if (dbImage) {
          setPreview(`${apiUrl}/uploads/${dbImage}`);
        }
      })
      .catch((err) => {
        console.error("❌ 상세 정보 로딩 실패:", err);
        if (err.response && err.response.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
          navigate("/api/members/login");
        } else if (err.response && err.response.status === 404) {
          alert("요청한 차량 정보를 찾을 수 없습니다.");
          navigate("/api/admin/cars/settings");
        } else {
          alert("차량 정보를 불러올 수 없거나 권한이 없습니다.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [carId, auth]);

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

  const handleSave = () => {
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

    if (!carName || !carContent || getByteLength(carContent) > 4000) {
      alert("입력값을 확인해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("carName", carName);
    formData.append("carDriving", km || "0");
    formData.append("carSize", type || "소형");
    formData.append("battery", battery || "0");
    formData.append("carEfficiency", efficiency || "0");
    formData.append("carSeet", seats || "0");
    formData.append("carId", carId);
    formData.append("carContent", carContent);

    if (file) {
      formData.append("file", file);
    }

    axios
      .put(`${apiUrl}/api/admin/api/settings/update`, formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("차량 정보가 수정되었습니다.");
        navigate("/admin/cars/settings");
      })
      .catch((err) => {
        console.error("수정 실패:", err);

        if (err.response) {
          const status = err.response.status;
          if (status === 401 || status === 403) {
            alert("권한이 없거나 세션이 만료되었습니다.");
            navigate("/members/login");
          } else if (status === 404) {
            alert("수정할 차량 정보를 찾을 수 없습니다.");
          } else {
            alert("수정 중 오류가 발생!");
          }
        } else {
          alert("수정에 실패했습니다.");
        }
      });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div style={{ padding: "30px", textAlign: "center", color: "#6B4CE6" }}>
        <p>차량 정보를 불러오는 중입니다...</p>
        <p>잠시만 기다려주세요.</p>
      </div>
    );
  }

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

        <S.FormGroup>
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <S.Label style={{ marginBottom: 0 }}>Car Description</S.Label>
            </div>

            <S.TextArea
              value={carContent}
              onChange={handleContentChange}
              placeholder="차량에 대한 상세 설명을 입력하세요."
              $error={byteCount > 4000}
            />

            <S.ByteInfo $error={byteCount > 4000}>
              {byteCount} / 4000 Bytes
            </S.ByteInfo>

            {byteCount > 4000 && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                작성 가능한 용량을 초과했습니다. 내용을 줄여주세요.
              </p>
            )}
          </div>
        </S.FormGroup>

        <div style={{ marginBottom: "20px" }}>
          <S.Label>Seats (인승)</S.Label>
          <S.Input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            placeholder="5"
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
