import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Pretendard", sans-serif;
`;

export const TitleArea = styled.div`
  margin-bottom: 32px;
  h2 {
    color: #0f172a;
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }
  p {
    color: #64748b;
    font-size: 15px;
  }
`;

export const TableCard = styled.div`
  background: white;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 24px 30px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TableTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

export const TableDesc = styled.div`
  font-size: 13px;
  color: #94a3b8;
  strong {
    color: #6366f1;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    th {
      padding: 16px 20px;
      text-align: left;
      font-size: 13px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  tbody tr {
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.2s;
    &:hover {
      background-color: #fcfdfe;
    }
    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 16px 20px;
    font-size: 14px;
    color: #334155;
    vertical-align: middle;
  }

  .email-cell {
    color: #64748b;
    font-size: 13px;
  }
  .date-cell {
    color: #94a3b8;
    font-size: 12px;
    font-family: monospace;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .avatar-icon {
    font-size: 32px;
    color: #cbd5e1;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    .user-name {
      font-weight: 700;
      color: #1e293b;
    }
    .user-no {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 2px;
    }
  }
`;

export const SubInfo = styled.div`
  font-size: 12px;
  color: #64748b;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
  background-color: ${(props) => (props.$approved ? "#ecfdf5" : "#fff1f2")};
  color: ${(props) => (props.$approved ? "#10b981" : "#e11d48")};
  border: 1px solid ${(props) => (props.$approved ? "#10b98133" : "#e11d4833")};
`;

export const ActionGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const BaseBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  font-size: 16px;
  transition: all 0.2s;
`;

export const EditBtn = styled(BaseBtn)`
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
  &:hover {
    background-color: #6366f1;
    color: white;
    border-color: #6366f1;
  }
`;

export const DelBtn = styled(BaseBtn)`
  background-color: #fff1f2;
  color: #e11d48;
  border: 1px solid #fee2e2;
  &:hover {
    background-color: #e11d48;
    color: white;
    border-color: #e11d48;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 24px;
`;

export const PageButton = styled.button`
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.$active ? "#6366f1" : "#e2e8f0")};
  background-color: ${(props) => (props.$active ? "#6366f1" : "white")};
  color: ${(props) => (props.$active ? "white" : "#64748b")};
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  font-size: 13px;
  cursor: pointer;
  &:hover:not(:disabled) {
    border-color: #6366f1;
    color: ${(props) => (props.$active ? "white" : "#6366f1")};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const StateMsg = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #94a3b8;
  font-weight: 500;
`;
