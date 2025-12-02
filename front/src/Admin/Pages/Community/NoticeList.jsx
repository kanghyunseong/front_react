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

  useEffect(() => {
    const fetchNotices = async () => {
      if (!auth || !auth.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8081/admin/api/notice/list",
          { headers: { Authorization: `Bearer ${auth.accessToken}` } }
        );
        setNotices(response.data);
      } catch (error) {
        console.log("공지사항 목록 로딩 실패: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [auth]);

  const handleDelete = async (noticeNo) => {
    if (!window.confirm("정말 이 공지사항을 삭제하시겠습니까?")) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:8081/admin/api/notice/delete/${noticeNo}`,
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      );
      setNotices((prevNotices) =>
        prevNotices.filter((notice) => notice.noticeNo !== noticeNo)
      );
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("공지사항 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = (notice) => {
    navigate(`/admin/community/notice/edit/${notice.noticeNo}`, {
      state: { noticeData: notice },
    });
  };

  const handleWrite = () => {
    navigate("/admin/community/notice/noticeWrite");
  };

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
