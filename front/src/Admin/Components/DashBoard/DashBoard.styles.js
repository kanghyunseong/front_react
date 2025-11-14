import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const SectionTitle = styled.h1`
  font-size: 24px;
  color: #6b4ce6; /* 보라색 계열 */
  margin-bottom: 10px;
`;

export const ChartRow = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const MainCardWrapper = styled.div`
  flex: 2;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin-bottom: 15px;
    color: #333;
  }
`;
