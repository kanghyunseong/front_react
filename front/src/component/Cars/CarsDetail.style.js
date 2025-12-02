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
  height: 500px;
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
export const ReviewActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditButton = styled.button`
  padding: 6px 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1976D2;
  }
`;

export const DeleteButton = styled.button`
  padding: 6px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const SaveButton = styled.button`
  padding: 6px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }
`;

export const CancelButton = styled.button`
  padding: 6px 12px;
  background-color: #9e9e9e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #757575;
  }
`;

export const ReviewEditTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 10px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2196F3;
  }
`;

export const EmptyReviewMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #999;
`;

export const ReviewHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;