import styled from "styled-components";

export const Container = styled.div`
  background: white;
  padding: 40px;
  border-radius: 15px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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
  font-weight: 500;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9fafb;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #6b4ce6;
  }
`;

// ✅ [추가] 설명 입력창 (에러 시 빨간 테두리)
export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px;
  border: 1px solid ${(props) => (props.$error ? "red" : "#eee")};
  border-radius: 8px;
  background-color: #f9fafb;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${(props) => (props.$error ? "red" : "#6b4ce6")};
  }
`;

// ✅ [추가] 바이트 수 표시 텍스트
export const ByteInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: ${(props) => (props.$error ? "red" : "#888")};
  margin-top: 5px;
  font-weight: 500;
`;

export const UploadBox = styled.div`
  border: 2px dashed #6b4ce6;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  background-color: #f3f0ff;
  color: #6b4ce6;
  cursor: pointer;
  margin-bottom: 30px;

  /* 이미지 미리보기 시 높이 조절 */
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
  }

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  /* props 통일: $primary 사용 */
  background-color: ${(props) => (props.$primary ? "#6B4CE6" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#666")};
  border: ${(props) => (props.$primary ? "none" : "1px solid #ccc")};

  &:hover {
    opacity: 0.9;
  }
`;
