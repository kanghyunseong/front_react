import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

export const TitleArea = styled.div`
  margin-bottom: 20px;
  h2 {
    color: #6b4ce6;
    margin-bottom: 10px;
  }
  h3 {
    font-size: 18px;
    margin-bottom: 5px;
  }
  p {
    color: #888;
    font-size: 14px;
  }
`;

export const ListCard = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  color: #555;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f5f5f5;
  &:last-child {
    border-bottom: none;
  }
  text-align: center;
  font-size: 14px;
  color: #666;
`;

export const Col = styled.div`
  flex: ${(props) => props.flex || 1};
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.align || "center"};
  gap: 10px;

  .icon-box {
    width: 30px;
    height: 30px;
    background: #333;
    color: white;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }
`;

export const DeleteBtn = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 12px;
  &:hover {
    background-color: #555;
  }
`;

export const CloseIcon = styled.span`
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;
