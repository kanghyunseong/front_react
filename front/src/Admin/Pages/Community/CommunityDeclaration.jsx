import React, { useContext, useEffect, useState } from "react";
import { FaFileAlt, FaTimes } from "react-icons/fa";
import * as S from "./CommunityDeclaration.styles";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../../../api/reqService";

const CommunityDeclaration = () => {
  const { auth } = useContext(AuthContext);
  const [reportList, setReportsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  useEffect(() => {
    if (!auth?.accessToken) {
      setLoading(false);
      return;
    }
    const fetchReports = async () => {
      setLoading(true);
      try {
        const result = await axiosAuth.getActual(
          `/api/admin/community/declaration`
        );
        setReportsList(Array.isArray(result) ? result : []);
      } catch (error) {
        setReportsList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [auth]);

  const handleDelete = async (reportNo) => {
    if (!window.confirm("신고를 승인하고 게시글을 삭제하시겠습니까?")) return;
    try {
      await axiosAuth.delete(
        `/api/admin/community/declaration/delete/${reportNo}`
      );
      setReportsList((prev) =>
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
        `/api/admin/community/declaration/reject/${reportNo}`
      );
      setReportsList((prev) =>
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
        <h2>Community Management</h2>
        <p>게시글 신고 내역 통합 관리</p>
      </S.TitleArea>

      <S.ListCard>
        <S.CardHeader>
          <h3>신고된 게시글</h3>
          <span className="sub-text">자유 / 이미지 게시판 신고내역</span>
        </S.CardHeader>

        <S.Header>
          <S.Col flex={2.5} align="flex-start" style={{ paddingLeft: "30px" }}>
            게시글 정보
          </S.Col>
          <S.Col flex={2}>신고 사유</S.Col>
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
                  <FaFileAlt />
                </div>
                <div className="content-info">
                  <span className="main-title">
                    {item.targetTitle || "제목 없음"}
                  </span>
                  <span className="sub-info">
                    [{item.targetType}] #{item.targetNo}
                  </span>
                </div>
              </S.Col>
              <S.Col flex={2} style={{ fontWeight: "500" }}>
                {item.reason}
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
          <S.EmptyState>신고된 게시글이 없습니다.</S.EmptyState>
        )}
      </S.ListCard>
    </S.Container>
  );
};

export default CommunityDeclaration;
