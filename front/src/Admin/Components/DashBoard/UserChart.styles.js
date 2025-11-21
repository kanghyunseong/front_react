import styled from "styled-components";

const PRIMARY_ACCENT = "#ff6384"; // 차트 라인 색상 (Red/Pink)
const BG_COLOR = "#2c2f33"; // 어두운 배경
const TEXT_COLOR = "#f0f0f0"; // 밝은 텍스트

export const Container = styled.div`
  /* 전체 위젯 컨테이너 */
  display: flex;
  flex-direction: column;
  background-color: ${BG_COLOR};
  border-radius: 12px;
  padding: 40px; /* ✨ 변경: 패딩 증가 (내부 여백) */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  color: ${TEXT_COLOR};
  font-family: "Roboto", sans-serif;
  /* ✨ 변경: 최대 너비 확장 (전체 흰색 영역에 맞게 더 크게) */
  max-width: 1200px;
  /* ✨ 변경: 최소 높이 확장 */
  min-height: 500px;
  margin: 30px auto; /* 중앙 정렬 및 상하 여백 */
  overflow: hidden;
  width: 90%; /* 화면 너비에 유동적으로 반응하도록 */
`;

export const InfoSection = styled.div`
  /* 제목, 통계 숫자, 필터 버튼이 있는 상단 섹션 */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 30px; /* ✨ 변경: 패딩 증가 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 30px; /* ✨ 변경: 마진 증가 */
`;

export const ChartSection = styled.div`
  /* 차트 캔버스가 들어갈 영역 */
  width: 100%;
  /* ✨ 변경: 차트 자체의 높이 증가 */
  height: 400px;
  position: relative;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 20px; /* ✨ 변경: 마진 증가 */
  display: flex;
  gap: 10px; /* ✨ 변경: 버튼 간격 증가 */
`;

export const FilterButton = styled.button`
  background: ${(props) => (props.$active ? PRIMARY_ACCENT : "transparent")};
  border: 1px solid
    ${(props) => (props.$active ? PRIMARY_ACCENT : "rgba(255, 255, 255, 0.3)")};
  color: ${TEXT_COLOR};
  border-radius: 20px;
  padding: 8px 16px; /* ✨ 변경: 버튼 패딩 증가 */
  font-size: 14px; /* ✨ 변경: 폰트 크기 증가 */
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${(props) => (props.$active ? "700" : "500")};

  &:hover {
    background: ${PRIMARY_ACCENT};
    border-color: ${PRIMARY_ACCENT};
    box-shadow: 0 0 10px rgba(255, 99, 132, 0.6); /* ✨ 변경: 호버 효과 강화 */
  }
`;

export const TotalCount = styled.h3`
  font-size: 4.5rem; /* ✨ 변경: 메인 숫자 크기 증가 */
  font-weight: 700;
  color: ${TEXT_COLOR};
  margin: 0 0 8px 0; /* ✨ 변경: 마진 조정 */
  line-height: 1;
`;

export const SubText = styled.p`
  font-size: 16px; /* ✨ 변경: 서브 텍스트 크기 증가 */
  opacity: 0.7;
  margin: 0;
`;

export const SectionTitle = styled.h3`
  font-size: 1.4rem; /* ✨ 변경: 섹션 제목 크기 증가 */
  font-weight: 600;
  color: ${PRIMARY_ACCENT};
  margin: 0;
  text-transform: uppercase;
`;
