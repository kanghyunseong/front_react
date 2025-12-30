import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NoticeList.styles";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

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
        const response = await axios.get(
          `${apiUrl}/api/admin/api/notice/list`,
          { headers: { Authorization: `Bearer ${auth.accessToken}` } }
        );
        setNotices(response.data);
      } catch (error) {
        console.log("공지사항 목록 로딩 실패: ", error);

        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          alert(
            "세션이 만료되었거나 접근 권한이 없습니다. 로그인 페이지로 이동합니다."
          );
          navigate("/members/login");
        } else {
          alert("공지사항 목록을 불러오는 데 실패했습니다.");
          setNotices([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [auth, navigate]);

  const handleDelete = async (noticeNo) => {
    if (loading) return; // 👈 [개선 1] 로딩 중 중복 클릭 방지

    if (!window.confirm("정말 이 공지사항을 삭제하시겠습니까?")) {
      return;
    }

    // 토큰 체크 (필수)
    const token = auth.accessToken;
    if (!token) {
      alert("인증 정보가 없습니다. 다시 로그인해주세요.");
      navigate("/members/login");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(
        `${apiUrl}/api/admin/api/notice/delete/${noticeNo}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotices((prevNotices) =>
        prevNotices.filter((notice) => notice.noticeNo !== noticeNo)
      );
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);

      if (error.response) {
        const status = error.response.status;
        const serverMsg = error.response.data.message || "서버 내부 오류";

        if (status === 404) {
          alert(
            `삭제 실패: ${serverMsg} (이미 삭제되었거나 번호를 찾을 수 없습니다.)`
          );
        } else if (status === 401 || status === 403) {
          alert(
            "권한이 없거나 세션이 만료되었습니다. 로그인 페이지로 이동합니다."
          );
          navigate("/members/login");
        } else {
          alert(`공지사항 삭제 중 오류가 발생했습니다: ${serverMsg}`);
        }
      } else {
        alert("네트워크 오류로 삭제 요청에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWrite = () => {
    navigate("/admin/community/notice/noticeWrite");
  };

  if (loading && notices.length === 0) {
    return (
      <S.Container
        style={{ textAlign: "center", padding: "40px", color: "#6B4CE6" }}
      >
        공지사항 목록을 불러오는 중입니다...
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <h2>Community / Notice List</h2>
        <S.WriteBtn onClick={handleWrite}>+ New Notice</S.WriteBtn>
      </S.Header>

      <S.Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Content</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.noticeNo}>
              <td>{notice.noticeNo}</td>
              <td>{notice.noticeTitle}</td>
              <td>{notice.noticeWriter}</td>
              <td>{notice.noticeContent}</td>
              <td>{notice.noticeDate}</td>
              <td>
                <S.ActionBtn onClick={() => handleEdit(notice)}>
                  Edit
                </S.ActionBtn>
                <S.ActionBtn
                  onClick={() => handleDelete(notice.noticeNo)}
                  style={{ color: "red" }}
                >
                  Del
                </S.ActionBtn>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default NoticeList;
