import React, { useContext, useEffect, useState } from "react";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import * as S from "./CommunityDeclaration.styles";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const CommentDeclaration = () => {
  const { auth } = useContext(AuthContext);
  const [reportList, setReportList] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
<<<<<<< HEAD
=======

>>>>>>> 56355bf5bcecc4a203a44b67dda988ddc33893ae
  useEffect(() => {
    if (!auth || !auth.accessToken) {
      setLoading(false);
      return;
    }

    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
<<<<<<< HEAD
          `${apiUrl}/admin/api/community/comment/declaration`,
=======
          `${apiUrl}/api/admin/api/community/comment/declaration`,
>>>>>>> 56355bf5bcecc4a203a44b67dda988ddc33893ae
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        );
        setReportList(response.data);
      } catch (error) {
        cconsole.error("댓글 신고 목록 로딩 실패:", error);
        alert("목록을 불러오는 데 실패했습니다. 관리자에게 문의하세요.");
        setReportList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [auth]);

  const handleDelete = async (reportNo) => {
    if (!window.confirm("정말 이 신고 내역을 삭제(승인) 하시겠습니까?")) return;

    const token = auth?.accessToken;
    if (!token) {
      alert("인증 정보가 없습니다. 로그인해주세요.");
      return;
    }

    try {
      await axios.delete(
<<<<<<< HEAD
        `${apiUrl}/admin/api/community/comment/declaration/delete/${reportNo}`,
=======
        `${apiUrl}/api/admin/api/community/comment/declaration/delete/${reportNo}`,
>>>>>>> 56355bf5bcecc4a203a44b67dda988ddc33893ae
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      );
      setReportList((prev) =>
        prev.filter((item) => item.reportNo !== reportNo)
      );
      alert("삭제(승인) 처리되었습니다.");
    } catch (error) {
      const status = error.response.status;
      const serverMsg = error.response.data.message || "서버 내부 오류";

      if (status === 404) {
        alert(
          `삭제 실패: ${serverMsg} (이미 처리되었거나 존재하지 않는 신고입니다.)`
        );
      } else if (status === 401 || status === 403) {
        alert(
          "권한이 없거나 세션이 만료되었습니다. 로그인 페이지로 이동하세요."
        );
      } else if (status === 401 || status === 403) {
        alert(`삭제 처리 중 오류가 발생했습니다: ${serverMsg}`);
      } else {
        alert("네트워크 오류로 요청에 실패했습니다.");
      }
    }
  };

  const handleReject = async (reportNo) => {
    if (!window.confirm("이 신고를 반려(취소) 처리 하시겠습니까?")) return;
    const token = auth?.accessToken;

    if (!token) {
      alert("인증 정보가 없습니다. 로그인 해주세요.");
      return;
    }

    try {
      await axios.put(
<<<<<<< HEAD
        `${apiUrl}/admin/api/community/comment/declaration/reject/${reportNo}`,
=======
        `${apiUrl}/api/admin/api/community/comment/declaration/reject/${reportNo}`,
>>>>>>> 56355bf5bcecc4a203a44b67dda988ddc33893ae
        {},
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      );
      setReportList((prev) =>
        prev.filter((item) => item.reportNo !== reportNo)
      );
      alert("반려 처리되었습니다.");
    } catch (error) {
      console.error("반려 실패:", error);
      if (error.response) {
        const status = error.response.status;
        const serverMsg = error.response.data.message || "서버 내부 오류";

        if (status === 404) {
          alert(
            `반려 실패: ${serverMsg} (이미 처리되었거나 존재하지 않는 신고입니다.)`
          );
        } else if (status === 401 || status === 403) {
          alert(
            "권한이 없거나 세션이 만료되었습니다. 로그인 페이지로 이동하세요."
          );
          Navigate("/members/login");
        } else {
          alert(`반려 처리 중 오류가 발생했습니다: ${serverMsg}`);
        }
      } else {
        alert("반려 처리 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
        신고 내역을 불러오는 중입니다...
      </div>
    );
  }

  return (
    <S.Container>
      <S.TitleArea>
        <h2>Community / Comment declaration</h2>
        <h3>Enumeration</h3>
        <p>comment declaration</p>
      </S.TitleArea>

      <S.ListCard>
        <div
          style={{ padding: "0 0 20px 10px", borderBottom: "1px solid #eee" }}
        >
          <h3 style={{ margin: 0 }}>신고된 댓글</h3>
          <span style={{ fontSize: "12px", color: "#999" }}>
            자유 / 이미지 게시판 댓글 신고내역
          </span>
        </div>

        <S.Header>
          <S.Col
            flex={2}
            style={{
              paddingLeft: "20px",
              fontWeight: "bold",
              color: "#555",
              justifyContent: "flex-start",
              display: "flex",
            }}
          >
            댓글 정보
          </S.Col>
          <S.Col flex={2} style={{ fontWeight: "bold", color: "#555" }}>
            신고 사유
          </S.Col>
          <S.Col flext={1} style={{ fontWeight: "bold", color: "#555" }}>
            신고 일자
          </S.Col>
          <S.Col flex={1} style={{ fontWeight: "bold", color: "#555" }}>
            피신고자 / 신고자
          </S.Col>
          <S.Col flex={1.5} style={{ fontWeight: "bold", color: "#555" }}>
            관리
          </S.Col>
        </S.Header>

        {reportList.map((item) => (
          <S.Row key={item.reportNo}>
            <S.Col
              flex={2}
              style={{
                paddingLeft: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <input type="checkbox" style={{ cursor: "pointer" }} />
              <div className="icon-box" style={{ margin: "0 15px 0 10px" }}>
                <FaFilePdf />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#333",
                    marginBottom: "3px",
                    lineHeight: "1.3",
                  }}
                >
                  {item.targetTitle
                    ? item.targetTitle.length > 20
                      ? item.targetTitle.substring(0, 20) + "..."
                      : item.targetTitle
                    : "내용 없음 (삭제됨)"}
                </span>
                <span style={{ fontSize: "11px", color: "#999" }}>
                  [{item.targetType}] #{item.targetNo}
                </span>
              </div>
            </S.Col>

            <S.Col
              flex={2}
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.reason}
            </S.Col>
            <S.Col
              flext={1}
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.reportDate}
            </S.Col>

            <S.Col
              flex={1}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ fontWeight: "500" }}>
                  {item.reportedUserName}
                </span>
                <div style={{ fontSize: "0.8rem", color: "#888" }}>
                  (from: {item.reporterName})
                </div>
              </div>
            </S.Col>

            <S.Col
              flex={1.5}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <S.DeleteBtn onClick={() => handleDelete(item.reportNo)}>
                삭제
              </S.DeleteBtn>
              <S.CloseIcon
                onClick={() => handleReject(item.reportNo)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <FaTimes />
              </S.CloseIcon>
            </S.Col>
          </S.Row>
        ))}

        {reportList.length === 0 && (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              width: "100%",
              color: "#999",
            }}
          >
            신고된 내역이 없습니다.
          </div>
        )}
      </S.ListCard>
    </S.Container>
  );
};

export default CommentDeclaration;
