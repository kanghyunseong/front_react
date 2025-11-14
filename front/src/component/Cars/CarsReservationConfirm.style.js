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

export const ConfirmCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 900px; 
  width: 100%; 
  margin: 30px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const PageTitle = styled.h2`
  font-size: 25px;
  font-weight: 600;
  color: #1f1f13;
  margin-bottom: 30px;
`;

export const CheckIcon = styled.div`
  font-size: 80px;
  text-align: center;
  margin-bottom: 20px;
  color: #4092cd;
`;

export const ConfirmTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  color: #1f1f13;
`;

export const ConfirmSubtitle = styled.p`
  font-size: 16px;
  text-align: center;
  color: #666;
  margin-bottom: 30px;
`;

export const InfoSection = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
`;

export const InfoTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #1f1f13;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e8ecef;

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-size: 15px;
  color: #666;
`;

export const InfoValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #666;
`;

export const HomeButton = styled.button`
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