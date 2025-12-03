import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import * as S from "./NoticeWrite.styles";

const NoticeWrite = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    noticeTitle: "",
    noticeContent: "",
    // noticeWriter는 이제 DB 서브쿼리가 처리하므로 0이어도 상관없습니다.
    noticeWriter: 0,
  });

  const [displayWriter, setDisplayWriter] = useState("로딩중...");

  useEffect(() => {
    // 1. 로그인 체크 (Context가 없으면 로컬스토리지라도 확인)
    const token = auth?.accessToken || localStorage.getItem("accessToken");

    // 토큰이 아예 없으면 로그인 안 한 상태
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login"); // 로그인 페이지로 튕겨내기 (필요시 주석 해제)
      return;
    }

    // 2. 화면 표시용 이름 가져오기
    // Context에 없으면 LocalStorage에서 가져옴 (새로고침 대비)
    const currentUserName =
      auth?.userName ||
      localStorage.getItem("userName") ||
      auth?.userId ||
      localStorage.getItem("userId");

    setDisplayWriter(currentUserName || "관리자");
  }, [auth, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // 1. 제목/내용 유효성 검사
    if (!formData.noticeTitle || !formData.noticeContent) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    // 2. 작성자 ID(String) 가져오기 (가장 중요!)
    // Context가 비어있으면 LocalStorage에서 'userId' (예: admin)를 직접 꺼냅니다.
    const currentUserId = auth?.userId || localStorage.getItem("userId");

    if (!currentUserId) {
      alert("로그인 정보가 유실되었습니다. 다시 로그인해주세요.");
      return;
    }

    // 3. 서버로 보낼 데이터 구성
    // DTO에 추가한 writerId 필드에 문자열 아이디를 담습니다.
    const submitData = {
      ...formData,
      writerId: currentUserId, // 예: "admin" -> Mapper에서 서브쿼리로 번호 찾음
    };

    try {
      // 토큰 확보
      const token = auth?.accessToken || localStorage.getItem("accessToken");

      await axios.post(
        "http://localhost:8081/admin/api/notice/insert",
        submitData, // 수정된 데이터 전송
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      alert("등록되었습니다.");
      navigate("/admin/community/notice/noticeList");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <S.Header>
        <h2>Community / Notice Write</h2>
      </S.Header>

      <S.Container>
        <S.SectionTitle>Write Notice</S.SectionTitle>

        <S.FormGroup>
          <div>
            <S.Label>Notice title</S.Label>
            <S.Input
              name="noticeTitle"
              value={formData.noticeTitle}
              onChange={handleChange}
              placeholder="제목 입력"
            />
          </div>
          <div>
            <S.Label>Writer</S.Label>
            <S.Input
              value={displayWriter}
              readOnly
              style={{ backgroundColor: "#f0f0f0", color: "#555" }}
            />
          </div>
        </S.FormGroup>

        <S.Label>작성 내용</S.Label>
        <S.TextAreaBox>
          <S.TextArea
            name="noticeContent"
            value={formData.noticeContent}
            onChange={handleChange}
            placeholder="내용 입력"
          />
        </S.TextAreaBox>

        <S.ButtonGroup>
          <S.Button onClick={() => navigate(-1)}>Cancel</S.Button>
          <S.Button $primary onClick={handleSubmit}>
            Create
          </S.Button>
        </S.ButtonGroup>
      </S.Container>
    </div>
  );
};

export default NoticeWrite;
