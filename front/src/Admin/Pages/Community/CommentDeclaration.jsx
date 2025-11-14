import React from "react";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import * as S from "./CommunityDeclaration.styles"; // 스타일 재사용

const CommentDeclaration = () => {
  const commentList = [
    {
      text: "신고된 댓글 내용입니다",
      content: "부적합한 게시글 내용",
      user: "강현성",
    },
    { text: "Billing #345-Nov 2022", content: "신고한 내용", user: "유성현" },
    { text: "Billing #213-Oct 2022", content: "신고한 내용", user: "예약 전" },
  ];

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
          <h3 style={{ margin: 0 }}>신고된 댓글</h3>
          <span style={{ fontSize: "12px", color: "#999" }}>
            자유게시판 신고내역
          </span>
        </div>

        <S.Header>
          <S.Col flex={2} align="flex-start" style={{ paddingLeft: "20px" }}>
            신고 댓글
          </S.Col>
          <S.Col flex={2}>신고내용</S.Col>
          <S.Col flex={1}>유저명</S.Col>
          <S.Col flex={1}></S.Col>
        </S.Header>

        {commentList.map((item, idx) => (
          <S.Row key={idx}>
            <S.Col flex={2} align="flex-start" style={{ paddingLeft: "20px" }}>
              <input type="checkbox" />
              <div className="icon-box">
                <FaFilePdf />
              </div>
              <span>{item.text}</span>
            </S.Col>
            <S.Col flex={2}>{item.content}</S.Col>
            <S.Col flex={1}>{item.user}</S.Col>
            <S.Col flex={1}>
              <S.DeleteBtn>삭제하기</S.DeleteBtn>
              <S.CloseIcon>
                <FaTimes />
              </S.CloseIcon>
            </S.Col>
          </S.Row>
        ))}
      </S.ListCard>
    </S.Container>
  );
};

export default CommentDeclaration;
