import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import * as S from "./CarsReservation.styles";
import { axiosAuth } from "../../../api/reqService";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaCalendarAlt,
  FaPhoneAlt,
  FaUser,
  FaCarSide,
} from "react-icons/fa";

const STATUS_COLORS = {
  이용중: { bg: "#ECFDF5", text: "#10B981", border: "#10B981" },
  연체중: { bg: "#FEF2F2", text: "#EF4444", border: "#EF4444" },
  예약완료: { bg: "#EFF6FF", text: "#3B82F6", border: "#3B82F6" },
  반납완료: { bg: "#F3F4F6", text: "#6B7280", border: "#D1D5DB" },
  취소됨: { bg: "#FFF7ED", text: "#F97316", border: "#FFEDD5" },
  default: { bg: "#F9FAFB", text: "#9CA3AF", border: "#E5E7EB" },
};

const StatusBadge = ({ status }) => {
  const style = STATUS_COLORS[status] || STATUS_COLORS.default;
  return (
    <S.Badge
      $bgColor={style.bg}
      $textColor={style.text}
      $borderColor={style.border}
    >
      {status}
    </S.Badge>
  );
};

const CarsReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      if (!auth?.accessToken) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axiosAuth.getActual(
          `/api/admin/settings/reservations`
        );
        setReservations(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("예약 목록 로딩 실패:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/members/login");
        } else {
          setReservations([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [auth, navigate]);

  const filteredReservations = reservations.filter(
    (res) =>
      res.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.car?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.userId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancel = async (reservationNo) => {
    if (!reservationNo) return;
    if (!window.confirm(`예약번호 ${reservationNo}를 정말 취소하시겠습니까?`))
      return;

    try {
      await axiosAuth.put(
        `/api/admin/settings/reservations/${reservationNo}/cancel`
      );
      setReservations((prev) =>
        prev.map((res) =>
          res.reservationNo === reservationNo
            ? { ...res, status: "취소됨" }
            : res
        )
      );
      alert(`예약번호 ${reservationNo}가 취소되었습니다.`);
    } catch (error) {
      alert(`취소 실패: ${error.response?.data?.message || "오류 발생"}`);
    }
  };

  return (
    <S.Container>
      <S.HeaderSection>
        <S.TitleGroup>
          <h2>Reservation Management</h2>
          <p>차량 예약 및 이용 현황을 통합 관리합니다.</p>
        </S.TitleGroup>
        <S.SearchWrapper>
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="고객명, 차량명, ID 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.SearchWrapper>
      </S.HeaderSection>

      <S.TableContainer>
        <S.StyledTable>
          <thead>
            <tr>
              <th>
                <FaUser className="th-icon" />
                Customer
              </th>
              <th>
                <FaCarSide className="th-icon" />
                Car Info
              </th>
              <th>Contact</th>
              <th>
                <FaCalendarAlt className="th-icon" />
                Period
              </th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">
                  <S.StateMessage>데이터 로딩 중...</S.StateMessage>
                </td>
              </tr>
            ) : filteredReservations.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <S.StateMessage>조회된 내역이 없습니다.</S.StateMessage>
                </td>
              </tr>
            ) : (
              filteredReservations.map((res) => (
                <tr key={res.reservationNo}>
                  <td>
                    <S.CustomerInfo>
                      <span className="name">{res.customer}</span>
                      <span className="id">{res.userId}</span>
                    </S.CustomerInfo>
                  </td>
                  <td>
                    <S.CarInfo>
                      <span className="car-name">{res.car}</span>
                      <span className="tag">
                        {res.affiliation || "khacademy"}
                      </span>
                    </S.CarInfo>
                  </td>
                  <td>
                    <S.ContactInfo>
                      <FaPhoneAlt size={11} /> {res.phone}
                    </S.ContactInfo>
                  </td>
                  <td>
                    <S.PeriodInfo>
                      <div className="start">{res.start}</div>
                      <div className="end">~ {res.end}</div>
                    </S.PeriodInfo>
                  </td>
                  <td>
                    <StatusBadge status={res.status} />
                  </td>
                  <td>
                    {["예약완료", "연체중"].includes(res.status) ? (
                      <S.CancelButton
                        onClick={() => handleCancel(res.reservationNo)}
                      >
                        예약 취소
                      </S.CancelButton>
                    ) : (
                      <S.DisabledText>-</S.DisabledText>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </S.StyledTable>
      </S.TableContainer>
    </S.Container>
  );
};

export default CarsReservation;
