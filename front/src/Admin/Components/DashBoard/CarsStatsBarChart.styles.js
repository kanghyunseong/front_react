import styled from "styled-components";

// Card 컴포넌트처럼 동작하게 스타일링
export const ChartContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  flex: 1; 
  min-width: 0; 
  
  display: flex;
  flex-direction: column;
`;

export const ChartTitle = styled.h2`
  font-size: 1.5em;  
  color: #3f51b5;
  margin-bottom: 25px;
  text-align: center;
`;
