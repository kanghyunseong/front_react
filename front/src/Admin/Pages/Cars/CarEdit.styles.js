// CarsEdit.styles.js (CarsRegistration.styles.js와 동일하다고 가정)

import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const FormGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  & > div {
    flex: 1;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6b4ce6;
    outline: none;
  }
`;

export const UploadBox = styled.div`
  height: 200px;
  border: 2px dashed #6b4ce6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6b4ce6;
  cursor: pointer;
  background-color: #f9f9ff;
  transition: background-color 0.2s, border-color 0.2s;

  &:hover {
    background-color: #f0f0ff;
    border-color: #5a3aba;
  }

  img {
    max-height: 150px;
    width: auto;
    object-fit: contain;
    margin-bottom: 5px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  background-color: ${(props) => (props.$primary ? "#6B4CE6" : "#ccc")};
  color: ${(props) => (props.$primary ? "#ffffff" : "#333")};

  &:hover {
    background-color: ${(props) => (props.$primary ? "#5a3aba" : "#bbb")};
  }
`;
