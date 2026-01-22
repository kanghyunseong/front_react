// src/component/Boards/Notice/Notice.styles.js
import styled from "styled-components";

/* ===================== 공통 Container ===================== */
export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  font-family: "Pretendard", sans-serif;
`;

/* ===================== 헤더 (목록/상세 공용) ===================== */
export const Header = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 40px;

  img {
    width: 100%;
    display: block;
  }

  .title-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    font-weight: bold;
    color: black;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

/* ===================== 탭 메뉴 ===================== */
export const TabMenu = styled.div`
  display: flex;
  border-bottom: 2px solid black;
  margin-bottom: 20px;
`;

export const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: transparent;
  font-weight: bold;
  border-bottom: ${(props) => (props.$active ? "2px solid black" : "none")};
  color: ${(props) => (props.$active ? "black" : "#888")};
  cursor: pointer;
`;

/* ===================== 목록 테이블 ===================== */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const Thead = styled.thead`
  background-color: #f7f7f7;
`;

export const Tr = styled.tr`
  border-top: 1px solid #ddd;
`;

export const Th = styled.th`
  padding: 10px;
  font-weight: 600;
`;

export const Td = styled.td`
  padding: 10px;
  text-align: center;
`;

export const TitleTd = styled(Td)`
  text-align: left;
  cursor: pointer;
`;

/* ===================== 페이지네이션 ===================== */
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 4px;
    padding: 6px 10px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
    border-radius: 4px;
  }
`;

/* ===================== 검색 ===================== */
export const SelectBox = styled.select`
  padding: 0 10px;
  border: 1px solid #aaa;
  height: 40px;
  border-radius: 6px;
  font-size: 14px;
  appearance: none;
`;

/* ===================== 상세 페이지 ===================== */

/* 상세 제목 */
export const DetailTitle = styled.h1`
  margin-top: 20px;
  font-size: 28px;
  border-bottom: 2px solid #222;
  padding-bottom: 10px;
`;

/* 상세 정보 (작성자/날짜/조회수) */
export const InfoBox = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 30px;
  color: gray;
`;

/* 상세 내용 */
export const Content = styled.div`
  margin-top: 20px;
  font-size: 18px;
  line-height: 1.6;
  white-space: pre-wrap; /* 줄바꿈 유지 */
`;

/* 뒤로가기 버튼 */
export const BackButton = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  background: black;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  border: none;
`;
