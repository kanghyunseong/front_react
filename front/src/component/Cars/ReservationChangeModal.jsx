import styled from "styled-components";
import { useState } from "react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 25px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  
  &:hover {
    background-color: #45a049;
  }
`;

const CancelButtonStyled = styled.button`
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ReservationChangeModal = ({ isOpen, onClose, reservation, onConfirm }) => {
  const [startTime, setStartTime] = useState(reservation?.startTime || "");
  const [endTime, setEndTime] = useState(reservation?.endTime || "");
  const [destination, setDestination] = useState(reservation?.destination || "");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const updatedData = {
      reservationNo: reservation?.reservationNo,
      startTime,
      endTime,
      destination
    };
    onConfirm(updatedData);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>예약 변경</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <FormGroup>
          <Label>예약번호</Label>
          <Input 
            type="text" 
            value={reservation?.reservationNo || ""} 
            disabled 
            style={{ backgroundColor: '#f5f5f5' }}
          />
        </FormGroup>

        <FormGroup>
          <Label>시작 시간</Label>
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>종료 시간</Label>
          <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>반납 위치</Label>
          <Input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="반납 위치를 입력하세요"
          />
        </FormGroup>

        <ButtonContainer>
          <CancelButtonStyled onClick={onClose}>
            취소
          </CancelButtonStyled>
          <ConfirmButton onClick={handleSubmit}>
            변경 완료
          </ConfirmButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReservationChangeModal;