import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CarsReservationConfirm = () => {
  const [reservationInfo, setReservationInfo] = useState(null);
  const { reservationNo } = useParams();
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/reserve/${reservationNo}`)
      .then((res) => {
        console.log(res);

        setReservationInfo(res.data);
      })
      .catch((err) => {
        console.log("실패", err);
      });
  }, [reservationNo]);

  if (!reservationInfo) return <div>예약 정보를 불러오는 중...</div>;
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
              <InfoValue>{reservationInfo[0].reservationNo}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>이용 기간</InfoLabel>
              <InfoValue>
                {reservationInfo[0].endTime}~ {reservationInfo[0].startTime}
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>반납 장소</InfoLabel>
              <InfoValue>{reservationInfo[0].destination}</InfoValue>
            </InfoItem>
          </InfoSection>

          <HomeButton onClick={() => navi("/")}>홈으로</HomeButton>
        </ConfirmCard>
      </MainContainer>
    </>
  );
};

export default CarsReservationConfirm;
