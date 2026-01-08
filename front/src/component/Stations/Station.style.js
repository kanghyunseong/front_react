import styled from "styled-components";

// 전체 컨테이너: 화면 전체 높이를 사용하도록 변경
export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh; /* 고정 px 대신 뷰포트 높이 사용 */
  background-color: #f0f2f5;
  overflow: hidden; /* 전체 페이지 스크롤 방지 */
`;

// 왼쪽 섹션: 검색 영역 (그림자와 화이트톤으로 변경)
export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px; /* 고정 너비로 안정감 부여 */
  min-width: 300px;
  background: white;
  margin: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 10;
  overflow-y: auto; /* 내용이 많아지면 내부 스크롤 */
  padding: 20px;
`;

// 오른쪽 섹션: 지도 + 리뷰 영역
export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간 모두 차지 */
  height: 100%;
  padding: 20px 20px 20px 0; /* 왼쪽 섹션과의 간격 */
  gap: 20px; /* 지도와 리뷰 사이 간격 */
`;

// 지도 컨테이너 래퍼 (MapSection 내부에서 쓸 수 있도록 유도)
export const MapWrapper = styled.div`
  flex: 1.5; /* 지도 비중 확대 */
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

// 리뷰 컨테이너 래퍼 (ReviewSection 내부에서 쓸 수 있도록 유도)
export const ReviewWrapper = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 20px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 15px;
`;
