// 1. useContext 임포트
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as S from "./UserOverview.styles";
import { AuthContext } from "../../../context/AuthContext";

const UserOverview = () => {
  // --- 상태 변수 ---
  const [users, setUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. AuthContext에서 인증 정보 가져오기 (BoardDetail.jsx와 동일)
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:8081/admin/api/users?page=${page}`);
  });

  // 4. API 호출 함수 (삭제 후 재사용을 위해 useEffect 밖으로 분리)
  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      setError(null);

      console.log("API 요청 직전 currentPage 값:", page);

      // 5. [패턴 적용] axios.get 요청에 Authorization 헤더 추가
      // (BoardDetail의 delete 요청처럼)
      const response = await axios.get(
        `http://localhost:8081/admin/api/users?page=${page}`,
        {
          /*
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          */
        }
      );

      setUsers(response.data.users);
      setPageInfo(response.data.pageInfo);
    } catch (err) {
      // 401(인증 실패) 또는 403(권한 없음) 에러가 여기서 잡힘
      console.error("User 데이터를 가져오는 데 실패했습니다.", err);
      setError("데이터를 불러오는데 실패했거나 권한이 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 6. useEffect: 'currentPage' 또는 'auth.accessToken'이 변경될 때 API 호출
  useEffect(() => {
    // auth.accessToken이 준비된(로그인된) 상태일 때만 API 호출
    if (auth.accessToken) {
      fetchUsers(currentPage);
    } else {
      // 토큰이 없으면 로딩 멈추고 에러 메시지 표시
      setLoading(false);
      setError("로그인이 필요합니다.");
    }
  }, [currentPage, auth.accessToken]); // auth.accessToken을 의존성에 추가

  // 7. [패턴 적용] 삭제 핸들러 (BoardDetail.jsx와 거의 동일)
  const handleDelete = async (userNo) => {
    // (BoardDetail.jsx의 confirm과 동일)
    if (window.confirm("정말로 이 사용자를 삭제(혹은 비활성화)하시겠습니까?")) {
      try {
        // [핵심] axios.delete에 Authorization 헤더 적용
        // (Controller의 @DeleteMapping("/admin/users")를 호출한다고 가정)
        await axios.delete(`http://localhost:8081/admin/api/users/${userNo}`, {
          /*
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          */
        });

        alert("사용자가 삭제되었습니다.");

        // [데이터 새로고침]
        // 삭제 성공 후, 목록을 다시 불러옵니다.
        // (BoardDetail처럼 5초 뒤 navi(-1) 하는 대신, 목록을 새로고침)
        fetchUsers(currentPage);
      } catch (err) {
        console.error("삭제 실패:", err);
        alert("삭제에 실패했습니다. 권한을 확인하세요.");
      }
    }
  };

  // --- 페이지네이션 버튼 렌더링 ---
  const pageNumbers = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumbers.push(i);
    }
  }

  // --- 렌더링 로직 (로딩/에러 처리) ---

  if (loading) {
    // 로딩 중이거나 (pageInfo가 아직 null일 때)
    return (
      <S.Container>
        <S.TitleArea>
          <h2>Users / Overview</h2>
        </S.TitleArea>
        <S.TableCard>
          <div>Loading users...</div>
        </S.TableCard>
      </S.Container>
    );
  }

  if (error) {
    // 에러 발생 시 (로그인 필요 등)
    return (
      <S.Container>
        <S.TitleArea>
          <h2>Users / Overview</h2>
        </S.TitleArea>
        <S.TableCard>
          <div style={{ color: "red" }}>{error}</div>
        </S.TableCard>
      </S.Container>
    );
  }

  // pageInfo가 로드되지 않았으면 (예: auth.accessToken이 아직 없는 초기 상태)
  if (!pageInfo) {
    return null;
  }

  // --- 정상 렌더링 ---
  return (
    <S.Container>
      <S.TitleArea>
        <h2>Users / Overview</h2>
      </S.TitleArea>
      <S.TableCard>
        {/* ... (테이블 상단 생략) ... */}
        <S.Table>
          <thead>{/* ... (thead 생략) ... */}</thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userNo}>
                {/* ... (td: userName, email, birthday, enrollDate) ... */}
                <td>
                  <S.UserInfo>
                    <span>{user.userName}</span>
                  </S.UserInfo>
                </td>
                <td>{user.email}</td>
                <td>{user.birthday}</td>
                <td>{user.enrollDate}</td>

                {/* 8. [패턴 적용] "삭제하기" 버튼에 onClick 이벤트 연결 */}
                <td>
                  <S.DeleteButton onClick={() => handleDelete(user.userNo)}>
                    삭제하기
                  </S.DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>

        {/* --- 페이징 버튼 UI (서버 데이터 기준) --- */}
        <S.PaginationContainer>
          <S.PageButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Prev
          </S.PageButton>
          {pageNumbers.map((number) => (
            <S.PageButton
              key={number}
              onClick={() => setCurrentPage(number)}
              $active={number === pageInfo.currentPage}
            >
              {number}
            </S.PageButton>
          ))}
          <S.PageButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageInfo.maxPage}
          >
            Next &gt;
          </S.PageButton>
        </S.PaginationContainer>
      </S.TableCard>
    </S.Container>
  );
};

export default UserOverview;
