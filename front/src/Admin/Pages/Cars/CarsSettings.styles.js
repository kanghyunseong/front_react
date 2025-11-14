import styled from "styled-components";

export const ListContainer = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const ListHeader = styled.div`
  display: flex;
  padding-bottom: 15px;
  border-bottom: 2px solid #eee;
  font-weight: bold;
  color: #888;
  font-size: 14px;
`;

export const CarInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 2;

  img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
    background: #eee;
  }
  span {
    font-weight: bold;
    color: #333;
  }

  .img-placeholder {
    width: 40px;
    height: 40px;
    background: #ddd;
    border-radius: 5px;
  }
`;

export const InfoText = styled.div`
  flex: 1;
  color: #666;
  font-size: 14px;
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100px; /* 헤더와 너비 맞춤 */
`;

export const EditButton = styled.button`
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

export const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;
