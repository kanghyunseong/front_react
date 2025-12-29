import styled from "styled-components";

const PRIMARY_ACCENT = "#ff6384";
const BG_COLOR = "#ffffff";
const TEXT_COLOR = "#2d3436";
const SECONDARY_TEXT = "#636e72";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${BG_COLOR};
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  color: ${TEXT_COLOR};
  font-family: "Pretendard", -apple-system, sans-serif;
  max-width: 1000px;
  min-height: 550px;
  margin: 30px auto;
  width: 95%;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 30px;
  margin-bottom: 20px;
`;

export const ChartSection = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  margin-top: 10px;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  background: #f1f2f6;
  padding: 5px;
  border-radius: 12px;
  width: fit-content;
`;

export const FilterButton = styled.button`
  background: ${(props) => (props.$active ? "white" : "transparent")};
  border: none;
  color: ${(props) => (props.$active ? PRIMARY_ACCENT : SECONDARY_TEXT)};
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  box-shadow: ${(props) =>
    props.$active ? "0 4px 10px rgba(0,0,0,0.05)" : "none"};

  &:hover {
    color: ${PRIMARY_ACCENT};
    background: ${(props) =>
      props.$active ? "white" : "rgba(255,255,255,0.5)"};
  }
`;

export const TotalCount = styled.h3`
  font-size: 4rem;
  font-weight: 800;
  color: ${TEXT_COLOR};
  margin: 0;
  line-height: 1;
  letter-spacing: -2px;
`;

export const SubText = styled.p`
  font-size: 15px;
  color: ${SECONDARY_TEXT};
  font-weight: 500;
  margin-top: 5px;
`;

export const SectionTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${PRIMARY_ACCENT};
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: right;
`;

export const RightInfo = styled.div`
  text-align: right;
`;
