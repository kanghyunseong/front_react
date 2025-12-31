import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Pretendard", sans-serif;
`;

export const TitleSection = styled.div`
  max-width: 900px;
  margin: 0 auto 30px;

  .back-nav {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #64748b;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 12px;
    transition: color 0.2s;
    &:hover {
      color: #6366f1;
    }
  }

  h2 {
    color: #0f172a;
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 4px;
    span {
      color: #94a3b8;
      font-size: 18px;
      margin-left: 10px;
      font-weight: 500;
    }
  }

  p {
    color: #64748b;
    font-size: 15px;
  }
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormSection = styled.div`
  background: white;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
`;

export const SectionHeader = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f1f5f9;
  svg {
    color: #6366f1;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #475569;
`;

export const Input = styled.input`
  padding: 14px 16px;
  font-size: 15px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  color: #1e293b;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
  }

  &:read-only {
    background-color: #f8fafc;
    color: #94a3b8;
    border-color: #e2e8f0;
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  padding: 16px;
  min-height: 400px;
  font-size: 15px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  resize: vertical;
  line-height: 1.7;
  color: #1e293b;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
  }
`;

export const HelperText = styled.span`
  font-size: 12px;
  color: #94a3b8;
  margin-top: -5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 14px;
  justify-content: flex-end;
  padding: 20px 0 40px;
`;

export const CancelButton = styled.button`
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background-color: white;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8fafc;
    color: #1e293b;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 32px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  background-color: #6366f1;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #4f46e5;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
