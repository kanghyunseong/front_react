import styled from "styled-components";

// 지도 전체를 감싸는 컨테이너
export const MapContainer = styled.div`
  width: 100%;
  height: 100%; /* 부모 높이를 꽉 채움 */
  display: flex;
  flex-direction: column;
  position: relative;
`;

// 실제 카카오맵이 그려지는 영역
export const MapContent = styled.div`
  width: 100%;
  flex: 1; /* 남은 공간을 지도가 모두 차지 */
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  overflow: hidden; /* 지도 모서리 라운딩 적용 */
`;

// 선택된 충전소 이름을 보여주는 오버레이 바
export const StationInfoBar = styled.div`
  margin-top: 15px;
  background: #ffffff;
  padding: 12px 20px;
  border-radius: 10px;
  border-left: 5px solid #4dabf7;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  color: #495057;

  strong {
    color: #228be6;
    margin-left: 8px;
    font-size: 15px;
  }
`;

// 지도 위에 표시될 현재 위치 안내 (선택 사항)
export const MapOverlayText = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 5;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  pointer-events: none;
`;
