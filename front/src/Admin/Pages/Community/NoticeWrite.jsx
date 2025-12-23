import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import * as S from "./NoticeWrite.styles";

const NoticeWrite = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    noticeTitle: "",
    noticeContent: "",
    noticeWriter: 0,
  });
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  const [displayWriter, setDisplayWriter] = useState("로딩중...");

  useEffect(() => {
    const token = auth?.accessToken || localStorage.getItem("accessToken");

    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/members/login");
      return;
    }

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
    if (loading) return;

    if (!formData.noticeTitle || !formData.noticeContent) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const currentUserId = auth?.userId || localStorage.getItem("userId");

    if (!currentUserId) {
      alert("로그인 정보가 유실되었습니다. 다시 로그인해주세요.");
      return;
    }

    const submitData = {
      ...formData,
      writerId: currentUserId,
    };

    try {
      setLoading(true);
      const token = auth?.accessToken || localStorage.getItem("accessToken");

      await axios.post(`${apiUrl}/admin/api/notice/insert`, submitData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      alert("등록되었습니다.");
      navigate("/admin/community/notice/noticeList");
    } catch (error) {
      console.error("등록 실패:", error);
      if (error.response) {
        const status = error.response.status;
        const serverMsg = error.response.data.message || "서버 내부 오류";

        if (status === 401 || status === 403) {
          alert(
            "권한이 없거나 세션이 만료되었습니다. 로그인 페이지로 이동합니다."
          );
          navigate("/members/login");
        } else if (status === 400) {
          alert(`등록 실패: 입력 값이 올바르지 않습니다. (${serverMsg})`);
        } else {
          alert(`등록 중 오류가 발생했습니다: ${serverMsg}`);
        }
      } else {
        alert("네트워크 오류로 등록 요청에 실패했습니다.");
      }
    } finally {
      setLoading(false);
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
            {loading ? "등록 처리 중..." : "Create"}
          </S.Button>
        </S.ButtonGroup>
      </S.Container>
    </div>
  );
};

export default NoticeWrite;
