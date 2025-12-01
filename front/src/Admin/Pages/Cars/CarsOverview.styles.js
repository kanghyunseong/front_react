import styled from "styled-components";

// 전체 레이아웃 (왼쪽 2 : 오른쪽 1)
export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr; /* 반응형: 작은 화면에선 1단 */
  }
`;

// 페이지 제목
export const PageTitle = styled.h2`
  margin-bottom: 20px;
  color: #6B4CE6;
`;

// 가로 배치 컨테이너 (StatBox, 차트 병렬 배치용)
export const Row = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 세로 배치 컨테이너 (왼쪽/오른쪽 컬럼 내부용)
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: ${(props) => props.flex || 1};
`;

// 기본 카드 스타일
export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  flex: 1;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 16px;
    color: #555;
    margin-bottom: 15px;
    margin-top: 0;
  }
`;

// --------------------------------------------------------
// StatBox (상단 요약 카드) 관련 스타일
// --------------------------------------------------------
export const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  flex: 1;
  margin: 0 10px;
  display: flex;
  align-items: center;
  gap: 15px;

  /* 첫번째, 마지막 마진 조정 */
  &:first-child { margin-left: 0; }
  &:last-child { margin-right: 0; }
`;

export const IconWrapper = styled.div`
  /* props.$isWarning에 따라 배경/글자색 변경 */
  background: ${(props) => (props.$isWarning ? "#FEE2E2" : "#EDE9FE")};
  color: ${(props) => (props.$isWarning ? "#EF4444" : "#6B4CE6")};
  padding: 12px;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: #888;
`;

export const StatValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 2px 0;
`;

export const StatSub = styled.div`
  font-size: 11px;
  color: ${(props) => (props.$isWarning ? "#EF4444" : "#10B981")};
`;

// --------------------------------------------------------
// 차트 관련 스타일
// --------------------------------------------------------

// 차트 높이 고정용 래퍼
export const ChartContainer = styled.div`
  height: ${(props) => props.height || "200px"};
  width: 100%;
  position: relative; /* 도넛 차트 중앙 텍스트 배치를 위해 필요 */
`;

// 도넛 차트 중앙 텍스트 (Total Cars)
export const DonutOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%; /* 도넛 차트의 경우 범례 위치에 따라 조정 필요할 수 있음 */
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none; /* 마우스 이벤트가 차트에 도달하도록 */

  /* 범례가 오른쪽에 있을 경우 중앙 정렬 보정 (필요시 조정) */
  @media (min-width: 768px) {
    left: 35%; 
  }
`;

export const OverlayValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const OverlayLabel = styled.div`
  font-size: 10px;
  color: #888;
`;

export const SubText = styled.p`
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
  margin-top: -10px;
`;

// 데이터 없을 때 표시
export const NoData = styled.div`
  text-align: center;
  margin-top: 80px;
  color: #ccc;
  font-size: 14px;
`;

// --------------------------------------------------------
// 리스트 (배터리 경고 등) 스타일
// --------------------------------------------------------
export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }
`;

export const BatteryLevel = styled.span`
  color: #EF4444;
  font-weight: bold;
`;

export const SafeMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #10B981;
  font-size: 14px;
  background: #F0FDF4;
  border-radius: 8px;
  margin-top: 10px;
`;