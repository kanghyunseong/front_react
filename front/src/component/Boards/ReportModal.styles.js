import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.45);
  z-index: 9999;
`;

export const ModalBox = styled.div`
  width: min(600px, 90%);
  background: white;
  border-radius: 10px;
  padding: 24px;
  box-sizing: border-box;
  animation: fadeIn .2s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

export const ModalDescription = styled.p`
  margin-top: 6px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #555;
`;

export const ModalTextarea = styled.textarea`
  width: 100%;
  height: 140px;
  resize: vertical;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 15px;
  outline: none;

  &:focus {
    border-color: #ff9eaa;
    box-shadow: 0 0 0 2px rgba(255, 158, 170, 0.4);
  }
`;

export const ModalButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
`;

export const ModalButton = styled.button`
  padding: 10px 18px;
  background-color: rgba(255, 172, 172, 0.8);
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: rgba(255, 172, 172, 1);
  }
`;

export const CancelButton = styled(ModalButton)`
  background-color: #c9c9c9;

  &:hover {
    background-color: #b0b0b0;
  }
`;
