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
  p {
    color: #888;
    font-size: 14px;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

export const ChartTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;

  span {
    display: block;
    font-size: 14px;
    color: #888;
    margin-top: 5px;
    font-weight: normal;
  }
`;

export const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
