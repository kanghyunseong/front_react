import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
`;

export const TitleSection = styled.div`
  max-width: 850px;
  margin: 0 auto 30px;
  h2 {
    color: #0f172a;
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 8px;
  }
  p {
    color: #64748b;
    font-size: 15px;
  }
`;

export const Container = styled.div`
  background: white;
  padding: 50px;
  border-radius: 24px;
  max-width: 850px;
  margin: 0 auto;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
`;

export const SectionTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f1f5f9;

  svg {
    color: #6366f1;
  }
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FullWidthBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background-color: #ffffff;
  font-size: 15px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
  }
`;

export const Select = styled.select`
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background-color: #ffffff;
  font-size: 15px;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

export const RangeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  padding: 14px 20px;
  border-radius: 14px;

  .val {
    font-size: 20px;
    font-weight: 800;
    color: #4f46e5;
  }
  .unit {
    font-size: 14px;
    font-weight: 600;
    color: #6366f1;
  }
  .info-icon {
    margin-left: auto;
    color: #a5b4fc;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 180px;
  padding: 16px;
  border: 1.5px solid ${(props) => (props.$error ? "#ef4444" : "#e2e8f0")};
  border-radius: 14px;
  resize: none;
  font-size: 14px;
  line-height: 1.6;
  &:focus {
    outline: none;
    border-color: ${(props) => (props.$error ? "#ef4444" : "#6366f1")};
  }
`;

export const ByteInfo = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => (props.$error ? "#ef4444" : "#94a3b8")};
`;

export const UploadBox = styled.div`
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s;

  &:hover {
    border-color: #6366f1;
    background-color: #f0f9ff;
  }

  .upload-placeholder {
    text-align: center;
    color: #64748b;
    p {
      font-weight: 700;
      font-size: 16px;
      margin: 10px 0 4px;
      color: #334155;
    }
    span {
      font-size: 13px;
      color: #94a3b8;
    }
    svg {
      color: #6366f1;
      opacity: 0.7;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 20px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #f1f5f9;
`;

export const Button = styled.button`
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  background-color: ${(props) => (props.$primary ? "#6366f1" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#64748b")};
  border: ${(props) => (props.$primary ? "none" : "1px solid #e2e8f0")};

  &:hover {
    filter: brightness(0.95);
    background-color: ${(props) => (props.$primary ? "#4f46e5" : "#f8fafc")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
