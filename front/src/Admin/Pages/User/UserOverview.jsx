import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as S from "./UserOverview.styles";
import { AuthContext } from "../../../context/AuthContext";

const UserOverview = () => {
  const [users, setUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { auth } = useContext(AuthContext);

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

  const handleDelete = (userNo) => {
    if (window.confirm("정말로 이 사용자를 삭제(혹은 비활성화)하시겠습니까?")) {
      axios
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
          alert("삭제에 실패했습니다. 권한을 확인하세요.");
        });
    }
  };

  const pageNumbers = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumbers.push(i);
    }
  }

  if (loading) {
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

  if (!pageInfo) {
    return null;
  }

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
              <th>Action</th>
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
                <td>
                  <S.DeleteButton onClick={() => handleDelete(user.userNo)}>
                    삭제하기
                  </S.DeleteButton>
                </td>
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
