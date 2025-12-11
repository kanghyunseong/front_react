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

export const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f1f13;
  margin-bottom: 10px;
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.div`
  margin-bottom: 30px;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1f1f13;
  margin-bottom: 20px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 20px;
`;

export const InfoLabel = styled.span`
  font-size: 16px;
  color: #666;
  min-width: 120px;
`;

export const InfoValue = styled.span`
  font-size: 16px;
  color: #1f1f13;
`;

export const TimeSection = styled.div`
  margin-bottom: 30px;
`;

export const TimeLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f1f13;
  margin-bottom: 10px;
`;

export const TimeInput = styled.input`
  width: 100%;
  padding: 15px;
  background: #e8ecef;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  color: #666;
  margin-bottom: 15px;
  cursor: pointer;

  &:focus {
    outline: none;
    background: #dde2e6;
  }

  &::placeholder {
    color: #999;
  }
`;

export const TimeNote = styled.p`
  font-size: 14px;
  color: #999;
  margin-top: 10px;
`;

export const LocationSection = styled.div`
  margin-bottom: 30px;
`;

export const LocationLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f1f13;
  margin-bottom: 10px;
`;

export const LocationInput = styled.input`
  width: 100%;
  padding: 15px;
  background: #e8ecef;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  color: #666;

  &:focus {
    outline: none;
    background: #dde2e6;
  }

  &::placeholder {
    color: #999;
  }
`;

export const SubmitButton = styled.button`
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

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;