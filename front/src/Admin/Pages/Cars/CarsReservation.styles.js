import styled from "styled-components";

export const TableContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    font-weight: 600;
    color: #555;
  }

  td {
    color: #666;
    font-size: 14px;
  }
`;

export const CustomerName = styled.div`
  font-weight: bold;
`;
export const CustomerSub = styled.div`
  font-size: 12px;
  color: #999;
`;
