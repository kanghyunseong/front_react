import { useState } from "react";
import SideBar from "../Common/Sidebar/Sidebar";
import {
  MainContainer,
  TopSection,
  ProfileCard,
  ProfileImageArea,
  ProfileSubtitle,
  StatsCard,
  StatItem,
  StatLabel,
  StatValue,
  BottomSection,
  SectionTitle,
  CarGrid,
  CarCard,
  CarImageArea,
  CarInfo,
  CarName,
  CarDetail,
  CarBattery,
  BatteryLabel,
  BatteryValue,
  DetailButton,
  Pagination,
  PageButton,
} from "./CarsSearchList.style";
import { useNavigate } from "react-router-dom";

const CarsSearchList = () => {
    const navi = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

  const carData = [
    { id: 1, name: "차량 이름", location: "지역 이름", distance: "-- km", battery: "--%" },
    { id: 2, name: "차량 이름", location: "지역 이름", distance: "-- km", battery: "--%" },
    { id: 3, name: "차량 이름", location: "지역 이름", distance: "-- km", battery: "--%" },
    { id: 4, name: "차량 이름", location: "지역 이름", distance: "-- km", battery: "--%" },
  ];

  return (
    <>
    <SideBar/>
    <MainContainer>
      <TopSection>
        <ProfileCard>
          <ProfileImageArea />
          <ProfileSubtitle>
            오늘 전기차를 확인하세요!
            <br />
            지역 / 차량을 선택해 예약하세요.
          </ProfileSubtitle>
        </ProfileCard>

        <StatsCard>
          <StatItem>
            <StatLabel>전체 차량</StatLabel>
            <StatValue>-- 대</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>대여 중</StatLabel>
            <StatValue>-- 대</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>총 주행거리</StatLabel>
            <StatValue>--.-- km</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>절감된 CO₂</StatLabel>
            <StatValue>--.--kg</StatValue>
          </StatItem>
        </StatsCard>
      </TopSection>

      <BottomSection>
        <SectionTitle>차량 목록</SectionTitle>
        <CarGrid>
          {carData.map((car) => (
            <CarCard key={car.id}>
              <CarImageArea>이미지 영역</CarImageArea>
              <CarInfo>
                <CarName>{car.name}</CarName>
                <CarDetail>{car.location}</CarDetail>
                <CarDetail>주변 거리: {car.distance}</CarDetail>
              </CarInfo>
              <CarBattery>
                <BatteryLabel>배터리</BatteryLabel>
                <BatteryValue>{car.battery}</BatteryValue>
              </CarBattery>
              <DetailButton onClick={() => navi("/cars/detail")}>상세 보기</DetailButton>
            </CarCard>
          ))}
        </CarGrid>

        <Pagination>
          <PageButton onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
            &#8249;
          </PageButton>
          {[1, 2, 3, 4, 5].map((page) => (
            <PageButton
              key={page}
              $active={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          ))}
          <PageButton onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}>
            &#8250;
          </PageButton>
        </Pagination>
      </BottomSection>
    </MainContainer>
    </>
  );
};

export default CarsSearchList;