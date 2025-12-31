import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  background-color: #f1f5f9; /* 배경색을 조금 더 깊게 변경 */
  min-height: 100vh;
  font-family: "Pretendard", sans-serif;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const TitleGroup = styled.div`
  h2 {
    color: #0f172a;
    font-size: 28px;
    font-weight: 800;
    margin: 0 0 4px 0;
    letter-spacing: -0.5px;
  }
  p {
    color: #64748b;
    font-size: 15px;
    margin: 0;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }
  input {
    padding: 12px 16px 12px 42px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    width: 300px;
    font-size: 14px;
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    &:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
  }
`;

export const TableContainer = styled.div`
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    th {
      padding: 18px 20px;
      text-align: left;
      font-size: 13px;
      color: #475569;
      font-weight: 700;
      .th-icon {
        margin-right: 8px;
        color: #94a3b8;
      }
    }
  }

  tbody tr {
    border-bottom: 1px solid #f1f5f9;
    &:hover {
      background: #f8faff;
    }
    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 20px;
    vertical-align: middle;
  }
`;

export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-weight: 700;
    color: #1e293b;
    font-size: 15px;
  }
  .id {
    font-size: 13px;
    color: #64748b;
    margin-top: 2px;
  }
`;

export const CarInfo = styled.div`
  display: flex;
  flex-direction: column;
  .car-name {
    font-weight: 600;
    color: #334155;
    font-size: 14px;
  }
  .tag {
    font-size: 11px;
    color: #4f46e5;
    background: #f0f9ff;
    border: 1px solid #e0f2fe;
    padding: 2px 8px;
    border-radius: 6px;
    width: fit-content;
    margin-top: 6px;
    font-weight: 600;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #475569;
`;

export const PeriodInfo = styled.div`
  .start {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
  }
  .end {
    font-size: 13px;
    color: #94a3b8;
    margin-top: 2px;
  }
`;

export const Badge = styled.span`
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 800;
  display: inline-block;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
  border: 1px solid ${(props) => props.$borderColor};
  text-align: center;
  min-width: 80px;
`;

export const CancelButton = styled.button`
  background: #ffffff;
  color: #ef4444;
  border: 1px solid #fecaca;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #ef4444;
    color: #ffffff;
    border-color: #ef4444;
  }
`;

export const DisabledText = styled.span`
  color: #cbd5e1;
  font-size: 14px;
  padding-left: 10px;
`;

export const StateMessage = styled.div`
  text-align: center;
  padding: 80px 0;
  color: #94a3b8;
  font-size: 15px;
  font-weight: 500;
`;
