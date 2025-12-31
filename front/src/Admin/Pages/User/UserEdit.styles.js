import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Pretendard", sans-serif;
`;

export const TitleSection = styled.div`
  max-width: 1000px;
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
    color: #0f172a;
    font-size: 28px;
    font-weight: 800;
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
    margin-top: 4px;
  }
`;

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 30px;
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionHeader = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
  svg {
    color: #6366f1;
  }
`;

export const FormSection = styled.div`
  background: white;
  padding: 32px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #475569;
  }
  .input-wrapper {
    position: relative;
    .input-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
    }
    input {
      padding-left: 40px;
    }
  }
  input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    font-size: 15px;
    transition: border-color 0.2s;
    &:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
    }
  }
`;

export const LicenseSection = styled.div`
  background: white;
  padding: 32px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 280px;
  background: #f1f5f9;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .no-img {
    text-align: center;
    color: #94a3b8;
    p {
      margin-top: 10px;
      font-size: 14px;
    }
  }
`;

export const StatusBox = styled.div`
  padding: 20px;
  border-radius: 16px;
  background: ${(props) => (props.$isApproved ? "#ecfdf5" : "#fef2f2")};
  border: 1px solid
    ${(props) => (props.$isApproved ? "#10b98133" : "#ef444433")};
  display: flex;
  justify-content: space-between;
  align-items: center;

  .status-info {
    display: flex;
    flex-direction: column;
    .label {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 2px;
    }
    .value {
      font-size: 16px;
      font-weight: 700;
      color: ${(props) => (props.$isApproved ? "#059669" : "#dc2626")};
    }
  }

  .approved-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #059669;
    font-weight: 700;
    font-size: 15px;
  }
`;

export const ApproveButton = styled.button`
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #4f46e5;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
  button {
    padding: 14px 32px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .cancel {
    background: white;
    color: #64748b;
    border: 1px solid #e2e8f0;
    &:hover {
      background: #f8fafc;
      color: #1e293b;
    }
  }
  .save {
    background: #0f172a;
    color: white;
    border: none;
    &:hover {
      background: #1e293b;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-weight: 700;
  color: #6366f1;
`;
