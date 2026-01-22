import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Pretendard", sans-serif;
`;

export const TitleArea = styled.div`
  margin-bottom: 30px;
  h2 {
    color: #1e293b;
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 8px;
  }
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #475569;
    margin: 0;
  }
  p {
    color: #94a3b8;
    font-size: 15px;
    margin-top: 4px;
  }
`;

export const ListCard = styled.div`
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 24px 30px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .sub-text {
    font-size: 13px;
    color: #94a3b8;
    font-weight: 500;
  }
`;

export const Header = styled.div`
  display: flex;
  background: #f8fafc;
  padding: 16px 0;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 700;
  color: #64748b;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s;
  &:hover {
    background: #fcfdfe;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const Col = styled.div`
  flex: ${(props) => props.flex || 1};
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.align || "center"};
  gap: 12px;
  font-size: 14px;
  color: #475569;

  .icon-box {
    width: 36px;
    height: 36px;
    background: #f1f5f9;
    color: #64748b;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .content-info {
    display: flex;
    flex-direction: column;
    text-align: left;
    .main-title {
      font-weight: 700;
      color: #1e293b;
      line-height: 1.4;
    }
    .sub-info {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 2px;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    .target-user {
      font-weight: 600;
      color: #334155;
    }
    .reporter {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 2px;
    }
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DeleteBtn = styled.button`
  background-color: #ffffff;
  color: #ef4444;
  border: 1.5px solid #fee2e2;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.2s;
  &:hover {
    background-color: #ef4444;
    color: white;
    border-color: #ef4444;
  }
`;

export const RejectBtn = styled.button`
  width: 34px;
  height: 34px;
  background: #ffffff;
  color: #94a3b8;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  &:hover {
    background: #64748b;
    color: white;
    border-color: #64748b;
  }
`;

export const EmptyState = styled.div`
  padding: 80px 0;
  text-align: center;
  color: #94a3b8;
  font-size: 15px;
  font-weight: 500;
`;

export const LoadingState = styled.div`
  padding: 80px 0;
  text-align: center;
  color: #6366f1;
  font-weight: 700;
`;
