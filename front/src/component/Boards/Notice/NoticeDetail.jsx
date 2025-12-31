import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosAuth } from "../../../api/reqService.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import {
  Container,
  Header,
  DetailTitle,
  InfoBox,
  Content,
  BackButton,
} from "./Notice.styles";
import gasipan from "../../../assets/gasipan.png";

const NoticeDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  useEffect(() => {
    // 토큰 없으면 로그인 페이지로
    if (!auth?.accessToken) {
      alert("공지 상세는 로그인 후 이용 가능합니다.");
      navi("/members/login");
      return;
    }
    setLoading(true);

    axiosAuth
      .getActual(`/api/notices/${id}`)
      .then((data) => setNotice(data))
      .catch((err) => {
        console.error("공지 상세 조회 실패:", err);
        alert("공지글을 불러올 수 없습니다.");
        navi("/notices");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, auth?.accessToken, navi]);

  if (loading) return <Container>로딩 중...</Container>;
  if (!notice)
    return (
      <Container>공지글을 찾을 수 없습니다. 관리자에게 문의하세요.</Container>
    );

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" />
        <div className="title-overlay">공지사항</div>
      </Header>

      <DetailTitle>{notice.noticeTitle}</DetailTitle>

      <InfoBox>
        <span>작성자: {notice.noticeWriter}</span>
        <span>작성일: {notice.noticeDate}</span>
        <span>조회수: {notice.noticeCount}</span>
      </InfoBox>

      <Content>{notice.noticeContent}</Content>

      <BackButton onClick={() => navi(-1)}>목록보기</BackButton>
    </Container>
  );
};

export default NoticeDetail;
