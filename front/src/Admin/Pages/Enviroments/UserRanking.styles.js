import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Pretendard", -apple-system, sans-serif;
`;

export const TitleArea = styled.div`
  margin-bottom: 32px;
  h2 {
    font-size: 26px;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 8px;
  }
  p {
    color: #64748b;
    font-size: 14px;
  }
`;

export const TopCardsSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

export const RankingCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04);
  width: 240px;
  animation: ${fadeInUp} 0.5s ease-out;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
  }

  .rank-badge {
    font-size: 24px;
    margin-bottom: 12px;
  }

  .user-info {
    text-align: center;
    margin-top: 16px;
    .name {
      font-weight: 700;
      font-size: 18px;
      color: #1e293b;
    }
    .count {
      color: #64748b;
      font-size: 14px;
      margin-top: 4px;
    }
  }

  ${(props) =>
    props.$rank === 1 &&
    `
    border: 2px solid #6366f1;
    height: 300px;
    background: linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%);
    order: 2; /* 시상대 중앙 */
  `}
  ${(props) => props.$rank === 2 && `order: 1; height: 260px;`}
  ${(props) => props.$rank === 3 && `order: 3; height: 240px;`}
`;

export const UserAvatar = styled.div`
  font-size: ${(props) => (props.$isTop ? "64px" : "52px")};
  color: ${(props) => (props.$isTop ? "#6366f1" : "#cbd5e1")};
  display: flex;
`;

export const MainContent = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

export const ListHeader = styled.div`
  display: flex;
  padding: 18px 30px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  .col {
    font-size: 13px;
    font-weight: 700;
    color: #475569;
  }
  .rank {
    width: 80px;
    text-align: center;
  }
  .user {
    flex: 2;
  }
  .data {
    flex: 1;
    text-align: center;
  }
  .rate {
    flex: 1.5;
    text-align: right;
  }
`;

export const ListRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 30px;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }
  .rank {
    width: 80px;
    display: flex;
    justify-content: center;
  }
  .user {
    flex: 2;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .data {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #334155;
    font-weight: 500;
    font-size: 14px;
    .icon {
      margin-right: 6px;
      color: #94a3b8;
    }
  }
  .rate {
    flex: 1.5;
    display: flex;
    justify-content: flex-end;
  }
`;

export const RankNumber = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => (props.$rank <= 3 ? "#6366f1" : "#94a3b8")};
  background: ${(props) => (props.$rank <= 3 ? "#eef2ff" : "transparent")};
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

export const SmallAvatar = styled.div`
  font-size: 32px;
  color: #e2e8f0;
`;

export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-size: 15px;
    font-weight: 600;
    color: #1e293b;
  }
  .label {
    font-size: 12px;
    color: #94a3b8;
  }
`;

export const ScoreBox = styled.div`
  width: 140px;
  .score-text {
    text-align: right;
    font-size: 12px;
    font-weight: 800;
    margin-bottom: 6px;
    color: #475569;
  }
`;

export const ScoreTrack = styled.div`
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
`;

export const ScoreBar = styled.div`
  height: 100%;
  width: ${(props) => props.$width}%;
  background: ${(props) =>
    props.$width >= 95
      ? "#10b981"
      : props.$width >= 80
      ? "#6366f1"
      : "#f43f5e"};
  border-radius: 10px;
  transition: width 1s ease-in-out;
`;

export const StateWrapper = styled.div`
  padding: 100px;
  text-align: center;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .loader {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #6366f1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
