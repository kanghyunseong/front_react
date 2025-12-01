import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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

  useEffect(() => {
    // 토큰 없으면 로그인 페이지로
    if (!auth?.accessToken) {
      alert("공지 상세는 로그인 후 이용 가능합니다.");
      navi("/members/login");
      return;
    }

    axios
      .get(`http://localhost:8081/boards/notices/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => setNotice(res.data))
      .catch((err) => {
        console.error("공지 상세 조회 실패:", err);
        alert("공지글을 불러올 수 없습니다.");
        navi("/boards/notices");
      });
  }, [id, auth?.accessToken, navi]);

  if (!notice) return null;

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

      <BackButton onClick={() => navi("/boards/notices")}>
        목록보기
      </BackButton>
    </Container>
  );
};

export default NoticeDetail;
