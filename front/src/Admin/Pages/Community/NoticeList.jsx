import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaRegFileAlt,
  FaUserEdit,
  FaCalendarAlt,
} from "react-icons/fa";
import * as S from "./NoticeList.styles";
import { AuthContext } from "../../../context/AuthContext";
import { axiosAuth } from "../../../api/reqService";

const NoticeList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const { auth } = useContext(AuthContext);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  useEffect(() => {
    const fetchNotices = async () => {
      if (!auth || !auth.accessToken) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axiosAuth.getActual(`api/admin/notice/list`);
        setNotices(Array.isArray(response) ? response : []);
      } catch (error) {
        console.log("공지사항 목록 로딩 실패: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/members/login");
        } else {
          setNotices([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [auth, navigate]);

  const handleDelete = async (noticeNo) => {
    if (loading) return;
    if (!window.confirm("정말 이 공지사항을 삭제하시겠습니까?")) return;

    try {
      setLoading(true);
      await axiosAuth.delete(`/api/admin/notice/delete/${noticeNo}`);
      setNotices((prev) =>
        prev.filter((notice) => notice.noticeNo !== noticeNo)
      );
      alert("삭제되었습니다.");
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleWrite = () => navigate("/admin/community/notice/noticeWrite");
  const handleEdit = (noticeNo) =>
    navigate(`/admin/community/notice/noticeEdit/${noticeNo}`);

  if (loading && notices.length === 0) {
    return <S.LoadingWrapper>공지사항을 불러오는 중입니다...</S.LoadingWrapper>;
  }

  return (
    <S.PageWrapper>
      <S.TitleSection>
        <div className="title-group">
          <h2>Community Management</h2>
          <p>공지사항을 작성하고 관리하는 공간입니다.</p>
        </div>
        <S.WriteBtn onClick={handleWrite}>
          <FaPlus /> New Notice
        </S.WriteBtn>
      </S.TitleSection>

      <S.TableCard>
        <S.StyledTable>
          <thead>
            <tr>
              <th width="80px">No</th>
              <th width="40%">
                <FaRegFileAlt /> Title
              </th>
              <th>
                <FaUserEdit /> Writer
              </th>
              <th>
                <FaCalendarAlt /> Date
              </th>
              <th width="120px">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.length > 0 ? (
              notices.map((notice) => (
                <tr key={notice.noticeNo}>
                  <td className="no-cell">{notice.noticeNo}</td>
                  <td className="title-cell">
                    <div className="title-text">{notice.noticeTitle}</div>
                    <div className="content-preview">
                      {notice.noticeContent}
                    </div>
                  </td>
                  <td className="writer-cell">
                    <S.Badge>{notice.noticeWriter}</S.Badge>
                  </td>
                  <td className="date-cell">{notice.noticeDate}</td>
                  <td>
                    <S.ActionGroup>
                      <S.IconButton
                        className="edit"
                        onClick={() => handleEdit(notice.noticeNo)}
                        title="수정"
                      >
                        <FaEdit />
                      </S.IconButton>
                      <S.IconButton
                        className="delete"
                        onClick={() => handleDelete(notice.noticeNo)}
                        title="삭제"
                      >
                        <FaTrashAlt />
                      </S.IconButton>
                    </S.ActionGroup>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <S.EmptyState>등록된 공지사항이 없습니다.</S.EmptyState>
                </td>
              </tr>
            )}
          </tbody>
        </S.StyledTable>
      </S.TableCard>
    </S.PageWrapper>
  );
};

export default NoticeList;
