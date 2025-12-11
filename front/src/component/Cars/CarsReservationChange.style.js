import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 1062px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1400px) {
    margin-left: auto;
    margin-right: auto;
    width: 95%;
  }
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #000;
  margin: 0 0 24px 0;
`;

export const ReservationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ReservationCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const CardContent = styled.div`
  display: flex;
  gap: 24px;
`;

export const ImagePlaceholder = styled.div`
  width: 200px;
  height: 140px;
  background: #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: #000;
  flex-shrink: 0;
`;

export const ReservationInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ReservationTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin: 0 0 12px 0;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;

export const Button = styled.button`
  flex: 1;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
`;

export const ReturnButton = styled(Button)`
  background: #4caf50;
  color: white;
  
  &:hover {
    background: #45a049;
  }
`;

export const ModifyButton = styled(Button)`
  background: #2196f3;
  color: white;
  
  &:hover {
    background: #1976d2;
  }
`;

export const CancelButton = styled(Button)`
  background: #f44336;
  color: white;
  
  &:hover {
    background: #d32f2f;
  }
`;

