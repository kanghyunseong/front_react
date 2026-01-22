import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import * as S from "./NoticeEdit.styles";
import { axiosAuth } from "../../../api/reqService";
import { FaEdit, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const NoticeEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { noticeNo } = useParams();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  const [formData, setFormData] = useState({
    noticeNo: "",
    noticeTitle: "",
    noticeContent: "",
    noticeWriter: "",
  });

  useEffect(() => {
    const fetchNotice = async () => {
      // 1. 전달받은 상태값이 있는 경우 우선 사용
      if (location.state?.noticeData) {
        const data = location.state.noticeData;
        setFormData({
          noticeNo: data.noticeNo,
          noticeTitle: data.noticeTitle,
          noticeContent: data.noticeContent,
          noticeWriter: data.noticeWriter,
        });
        setLoading(false);
        return;
      }

      // 2. URL 파라미터로 직접 접근한 경우 서버에서 조회
      if (!noticeNo) {
        alert("수정할 공지사항 번호가 없습니다.");
        navigate("/admin/community/notice/noticeList");
        return;
      }

      try {
        setLoading(true);
        const response = await axiosAuth.getList(
          `/api/admin/notice/${noticeNo}`
        );
        if (response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        alert("정보를 불러오는 데 실패했습니다.");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [noticeNo, location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("공지사항을 수정하시겠습니까?")) return;

    try {
      setLoading(true);
      await axiosAuth.put(`/api/admin/notice/modify`, formData);
      alert("공지사항이 성공적으로 수정되었습니다.");
      navigate("/admin/community/notice/noticeList");
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 처리에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <S.LoadingWrapper>공지사항 정보를 불러오는 중입니다...</S.LoadingWrapper>
    );
  }

  return (
    <S.PageWrapper>
      <S.TitleSection>
        <div className="back-nav" onClick={() => navigate(-1)}>
          <FaArrowLeft /> 돌아가기
        </div>
        <h2>
          공지사항 수정 <span>Edit Announcement</span>
        </h2>
        <p>공지사항의 내용을 수정하고 업데이트를 완료하세요.</p>
      </S.TitleSection>

      <S.Container>
        <S.Form onSubmit={handleSubmit}>
          <S.FormSection>
            <S.SectionHeader>
              <FaEdit /> 필수 정보 입력
            </S.SectionHeader>

            <S.FormGroup>
              <S.Label>공지 제목</S.Label>
              <S.Input
                type="text"
                name="noticeTitle"
                placeholder="제목을 입력하세요"
                value={formData.noticeTitle || ""}
                onChange={handleChange}
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>작성자</S.Label>
              <S.Input
                type="text"
                name="noticeWriter"
                value={formData.noticeWriter || ""}
                readOnly
              />
              <S.HelperText>작성자 정보는 수정할 수 없습니다.</S.HelperText>
            </S.FormGroup>
          </S.FormSection>

          <S.FormSection>
            <S.SectionHeader>
              <FaCheckCircle /> 상세 내용
            </S.SectionHeader>
            <S.FormGroup>
              <S.Label>공지 내용</S.Label>
              <S.TextArea
                name="noticeContent"
                placeholder="공지사항 상세 내용을 입력하세요."
                value={formData.noticeContent || ""}
                onChange={handleChange}
                required
              />
            </S.FormGroup>
          </S.FormSection>

          <S.ButtonGroup>
            <S.CancelButton type="button" onClick={() => navigate(-1)}>
              취소하기
            </S.CancelButton>
            <S.SubmitButton type="submit" disabled={loading}>
              {loading ? "처리 중..." : "수정 완료"}
            </S.SubmitButton>
          </S.ButtonGroup>
        </S.Form>
      </S.Container>
    </S.PageWrapper>
  );
};

export default NoticeEdit;
