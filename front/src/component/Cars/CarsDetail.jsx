import { useState } from "react";
import SideBar from "../Common/Sidebar/Sidebar";
import {
  MainContainer,
  DetailCard,
  CardTitle,
  CarImageArea,
  CarModel,
  InfoSection,
  SectionTitle,
  InfoText,
  SpecGrid,
  SpecItem,
  SpecLabel,
  SpecValue,
  ReviewSection,
  ReviewItem,
  ReviewHeader,
  ReviewerName,
  ReviewDate,
  ReviewText,
  ReservationButton,
} from "../Cars/CarsDetail.style";
import { useNavigate } from "react-router-dom";

const CarsDetail = () => {
  const carInfo = {
    model: "ELI-X 2024",
    description: "외관은 단정하고, 실내는 주행 쾌적하며, 배송 중인 자리 및 다양한 용도로 빌려 사람 담당",
    battery: "87%(충전량)",
    distance: "350km",
    location: "중형",
    capacity: "5인승",
  };

  const reviews = [
    {
      id: 1,
      name: "김수현",
      date: "2025-10-02",
      text: "조작이 쉽고 충전속도도 빠르게 시작됩니다. 추가 공간도 넓었어요.",
    },
    {
      id: 2,
      name: "정현성",
      date: "2025-10-02",
      text: "조작이 쉽고 충전속도도 빠르게 시작됩니다. 추가 공간도 넓었어요.",
    },
  ];

  const navi = useNavigate();
  return (
    <>
      <SideBar />
      <MainContainer>
        <DetailCard>
          <CardTitle>차량 상세보기</CardTitle>

          <CarImageArea>
            <CarModel>ELI-X 국민 전기</CarModel>
          </CarImageArea>

          <InfoSection>
            <SectionTitle>차량 소개</SectionTitle>
            <InfoText>{carInfo.description}</InfoText>
          </InfoSection>

          <SpecGrid>
            <SpecItem>
              <SpecLabel>배터리</SpecLabel>
              <SpecValue>{carInfo.battery}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>주행가능 거리</SpecLabel>
              <SpecValue>{carInfo.distance}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>차종</SpecLabel>
              <SpecValue>{carInfo.location}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>좌석</SpecLabel>
              <SpecValue>{carInfo.capacity}</SpecValue>
            </SpecItem>
          </SpecGrid>

          <ReviewSection>
            <SectionTitle>이용자 후기</SectionTitle>
            {reviews.map((review) => (
              <ReviewItem key={review.id}>
                <ReviewHeader>
                  <ReviewerName>{review.name}</ReviewerName>
                  <ReviewDate>{review.date}</ReviewDate>
                </ReviewHeader>
                <ReviewText>{review.text}</ReviewText>
              </ReviewItem>
            ))}
          </ReviewSection>

          <ReservationButton onClick={() => navi("/cars/reserve/confirm")}>차량 예약하기</ReservationButton>
        </DetailCard>
      </MainContainer>
    </>
  );
};

export default CarsDetail;