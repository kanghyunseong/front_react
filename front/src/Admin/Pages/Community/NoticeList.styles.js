import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Pretendard", sans-serif;
`;

export const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;

  .title-group {
    h2 {
      color: #0f172a;
      font-size: 26px;
      font-weight: 800;
      margin: 0 0 8px 0;
      letter-spacing: -0.5px;
    }
    p {
      color: #64748b;
      font-size: 15px;
      margin: 0;
    }
  }
`;

export const WriteBtn = styled.button`
  background-color: #6366f1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
  transition: all 0.2s;

  &:hover {
    background-color: #4f46e5;
    transform: translateY(-2px);
  }
`;

export const TableCard = styled.div`
  background: white;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  overflow: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;

    th {
      padding: 18px 20px;
      text-align: left;
      font-size: 13px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      svg {
        margin-right: 6px;
        color: #94a3b8;
      }
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
    padding: 20px;
    font-size: 14px;
    color: #475569;
    vertical-align: middle;
  }

  .no-cell {
    font-family: monospace;
    color: #94a3b8;
  }

  .title-cell {
    .title-text {
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 4px;
      font-size: 15px;
    }
    .content-preview {
      font-size: 12px;
      color: #94a3b8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 400px;
    }
  }

  .date-cell {
    font-size: 13px;
    color: #64748b;
  }
`;

export const Badge = styled.span`
  background: #eef2ff;
  color: #6366f1;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;

  &.edit {
    background-color: #f8fafc;
    color: #64748b;
    border-color: #e2e8f0;
    &:hover {
      background-color: #e2e8f0;
      color: #1e293b;
    }
  }

  &.delete {
    background-color: #fff1f2;
    color: #f43f5e;
    &:hover {
      background-color: #f43f5e;
      color: white;
    }
  }
`;

export const LoadingWrapper = styled.div`
  padding: 80px;
  text-align: center;
  font-weight: 700;
  color: #6366f1;
`;

export const EmptyState = styled.div`
  padding: 60px;
  text-align: center;
  color: #94a3b8;
  font-weight: 500;
`;
