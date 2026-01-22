import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const TitleBlock = styled.div`
  h2 {
    color: #0f172a;
    font-size: 26px;
    font-weight: 800;
    margin: 0 0 6px 0;
  }
  p {
    color: #64748b;
    font-size: 14px;
  }
`;

export const AddButton = styled.button`
  background-color: #6366f1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
  &:hover {
    background-color: #4f46e5;
  }
`;

export const ContentCard = styled.div`
  background: white;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  overflow: hidden;

  /* 테이블 컬럼 비율 정의 */
  .col-info {
    flex: 2.5;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .col-data {
    flex: 1.2;
  }
  .col-status {
    flex: 1.2;
  }
  .col-size {
    flex: 0.8;
  }
  .col-action {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`;

export const ListHeader = styled.div`
  display: flex;
  background: #f8fafc;
  padding: 18px 30px;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 700;
  color: #64748b;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #f1f5f9;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #fcfdfe;
  }
`;

export const CarProfile = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  overflow: hidden;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .no-image {
    color: #cbd5e1;
    font-size: 20px;
  }
`;

export const CarNameBlock = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-weight: 700;
    color: #1e293b;
    font-size: 15px;
  }
  .id {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 2px;
    font-family: monospace;
  }
`;

export const DataLabel = styled.div`
  font-weight: 700;
  color: #334155;
  font-size: 14px;
`;

export const DataSubText = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  &.light {
    color: #94a3b8;
    font-size: 12px;
    margin-top: 2px;
  }
`;

export const StatusTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;

  ${({ $type }) => {
    if ($type === "ready") return "background: #ecfdf5; color: #10b981;";
    if ($type === "using") return "background: #eff6ff; color: #3b82f6;";
    return "background: #fff7ed; color: #f97316;";
  }}
`;

export const SizeBadge = styled.span`
  background: #f1f5f9;
  color: #64748b;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
`;

export const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;

  &.edit {
    background: #f8fafc;
    color: #64748b;
    border: 1px solid #e2e8f0;
    &:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
  }

  &.delete {
    background: #fff1f2;
    color: #f43f5e;
    border: 1px solid #ffe4e6;
    &:hover {
      background: #f43f5e;
      color: white;
      border-color: #f43f5e;
    }
  }
`;

export const EmptyWrapper = styled.div`
  padding: 80px 0;
  text-align: center;
  color: #94a3b8;
  font-size: 15px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 8px;
`;

export const PageBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid ${(props) => (props.$active ? "#6366f1" : "#e2e8f0")};
  background: ${(props) => (props.$active ? "#6366f1" : "white")};
  color: ${(props) => (props.$active ? "white" : "#64748b")};
  &:hover {
    border-color: #6366f1;
    color: ${(props) => (props.$active ? "white" : "#6366f1")};
  }
`;
