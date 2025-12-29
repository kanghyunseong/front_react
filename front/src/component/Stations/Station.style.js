import styled from "styled-components";

/**
 * Station.jsx (메인 컴포넌트)에서 사용하는 스타일
 * - 전체 레이아웃 구조
 */

// 전체 컨테이너
export const MainContainer = styled.div`
  width: 100%;
  background: #f5f7fb;
  display: flex;
  height: 1000px;
`;

// 왼쪽 섹션 (검색 영역)
export const LeftSection = styled.div`
  display: flex;
  height: 800px;
  background: #9191919e;
  width: 20%;
  flex-direction: column;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 25px;
`;

// 오른쪽 섹션 (지도 + 리뷰 영역)
export const RightSection = styled.div`
  display: flex;
  height: 1000px;
  background: white;
  width: 80%;
  flex-direction: column;
`;
