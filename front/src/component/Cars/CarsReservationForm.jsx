import { use, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  LocationInput,
  SubmitButton,
} from "../Cars/CarsReservationForm.style";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { axiosAuth } from "../../api/reqService";

const CarReservationForm = () => {
  const navi = useNavigate();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [destination, setDestination] = useState("");
  const { carId } = useParams();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      alert("로그인하세요.");
      navi("/members/login");
    }
  }, [auth.isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    // 필수 입력 체크
    if (!startTime.trim() || !endTime.trim() || !destination.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      alert("종료 시간은 시작 시간 이후여야 합니다.");
      return;
    }

    const diffDays = (end - start) / (1000 * 60 * 60 * 24);
    if (diffDays > 7) {
      alert("최대 이용 가능 기간은 7일입니다.");
      return;
    }

    axiosAuth.createJson("/api/reserve",  {carId, startTime, endTime, destination})
      .then((res) => {
        const reservationNo = res.data;
        navi(`/cars/reserve/${reservationNo}/confirm`);
      })
      .catch((err) => {
        alert((err.response?.data["error-message"]));
      });
  };

  if (!auth.accessToken) return <div>빠이</div>;
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
              <InfoValue>{auth.userName || "-"}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>사용자 생년월일 :</InfoLabel>
              <InfoValue>{auth.birthDay || "-"}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>사용자 전화번호 :</InfoLabel>
              <InfoValue>{auth.phone || "-"}</InfoValue>
            </InfoRow>
          </Section>

          <TimeSection>
            <SectionTitle>이용시간 선택</SectionTitle>

            <TimeLabel>시작 날짜</TimeLabel>
            <TimeInput
              type="date"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="년-월-일"
            />

            <TimeLabel>종료 날짜</TimeLabel>
            <TimeInput
              type="date"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="년-월-일"
            />

            <TimeNote>※ 최대 이용 가능 기간은 일주일입니다.</TimeNote>
          </TimeSection>

          <LocationSection>
            <SectionTitle>반납 목적지 입력</SectionTitle>
            <LocationInput
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="예: 서울시 ○ ○"
            />
          </LocationSection>

          <SubmitButton onClick={handleSubmit}>예약 하기</SubmitButton>
        </FormCard>
      </MainContainer>
    </>
  );
};

export default CarReservationForm;
