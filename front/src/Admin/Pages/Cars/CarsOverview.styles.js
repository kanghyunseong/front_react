import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
`;

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;

  h3 {
    font-size: 16px;
    color: #555;
    margin-bottom: 15px;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const StatCard = styled(Card)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .number {
    font-size: 24px;
    font-weight: bold;
  }
  .label {
    font-size: 12px;
    color: #888;
  }
  .green {
    color: #10b981;
    font-size: 12px;
  }
`;

export const ChartWrapper = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
`;

export const Legend = styled.div`
  text-align: center;
  margin-top: -40px;

  span {
    margin: 0 5px;
    font-size: 12px;
  }
`;

export const CatalogList = styled.ul`
  list-style: none;
  padding: 0;
  line-height: 3;

  li {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #555;

    .count {
      color: #6b4ce6;
      font-weight: bold;
    }
  }
`;
