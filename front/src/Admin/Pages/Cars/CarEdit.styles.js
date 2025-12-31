import styled, { keyframes } from "styled-components";

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

// --- Styles ---
export const PageWrapper = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Pretendard", sans-serif;
  animation: ${fadeIn} 0.6s ease-out;
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
    transition: all 0.2s;
    &:hover {
      color: #6366f1;
      transform: translateX(-4px);
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
  border-radius: 32px; // 더 둥글게 수정
  max-width: 850px;
  margin: 0 auto;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.04),
    0 10px 10px -5px rgba(0, 0, 0, 0.02);
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
    transition: transform 0.3s;
  }
  &:hover svg {
    transform: rotate(15deg) scale(1.2);
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
  margin-left: 4px;
`;

export const Input = styled.input`
  padding: 14px 18px;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  color: #1e293b;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    background-color: #fff;
    transform: translateY(-2px);
  }
`;

export const Select = styled.select`
  padding: 14px 18px;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

export const RangeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border: 1px solid #ddd6fe;
  padding: 20px 24px;
  border-radius: 18px;
  position: relative;
  overflow: hidden;

  .val {
    font-size: 28px;
    font-weight: 900;
    background: linear-gradient(45deg, #4f46e5, #818cf8);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s;
  }
  .unit {
    font-size: 14px;
    font-weight: 700;
    color: #6366f1;
  }
  .info-icon {
    margin-left: auto;
    color: #a5b4fc;
    animation: ${pulse} 2s infinite;
  }

  /* Shimmer effect */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    animation: ${shimmer} 3s infinite linear;
    pointer-events: none;
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
  padding: 18px;
  border: 1.5px solid ${(props) => (props.$error ? "#ef4444" : "#e2e8f0")};
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.6;
  resize: none;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: #6366f1;
    background-color: #fff;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.05);
  }
`;

export const ByteInfo = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  background: ${(props) => (props.$error ? "#fef2f2" : "#f1f5f9")};
  color: ${(props) => (props.$error ? "#ef4444" : "#94a3b8")};
`;

export const UploadBox = styled.div`
  border: 2px dashed #cbd5e1;
  border-radius: 20px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: #6366f1;
    background-color: #f1f5ff;
    transform: scale(1.01);
  }

  .preview-container {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover; // contain 대신 cover로 더 꽉 차 보이게 변경 가능
    }
    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover .overlay {
      opacity: 1;
    }
  }

  .upload-placeholder {
    text-align: center;
    color: #64748b;
    svg {
      font-size: 40px;
      margin-bottom: 12px;
      color: #94a3b8;
    }
    p {
      font-weight: 700;
      color: #475569;
    }
    span {
      font-size: 12px;
      color: #94a3b8;
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
  padding: 14px 36px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: ${(props) => (props.$primary ? "#6366f1" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#64748b")};
  border: ${(props) => (props.$primary ? "none" : "1.5px solid #e2e8f0")};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${(props) =>
      props.$primary
        ? "0 10px 15px -3px rgba(99, 102, 241, 0.3)"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"};
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 20px;
  font-weight: 800;
  color: #6366f1;
  gap: 20px;

  &::before {
    content: "";
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #6366f1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
