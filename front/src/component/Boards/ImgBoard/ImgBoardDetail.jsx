import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext.jsx";
import ImgBoardComment from "./ImgBoardComment.jsx";

import {
  Container,
  Header,
  Title,
  BoardWriter,
  BoardContent,
  Button,
  BottomArea,
  TopButtonRow,
} from "./ImgBoard.styles";
import gasipan from "../../../assets/gasipan.png";

const ImgBoardDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();

  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  const { auth } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // ✅ 상세 글 불러오기 (로그인 안 해도 가능)
  useEffect(() => {
    axios
      .get(`http://localhost:8081/boards/imgBoards/${id}`)
      .then((res) => {
        const data = res.data;
        setBoard(data);
        // 백엔드 DTO 필드명에 맞게 세팅
        setEditTitle(data.imgBoardTitle);
        setEditContent(data.imgBoardContent);
      })
      .catch((err) => {
        console.error("갤러리 상세보기 로딩 실패:", err);
        alert("게시글을 불러오는 데 실패했습니다.");
        navi("/boards/imgBoards");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navi]);

  // ✅ 삭제
  const handleDelete = () => {
    if (!auth?.accessToken) {
      alert("로그인이 필요합니다.");
      navi("/members/login");
      return;
    }

    if (!window.confirm("정말 삭제할까요?")) return;

    axios
      .delete(`http://localhost:8081/boards/imgBoards/${id}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then(() => {
        alert("삭제되었습니다!");
        navi("/boards/imgBoards");
      })
      .catch((err) => {
        console.error("삭제 실패:", err);
        alert("삭제에 실패했습니다.");
      });
  };

  // ✅ 수정
  const handleUpdate = () => {
    if (!auth?.accessToken) {
      alert("로그인이 필요합니다.");
      navi("/members/login");
      return;
    }

    if (!window.confirm("수정 내용을 저장할까요?")) return;

    axios
      .put(
        `http://localhost:8081/boards/imgBoards/${id}`,
        {
          // ⚠️ 백엔드 DTO 필드명에 맞춰서 전송
          imgBoardTitle: editTitle,
          imgBoardContent: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((res) => {
        alert("수정되었습니다!");
        const data = res.data || board;
        setBoard({
          ...data,
          imgBoardTitle: editTitle,
          imgBoardContent: editContent,
        });
        setEditMode(false);
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        alert("수정에 실패했습니다.");
      });
  };

  if (loading) return <div>로딩 중...</div>;
  if (!board) return <div>게시글을 찾을 수 없습니다. 관리자에게 문의하세요.</div>;

  // 작성자 본인인지 체크 (백엔드에서 imgBoardWriter 라고 내려온다고 가정)
  const isWriter =
    auth?.userId && board.imgBoardWriter && board.imgBoardWriter === auth.userId;

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">갤러리 상세보기</div>
      </Header>

      {editMode ? (
        <>
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
          <BoardWriter>작성자 : {board.imgBoardWriter}</BoardWriter>
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
          <Title>{board.imgBoardTitle}</Title>
          <BoardWriter>
            <span>작성자 : {board.imgBoardWriter}</span>
            <span>작성일 : {board.imgBoardDate}</span>
            <span>조회 : {board.imgCount}</span>
          </BoardWriter>
          <hr />
          {/* ✅ 이미지 상세에서만 보여주기 (필드명은 백엔드에 맞게) */}
          {board.imageUrl && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={board.imageUrl}
                alt={board.imgBoardTitle}
                style={{ maxWidth: "100%", borderRadius: "8px" }}
              />
            </div>
          )}
          <BoardContent>{board.imgBoardContent}</BoardContent>
          <hr />
        </>
      )}

      <BottomArea>
        <TopButtonRow>
          <div>
            <Button onClick={() => navi("/boards/imgBoards")}>목록보기</Button>
            <Button
              style={{ marginLeft: "8px" }}
              onClick={() =>
                alert("게시글 신고 기능은 추후 구현 예정입니다.")
              }
            >
              신고하기
            </Button>
          </div>

          {isWriter && (
            <div>
              {editMode ? (
                <>
                  <Button onClick={handleUpdate}>저장</Button>
                  <Button
                    onClick={() => {
                      setEditMode(false);
                      setEditTitle(board.imgBoardTitle);
                      setEditContent(board.imgBoardContent);
                    }}
                    style={{ background: "gray", marginLeft: "8px" }}
                  >
                    취소
                  </Button>
                  <Button
                    onClick={handleDelete}
                    style={{ background: "crimson", marginLeft: "8px" }}
                  >
                    삭제
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setEditMode(true)}>수정</Button>
                  <Button
                    onClick={handleDelete}
                    style={{ background: "crimson", marginLeft: "8px" }}
                  >
                    삭제
                  </Button>
                </>
              )}
            </div>
          )}
        </TopButtonRow>

        {/*  댓글 쪽도 imgBoardNo 기준으로 넘겨주기 */}
        <ImgBoardComment boardNo={board.imgBoardNo || id} />
      </BottomArea>
    </Container>
  );
};

export default ImgBoardDetail;
