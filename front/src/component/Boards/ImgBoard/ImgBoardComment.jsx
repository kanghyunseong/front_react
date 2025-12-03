import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
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

  const [imgComments, setImgComments] = useState([]);
  const [imgCommentContent, setImgCommentContent] = useState("");

  const textareaRef = useRef(null); // 🔹 자동 높이 조절용 ref

  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  // 신고 기능
  const [reportOpen, setReportOpen] = useState(false);
  const [reportingCommentId, setReportingCommentId] = useState(null);

  const loadImgComments = () => {
    if (!imgBoardNo) return;

    axios
      .get(`http://localhost:8081/imgComments?imgBoardNo=${imgBoardNo}`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      })
      .then((res) => {
        setImgComments(res.data || []);
      })
      .catch((err) => {
        console.error("갤러리 댓글 조회 실패:", err);
      });
  };

  useEffect(() => {
    loadImgComments();
  }, [imgBoardNo]);

  // 🔹 작성 textarea 자동 높이 조절
  useEffect(() => {
    if (!textareaRef.current) return;
    const ta = textareaRef.current;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }, [imgCommentContent]);

  const handleInsertImgComment = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("댓글 작성을 하시려면 로그인 해주세요.");
      return;
    }

    if (imgCommentContent.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    axios
      .post(
        "http://localhost:8081/imgComments",
        {
          refIno: imgBoardNo,
          imgCommentContent: imgCommentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then(() => {
        alert("댓글이 등록되었습니다.");
        setImgCommentContent("");
        loadImgComments();
      })
      .catch((err) => {
        console.error("갤러리 댓글 등록 실패:", err);
        alert("댓글 등록에 실패했습니다.");
      });
  };

  const handleEditClick = (imgComment) => {
    setEditingId(imgComment.imgCommentNo);
    setEditingContent(imgComment.imgCommentContent);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const handleUpdateImgComment = (imgCommentNo) => {
    if (!editingContent.trim()) {
      alert("수정할 내용을 입력해주세요.");
      return;
    }

    axios
      .put(
        `http://localhost:8081/imgComments/${imgCommentNo}`,
        {
          imgCommentContent: editingContent,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then(() => {
        alert("댓글이 수정되었습니다.");
        setEditingId(null);
        setEditingContent("");
        loadImgComments();
      })
      .catch((err) => {
        console.error("갤러리 댓글 수정 실패:", err);
        alert("댓글 수정에 실패했습니다.");
      });
  };

  const handleDeleteImgComment = (imgCommentNo) => {
    if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;

    axios
      .delete(`http://localhost:8081/imgComments/${imgCommentNo}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        alert("댓글이 삭제되었습니다.");
        loadImgComments();
      })
      .catch((err) => {
        console.error("갤러리 댓글 삭제 실패:", err);
        alert("댓글 삭제에 실패했습니다.");
      });
  };

  // 댓글 신고
  const openReportForComment = (imgCommentNo) => {
    setReportingCommentId(imgCommentNo);
    setReportOpen(true);
  };

  const handleSubmitReport = (reason) => {
    if (!reason) {
      alert("신고 사유를 입력해주세요.");
      return;
    }

    const imgCommentNo = reportingCommentId;
    axios
      .post(
        `http://localhost:8081/imgComments/${imgCommentNo}/report`,
        {
          reason,
          reporter: auth.userId,
          targetType: "IMGCOMMENT",
          targetId: imgCommentNo,
        },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      .then(() => {
        alert("댓글 신고가 접수되었습니다.");
        setReportOpen(false);
      })
      .catch((err) => {
        console.error("댓글 신고 실패:", err);
        alert("신고에 실패했습니다.");
      });
  };

  return (
    <CommentArea>
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
            value={imgCommentContent}
            placeholder="댓글을 작성해 주세요."
            onChange={(e) => setImgCommentContent(e.target.value)}
          />
          <CommentWriteButtonRow>
            <Button onClick={handleInsertImgComment}>작성하기</Button>
          </CommentWriteButtonRow>
        </>
      )}

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
          {imgComments.length === 0 ? (
            <tr>
              <CommentCell colSpan={5}>등록된 댓글이 없습니다.</CommentCell>
            </tr>
          ) : (
            imgComments.map((imgComment, index) => {
              const rowNumber = imgComments.length - index;
              const isCommentWriter =
                imgComment.imgCommentWriter === auth.userId;
              const isEditing = editingId === imgComment.imgCommentNo;

              return (
                <tr key={imgComment.imgCommentNo || index}>
                  <CommentCell>{rowNumber}</CommentCell>
                  <CommentCell>{imgComment.imgCommentWriter}</CommentCell>
                  <CommentCell>
                    {isEditing ? (
                      <CommentInput
                        as="textarea"
                        style={{ minHeight: "50px", marginTop: 0 }}
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                    ) : (
                      imgComment.imgCommentContent
                    )}
                  </CommentCell>
                  <CommentCell>{imgComment.imgCommentDate}</CommentCell>
                  <CommentCell>
                    {isCommentWriter ? (
                      isEditing ? (
                        <>
                          <CommentActionButton
                            onClick={() =>
                              handleUpdateImgComment(imgComment.imgCommentNo)
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
                            onClick={() => handleEditClick(imgComment)}
                          >
                            수정
                          </CommentActionButton>
                          <CommentActionButton
                            onClick={() =>
                              handleDeleteImgComment(imgComment.imgCommentNo)
                            }
                          >
                            삭제
                          </CommentActionButton>
                        </>
                      )
                    ) : (
                      <CommentActionButton
                        onClick={() =>
                          openReportForComment(imgComment.imgCommentNo)
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
        targetLabel="댓글"
      />
    </CommentArea>
  );
};

export default ImgBoardComment;
