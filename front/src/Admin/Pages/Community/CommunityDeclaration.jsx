import React, { useContext, useEffect, useState } from "react";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import * as S from "./CommunityDeclaration.styles";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const CommunityDeclaration = () => {
  const { auth } = useContext(AuthContext);
  const [reportList, setReportsList] = useState([]);

  useEffect(() => {
    if (!auth || !auth.accessToken) return;

    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/admin/api/community/declaration`,
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        );
        setReportsList(response.data);
      } catch (error) {
        console.error("데이터 로딩 실패", error);
      }
    };
    fetchReports();
  }, [auth]);

  const handleDelete = async (reportNo) => {
    if (!window.confirm("정말 해당 게시글(신고된 게시글)을 삭제하시겠습니까?"))
      return;

    try {
      await axios.delete(
        `http://localhost:8081/admin/api/community/declaration/delete/${reportNo}`,
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
      alert("삭제 처리에 실패했습니다.");
    }
  };
  const handleReject = async (reportNo) => {
    if (!window.confirm("정말 이 신고 내역을 반려하시겠습니까?")) return;

    try {
      await axios.put(
        `http://localhost:8081/admin/api/community/declaration/reject/${reportNo}`,
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
      alert("반려 처리에 실패했습니다.");
    }
  };

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
