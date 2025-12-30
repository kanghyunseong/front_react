import React, { useContext, useEffect, useState } from "react";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import * as S from "./CommunityDeclaration.styles";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CommunityDeclaration = () => {
  const { auth } = useContext(AuthContext);
  const [reportList, setReportsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  useEffect(() => {
    if (!auth || !auth.accessToken) {
      setLoading(false);
      return;
    }

    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/admin/api/community/declaration`,
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        );
        setReportsList(response.data);
      } catch (error) {
        console.error("데이터 로딩 실패", error);
        alert("신고 목록을 불러오는 데 실패했습니다.");
        setReportsList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [auth]);

  const handleDelete = async (reportNo) => {
    if (loading) return;
    if (!window.confirm("정말 해당 게시글(신고된 게시글)을 삭제하시겠습니까?"))
      return;

    const token = auth.accessToken;
    if (!token) {
      alert("인증 정보가 없습니다. 다시 로그인 해주세요");
      return;
    }

    try {
      await axios.delete(
        `${apiUrl}/api/admin/api/community/declaration/delete/${reportNo}`,
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      );
      setReportsList((prev) =>
        prev.filter((item) => item.reportNo !== reportNo)
      );
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      const serverMsg =
        error.response?.data?.message || "서버 내부 오류가 발생했습니다.";
      if (error.response && error.response.status === 404) {
        alert(
          `삭제 실패: ${serverMsg} (이미 처리되었거나 ID를 찾을 수 없습니다.)`
        );
      } else if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        alert("권한 오류: 로그인 세션이 만료되었습니다.");
      } else {
        alert(`삭제 처리에 실패했습니다: ${serverMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleReject = async (reportNo) => {
    if (loading) return;
    if (!window.confirm("정말 이 신고 내역을 반려하시겠습니까?")) return;

    const token = auth.accessToken;
    if (!token) {
      alert("인증 정보가 없습니다. 다시 로그인 해주세요");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `${apiUrl}/api/admin/api/community/declaration/reject/${reportNo}`,
        {},
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      );
      setReportsList((prev) =>
        prev.filter((item) => item.reportNo !== reportNo)
      );
      alert("반려되었습니다.");
    } catch (error) {
      console.log("반려 실패 : ", error);
      const serverMsg =
        error.response?.data?.message || "서버 내부 오류가 발생했습니다.";

      if (error.response && error.response.status === 404) {
        alert(
          `반려 실패: ${serverMsg} (이미 처리되었거나 ID를 찾을 수 없습니다.)`
        );
      } else if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        alert("권한 오류: 로그인 세션이 만료되었습니다.");
      } else {
        alert(`반려 처리에 실패했습니다: ${serverMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && reportList.length === 0) {
    return (
      <S.Container
        style={{ textAlign: "center", padding: "40px", color: "#6B4CE6" }}
      >
        신고 목록을 불러오는 중입니다...
      </S.Container>
    );
  }
  return (
    <S.Container>
      <S.TitleArea>
        <h2>Community / Community declaration</h2>
        <h3>Enumeration</h3>
        <p>Community declaration</p>
      </S.TitleArea>

      <S.ListCard>
        <div
          style={{ padding: "0 0 20px 10px", borderBottom: "1px solid #eee" }}
        >
          <h3 style={{ margin: 0 }}>신고된 게시글</h3>
          <span style={{ fontSize: "12px", color: "#999" }}>
            자유 / 이미지 게시판 신고내역
          </span>
        </div>

        <S.Header>
          <S.Col
            flex={2}
            align="flex-start"
            style={{ paddingLeft: "20px", fontWeight: "bold", color: "#555" }}
          >
            게시글 정보
          </S.Col>
          <S.Col flex={2} style={{ fontWeight: "bold", color: "#555" }}>
            신고 사유
          </S.Col>
          <S.Col flex={1} style={{ fontWeight: "bold", color: "#555" }}>
            피신고자 / 신고자
          </S.Col>
          <S.Col flex={1} style={{ fontWeight: "bold", color: "#555" }}>
            관리
          </S.Col>
        </S.Header>

        {reportList.map((item) => (
          <S.Row key={item.reportNo}>
            <S.Col flex={2} align="flex-start" style={{ paddingLeft: "20px" }}>
              <input type="checkbox" />
              <div className="icon-box">
                <FaFilePdf />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  {item.targetTitle ? item.targetTitle : "제목 없음 (삭제됨)"}
                </span>
                <span style={{ fontSize: "11px", color: "#999" }}>
                  [{item.targetType}] #{item.targetNo}
                </span>
              </div>
            </S.Col>

            <S.Col flex={2} style={{ fontSize: "14px" }}>
              {item.reason}
            </S.Col>

            <S.Col flex={1}>
              <div>
                <span style={{ fontWeight: "500" }}>
                  {item.reportedUserName}
                </span>
                <div style={{ fontSize: "0.8rem", color: "#888" }}>
                  (from: {item.reporterName})
                </div>
              </div>
            </S.Col>

            <S.Col flex={1}>
              <S.DeleteBtn onClick={() => handleDelete(item.reportNo)}>
                삭제하기
              </S.DeleteBtn>
              <S.CloseIcon onClick={() => handleReject(item.reportNo)}>
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

export default CommunityDeclaration;
