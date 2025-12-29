import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Pretendard", sans-serif;
`;

export const TitleSection = styled.div`
  max-width: 850px;
  margin: 0 auto 30px;

  .back-nav {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #64748b;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 16px;
    transition: color 0.2s;
    &:hover {
      color: #6366f1;
    }
  }

  h2 {
    color: #0f172a;
    font-size: 28px;
    font-weight: 800;
    span {
      color: #94a3b8;
      font-size: 18px;
      margin-left: 8px;
      font-weight: 500;
    }
  }

  p {
    color: #64748b;
    font-size: 15px;
    margin-top: 4px;
  }
`;

export const Container = styled.div`
  background: white;
  padding: 48px;
  border-radius: 24px;
  max-width: 850px;
  margin: 0 auto;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

export const SectionTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 32px 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f1f5f9;
  &:first-child {
    margin-top: 0;
  }
  svg {
    color: #6366f1;
  }
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #475569;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #1e293b;
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
  font-size: 15px;
  background-color: white;
  cursor: pointer;
`;

export const RangeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  padding: 16px 20px;
  border-radius: 14px;
  .val {
    font-size: 24px;
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

export const FullWidthBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 180px;
  padding: 16px;
  border: 1.5px solid ${(props) => (props.$error ? "#ef4444" : "#e2e8f0")};
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  &:focus {
    outline: none;
    border-color: #6366f1;
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
    background-color: #f1f5ff;
  }

  .preview-container {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 20px;
    }
    .overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 12px;
      text-align: center;
      font-weight: 600;
    }
  }

  .upload-placeholder {
    text-align: center;
    color: #64748b;
    p {
      font-weight: 700;
      margin-top: 12px;
      color: #475569;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #f1f5f9;
`;

export const Button = styled.button`
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.$primary ? "#6366f1" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#64748b")};
  border: ${(props) => (props.$primary ? "none" : "1px solid #e2e8f0")};
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 18px;
  font-weight: 700;
  color: #6366f1;
`;
