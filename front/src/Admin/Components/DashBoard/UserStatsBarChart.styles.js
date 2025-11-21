import styled from "styled-components";

export const ChartContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  width: 100%;
  max-width: 750px;
  margin: 30px auto;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  min-height: 500px;
`;

export const UserChartTitle = styled.h2`
  font-size: 1.5em;
  color: #ff6384;
  margin-bottom: 25px;
  text-align: center;
  font-size: 1.6em;
  color: #333333;
  padding-bottom: 10px;
  margin-bottom: 10px; /* KPI Grid와 간격 조정 */
  text-align: left;
  font-weight: 600;
`;

export const KpiGrid = styled.div`
  /* KPI 카드들을 배치할 컨테이너 */
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0; /* 차트와 KPI 구분선 */
`;

export const KpiCard = styled.div`
  /* 개별 KPI 카드의 스타일 */
  flex: 1;
  padding: 15px 20px;
  border-radius: 8px;
  background: ${(props) =>
    props.$primary ? "#f5f5ff" : "#ffffff"}; /* 주요 KPI 배경색 */
  border: 1px solid #e9e9f5;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

export const KpiLabel = styled.p`
  /* KPI 항목 이름 */
  font-size: 13px;
  color: #666;
  margin: 0 0 5px 0;
  font-weight: 500;
  text-transform: uppercase;
`;

export const KpiValue = styled.h3`
  /* KPI 실제 수치 강조 */
  font-size: 2.2em;
  font-weight: 700;
  margin: 0;
  color: ${(props) =>
    props.$isWaiting ? "#ff6384" : "#333333"}; /* 대기 중인 경우 빨간색 강조 */
`;
