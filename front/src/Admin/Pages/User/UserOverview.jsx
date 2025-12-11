import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // 1. useNavigate 임포트
import axios from "axios";
import * as S from "./UserOverview.styles";
import { AuthContext } from "../../../context/AuthContext";

const UserOverview = () => {
  const navigate = useNavigate(); // 2. navigate 훅 초기화
  const { auth } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // [GET] 목록 조회
  const fetchUsers = (page) => {
    setLoading(true);
    setError(null);
    console.log("API 요청 직전 currentPage 값:", page);

    axios
      .get(`http://localhost:8081/admin/api/users?page=${page}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setUsers(response.data.users);
        setPageInfo(response.data.pageInfo);
      })
      .catch((err) => {
        console.error("User 데이터를 가져오는 데 실패했습니다.", err);
        setError("데이터를 불러오는데 실패했거나 권한이 없습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (auth.accessToken) {
      fetchUsers(currentPage);
    } else {
      setLoading(false);
    }
  }, [currentPage, auth.accessToken]);

  // [UPDATE] 수정 페이지 이동 함수 (추가됨)
  const handleUpdate = (userNo) => {
    // 수정 페이지 라우트로 이동
    navigate(`/admin/user/edit/${userNo}`);
  };

  // [DELETE] 삭제 함수
  const handleDelete = (userNo) => {
    // 본인 삭제 방지 (숫자 타입 변환하여 비교)
    if (Number(userNo) === Number(auth.userNo)) {
      alert("자기 자신은 삭제할 수 없습니다.");
      return;
    }

    if (window.confirm("정말로 이 사용자를 삭제(혹은 비활성화)하시겠습니까?")) {
      axios
        // [수정] URL에서 '/delete' 제거 (RESTful 표준: DELETE /users/{id})
        .delete(`http://localhost:8081/admin/api/users/${userNo}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then(() => {
          alert("사용자가 삭제되었습니다.");
          fetchUsers(currentPage); // 목록 새로고침
        })
        .catch((err) => {
          console.error("삭제 실패:", err);
          // 백엔드에서 보낸 에러 메시지가 있다면 출력
          if (err.response && err.response.data) {
            alert(err.response.data);
          } else {
            alert("삭제 권한이 없거나 실패했습니다.");
          }
        });
    }
  };

  // --- 렌더링 로직 ---
  const pageNumbers = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumbers.push(i);
    }
  }

  if (loading)
    return (
      <S.Container>
        <S.TableCard>
          <div>Loading users...</div>
        </S.TableCard>
      </S.Container>
    );
  if (error)
    return (
      <S.Container>
        <S.TableCard>
          <div style={{ color: "red" }}>{error}</div>
        </S.TableCard>
      </S.Container>
    );
  if (!pageInfo) return null;

  return (
    <S.Container>
      <S.TitleArea>
        <h2>Users / Overview</h2>
      </S.TitleArea>
      <S.TableCard>
        <S.TableTitle>Users enumeration</S.TableTitle>
        <S.TableDesc>
          Total Users: {pageInfo.listCount} (Page {pageInfo.currentPage} /{" "}
          {pageInfo.maxPage})
        </S.TableDesc>
        <S.Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email (Authority)</th>
              <th>Birthday</th>
              <th>Enroll Date</th>
              <th>Update</th>
              <th>Action</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userNo}>
                <td>
                  <S.UserInfo>
                    <span>{user.userName}</span>
                  </S.UserInfo>
                </td>
                <td>{user.email}</td>
                <td>{user.birthday}</td>
                <td>{user.enrollDate}</td>

                {/* 수정 버튼 */}
                <td>
                  <S.DeleteButton
                    onClick={() => handleUpdate(user.userNo)}
                    style={{
                      backgroundColor: "#6B4CE6",
                      color: "white",
                      border: "none",
                    }} // (선택) 수정 버튼 스타일 차별화
                  >
                    수정 및 승인
                  </S.DeleteButton>
                </td>

                {/* 삭제 버튼 */}
                <td>
                  <S.DeleteButton onClick={() => handleDelete(user.userNo)}>
                    삭제하기
                  </S.DeleteButton>
                </td>
                <td>{user.licenseStatus}</td>
              </tr>
            ))}
          </tbody>
        </S.Table>

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
