import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
`;
export const FormGroup = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;
export const LicenseSection = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;

  .img-box {
    width: 300px;
    height: 200px;
    background: #f0f0f0;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .status-box {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
export const ApproveButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #218838;
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  button {
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #ddd;
    background: white;
  }
  button.save {
    background: #6b4ce6;
    color: white;
    border: none;
  }
`;
