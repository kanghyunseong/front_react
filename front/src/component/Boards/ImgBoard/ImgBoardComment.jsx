import { useEffect, useState, useContext } from "react";
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
} from "./ImgBoard.styles";

const ImgBoardComment = ({ imgBoardNo }) => {
  const { auth } = useContext(AuthContext);
  const isLoggedIn = auth?.isAuthenticated;

  const [imgComments, setImgComments] = useState([]);
  const [imgCommentContent, setImgCommentContent] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgBoardNo]);

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
          refIno: imgBoardNo,             // ★ 백엔드 DTO 필드명
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
                          handleReportComment(imgComment.imgCommentNo)
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



export default ImgBoardComment;
