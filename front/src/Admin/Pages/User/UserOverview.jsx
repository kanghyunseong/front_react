import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaTrashAlt,
  FaUserEdit,
  FaEnvelope,
  FaCalendarAlt,
  FaIdCard,
} from "react-icons/fa";
import * as S from "./UserOverview.styles";
import { AuthContext } from "../../../context/AuthContext";
import { axiosAuth } from "../../../api/reqService";

const UserOverview = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  const fetchUsers = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosAuth.getList(`/api/admin/users?page=${page}`);
      if (response.data) {
        setUsers(response.data.users || []);
        setPageInfo(response.data.pageInfo || null);
      }
    } catch (err) {
      setError("사용자 데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.accessToken) {
      fetchUsers(currentPage);
    }
  }, [currentPage, auth?.accessToken]);

  const handleUpdate = (userNo) => {
    navigate(`/admin/user/edit/${userNo}`);
  };

  const handleDelete = async (userNo) => {
    if (Number(userNo) === Number(auth.userNo)) {
      alert("자기 자신은 삭제할 수 없습니다.");
      return;
    }
    if (window.confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
      try {
        await axiosAuth.delete(`/api/admin/users/${userNo}`);
        alert("사용자가 성공적으로 처리되었습니다.");
        fetchUsers(currentPage);
      } catch (err) {
        alert(err.response?.data || "삭제 권한이 없습니다.");
      }
    }
  };

  const pageNumbers = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumbers.push(i);
    }
  }

  // 면허 상태 배지 스타일 헬퍼
  const getLicenseBadge = (status) => {
    const isApproved = status === "Y" || status === "승인";
    return <S.StatusBadge $approved={isApproved}>{status}</S.StatusBadge>;
  };

  return (
    <S.Container>
      <S.TitleArea>
        <h2>User Management</h2>
        <p>
          서비스에 등록된 전체 사용자 목록을 관리하고 승인 상태를 확인합니다.
        </p>
      </S.TitleArea>

      <S.TableCard>
        <S.CardHeader>
          <S.TableTitle>Users Enumeration</S.TableTitle>
          <S.TableDesc>
            Total: <strong>{pageInfo?.listCount || 0}</strong> Users
          </S.TableDesc>
        </S.CardHeader>

        <S.Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>
                <FaEnvelope style={{ marginRight: "5px" }} />
                Email
              </th>
              <th>
                <FaCalendarAlt style={{ marginRight: "5px" }} />
                Info
              </th>
              <th>Enroll Date</th>
              <th>State</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">
                  <S.StateMsg>데이터 로딩 중...</S.StateMsg>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6">
                  <S.StateMsg style={{ color: "#e11d48" }}>{error}</S.StateMsg>
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userNo}>
                  <td>
                    <S.UserInfo>
                      <FaUserCircle className="avatar-icon" />
                      <div className="user-details">
                        <span className="user-name">{user.userName}</span>
                        <span className="user-no">No. {user.userNo}</span>
                      </div>
                    </S.UserInfo>
                  </td>
                  <td className="email-cell">{user.email}</td>
                  <td>
                    <S.SubInfo>
                      <span>Cake: {user.birthday}</span>
                    </S.SubInfo>
                  </td>
                  <td className="date-cell">{user.enrollDate}</td>
                  <td>{getLicenseBadge(user.licenseStatus)}</td>
                  <td>
                    <S.ActionGroup>
                      <S.EditBtn
                        onClick={() => handleUpdate(user.userNo)}
                        title="수정 및 승인"
                      >
                        <FaUserEdit />
                      </S.EditBtn>
                      <S.DelBtn
                        onClick={() => handleDelete(user.userNo)}
                        title="사용자 삭제"
                      >
                        <FaTrashAlt />
                      </S.DelBtn>
                    </S.ActionGroup>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <S.StateMsg>등록된 사용자가 없습니다.</S.StateMsg>
                </td>
              </tr>
            )}
          </tbody>
        </S.Table>

        {pageInfo && (
          <S.PaginationContainer>
            <S.PageButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
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
              Next
            </S.PageButton>
          </S.PaginationContainer>
        )}
      </S.TableCard>
    </S.Container>
  );
};

export default UserOverview;
