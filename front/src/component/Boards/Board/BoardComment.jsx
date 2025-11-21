import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext.jsx";

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
} from "./Board.styles";

const BoardComment = ({ boardNo }) => {
  const { auth } = useContext(AuthContext);
  const isLoggedIn = auth?.isAuthenticated;

  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  // 수정 중인 댓글 상태
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  // 댓글 목록 불러오기
  const loadComments = () => {
    if (!boardNo) return;

    axios
      .get(`http://localhost:8081/comments?boardNo=${boardNo}`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      })
      .then((res) => {
        setComments(res.data || []);
      })
      .catch((err) => {
        console.error("댓글 조회 실패:", err);
      });
  };

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardNo]);

  // 댓글 등록
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

    axios
      .post(
        "http://localhost:8081/comments",
        {
          // ✅ 백엔드 DTO 필드명에 맞게 변경 필요
          // TB_COMMENT 의 REF_BNO 이고, DTO 가 refBno 인 경우
          refBno: boardNo,
          commentContent: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((res) => {
        alert("댓글이 등록되었습니다.");
        setCommentContent("");
        loadComments();
      })
      .catch((err) => {
        console.error("댓글 등록 실패:", err);
        alert("댓글 등록에 실패했습니다.");
      });
  };

  // 수정 버튼 클릭
  const handleEditClick = (comment) => {
    setEditingId(comment.commentNo);
    setEditingContent(comment.commentContent);
  };

  // 수정 취소
  const handleEditCancel = () => {
    setEditingId(null);
    setEditingContent("");
  };

  // 댓글 수정 저장
  const handleUpdateComment = (commentNo) => {
    if (!editingContent.trim()) {
      alert("수정할 내용을 입력해주세요.");
      return;
    }

    axios
      .put(
        `http://localhost:8081/comments/${commentNo}`,
        {
          commentContent: editingContent,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((res) => {
        alert("댓글이 수정되었습니다.");
        setEditingId(null);
        setEditingContent("");
        loadComments();
      })
      .catch((err) => {
        console.error("댓글 수정 실패:", err);
        alert("댓글 수정에 실패했습니다.");
      });
  };

  // 댓글 삭제
  const handleDeleteComment = (commentNo) => {
    if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;

    axios
      .delete(`http://localhost:8081/comments/${commentNo}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        alert("댓글이 삭제되었습니다.");
        loadComments();
      })
      .catch((err) => {
        console.error("댓글 삭제 실패:", err);
        alert("댓글 삭제에 실패했습니다.");
      });
  };

  // 댓글 신고
  const handleReportComment = (commentNo) => {
    const reason = window.prompt("신고 사유를 입력하세요.");
    if (!reason) return;

    axios
      .post(
        `http://localhost:8081/comments/${commentNo}/report`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then(() => {
        alert("신고가 접수되었습니다.");
      })
      .catch((err) => {
        console.error("댓글 신고 실패:", err);
        alert("댓글 신고에 실패했습니다.");
      });
  };

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
              const isCommentWriter = comment.commentWriter === auth.userId;

              const isEditing = editingId === comment.commentNo;

              return (
                <tr key={comment.commentNo || index}>
                  <CommentCell>{rowNumber}</CommentCell>
                  <CommentCell>{comment.commentWriter}</CommentCell>
                  <CommentCell>
                    {isEditing ? (
                      <CommentInput
                        as="textarea"
                        style={{ minHeight: "50px", marginTop: 0 }}
                        value={editingContent}
                        onChange={(e) =>
                          setEditingContent(e.target.value)
                        }
                      />
                    ) : (
                      comment.commentContent
                    )}
                  </CommentCell>
                  <CommentCell>{comment.commentDate}</CommentCell>
                  <CommentCell>
                    {isCommentWriter ? (
                      isEditing ? (
                        <>
                          <CommentActionButton
                            onClick={() =>
                              handleUpdateComment(comment.commentNo)
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
                              handleDeleteComment(comment.commentNo)
                            }
                          >
                            삭제
                          </CommentActionButton>
                        </>
                      )
                    ) : (
                      <CommentActionButton
                        onClick={() =>
                          handleReportComment(comment.commentNo)
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
    </CommentArea>
  );
};

export default BoardComment;
