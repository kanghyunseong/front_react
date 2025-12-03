import styled from "styled-components";

export const MainContainer = styled.div`
  margin-left: 280px;
  padding: 40px;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

export const FormCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 30px;
`;

export const CarInfoSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
`;

export const CarImageArea = styled.div`
  width: 100%;
  height: 200px;
  background-color: #e9ecef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  overflow: hidden;
`;

export const CarName = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
`;

export const FormGroup = styled.div`
  margin-bottom: 30px;
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #7f8c8d;
  margin-top: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 30px;
`;

export const SubmitButton = styled.button`
  padding: 12px 30px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 12px 30px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #7f8c8d;
  }
`;
export const CarDetailInfo = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CarDetailItem = styled.div`
  font-size: 14px;
  color: #34495e;

  span {
    font-weight: 600;
    margin-right: 5px;
  }
`;