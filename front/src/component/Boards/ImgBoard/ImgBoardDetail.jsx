import { useEffect, useState, useContext } from "react";
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

  const [imgBoard, setImgBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  const { auth } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editFiles, setEditFiles] = useState([]);   // 수정 시 선택한 이미지

  // 글 불러오기 (로그인 필수)
  useEffect(() => {
    if (!auth?.accessToken) {
      alert("로그인이 필요한 서비스입니다.");
      navi("/members/login");
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:8081/boards/imgBoards/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setImgBoard(data);
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
  }, [id, navi, auth]);

  // 삭제
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

  // 수정 (제목/내용 + 이미지 파일도 함께 전송)
  const handleUpdate = () => {
  if (!auth?.accessToken) {
    alert("로그인이 필요합니다.");
    navi("/members/login");
    return;
  }

  if (!window.confirm("수정 내용을 저장할까요?")) return;

  const formData = new FormData();
  formData.append("imgBoardTitle", editTitle);
  formData.append("imgBoardContent", editContent);

  // 여러 파일을 같은 key 이름으로 계속 append
  if (editFiles && editFiles.length > 0) {
    editFiles.forEach((file) => {
      formData.append("files", file);
    });
  }

  axios
    .put(`http://localhost:8081/boards/imgBoards/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
    .then((res) => {
      alert("수정되었습니다!");

      const data = res.data || imgBoard;
      setImgBoard(data);

      setEditFiles([]);  // 선택 파일 초기화
      setEditMode(false);
    })
    .catch((err) => {
      console.error("수정 실패:", err);
      alert("수정에 실패했습니다.");
    });
  };

  if (loading) return <div>로딩 중...</div>;
  if (!imgBoard) return <div>게시글을 찾을 수 없습니다. 관리자에게 문의하세요.</div>;

  const isWriter =
    auth?.userId && imgBoard.imgBoardWriter && imgBoard.imgBoardWriter === auth.userId;

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
          <BoardWriter>작성자 : {imgBoard.imgBoardWriter}</BoardWriter>

          {/* 수정 모드에서 이미지 파일 선택 */}
          <div style={{ margin: "10px 0" }}>
            <div style={{ marginBottom: "6px" }}>이미지 변경 (여러 개 선택 가능)</div>
            <input
              type="file"
              accept="image/*"
              multiple      // 여러 개 선택
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                setEditFiles(files);
              }}
            />
          </div>

          {/* 현재 이미지 미리보기 (있으면) */}
          {imgBoard.attachments && imgBoard.attachments.length > 0 && (
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <div style={{ marginBottom: "4px", fontSize: "14px" }}>
                현재 등록된 이미지
              </div>
              {imgBoard.attachments.map((att) => (
                <img
                  key={att.fileNo}
                  src={att.filePath}
                  alt={att.originName}
                  style={{
                    maxWidth: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    display: "block",
                  }}
                />
              ))}
            </div>
          )}

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
          <Title>{imgBoard.imgBoardTitle}</Title>
          <BoardWriter>
            <span>작성자 : {imgBoard.imgBoardWriter}</span>
            <span>작성일 : {imgBoard.imgBoardDate}</span>
            <span>조회 : {imgBoard.imgCount}</span>
          </BoardWriter>
          <hr />
          {imgBoard.attachments && imgBoard.attachments.length > 0 && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              {imgBoard.attachments.map((att) => (
                <img
                  key={att.fileNo}
                  src={att.filePath}
                  alt={att.originName}
                  style={{
                    maxWidth: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    display: "block",
                  }}
                />
              ))}
            </div>
          )}
          <BoardContent>{imgBoard.imgBoardContent}</BoardContent>
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
                      setEditTitle(imgBoard.imgBoardTitle);
                      setEditContent(imgBoard.imgBoardContent);
                      setEditFiles(null);
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

        <ImgBoardComment imgBoardNo={imgBoard.imgBoardNo || id} />
      </BottomArea>
    </Container>
  );
};

export default ImgBoardDetail;
