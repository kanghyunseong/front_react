import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  padding: 40px;
  background-color: #f4f7fa;
  min-height: 100vh;
  font-family: "Pretendard", -apple-system, sans-serif;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;
`;

export const PageTitle = styled.h2`
  font-size: 26px;
  font-weight: 800;
  color: #1a202c;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  &::before {
    content: "";
    width: 5px;
    height: 24px;
    background: #6c5ce7;
    border-radius: 4px;
  }
`;

export const LastUpdated = styled.span`
  font-size: 13px;
  color: #a0aec0;
  font-weight: 500;
`;

export const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 18px;
  border: 1px solid ${(props) => (props.$isWarning ? "#feb2b2" : "#edf2f7")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
  }
`;

export const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${(props) => (props.$isWarning ? "#fff5f5" : "#f0f5ff")};
  color: ${(props) => (props.$isWarning ? "#f56565" : "#6c5ce7")};
`;

export const StatContent = styled.div`
  .label {
    font-size: 13px;
    color: #718096;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .value-group {
    display: flex;
    align-items: baseline;
    gap: 4px;
    .value {
      font-size: 24px;
      font-weight: 800;
      color: #1a202c;
    }
    .unit {
      font-size: 14px;
      font-weight: 600;
      color: #718096;
    }
  }
  .desc {
    font-size: 11px;
    color: #a0aec0;
    margin-top: 2px;
  }
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Card = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 28px;
  border: 1px solid #edf2f7;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
`;

export const CardHeader = styled.div`
  margin-bottom: 24px;
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 10px;
    span {
      font-size: 12px;
      color: #cbd5e0;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

export const ChartWrapper = styled.div`
  position: relative;
  height: 280px;
  width: 100%;
  max-width: 400px;
`;

export const DonutCenter = styled.div`
  position: absolute;
  top: 42%; /* 범례가 아래로 갔으므로 중앙 조정 */
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;

  .num {
    font-size: 38px;
    font-weight: 900;
    color: #1a202c;
    line-height: 1;
  }
  .label {
    font-size: 12px;
    color: #a0aec0;
    font-weight: 700;
    margin-top: 6px;
    text-transform: uppercase;
  }
`;

export const BatteryProgress = styled.div`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }

  .label-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .car-name {
      font-weight: 700;
      font-size: 14px;
      color: #4a5568;
    }
    .battery-val {
      font-weight: 800;
      font-size: 14px;
      color: #2d3748;
    }
  }
`;

export const ProgressBar = styled.div`
  height: 8px;
  background: #edf2f7;
  border-radius: 10px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.$width}%;
  background: ${(props) =>
    props.$width < 20
      ? "linear-gradient(90deg, #f56565, #fc8181)"
      : props.$width < 50
      ? "linear-gradient(90deg, #ed8936, #f6ad55)"
      : "linear-gradient(90deg, #48bb78, #68d391)"};
  border-radius: 10px;
  transition: width 1.5s cubic-bezier(0.1, 0, 0.2, 1);
`;

export const ActionCard = styled(Card)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  h3 {
    color: #ffffff;
    margin-bottom: 16px;
  }
  p {
    font-size: 14px;
    opacity: 0.9;
    line-height: 1.6;
    margin-bottom: 24px;
    strong {
      font-weight: 800;
      text-decoration: underline;
    }
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  border-radius: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #ffffff;
    color: #667eea;
    transform: scale(1.02);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #a0aec0;
  font-weight: 500;
  font-size: 14px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  font-weight: 700;
  color: #6c5ce7;
  letter-spacing: 1px;
`;
