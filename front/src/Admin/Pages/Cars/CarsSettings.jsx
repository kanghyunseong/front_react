import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTimes, FaPlus } from "react-icons/fa";
import * as S from "./CarsSettings.styles";
import { AuthContext } from "../../../context/AuthContext"; // AuthContext 경로 확인

const CarsSettings = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  // 1. 상태 변수 (백엔드 데이터 연동)
  const [cars, setCars] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // 2. [GET] 차량 목록 조회 함수
  const fetchCars = async (page) => {
    try {
      setLoading(true);
      // 백엔드 API 호출 (절대 경로 사용)
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
      alert("차량 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 3. useEffect (페이지 변경 시 조회)
  useEffect(() => {
    if (auth.accessToken) {
      fetchCars(currentPage);
    }
  }, [currentPage, auth.accessToken]);

  // 4. [DELETE] 차량 삭제 함수
  const handleDelete = async (carId) => {
    if (window.confirm("정말로 이 차량을 삭제하시겠습니까?")) {
      try {
        // 백엔드 API 호출 (삭제 API 경로 가정: /admin/api/settings/{carId})
        // ※ 백엔드 컨트롤러에 @DeleteMapping 추가 필요
        await axios.delete(
          `http://localhost:8081/admin/api/settings/${carId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );

        alert("차량이 삭제되었습니다.");
        fetchCars(currentPage); // 목록 새로고침
      } catch (err) {
        console.error("삭제 실패:", err);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  // 수정 페이지 이동
  const handleEditClick = (car) => {
    navigate("/admin/cars/edit", { state: { carData: car } });
  };

  // 등록 페이지 이동
  const handleAddClick = () => {
    navigate("/admin/cars/registration");
  };

  // 페이지네이션 버튼 배열 생성
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
          <FaPlus style={{ marginRight: "5px" }} /> 차량 추가
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

        {/* cars 배열 매핑 (DTO 필드명과 일치시켜야 함) */}
        {cars.map((car) => (
          <S.ListItem key={car.carId}>
            <S.CarInfo>
              <input type="checkbox" style={{ marginRight: "10px" }} />

              <S.CarImageContainer>
                {car.carImage ? (
                  // 이미지 경로가 상대경로라면 앞에 서버 주소를 붙여야 할 수도 있음
                  <img src={car.carImage} alt={car.carName} />
                ) : (
                  <div className="no-image">No Img</div>
                )}
              </S.CarImageContainer>

              <span>{car.carName}</span>
            </S.CarInfo>

            {/* DTO 필드명: carDriving, battery, carEfficiency, carStatus, carSize 등 */}
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

      {/* 페이지네이션 버튼 */}
      {pageInfo && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {/* (UserOverview와 동일한 스타일의 버튼 사용하시면 됩니다) */}
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
