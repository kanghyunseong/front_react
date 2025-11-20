import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext.jsx";
import {
  Container,
  Header,
  Title,
  BoardWriter,
  BoardContent,
  ImageContainer,
  ImagePreview,
  Button,
  Form,
} from "./ImgBoard.styles";
import gasipan from "../../../assets/gasipan.png";

const ImgBoardDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();

  const [board, setBoard] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/boards/imgBoards/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // 삭제
  const handleDelete = () => {
    if (!window.confirm("정말 삭제할까요?")) return;

    axios
      .delete(`http://localhost:8081/boards/imgBoards/${id}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then(() => {
        alert("삭제되었습니다!");
        navi("/boards/imgBoards");
      });
  };

  if (!board) return <div>로딩중...</div>;

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">게시글 상세보기</div>
      </Header>

      <Title>{board.boardTitle}</Title>
      <BoardWriter>작성자 : {board.boardWriter}</BoardWriter>
      <BoardContent>{board.boardContent}</BoardContent>
      {board.fileUrl ? (
        <ImageContainer>
          <ImagePreview src={board.fileUrl} alt="첨부이미지" />
        </ImageContainer>
      ) : (
        <div>이미지가 존재하지 않습니다.</div>
      )}

      {/* 작성자만 수정/삭제 가능 */}
      {board.boardWriter === auth.memberId && (
        <div style={{ marginTop: "10px" }}>
          <Button onClick={() => navi(`/boards/imgBoards/edit/${id}`)}>
            수정하기
          </Button>

          <Button onClick={handleDelete} style={{ background: "crimson" }}>
            삭제하기
          </Button>
        </div>
      )}

      <Button onClick={() => navi(-1)} style={{ background: "blue" }}>
        뒤로가기
      </Button>
    </Container>
  );
};

export default ImgBoardDetail;
