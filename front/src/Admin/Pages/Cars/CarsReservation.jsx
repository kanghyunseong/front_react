import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext"; // ⚠️ 경로 확인
import * as S from "./CarsReservation.styles";

const StatusBadge = ({ status }) => {
  let bgColor = "#9CA3AF";

  switch (status) {
    case "이용중":
      bgColor = "#10B981";
      break;
    case "연체중":
      bgColor = "#EF4444";
      break;
    case "예약완료":
      bgColor = "#3B82F6";
      break;
    case "반납완료":
      bgColor = "#6B7280";
      break;
    case "취소됨":
      bgColor = "#FCA5A5";
      break;
    default:
      bgColor = "#9CA3AF";
  }

  const styles = {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: bgColor,
    minWidth: "60px",
    display: "inline-block",
    textAlign: "center",
  };

  return <span style={styles}>{status}</span>;
};

const CarsReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { auth } = useContext(AuthContext);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  useEffect(() => {
    const fetchReservations = async () => {
      if (!auth || !auth.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${apiUrl}/admin/api/settings/reservations`,
          { headers: { Authorization: `Bearer ${auth.accessToken}` } }
        );
        setReservations(response.data);
      } catch (error) {
        console.error("예약 목록 로딩 실패:", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          alert("세션이 만료되었습니다. 로그인 페이지로 이동합니다.");
        } else {
          alert(
            "예약 목록을 불러오는 데 실패했습니다. 서버 상태를 확인해주세요."
          );
          setReservations([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [auth]);

  const filteredReservations = reservations.filter(
    (res) =>
      res.customer.includes(searchTerm) ||
      res.car.includes(searchTerm) ||
      res.userId.includes(searchTerm)
  );

  const handleCancel = async (reservationNo) => {
    if (!reservationNo) {
      alert("취소 요청 ID가 유효하지 않습니다.");
      return;
    }
    if (!window.confirm(`예약번호 ${reservationNo}를 정말 취소하시겠습니까?`)) {
      return;
    }

    const token = auth?.accessToken;
    if (!token) {
      alert("인증 토큰이 유효하지 않아 취소할 수 없습니다.");
      return;
    }

    try {
      const apiUrl = `${apiUrl}/admin/api/settings/reservations/${String(
        reservationNo
      )}/cancel`;
      const response = await axios.put(
        apiUrl,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200 || response.status === 204) {
        setReservations((prevReservations) =>
          prevReservations.map((res) =>
            res.reservationNo === reservationNo
              ? { ...res, status: "취소됨" }
              : res
          )
        );
        alert(`예약번호 ${reservationNo}가 성공적으로 취소되었습니다.`);
      } else {
        alert(`취소 요청은 성공했으나 상태 업데이트에 문제가 발생했습니다.`);
      }
    } catch (error) {
      console.error("예약 취소 실패:", error);
      if (error.response) {
        const status = error.response.status;
        const serverMsg =
          error.response.data.message || error.response.data || "서버 오류";

        if (status === 404) {
          alert(`취소 실패: ${serverMsg}`);
        } else if (status === 401 || status === 403) {
          alert("권한이 없거나 세션이 만료되었습니다.");
          navigate("/members/login");
        } else if (status >= 500) {
          // 서버 내부 오류 (500)
          alert(
            `취소 처리 중 치명적인 서버 오류가 발생했습니다. (관리자 문의)`
          );
        } else {
          alert(`취소 처리 중 오류가 발생했습니다. (오류: ${serverMsg})`);
        }
      } else {
        alert(`네트워크 오류로 취소 요청에 실패했습니다.`);
      }
      const errorMessage =
        error.response?.data?.message || error.response?.data || error.message;
      alert(`취소 처리 중 오류가 발생했습니다. (오류 메시지: ${errorMessage})`);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#6B4CE6", margin: 0 }}>Reservation List</h2>

        <input
          type="text"
          placeholder="고객명, 차량, ID 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            width: "250px",
          }}
        />
      </div>

      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Cars</th>
              <th>UserId</th>
              <th>Phone</th>
              <th>Period</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#666",
                  }}
                >
                  데이터를 불러오는 중입니다...
                </td>
              </tr>
            ) : filteredReservations.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#888",
                  }}
                >
                  {searchTerm
                    ? "검색 결과가 없습니다."
                    : "예약 내역이 없습니다."}
                </td>
              </tr>
            ) : (
              filteredReservations.map((res, index) => (
                <tr key={res.reservationNo || index}>
                  <td>
                    <S.CustomerName>{res.customer}</S.CustomerName>
                    <S.CustomerSub>
                      {res.affiliation || "khacademy"}
                    </S.CustomerSub>
                  </td>
                  <td>{res.car}</td>
                  <td>{res.userId}</td>
                  <td>{res.phone}</td>
                  <td>
                    <div style={{ fontSize: "13px", fontWeight: "500" }}>
                      {res.start}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      ~ {res.end}
                    </div>
                  </td>

                  <td>
                    <StatusBadge status={res.status} />
                  </td>

                  <td>
                    {res.status === "예약완료" ? (
                      <button
                        onClick={() => handleCancel(res.reservationNo)}
                        style={{
                          border: "1px solid #EF4444",
                          color: "#EF4444",
                          background: "white",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        취소
                      </button>
                    ) : (
                      <span style={{ color: "#ccc", fontSize: "12px" }}>-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </S.Table>
      </S.TableContainer>
    </div>
  );
};

export default CarsReservation;
