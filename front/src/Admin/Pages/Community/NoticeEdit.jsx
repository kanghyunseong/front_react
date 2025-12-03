import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // useParams 추가
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import * as S from "./NoticeEdit.styles";

const NoticeEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { noticeNo } = useParams();
  const { auth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    noticeNo: "",
    noticeTitle: "",
    noticeContent: "",
    noticeWriter: "",
  });

  useEffect(() => {
    // 1. 목록에서 넘어온 데이터(state)가 있으면 그걸 먼저 사용
    if (location.state?.noticeData) {
      const data = location.state.noticeData;
      setFormData({
        noticeNo: data.noticeNo,
        noticeTitle: data.noticeTitle,
        noticeContent: data.noticeContent,
        noticeWriter: data.noticeWriter,
      });
      return;
    }

    // 2. state가 없으면(새로고침 등), URL의 noticeNo로 서버에서 다시 조회
    // (App.js 라우터가 /edit/:noticeNo 로 설정되어 있어야 함)
    const fetchNotice = async () => {
      // noticeNo조차 없으면 튕겨내기
      if (!noticeNo && !location.state?.noticeData) {
        alert("잘못된 접근입니다.");
        navigate("/admin/community/notice/list");
        return;
      }

      try {
        const token = auth?.accessToken || localStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:8081/admin/api/notice/${noticeNo}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
        const data = response.data;
        setFormData({
          noticeNo: data.noticeNo,
          noticeTitle: data.noticeTitle,
          noticeContent: data.noticeContent,
          noticeWriter: data.noticeWriter,
        });
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        alert("데이터를 불러오지 못했습니다.");
        navigate("/admin/community/notice/list");
      }
    };

    fetchNotice();
  }, [location.state, noticeNo, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!window.confirm("공지사항을 수정하시겠습니까?")) return;

    try {
      const token = auth?.accessToken || localStorage.getItem("accessToken");

      await axios.put(
        `http://localhost:8081/admin/api/notice/modify`,
        formData,
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      );

      alert("수정이 완료되었습니다.");
      navigate("/admin/community/notice/noticeList");
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <S.Container>
      <S.Header>
        <h2>공지사항 수정</h2>
      </S.Header>

      <S.Form onSubmit={handleSubmit}>
        <S.FormGroup>
          <S.Label>제목</S.Label>
          <S.Input
            type="text"
            name="noticeTitle"
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
            style={{ backgroundColor: "#e9ecef" }}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>내용</S.Label>
          <S.TextArea
            name="noticeContent"
            value={formData.noticeContent || ""}
            onChange={handleChange}
            required
            style={{ minHeight: "200px" }}
          />
        </S.FormGroup>

        <S.ButtonGroup>
          <S.CancelButton type="button" onClick={() => navigate(-1)}>
            취소
          </S.CancelButton>
          <S.SubmitButton type="submit">수정 완료</S.SubmitButton>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
};

export default NoticeEdit;
