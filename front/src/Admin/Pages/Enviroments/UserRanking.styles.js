import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

export const TitleArea = styled.div`
  margin-bottom: 20px;
  h2 {
    color: #6b4ce6;
    margin-bottom: 5px;
  }
`;

export const TableCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const TableTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const TableDesc = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #555;
  }

  th {
    font-weight: 600;
    color: #333;
  }

  tbody tr:hover {
    background-color: #f9fafb;
  }
`;
