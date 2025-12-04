import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTimes, FaPlus } from "react-icons/fa";
import * as S from "./CarsSettings.styles";
import { AuthContext } from "../../../context/AuthContext";

const CarsSettings = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [cars, setCars] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchCars = async (page) => {
    if (!auth || !auth.accessToken) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8081/admin/api/settings?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      setCars(response.data.cars);
      setPageInfo(response.data.pageInfo);
    } catch (err) {
      console.error("차량 목록 조회 실패:", err);

      if (
        (err.response && err.response.status === 401) ||
        err.response.status === 403
      ) {
        alert(
          "세션이 만료되었거나 접근 권한이 없습니다. 로그인 페이지로 이동합니다."
        );
        navigate("/login");
      } else {
        alert("차량 목록을 불러오는데 실패했습니다.");
        setCars([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.accessToken) {
      fetchCars(currentPage);
    }
  }, [currentPage, auth.accessToken]);

  const handleDelete = async (carId) => {
    const token = auth.accessToken;
    if (!token) {
      alert("인증 정보가 없어 삭제할 수 없습니다.");
      navigate("/login");
      return;
    }

    if (window.confirm("정말로 이 차량을 삭제하시겠습니까?")) {
      try {
        setLoading(true);
        await axios.delete(
          `http://localhost:8081/admin/api/settings/${carId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );

        alert("차량이 삭제되었습니다.");
        fetchCars(currentPage);
      } catch (err) {
        console.error("삭제 실패:", err);
        if (err.response) {
          const status = err.response.status;
          const serverMsg =
            err.response.data.message || "서버에서 오류가 발생했습니다.";

          if (status === 404) {
            alert(
              `삭제 실패: ${serverMsg} (이미 삭제되었거나 ID를 찾을 수 없습니다.)`
            );
          } else if (status === 401 || status === 403) {
            alert("권한 오류: 로그인 페이지로 이동합니다.");
            navigate("/login");
          } else if (status === 409) {
            alert(
              `삭제 불가: ${serverMsg} (해당 차량에 예약 내역이 존재합니다.)`
            );
          } else {
            alert(`삭제 실패: ${serverMsg}`);
          }
        } else {
          alert("네트워크 오류로 삭제 요청에 실패했습니다.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (car) => {
    navigate(`/admin/cars/edit/${car.carId}`, { state: { carData: car } });
  };

  const handleAddClick = () => {
    navigate("/admin/cars/registration");
  };

  const pageNumbers = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumbers.push(i);
    }
  }
  if (loading && !cars.length) return <div>Loading...</div>;
  return (
    <div>
      <h2 style={{ marginBottom: "10px", color: "#6B4CE6" }}>
        Cars / Cars Settings
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: 0 }}>Enumeration</h3>
        <S.AddButton onClick={handleAddClick}>
          <FaPlus style={{ marginRight: "5px" }} />
          차량 추가
        </S.AddButton>
      </div>

      <S.ListContainer>
        <S.ListHeader>
          <div style={{ flex: 2 }}>차종</div>
          <div style={{ flex: 1 }}>주행거리</div>
          <div style={{ flex: 1 }}>배터리용량</div>
          <div style={{ flex: 1 }}>전비</div>
          <div style={{ flex: 1 }}>상태</div>
          <div style={{ flex: 1 }}>타입</div>
          <div style={{ width: "100px" }}>관리</div>
        </S.ListHeader>

        {cars.map((car) => (
          <S.ListItem key={car.carId}>
            <S.CarInfo>
              <input type="checkbox" style={{ marginRight: "10px" }} />

              <S.CarImageContainer>
                {car.carImage ? (
                  <img src={car.carImage} alt={car.carName} />
                ) : (
                  <div className="no-image">No Img</div>
                )}
              </S.CarImageContainer>

              <span>{car.carName}</span>
            </S.CarInfo>

            <S.InfoText>{car.carDriving} Km</S.InfoText>
            <S.InfoText>{car.battery} kWh</S.InfoText>
            <S.InfoText>{car.carEfficiency} km/kWh</S.InfoText>
            <S.InfoText>{car.carStatus}</S.InfoText>
            <S.InfoText>{car.carSize}</S.InfoText>

            <S.ActionGroup>
              <S.EditButton onClick={() => handleEditClick(car)}>
                수정하기
              </S.EditButton>
              <S.DeleteButton onClick={() => handleDelete(car.carId)}>
                <FaTimes />
              </S.DeleteButton>
            </S.ActionGroup>
          </S.ListItem>
        ))}
      </S.ListContainer>

      {pageInfo && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              style={{
                margin: "0 5px",
                fontWeight: num === currentPage ? "bold" : "normal",
              }}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsSettings;
