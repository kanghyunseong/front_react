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
  Button
  
} from "./Board.styles";
import gasipan from "../../../assets/gasipan.png";

const BoardDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();

  const [board, setBoard] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/boards/boards/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // 삭제
  const handleDelete = () => {
    if (!window.confirm("정말 삭제할까요?")) return;

    axios
      .delete(`http://localhost:8081/boards/boards/${id}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then(() => {
        alert("삭제되었습니다!");
        navi("/boards/boards");
      });
  };

  if (!board) return <div>잘못된 접근입니다. 관리자에게 문의하세요.</div>;

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">게시글 상세보기</div>
      </Header>

      <Title>{board.boardTitle}</Title>
      <BoardWriter>작성자 : {board.boardWriter}</BoardWriter>
      <BoardContent>{board.boardContent}</BoardContent>

      {/* 작성자만 수정/삭제 가능 */}
      {board.boardWriter === auth.memberId && (
        <div style={{ marginTop: "10px" }}>
          <Button onClick={() => navi(`/boards/boards/edit/${id}`)}>
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

export default BoardDetail;
