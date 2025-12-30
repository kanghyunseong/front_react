import styled, { keyframes, css } from "styled-components";

// --- 애니메이션 정의 ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const softPulse = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.05); }
  100% { transform: translate(-50%, -50%) scale(1); }
`;

const blink = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
`;

const slideInRight = keyframes`
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulseRed = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

// --- 컨테이너 및 헤더 ---
export const Container = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Pretendard", -apple-system, sans-serif;
  animation: ${fadeIn} 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const PageTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 12px;
  &::before {
    content: "";
    width: 6px;
    height: 28px;
    background: linear-gradient(to bottom, #6366f1, #a855f7);
    border-radius: 10px;
  }
`;

export const LastUpdated = styled.div`
  font-size: 13px;
  color: #94a3b8;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    animation: ${blink} 1.5s infinite ease-in-out;
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
  }
`;

// --- 상단 통계 카드 섹션 ---
export const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 24px;
  border: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  ${(props) =>
    props.$isWarning &&
    css`
      border-color: #fecaca;
      background: #fffafb;
      animation: ${pulseRed} 2s infinite;
    `}

  &:hover {
    transform: translateY(-8px);
    border-color: ${(props) => (props.$isWarning ? "#f56565" : "#6366f1")};
    box-shadow: 0 20px 25px -5px ${(props) => (props.$isWarning ? "rgba(248, 113, 113, 0.15)" : "rgba(99, 102, 241, 0.15)")};
  }
`;

export const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  background: ${(props) => (props.$isWarning ? "#fee2e2" : "#eef2ff")};
  color: ${(props) => (props.$isWarning ? "#ef4444" : "#6366f1")};
  transition: transform 0.3s;
  ${StatCard}:hover & {
    transform: scale(1.1) rotate(-5deg);
  }
`;

export const StatContent = styled.div`
  .label {
    font-size: 14px;
    color: #64748b;
    font-weight: 600;
  }
  .value-group {
    margin: 4px 0;
    .value {
      font-size: 28px;
      font-weight: 800;
      color: #1e293b;
    }
    .unit {
      font-size: 14px;
      margin-left: 4px;
      color: #94a3b8;
      font-weight: 700;
    }
  }
  .desc {
    font-size: 11px;
    color: #cbd5e1;
  }
`;

// --- 메인 그리드 레이아웃 ---
export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
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
  background: white;
  padding: 32px;
  border-radius: 32px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
`;

export const CardHeader = styled.div`
  margin-bottom: 24px;
  h3 {
    font-size: 19px;
    font-weight: 800;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 10px;
    svg {
      color: #6366f1;
    }
    span {
      font-size: 11px;
      color: #94a3b8;
      background: #f1f5f9;
      padding: 2px 8px;
      border-radius: 20px;
    }
  }
`;

// --- 차트 및 도넛 중앙 ---
export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const ChartWrapper = styled.div`
  height: 300px;
  width: 100%;
  max-width: 450px;
  position: relative;
`;

export const DonutCenter = styled.div`
  position: absolute;
  top: 43%; /* 도넛 높이에 맞춰 소폭 조정 */
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  animation: ${softPulse} 3s ease-in-out infinite;
  pointer-events: none;
  .num {
    font-size: 44px;
    font-weight: 900;
    background: linear-gradient(135deg, #1e293b 0%, #6366f1 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }
  .label {
    font-size: 11px;
    color: #94a3b8;
    font-weight: 800;
    text-transform: uppercase;
    margin-top: 4px;
  }
`;

// --- 배터리 및 액션 카드 ---
export const BatteryProgress = styled.div`
  margin-bottom: 22px;
  animation: ${slideInRight} 0.5s ease-out both;
  animation-delay: ${(props) => props.$idx * 0.1}s;
  .label-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .car-name {
      font-weight: 700;
      font-size: 14px;
      color: #334155;
    }
    .battery-val {
      font-weight: 800;
      font-size: 12px;
      color: #6366f1;
      background: #f5f3ff;
      padding: 2px 8px;
      border-radius: 6px;
    }
  }
`;

export const ProgressBar = styled.div`
  height: 10px;
  background: #f1f5f9;
  border-radius: 20px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.$width}%;
  background: ${(props) =>
    props.$width < 25
      ? "linear-gradient(90deg, #ef4444, #f87171)"
      : props.$width < 50
      ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
      : "linear-gradient(90deg, #10b981, #34d399)"};
  border-radius: 20px;
  transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

export const ActionCard = styled(Card)`
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  border: none;
  overflow: hidden;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200px;
    height: 200px;
    background: rgba(99, 102, 241, 0.15);
    filter: blur(50px);
    border-radius: 50%;
  }
  h3 {
    color: white;
  }
  p {
    font-size: 14px;
    opacity: 0.8;
    line-height: 1.7;
    margin-bottom: 24px;
    strong {
      color: #818cf8;
      font-weight: 800;
    }
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:hover {
    background: white;
    color: #1e293b;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;
  color: #6366f1;
  font-weight: 800;
  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid #f1f5f9;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #a0aec0;
  font-size: 14px;
  background: #fcfcfd;
  border: 1px dashed #e2e8f0;
  border-radius: 20px;
  margin-top: 10px;
`;
