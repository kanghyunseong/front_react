import styled from "styled-components";

export const Container = styled.div`
  padding: 32px;
  background-color: #fcfcfd;
  min-height: 100vh;
  font-family: "Inter", -apple-system, sans-serif;
`;

export const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  h2 {
    font-size: 24px;
    font-weight: 800;
    color: #111827;
  }
`;

export const HeaderStats = styled.div`
  display: flex;
  gap: 24px;
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .label {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 2px;
    }
    .value {
      font-size: 14px;
      font-weight: 700;
      color: #6b4ce6;
    }
  }
`;

export const MainContent = styled.div`
  background: white;
  border: 1px solid #eaecf0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1);
`;

export const ListHeader = styled.div`
  display: flex;
  padding: 12px 24px;
  background: #f9fafb;
  border-bottom: 1px solid #eaecf0;
  .col {
    font-size: 12px;
    font-weight: 600;
    color: #667085;
    text-transform: uppercase;
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
  padding: 16px 24px;
  border-bottom: 1px solid #eaecf0;
  background: ${(props) => (props.$isTop ? "#fdfdff" : "transparent")};

  &:last-child {
    border-bottom: none;
  }

  .col {
    display: flex;
    align-items: center;
  }
  .rank {
    width: 80px;
    justify-content: center;
  }
  .user {
    flex: 2;
    gap: 12px;
  }
  .data {
    flex: 1;
    justify-content: center;
  }
  .rate {
    flex: 1.5;
    justify-content: flex-end;
  }
`;

export const RankNumber = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  background: ${(props) =>
    props.$rank === 1
      ? "#6b4ce6"
      : props.$rank === 2
      ? "#818cf8"
      : props.$rank === 3
      ? "#a5b4fc"
      : "#f2f4f7"};
  color: ${(props) => (props.$rank <= 3 ? "white" : "#667085")};
`;

export const UserAvatar = styled.div`
  font-size: 32px;
  color: #d0d5dd;
  display: flex;
  align-items: center;
`;

export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-size: 14px;
    font-weight: 600;
    color: #101828;
  }
  .top-badge {
    font-size: 10px;
    background: #ecfdf3;
    color: #027a48;
    padding: 2px 6px;
    border-radius: 4px;
    width: fit-content;
    margin-top: 2px;
  }
`;

export const DataValue = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #475467;
  .icon {
    color: #98a2b3;
    font-size: 12px;
  }
`;

export const ScoreBox = styled.div`
  width: 140px;
  .score-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 6px;
    color: ${(props) => (props.$score > 90 ? "#027a48" : "#344054")};
    .icon {
      font-size: 10px;
    }
  }
`;

export const ScoreTrack = styled.div`
  width: 100%;
  height: 6px;
  background: #f2f4f7;
  border-radius: 10px;
  overflow: hidden;
`;

export const ScoreBar = styled.div`
  height: 100%;
  width: ${(props) => props.$width}%;
  background: ${(props) => (props.$width > 90 ? "#12b76a" : "#6b4ce6")};
  border-radius: 10px;
`;

export const StateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 15px;
  font-weight: 600;
  color: #6b4ce6;
`;
