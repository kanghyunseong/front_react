import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NoticeList.styles";

const NoticeList = () => {
  const navigate = useNavigate();

  // 임시 데이터
  const [notices, setNotices] = useState([
    { id: 1, title: "서비스 점검 안내", writer: "Admin", date: "2023-10-01" },
    { id: 2, title: "신규 기능 업데이트", writer: "Admin", date: "2023-10-05" },
  ]);

  // 삭제 핸들러
  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setNotices(notices.filter((n) => n.id !== id));
    }
  };

  // 수정 핸들러 (데이터를 들고 이동)
  const handleEdit = (notice) => {
    navigate("/admin/community/notice-write", {
      state: { noticeData: notice },
    });
  };

  // ★ 글쓰기 핸들러 (데이터 없이 이동 -> 신규 등록 모드)
  const handleWrite = () => {
    navigate("/admin/community/notice/noticeWrite");
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Community / Notice List</h2>
        {/* 글쓰기 버튼 추가 */}
        <S.WriteBtn onClick={handleWrite}>+ New Notice</S.WriteBtn>
      </S.Header>

      <S.Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td>{notice.id}</td>
              <td>{notice.title}</td>
              <td>{notice.writer}</td>
              <td>{notice.date}</td>
              <td>
                <S.ActionBtn
                  onClick={() =>
                    navigate("/admin/community/notice/notice-edit")
                  }
                >
                  Edit
                </S.ActionBtn>
                <S.ActionBtn
                  onClick={() => handleDelete(notice.id)}
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
