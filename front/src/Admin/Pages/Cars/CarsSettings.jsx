import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTrashAlt,
  FaPlus,
  FaEdit,
  FaCar,
  FaCheckCircle,
  FaExclamationCircle,
  FaTools,
} from "react-icons/fa";
import * as S from "./CarsSettings.styles";
import { AuthContext } from "../../../context/AuthContext";
import { axiosAuth } from "../../../api/reqService";

const CarsSettings = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [cars, setCars] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  const fetchCars = async (page) => {
    try {
      setLoading(true);
      const response = await axiosAuth.getActual(
        `/api/admin/settings?page=${page}&limit=10`
      );

      if (response) {
        setCars(response.cars || []);
        setPageInfo(response.pageInfo || null);
      }
    } catch (error) {
      console.error("차량 목록 조회 실패:", error);
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        alert("세션이 만료되었거나 접근 권한이 없습니다.");
        navigate("/members/login");
      } else {
        alert("데이터를 불러오는 데 실패했습니다.");
        setCars([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.accessToken) {
      fetchCars(currentPage);
    }
  }, [currentPage, auth?.accessToken]);

  const handleDelete = async (carId) => {
    if (!window.confirm("정말로 이 차량을 삭제하시겠습니까?")) return;

    try {
      setLoading(true);
      const response = await axiosAuth.delete(`/api/admin/settings`, carId);
      alert(response.message || "차량이 삭제되었습니다.");
      fetchCars(currentPage);
    } catch (err) {
      console.error("삭제 실패:", err);
      const status = err.response?.status;
      const serverMsg =
        err.response?.data?.message || "서버 오류가 발생했습니다.";

      if (status === 409) {
        alert(`삭제 불가: ${serverMsg} (예약 내역이 존재합니다.)`);
      } else {
        alert(`삭제 실패: ${serverMsg}`);
      }
    } finally {
      setLoading(false);
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "Y":
        return (
          <S.StatusTag $type="ready">
            <FaCheckCircle /> 대기중
          </S.StatusTag>
        );
      case "N":
        return (
          <S.StatusTag $type="using">
            <FaExclamationCircle /> 이용중
          </S.StatusTag>
        );
      default:
        return (
          <S.StatusTag $type="repair">
            <FaTools /> 정비중
          </S.StatusTag>
        );
    }
  };

  return (
    <S.PageContainer>
      <S.HeaderSection>
        <S.TitleBlock>
          <h2>Vehicle Management</h2>
          <p>등록된 모든 차량 리스트를 관리하고 상태를 확인합니다.</p>
        </S.TitleBlock>
        <S.AddButton onClick={handleAddClick}>
          <FaPlus /> 신규 차량 등록
        </S.AddButton>
      </S.HeaderSection>

      <S.ContentCard>
        <S.ListHeader>
          <div className="col-info">차량 정보</div>
          <div className="col-data">주행거리</div>
          <div className="col-data">배터리/전비</div>
          <div className="col-status">상태</div>
          <div className="col-size">타입</div>
          <div className="col-action">관리</div>
        </S.ListHeader>

        {loading && !cars.length ? (
          <S.EmptyWrapper>데이터를 불러오는 중입니다...</S.EmptyWrapper>
        ) : cars.length > 0 ? (
          cars.map((car) => (
            <S.ListItem key={car.carId}>
              <div className="col-info">
                <S.CarProfile>
                  {car.carImage ? (
                    <img src={car.carImage} alt={car.carName} />
                  ) : (
                    <div className="no-image">
                      <FaCar />
                    </div>
                  )}
                </S.CarProfile>
                <S.CarNameBlock>
                  <span className="name">{car.carName}</span>
                  <span className="id">ID: {car.carId}</span>
                </S.CarNameBlock>
              </div>

              <div className="col-data">
                <S.DataLabel>
                  {Number(car.carDriving).toLocaleString()} Km
                </S.DataLabel>
              </div>

              <div className="col-data">
                <S.DataSubText>{car.battery} kWh</S.DataSubText>
                <S.DataSubText className="light">
                  {car.carEfficiency} km/kWh
                </S.DataSubText>
              </div>

              <div className="col-status">{getStatusBadge(car.carStatus)}</div>

              <div className="col-size">
                <S.SizeBadge>{car.carSize}</S.SizeBadge>
              </div>

              <div className="col-action">
                <S.ActionButton
                  className="edit"
                  onClick={() => handleEditClick(car)}
                  title="수정"
                >
                  <FaEdit />
                </S.ActionButton>
                <S.ActionButton
                  className="delete"
                  onClick={() => handleDelete(car.carId)}
                  title="삭제"
                >
                  <FaTrashAlt />
                </S.ActionButton>
              </div>
            </S.ListItem>
          ))
        ) : (
          <S.EmptyWrapper>등록된 차량 데이터가 없습니다.</S.EmptyWrapper>
        )}
      </S.ContentCard>

      {pageNumbers.length > 0 && (
        <S.Pagination>
          {pageNumbers.map((num) => (
            <S.PageBtn
              key={num}
              $active={num === currentPage}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </S.PageBtn>
          ))}
        </S.Pagination>
      )}
    </S.PageContainer>
  );
};

export default CarsSettings;
