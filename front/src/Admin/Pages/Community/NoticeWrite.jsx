import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaUserCircle,
  FaArrowLeft,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import * as S from "./NoticeWrite.styles";
import { axiosAuth } from "../../../api/reqService";

const NoticeWrite = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    noticeTitle: "",
    noticeContent: "",
  });

  const [displayWriter, setDisplayWriter] = useState("관리자");

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
      alert("공지사항 제목과 내용을 모두 입력해주세요.");
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
      await axiosAuth.post(`/api/admin/notice/insert`, submitData);
      alert("공지사항이 성공적으로 등록되었습니다.");
      navigate("/admin/community/notice/noticeList");
    } catch (error) {
      console.error("등록 실패:", error);
      const serverMsg = error.response?.data?.message || "서버 내부 오류";
      alert(`등록 중 오류가 발생했습니다: ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.PageWrapper>
      <S.TitleSection>
        <div className="back-nav" onClick={() => navigate(-1)}>
          <FaArrowLeft /> 돌아가기
        </div>
        <h2>Community Notice</h2>
        <p>새로운 공지사항을 작성하여 사용자들에게 소식을 알리세요.</p>
      </S.TitleSection>

      <S.Container>
        <S.SectionHeader>
          <FaEdit /> 공지사항 작성
        </S.SectionHeader>

        <S.FormLayout>
          <S.FormGroup>
            <S.InputBox>
              <S.Label>공지 제목</S.Label>
              <S.Input
                name="noticeTitle"
                value={formData.noticeTitle}
                onChange={handleChange}
                placeholder="제목을 입력하세요"
              />
            </S.InputBox>
            <S.InputBox>
              <S.Label>작성자</S.Label>
              <S.ReadOnlyField>
                <FaUserCircle className="user-icon" />
                {displayWriter}
              </S.ReadOnlyField>
            </S.InputBox>
          </S.FormGroup>

          <S.FullWidthBox>
            <S.Label>공지 내용</S.Label>
            <S.TextAreaBox>
              <S.TextArea
                name="noticeContent"
                value={formData.noticeContent}
                onChange={handleChange}
                placeholder="공지사항 상세 내용을 입력하세요."
              />
            </S.TextAreaBox>
          </S.FullWidthBox>

          <S.ButtonGroup>
            <S.Button onClick={() => navigate(-1)}>Cancel</S.Button>
            <S.Button $primary onClick={handleSubmit} disabled={loading}>
              {loading ? "등록 중..." : "Create Notice"}
            </S.Button>
          </S.ButtonGroup>
        </S.FormLayout>
      </S.Container>
    </S.PageWrapper>
  );
};

export default NoticeWrite;
