import React, { useContext, useEffect, useState } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import * as S from "./CommunityDeclaration.styles";
import { AuthContext } from "../../../context/AuthContext";
import { axiosAuth } from "../../../api/reqService";
import { useNavigate } from "react-router-dom";

const CommentDeclaration = () => {
  const { auth } = useContext(AuthContext);
  const [reportList, setReportList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.accessToken) {
      setLoading(false);
      return;
    }
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await axiosAuth.getActual(
          `/api/admin/community/comment/declaration`
        );
        setReportList(Array.isArray(response) ? response : []);
      } catch (error) {
        setReportList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [auth]);

  const handleDelete = async (reportNo) => {
    if (!window.confirm("신고된 댓글을 삭제하시겠습니까?")) return;
    try {
      await axiosAuth.delete(
        `/api/admin/community/comment/declaration/delete/${reportNo}`
      );
      setReportList((prev) =>
        prev.filter((item) => item.reportNo !== reportNo)
      );
      alert("삭제 처리가 완료되었습니다.");
    } catch (error) {
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  const handleReject = async (reportNo) => {
    if (!window.confirm("신고를 반려하시겠습니까?")) return;
    try {
      await axiosAuth.put(
        `/api/admin/community/comment/declaration/reject/${reportNo}`
      );
      setReportList((prev) =>
        prev.filter((item) => item.reportNo !== reportNo)
      );
      alert("반려 처리가 완료되었습니다.");
    } catch (error) {
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <S.Container>
      <S.TitleArea>
        <h2>Comment Management</h2>
        <p>신고된 댓글 통합 관리</p>
      </S.TitleArea>

      <S.ListCard>
        <S.CardHeader>
          <h3>신고된 댓글</h3>
          <span className="sub-text">커뮤니티 내 부적절한 댓글 신고현황</span>
        </S.CardHeader>

        <S.Header>
          <S.Col flex={2.5} align="flex-start" style={{ paddingLeft: "30px" }}>
            댓글 정보
          </S.Col>
          <S.Col flex={2}>신고 사유</S.Col>
          <S.Col flex={1.2}>신고 일자</S.Col>
          <S.Col flex={1.2}>대상자 / 신고자</S.Col>
          <S.Col flex={1}>관리</S.Col>
        </S.Header>

        {loading ? (
          <S.LoadingState>데이터 로딩 중...</S.LoadingState>
        ) : reportList.length > 0 ? (
          reportList.map((item) => (
            <S.Row key={item.reportNo}>
              <S.Col
                flex={2.5}
                align="flex-start"
                style={{ paddingLeft: "20px" }}
              >
                <input type="checkbox" style={{ cursor: "pointer" }} />
                <div className="icon-box">
                  <FaCommentDots />
                </div>
                <div className="content-info">
                  <span className="main-title">
                    {item.targetTitle
                      ? item.targetTitle.length > 25
                        ? item.targetTitle.substring(0, 25) + "..."
                        : item.targetTitle
                      : "내용 없음"}
                  </span>
                  <span className="sub-info">
                    ID #{item.targetNo} · {item.targetType}
                  </span>
                </div>
              </S.Col>
              <S.Col flex={2} style={{ fontWeight: "500" }}>
                {item.reason}
              </S.Col>
              <S.Col flex={1.2} style={{ fontSize: "13px", color: "#64748b" }}>
                {item.reportDate}
              </S.Col>
              <S.Col flex={1.2}>
                <div className="user-info">
                  <span className="target-user">{item.reportedUserName}</span>
                  <span className="reporter">from: {item.reporterName}</span>
                </div>
              </S.Col>
              <S.Col flex={1}>
                <S.ActionGroup>
                  <S.DeleteBtn onClick={() => handleDelete(item.reportNo)}>
                    삭제
                  </S.DeleteBtn>
                  <S.RejectBtn
                    onClick={() => handleReject(item.reportNo)}
                    title="반려"
                  >
                    <FaTimes />
                  </S.RejectBtn>
                </S.ActionGroup>
              </S.Col>
            </S.Row>
          ))
        ) : (
          <S.EmptyState>신고된 댓글이 없습니다.</S.EmptyState>
        )}
      </S.ListCard>
    </S.Container>
  );
};

export default CommentDeclaration;
