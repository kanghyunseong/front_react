import styled from "styled-components";

export const MainContainer = styled.div`
  width: 1062px;
  margin: 20px auto;
  background: #f5f7fb;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  @media (max-width: 1400px) {
      margin-left: auto;
      margin-right: auto;
      width: 95%;
    }
`;
    
export const DetailCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1f1f13;
`;

export const CarImageArea = styled.div`
  height: 280px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 20px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
`;

export const CarModel = styled.span`
  color: white;
  font-size: 18px;
  font-weight: 500;
  opacity: 0.9;
`;

export const InfoSection = styled.div`
  margin-bottom: 30px;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #1f1f13;
`;

export const InfoText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin: 0;
`;

export const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

export const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SpecLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1f1f13;
`;

export const SpecValue = styled.span`
  font-size: 16px;
  color: #666;
`;

export const ReviewSection = styled.div`
  margin-bottom: 30px;
`;

export const ReviewItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ReviewerName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1f1f13;
`;

export const ReviewDate = styled.span`
  font-size: 14px;
  color: #999;
`;

export const ReviewText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #666;
  margin: 0;
`;

export const ReservationButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #4092cd;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #357ab8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(64, 146, 205, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;