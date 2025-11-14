import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between; /* 양끝 정렬 */
  align-items: center;
  margin-bottom: 20px;

  h2 {
    color: #6b4ce6;
    margin: 0;
  }
`;

export const WriteBtn = styled.button`
  background-color: #6b4ce6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    background-color: #5a3dc9;
  }
`;

export const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 10px;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  th {
    background-color: #f9fafb;
    font-weight: 600;
    color: #555;
  }
  tr:last-child td {
    border-bottom: none;
  }
`;

export const ActionBtn = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #555;

  &:hover {
    background-color: #f5f5f5;
  }
`;
