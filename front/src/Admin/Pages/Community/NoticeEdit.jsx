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
  const [loading, setLoading] = useState(true);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  const [formData, setFormData] = useState({
    noticeNo: "",
    noticeTitle: "",
    noticeContent: "",
    noticeWriter: "",
  });

  useEffect(() => {
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

    const fetchNotice = async () => {
      if (!noticeNo && !location.state?.noticeData) {
        alert("잘못된 접근입니다.");
        navigate("/admin/community/notice/list");
        return;
      }

      try {
        setLoading(true);
        const token = auth?.accessToken || localStorage.getItem("accessToken");
        if (!token) {
          alert("로그인 정보가 없습니다.");
          navigate("/members/login");
          return;
        }
        const response = await axios.get(
          `${apiUrl}/api/admin/api/notice/${noticeNo}`,
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

        if (error.response) {
          const status = error.response.status;
          if (status === 401 || status === 403) {
            alert("권한이 없거나 세션이 만료되었습니다");
            navigate("/members/login");
            return;
          } else if (status === 404) {
            alert("해당 공지사항을 찾을 수 없습니다.");
          } else {
            alert("데이터를 불러오지 못했습니다.");
          }
        } else {
          alert("데이터를 불러오지 못했습니다.");
        }

        navigate("/admin/community/notice/list");
      } finally {
        setLoading(false);
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
    if (loading) reuturn;

    if (!window.confirm("공지사항을 수정하시겠습니까?")) return;

    try {
      setLoading(true);
      const token = auth?.accessToken || localStorage.getItem("accessToken");
      if (!token) {
        alert("인증 정보가 없습니다. 다시 로그인해주세요");
        navigate("/members/login");
        return;
      }
      await axios.put(`${apiUrl}/api/admin/api/notice/modify`, formData, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      alert("수정이 완료되었습니다.");
      navigate("/admin/community/notice/noticeList");
    } catch (error) {
      console.error("수정 실패:", error);

      if (error.response) {
        const status = error.response.status;
        const serverMsg = error.response.data.message || "서버 내부 오류";
        if (status === 404) {
          alert(`수정 실패: 해당 공지사항을 찾을 수 없습니다. (${serverMsg})`);
        } else if (status === 401 || status === 403) {
          alert(
            "권한이 없거나 세션이 만료되었습니다. 로그인 페이지로 이동합니다."
          );
          navigate("/members/login");
        } else {
          alert(`수정 중 오류가 발생했습니다: ${serverMsg}`);
        }
      } else {
        alert("수정 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.noticeNo) {
    return (
      <S.Container
        style={{ textAlign: "center", padding: "40px", color: "#6B4CE6" }}
      >
        공지사항 정보를 불러오는 중입니다...
      </S.Container>
    );
  }

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
