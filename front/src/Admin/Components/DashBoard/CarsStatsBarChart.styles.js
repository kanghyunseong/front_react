import styled from "styled-components";

export const ChartContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 35px rgba(107, 76, 230, 0.1);
    transform: translateY(-4px);
  }
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ChartTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #2d3436;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    width: 4px;
    height: 16px;
    background: #6b4ce6;
    border-radius: 10px;
  }
`;

export const SubText = styled.span`
  font-size: 12px;
  color: #b2bec3;
  font-weight: 500;
`;
