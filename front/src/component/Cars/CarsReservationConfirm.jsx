import { useState } from "react";
import SideBar from "../Common/Sidebar/Sidebar";
import {
  MainContainer,
  ConfirmCard,
  PageTitle,
  CheckIcon,
  ConfirmTitle,
  ConfirmSubtitle,
  InfoSection,
  InfoTitle,
  InfoItem,
  InfoLabel,
  InfoValue,
  HomeButton,
} from "../Cars/CarsReservationConfirm.style";
import { useNavigate } from "react-router-dom";

const CarsReservationConfirm = () => {
  const reservationInfo = {
    reservationNumber: "#A20251112",
    period: "2025-11-12 14:00 ~ 2025-11-19 14:00",
    location: "서울시 중구 대한문로 110",
  };
  const navi = useNavigate();
  
  return (
    <>
      <SideBar />
      <MainContainer>
        <PageTitle>차량 예약</PageTitle>
        
        <ConfirmCard>
          <CheckIcon>✓</CheckIcon>
          
          <ConfirmTitle>예약이 완료되었습니다!</ConfirmTitle>
          <ConfirmSubtitle>안전하고 즐거운 주행되세요 🚗</ConfirmSubtitle>

          <InfoSection>
            <InfoTitle>예약 정보</InfoTitle>
            
            <InfoItem>
              <InfoLabel>차량 · 예약 번호안내 ↓</InfoLabel>
              <InfoValue></InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>예약번호</InfoLabel>
              <InfoValue>{reservationInfo.reservationNumber}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>이용 시간</InfoLabel>
              <InfoValue>{reservationInfo.period}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>픽업 장소</InfoLabel>
              <InfoValue>{reservationInfo.location}</InfoValue>
            </InfoItem>
          </InfoSection>

          <HomeButton onClick={() => navi("/")}>홈으로</HomeButton>
        </ConfirmCard>
      </MainContainer>
    </>
  );
};

export default CarsReservationConfirm;
