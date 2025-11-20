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
  Button,
} from "./Board.styles";
import gasipan from "../../../assets/gasipan.png";

const BoardDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();

  const [board, setBoard] = useState(null);
  const { auth } = useContext(AuthContext);

  //  수정 모드 관련 상태
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // 상세 조회
  useEffect(() => {
    if (!auth?.accessToken) {
      alert("로그인이 필요합니다.");
      navi("/members/login");
      return;
    }

    axios
      .get(`http://localhost:8081/boards/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        setBoard(res.data);
        // 처음 로딩할 때 수정용 값도 같이 세팅
        setEditTitle(res.data.boardTitle);
        setEditContent(res.data.boardContent);
      })
      .catch((err) => {
        console.error("상세보기 로딩 실패:", err);
        alert("게시글을 불러오는 데 실패했습니다.");
        navi("/boards/boards");
      });
  }, [id, auth, navi]);

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
      })
      .catch((err) => {
        console.error("삭제 실패:", err);
        alert("삭제에 실패했습니다.");
      });
  };

  //  수정 저장
  const handleUpdate = () => {
    if (!window.confirm("수정 내용을 저장할까요?")) return;

    axios
      .put(
        `http://localhost:8081/boards/boards/${id}`,
        {
          boardTitle: editTitle,
          boardContent: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((res) => {
        alert("수정되었습니다!");
        // 백엔드에서 수정된 객체를 돌려주면 그걸로 교체
        setBoard(res.data || { ...board, boardTitle: editTitle, boardContent: editContent });
        setEditMode(false);
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        alert("수정에 실패했습니다.");
      });
  };

  if (!board) return <div>잘못된 접근입니다. 관리자에게 문의하세요.</div>;

  console.log(" board.boardWriter =", board?.boardWriter);
  console.log(" auth =", auth);

  const isWriter = board.boardWriter === auth.userId; // 작성자 체크

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">게시글 상세보기</div>
      </Header>

      {/*  읽기 모드 / 수정 모드 전환 */}
      {editMode ? (
        <>
          {/* 제목 수정 */}
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "18px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />
          <BoardWriter>작성자 : {board.boardWriter}</BoardWriter>
          {/* 내용 수정 */}
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            style={{
              width: "100%",
              minHeight: "200px",
              padding: "10px",
              fontSize: "16px",
              boxSizing: "border-box",
              marginTop: "10px",
              whiteSpace: "pre-wrap",
            }}
          />
        </>
      ) : (
        <>
          <Title>{board.boardTitle}</Title>
          <BoardWriter>작성자 : {board.boardWriter}</BoardWriter>
          <BoardContent>{board.boardContent}</BoardContent>
        </>
      )}

      {/* 작성자만 수정/삭제 가능 */}
      {isWriter && (
        <div style={{ marginTop: "10px" }}>
          {editMode ? (
            <>
              <Button onClick={handleUpdate}>저장</Button>
              <Button
                onClick={() => {
                  setEditMode(false);
                  setEditTitle(board.boardTitle);
                  setEditContent(board.boardContent);
                }}
                style={{ background: "gray" }}
              >
                취소
              </Button>
              <Button onClick={handleDelete} style={{ background: "crimson" }}>
                삭제하기
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setEditMode(true)}>수정하기</Button>
              <Button onClick={handleDelete} style={{ background: "crimson" }}>
                삭제하기
              </Button>
            </>
          )}
        </div>
      )}

      <Button onClick={() => navi(-1)} style={{ background: "blue", marginTop: "10px" }}>
        뒤로가기
      </Button>
    </Container>
  );
};

export default BoardDetail;
