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
    &:hover {
      color: #6366f1;
    }
  }

  h2 {
    color: #1e293b;
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 6px;
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
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
`;

export const SectionHeader = styled.h3`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f1f5f9;
  svg {
    color: #6366f1;
  }
`;

export const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FullWidthBox = styled.div`
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
  padding: 14px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  background-color: #fcfdfe;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
  }
`;

export const ReadOnlyField = styled.div`
  padding: 14px 16px;
  border: 1.5px solid #f1f5f9;
  border-radius: 12px;
  background-color: #f8fafc;
  color: #64748b;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;

  .user-icon {
    font-size: 18px;
    color: #cbd5e1;
  }
`;

export const TextAreaBox = styled.div`
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  background-color: #fcfdfe;
  transition: all 0.2s;
  overflow: hidden;

  &:focus-within {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 350px;
  padding: 20px;
  border: none;
  background: transparent;
  resize: none;
  font-size: 15px;
  line-height: 1.7;
  color: #1e293b;
  font-family: inherit;

  &:focus {
    outline: none;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
`;

export const Button = styled.button`
  padding: 12px 30px;
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
