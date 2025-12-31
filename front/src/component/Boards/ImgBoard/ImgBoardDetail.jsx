import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosAuth } from "../../../api/reqService.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import ImgBoardComment from "./ImgBoardComment.jsx";
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
} from "./ImgBoard.styles";
import gasipan from "../../../assets/gasipan.png";

const ImgBoardDetail = () => {
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  const { id } = useParams();
  const navi = useNavigate();

  const [imgBoard, setImgBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  const { auth } = useContext(AuthContext);

  // 수정 모드 관련 상태
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editFiles, setEditFiles] = useState([]); // 수정 시 선택한 이미지
  const [previewUrls, setPreviewUrls] = useState([]);

  // 신고 기능
  const [reportOpen, setReportOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);

  // 글 불러오기 (로그인 필수)
  useEffect(() => {
    if (!auth?.accessToken) {
      alert("로그인이 필요한 서비스입니다.");
      navi("/members/login");
      return;
    }
    setLoading(true);

    axiosAuth
      .getActual(`/api/imgBoards/${id}`)
      .then((data) => {
        setImgBoard(data);
        setEditTitle(data.imgBoardTitle);
        setEditContent(data.imgBoardContent);
      })
      .catch((err) => {
        console.error("갤러리 상세보기 로딩 실패:", err);
        alert("게시글을 불러오는 데 실패했습니다.");
        navi("/imgBoards");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navi, auth?.accessToken]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // 삭제
  const handleDelete = () => {
    if (!auth?.accessToken) {
      alert("로그인이 필요합니다.");
      navi("/members/login");
      return;
    }

    if (!window.confirm("정말 삭제할까요?")) return;

    axiosAuth
      .delete(`/api/imgBoards/${id}`)
      .then((res) => {
        const msg = res.data?.message || "삭제되었습니다!";
        alert(msg);
        navi(-1);
      })
      .catch((err) => {
        console.error("삭제 실패:", err);
        const msg = err.response?.data?.message || "삭제에 실패했습니다.";
        alert(msg);
      });
  };

  // 수정 (제목/내용 + 이미지 파일도 함께 전송)
  const handleUpdate = () => {
    if (!auth?.accessToken) {
      alert("로그인이 필요합니다.");
      navi("/members/login");
      return;
    }

    if (!editTitle.trim() || !editContent.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    if (!window.confirm("수정 내용을 저장할까요?")) return;

    const formData = new FormData();
    formData.append("imgBoardTitle", editTitle);
    formData.append("imgBoardContent", editContent);

    if (editFiles && editFiles.length > 0) {
      editFiles.forEach((file) => {
        formData.append("files", file);
      });
    }

    axiosAuth
      .put(`/api/imgBoards/${id}`, formData)
      .then(() => {
        alert("수정되었습니다!");
        return axiosAuth.getActual(`/api/imgBoards/${id}`);
      })
      .then((data) => {
        setImgBoard(data);
        setEditTitle(data.imgBoardTitle);
        setEditContent(data.imgBoardContent);

        setEditFiles([]);
        setEditMode(false);
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        const msg = err.response?.data?.message || "수정에 실패했습니다.";
        alert(msg);
      });
  };

  // 신고 버튼 클릭 -> 모달 열기
  const handleOpenReportModal = () => {
    setReportTarget({ id, writer: imgBoard.imgBoardWriter });
    setReportOpen(true);
  };

  // 모달에서 제출했을 때 처리
  const handleSubmitReport = (reason) => {
    if (!reason) {
      alert("신고 사유를 입력해주세요.");
      return;
    }

    axiosAuth
      .post(`/api/imgBoards/${id}/report`, { reason })
      .then((res) => {
        const msg =
          res.data?.message ||
          "신고가 접수되었습니다. 운영자가 확인 후 처리합니다.";
        alert(msg);
        setReportOpen(false);
      })
      .catch((err) => {
        console.error("게시글 신고 실패:", err);
        const msg = err.response?.data?.message || "신고 접수에 실패했습니다.";
        alert(msg);
      });
  };

  if (loading) return <div>로딩 중...</div>;
  if (!imgBoard)
    return <div>게시글을 찾을 수 없습니다. 관리자에게 문의하세요.</div>;

  const isWriter =
    auth?.userId &&
    imgBoard.imgBoardWriter &&
    imgBoard.imgBoardWriter === auth.userId;

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

          <div style={{ margin: "10px 0" }}>
            <div style={{ marginBottom: "6px" }}>
              이미지 변경 (여러 개 선택 가능)
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                setEditFiles(files);
                const urls = files.map((file) => URL.createObjectURL(file));
                setPreviewUrls(urls);
              }}
            />
          </div>

          {editMode && (
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <div style={{ marginBottom: "6px", fontSize: "14px" }}>
                {editFiles.length > 0
                  ? "선택한 이미지 미리보기"
                  : "현재 등록된 이미지"}
              </div>

              {editFiles.length > 0
                ? previewUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt="preview"
                      style={{
                        maxWidth: "100%",
                        borderRadius: "8px",
                        marginBottom: "10px",
                        display: "block",
                      }}
                    />
                  ))
                : imgBoard.attachments?.map((att) => (
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
            <Button onClick={() => navi(-1)}>목록보기</Button>

            {!isWriter && (
              <>
                <Button
                  style={{ marginLeft: "8px" }}
                  onClick={handleOpenReportModal}
                >
                  신고하기
                </Button>
                <ReportModal
                  open={reportOpen}
                  onClose={() => setReportOpen(false)}
                  onSubmit={handleSubmitReport}
                  targetLabel="갤러리 게시글"
                />
              </>
            )}
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
                      setEditFiles([]);
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
