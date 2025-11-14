import styled from "styled-components";

export const Container = styled.div`
  background: white;
  padding: 40px;
  border-radius: 15px;
  max-width: 900px;
  margin: 20px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const Header = styled.div`
  margin-bottom: 30px;
  h2 {
    color: #6b4ce6;
    margin-bottom: 5px;
  }
`;

export const SectionTitle = styled.h3`
  margin-bottom: 5px;
  font-size: 18px;
`;
export const SectionDesc = styled.p`
  color: #999;
  font-size: 14px;
  margin-bottom: 30px;
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9fafb;
  &:focus {
    outline: none;
    border-color: #6b4ce6;
  }
`;

/* ★ 이 부분들이 누락되었을 수 있습니다 */
export const TextAreaBox = styled.div`
  background: #f9fafb;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  border: none;
  background: transparent;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export const UploadBox = styled.div`
  border: 2px dashed #6b4ce6;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  background-color: #f3f0ff;
  color: #6b4ce6;
  cursor: pointer;

  p {
    margin-top: 10px;
    font-size: 12px;
    color: #666;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
`;

export const Button = styled.button`
  padding: 10px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  /* Transient Props 적용 ($primary) */
  background-color: ${(props) => (props.$primary ? "#6B4CE6" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#666")};
  border: ${(props) => (props.$primary ? "none" : "1px solid #ccc")};

  &:hover {
    opacity: 0.9;
  }
`;
