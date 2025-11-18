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
    vertical-align: middle;
  }

  th {
    font-weight: 600;
    color: #333;
  }
`;

// 아바타와 이름을 묶는 스타일
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

// 삭제 버튼 스타일
export const DeleteButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #555;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

export const PageButton = styled.button`
  border: 1px solid #ddd;
  background-color: ${(props) => (props.$active ? "#6B4CE6" : "white")};
  color: ${(props) => (props.$active ? "white" : "#333")};
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;
