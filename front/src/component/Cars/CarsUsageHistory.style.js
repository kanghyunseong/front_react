import styled from "styled-components";

export const MainContainer = styled.div`
  width: 1062px;
  margin: 20px auto;
  background: #f5f7fb;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  @media (max-width: 1400px) {
    margin-left: auto;
    margin-right: auto;
    width: 95%;
  }
`;

export const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f1f13;
  margin-bottom: 10px;
`;

export const HistoryCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.div`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1f1f13;
  margin-bottom: 20px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 20px;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatLabel = styled.span`
  font-size: 15px;
  color: #666;
`;

export const StatValue = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #1f1f13;
`;

export const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const DateLabel = styled.span`
  font-size: 14px;
  color: #999;
`;

export const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const RecordItem = styled.div`
  padding: 15px 20px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RecordInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const RecordDate = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1f1f13;
`;

export const RecordDetail = styled.span`
  font-size: 14px;
  color: #666;
`;

export const RecordStatus = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.$cancelled ? "#e74c3c" : "#1f1f13")};
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #4092cd;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 20px;

  &:hover {
    background: #357ab8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(64, 146, 205, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;
