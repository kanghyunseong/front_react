import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext.jsx";
import BoardComment from "./BoardComment.jsx";
import ReportModal from "../ReportModal.jsx";
import {
  Container,
  Header,
  Title,
  BoardWriter,
  BoardContent,
  Button,
  BottomArea,
  TopButtonRow,
} from "./Board.styles";
import gasipan from "../../../assets/gasipan.png";


const BoardDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();

  const [board, setBoard] = useState("");
  const [loading, setLoading] = useState(true);

  const { auth } = useContext(AuthContext);

  // 수정 모드 관련 상태
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // 신고 기능
  const [reportOpen, setReportOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);

  // 게시글 상세 조회
  useEffect(() => {
    if (!auth?.accessToken) {
      alert("로그인이 필요합니다.");
      navi("/members/login");
      return;
    }
    
    setLoading(true);
    axios
      .get(`http://localhost:8081/boards/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        setBoard(res.data);
        setEditTitle(res.data.boardTitle);
        setEditContent(res.data.boardContent);
      })
      .catch((err) => {
        console.error("상세보기 로딩 실패:", err);
        alert("게시글을 불러오는 데 실패했습니다.");
        navi("/boards/boards");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, auth, navi]);

  // 게시글 삭제
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

  // 게시글 수정 저장
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
        setBoard(
          res.data || {
            ...board,
            boardTitle: editTitle,
            boardContent: editContent,
          }
        );
        setEditMode(false);
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        alert("수정에 실패했습니다.");
      });
  };

  // 신고 버튼 클릭 -> 모달 열기
  const handleOpenReportModal = () => {

    setReportTarget({ id, writer: board.boardWriter }); // 필요 데이터 저장
    setReportOpen(true);
  };

  // 모달에서 제출했을 때 처리
  const handleSubmitReport = (reason) => {
  if (!reason) {
    alert("신고 사유를 입력해주세요.");
    return;
  }  

  axios
    .post(
      `http://localhost:8081/boards/boards/${id}/report`,
      { reason }, 
      { headers: { Authorization: `Bearer ${auth.accessToken}` } }
    )
    .then(() => {
      alert("신고가 접수되었습니다. 운영자가 확인 후 처리합니다.");
      setReportOpen(false);
    })
    .catch((err) => {
      console.error("게시글 신고 실패:", err);
      alert(err.response?.data?.message || "신고 접수에 실패했습니다.");
    });
};
  if (loading) return <div>로딩 중...</div>;
  if (!board) return <div>잘못된 접근입니다. 관리자에게 문의하세요.</div>;

  const isWriter = board.boardWriter === auth.userId;

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">게시글 상세보기</div>
      </Header>

      {/* 읽기 / 수정 모드 */}
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
          <BoardWriter>작성자 : {board.boardWriter}</BoardWriter>
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
          <BoardWriter>
            <span>작성자 : {board.boardWriter}</span>
            <span>작성일 : {board.boardDate}</span>
            <span>조회 : {board.count}</span>
          </BoardWriter>
          <hr />
          <BoardContent>{board.boardContent}</BoardContent>
          <hr />
        </>
      )}

      {/* ====== 하단 버튼 + 댓글 컴포넌트 영역 ====== */}
      <BottomArea>
        <TopButtonRow>
          <div>
            <Button onClick={() => navi("/boards/boards")}>목록보기</Button>

            {/* 자신 글이 아닐 때만 신고 버튼 노출 */}
            {!isWriter && (
              <>
                <Button style={{ marginLeft: "8px" }} onClick={handleOpenReportModal}>
                  신고하기
                </Button>
                <ReportModal
                  open={reportOpen}
                  onClose={() => setReportOpen(false)}
                  onSubmit={handleSubmitReport}
                  targetLabel="게시글"
                />
              </>
            )}
          </div>

          {isWriter && (
            <div>
              {/* 아래쪽에만 수정/삭제 노출 */}
              {editMode ? (
                <>
                  <Button onClick={handleUpdate}>저장</Button>
                  <Button
                    onClick={() => {
                      setEditMode(false);
                      setEditTitle(board.boardTitle);
                      setEditContent(board.boardContent);
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

        {/* 위에 댓글쓰기 박스 + 아래 표 형태 리스트 */}
        <BoardComment boardNo={board.boardNo || id} />
      </BottomArea>
    </Container>
  );
};

export default BoardDetail;
