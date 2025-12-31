import { useEffect, useContext, useState, useRef } from "react";
import { axiosAuth, axiosPublic } from "../../../api/reqService.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import ReportModal from "../ReportModal.jsx";
import {
  CommentArea,
  CommentWriteTitle,
  CommentInput,
  CommentDisabledBox,
  CommentWriteButtonRow,
  CommentTable,
  CommentHeadCell,
  CommentCell,
  CommentActionButton,
  Button,
} from "./ImgBoard.styles";

const ImgBoardComment = ({ imgBoardNo }) => {
  const { auth } = useContext(AuthContext);
  const isLoggedIn = auth?.isAuthenticated;

  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  // textarea 자동 높이 조절용 ref
  const textareaRef = useRef(null);

  // 수정 중인 댓글 상태
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  // 신고 기능
  const [reportOpen, setReportOpen] = useState(false);
  const [reportingCommentId, setReportingCommentId] = useState(null);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  // ================= 댓글 목록 불러오기 =================
  const loadComments = () => {
    if (!imgBoardNo) return;

    axiosPublic
      .getActual(`/api/imgComments?imgBoardNo=${imgBoardNo}`)
      .then(setComments)
      .catch((err) => console.error("갤러리 댓글 조회 실패:", err));
  };

  useEffect(() => {
    loadComments();
  }, [imgBoardNo]);

  // 작성 textarea 자동 높이 조절
  useEffect(() => {
    if (!textareaRef.current) return;
    const ta = textareaRef.current;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }, [commentContent]);

  // ================= 댓글 등록 =================
  const handleInsertComment = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("댓글 작성을 하시려면 로그인 해주세요.");
      return;
    }

    if (commentContent.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    axiosAuth
      .post("/api/imgComments", {
        refIno: imgBoardNo,
        imgCommentContent: commentContent,
      })
      .then((res) => {
        const msg = res.data?.message || "댓글이 등록되었습니다.";
        alert(msg);
        setCommentContent("");
        loadComments();
      })
      .catch((err) => {
        console.error("갤러리 댓글 등록 실패:", err);
        const msg =
          err.response?.data?.["error-message"] || "댓글 등록에 실패했습니다.";
        alert(msg);
      });
  };

  // ================= 댓글 수정 =================
  const handleEditClick = (comment) => {
    setEditingId(comment.imgCommentNo);
    setEditingContent(comment.imgCommentContent);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const handleUpdateComment = (imgCommentNo) => {
    if (!editingContent.trim()) {
      alert("수정할 내용을 입력해주세요.");
      return;
    }

    axiosAuth
      .put(`/api/imgComments/${imgCommentNo}`, {
        imgCommentContent: editingContent,
      })
      .then((res) => {
        const msg = res.data?.message || "댓글이 수정되었습니다.";
        alert(msg);
        setEditingId(null);
        setEditingContent("");
        loadComments();
      })
      .catch((err) => {
        console.error("갤러리 댓글 수정 실패:", err);
        const msg =
          err.response?.data?.["error-message"] || "댓글 수정에 실패했습니다.";
        alert(msg);
      });
  };

  // ================= 댓글 삭제 =================
  const handleDeleteComment = (imgCommentNo) => {
    if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;

    axiosAuth
      .delete(`/api/imgComments/${imgCommentNo}`)
      .then((res) => {
        const msg = res.data?.message || "댓글이 삭제되었습니다.";
        alert(msg);
        loadComments();
      })
      .catch((err) => {
        console.error("갤러리 댓글 삭제 실패:", err);
        const msg =
          err.response?.data?.["error-message"] || "댓글 삭제에 실패했습니다.";
        alert(msg);
      });
  };

  // ================= 댓글 신고 =================
  const openReportForComment = (imgCommentNo) => {
    setReportingCommentId(imgCommentNo);
    setReportOpen(true);
  };

  const handleSubmitReport = (reason) => {
    if (!reason) {
      alert("신고 사유를 입력해주세요.");
      return;
    }

    axiosAuth
      .post(`/api/imgComments/${reportingCommentId}/report`, { reason })
      .then((res) => {
        const msg = res.data?.message || "댓글 신고가 접수되었습니다.";
        alert(msg);
        setReportOpen(false);
      })
      .catch((err) => {
        console.error("갤러리 댓글 신고 실패:", err);
        const msg =
          err.response?.data?.["error-message"] || "신고에 실패했습니다.";
        alert(msg);
      });
  };

  // ================= 렌더링 =================
  return (
    <CommentArea>
      {/* 위: 댓글쓰기 박스 */}
      <CommentWriteTitle>댓글쓰기</CommentWriteTitle>

      {!isLoggedIn ? (
        <CommentDisabledBox>
          댓글 작성 하시려면 로그인 해주세요.
        </CommentDisabledBox>
      ) : (
        <>
          <CommentInput
            as="textarea"
            ref={textareaRef}
            rows={1}
            style={{
              minHeight: "40px",
              resize: "none",
              overflow: "hidden",
            }}
            value={commentContent}
            placeholder="댓글을 작성해 주세요."
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <CommentWriteButtonRow>
            <Button onClick={handleInsertComment}>작성하기</Button>
          </CommentWriteButtonRow>
        </>
      )}

      {/* 아래: 댓글 리스트 테이블 */}
      <CommentTable>
        <thead>
          <tr>
            <CommentHeadCell>번호</CommentHeadCell>
            <CommentHeadCell>댓글작성자</CommentHeadCell>
            <CommentHeadCell>댓글 작성 내용</CommentHeadCell>
            <CommentHeadCell>작성일</CommentHeadCell>
            <CommentHeadCell>관리</CommentHeadCell>
          </tr>
        </thead>
        <tbody>
          {comments.length === 0 ? (
            <tr>
              <CommentCell colSpan={5}>등록된 댓글이 없습니다.</CommentCell>
            </tr>
          ) : (
            comments.map((comment, index) => {
              const rowNumber = comments.length - index;
              const isCommentWriter = comment.imgCommentWriter === auth.userId;
              const isEditing = editingId === comment.imgCommentNo;

              return (
                <tr key={comment.imgCommentNo || index}>
                  <CommentCell>{rowNumber}</CommentCell>
                  <CommentCell>{comment.imgCommentWriter}</CommentCell>
                  <CommentCell>
                    {isEditing ? (
                      <CommentInput
                        as="textarea"
                        style={{ minHeight: "50px", marginTop: 0 }}
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                    ) : (
                      comment.imgCommentContent
                    )}
                  </CommentCell>
                  <CommentCell>{comment.imgCommentDate}</CommentCell>
                  <CommentCell>
                    {isCommentWriter ? (
                      isEditing ? (
                        <>
                          <CommentActionButton
                            onClick={() =>
                              handleUpdateComment(comment.imgCommentNo)
                            }
                          >
                            저장
                          </CommentActionButton>
                          <CommentActionButton onClick={handleEditCancel}>
                            취소
                          </CommentActionButton>
                        </>
                      ) : (
                        <>
                          <CommentActionButton
                            onClick={() => handleEditClick(comment)}
                          >
                            수정
                          </CommentActionButton>
                          <CommentActionButton
                            onClick={() =>
                              handleDeleteComment(comment.imgCommentNo)
                            }
                          >
                            삭제
                          </CommentActionButton>
                        </>
                      )
                    ) : (
                      <CommentActionButton
                        onClick={() =>
                          openReportForComment(comment.imgCommentNo)
                        }
                      >
                        댓글신고
                      </CommentActionButton>
                    )}
                  </CommentCell>
                </tr>
              );
            })
          )}
        </tbody>
      </CommentTable>

      <ReportModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onSubmit={handleSubmitReport}
        targetLabel="갤러리 댓글"
      />
    </CommentArea>
  );
};

export default ImgBoardComment;
