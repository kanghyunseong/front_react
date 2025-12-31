import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as S from "./UserRanking.styles";
import { AuthContext } from "../../../context/AuthContext";

<<<<<<< HEAD

const RANKING_API_URL = "http://localhost:8081/admin/api/ranking/users";
=======
const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
const RANKING_API_URL = `${apiUrl}/api/admin/api/ranking/users`;
>>>>>>> 56355bf5bcecc4a203a44b67dda988ddc33893ae

const UserRanking = () => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth || !auth.accessToken) {
      setLoading(false);
      setError("로그인이 필요하거나, 인증 토큰이 유효하지 않습니다.");
      console.error("인증 토큰이 없습니다. 로그인 상태를 확인하십시오.");
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(RANKING_API_URL, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        let errorMessage = "사용자 랭킹 데이터 로딩 실패.";

        if (err.response) {
          if (err.response.status === 403) {
            errorMessage =
              "접근 권한이 없습니다. (403 Forbidden - 관리자 권한 필요)";
          } else if (err.response.status === 401) {
            errorMessage = "인증에 실패했습니다. (401 Unauthorized)";
          } else {
            errorMessage = `서버 오류: ${err.response.status}`;
          }
        } else if (err.request) {
          errorMessage =
            "서버로부터 응답을 받지 못했습니다. (네트워크/CORS 문제)";
        }

        setError(errorMessage);
        console.error("사용자 랭킹 데이터 로딩 실패:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [auth]);

  if (loading) {
    return (
      <div style={{ padding: "30px", textAlign: "center", color: "#6B4CE6" }}>
                <p>사용자 랭킹 데이터를 불러오는 중입니다...</p>      {" "}
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "30px",
          textAlign: "center",
          color: "#E64C6B",
          border: "1px solid #E64C6B",
          margin: "20px",
        }}
      >
        <p>⚠️ 데이터 로드 실패: {error}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div style={{ padding: "30px", textAlign: "center", color: "#999" }}>
        <p>조회된 사용자 랭킹 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <S.Container>
      <S.TitleArea>
        <h2>Environments / User Ranking</h2>
      </S.TitleArea>
      <S.TableCard>
        <S.TableTitle>User Ranking</S.TableTitle>
        <S.TableDesc>Environments Ranking</S.TableDesc>
        <S.Table>
          <thead>
            <tr>
              <th>순위</th>
              <th>이름</th>              <th>예약 횟수 (회)</th>
              <th>총 이용 시간 (시간)</th>
              <th>우수 반납률 (%)</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.reservationCount}</td>
                <td>
                  {user.totalUsageHours ? user.totalUsageHours.toFixed(1) : 0} 
                </td>
                <td>
                  {user.onTimeReturnRate ? user.onTimeReturnRate.toFixed(1) : 0}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.TableCard>
    </S.Container>
  );
};

export default UserRanking;
