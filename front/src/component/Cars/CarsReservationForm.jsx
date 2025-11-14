import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Common/Sidebar/Sidebar";
import {
  MainContainer,
  PageTitle,
  FormCard,
  Section,
  SectionTitle,
  InfoRow,
  InfoLabel,
  InfoValue,
  TimeSection,
  TimeLabel,
  TimeInput,
  TimeNote,
  LocationSection,
  LocationLabel,
  LocationInput,
  SubmitButton,
} from "../Cars/CarsReservationForm.style";

const CarReservationForm = () => {
  const navi = useNavigate();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");

  const userInfo = {
    name: "",
    birthDate: "",
    phone: "",
  };

  const handleSubmit = () => {
    if (!startTime || !endTime || !location) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    console.log("예약 확인", { startTime, endTime, location });
    navi("/cars/reserve/confirm", {
    state: { startTime, endTime, location }
    });
};

  return (
    <>
      <SideBar />
      <MainContainer>
        <PageTitle>차량 예약</PageTitle>

        <FormCard>
          <Section>
            <SectionTitle>사용자 정보</SectionTitle>
            <InfoRow>
              <InfoLabel>사용자 이름 :</InfoLabel>
              <InfoValue>{userInfo.name || "-"}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>사용자 생년월일 :</InfoLabel>
              <InfoValue>{userInfo.birthDate || "-"}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>사용자 전화번호 :</InfoLabel>
              <InfoValue>{userInfo.phone || "-"}</InfoValue>
            </InfoRow>
          </Section>

          <TimeSection>
            <SectionTitle>이용시간 선택</SectionTitle>
            
            <TimeLabel>시작 시간</TimeLabel>
            <TimeInput
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="년 - 월 - 일  -- : -- : --"
            />

            <TimeLabel>종료 시간</TimeLabel>
            <TimeInput
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="년 - 월 - 일  -- : -- : --"
            />

            <TimeNote>※ 최대 이용 가능 기간은 일주일입니다.</TimeNote>
          </TimeSection>

          <LocationSection>
            <SectionTitle>반납 목적지 입력</SectionTitle>
            <LocationInput
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="예: 서울시 ○ ○"
            />
          </LocationSection>

          <SubmitButton onClick={handleSubmit}>
            예약 확인 하기
          </SubmitButton>
        </FormCard>
      </MainContainer>
    </>
  );
};

export default CarReservationForm;
