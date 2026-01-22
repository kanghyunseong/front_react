import styled from "styled-components";

export const ChartContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 30px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  min-height: 550px;
  display: flex;
  flex-direction: column;
`;

export const UserChartTitle = styled.h2`
  font-size: 1.4rem;
  color: #2d3436;
  margin-bottom: 25px;
  text-align: left;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "";
    width: 5px;
    height: 20px;
    background: #6b4ce6;
    border-radius: 10px;
  }
`;

export const KpiGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

export const KpiCard = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 16px;
  background: ${(props) => (props.$primary ? "#f8f9ff" : "#ffffff")};
  border: 1px solid ${(props) => (props.$primary ? "#e0e7ff" : "#f1f2f6")};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
`;

export const KpiLabel = styled.p`
  font-size: 14px;
  color: #636e72;
  margin: 0 0 8px 0;
  font-weight: 600;
`;

export const KpiValue = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  color: ${(props) => (props.$isWaiting ? "#ff6b6b" : "#2d3436")};

  span {
    font-size: 1rem;
    font-weight: 500;
    margin-left: 4px;
    color: #b2bec3;
  }
`;

export const ChartWrapper = styled.div`
  position: relative;
  height: 350px;
  width: 100%;
  margin-top: auto;
`;
