import { useContext, useEffect, useState } from "react";
import SideBar from "../Common/Sidebar/Sidebar";
import {
  MainContainer,
  DetailCard,
  CardTitle,
  CarImageArea,
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
  ReviewActionButtons,
  EditButton,
  DeleteButton,
  ReviewHeaderContent,
  EmptyReviewMessage,
} from "../Cars/CarsDetail.style";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const CarsDetail = () => {
  const { auth } = useContext(AuthContext);
  const { carId } = useParams();
  const navi = useNavigate();
  const [car, setCar] = useState(null);
  const [load, isLoad] = useState(false);
  const [reviews, setReviews] = useState([]);

  // 차량 정보 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8081/cars/${carId}`)
      .then((result) => {
        console.log(result);
        setCar(result.data[0]);
        isLoad(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [carId]);

  // 리뷰 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8081/reviews/${carId}`)
      .then((result) => {
        console.log(result);
        setReviews(result.data);
        isLoad(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [carId]);

  // 리뷰 수정하기

  
  // 리뷰 삭제하기


  if (car == null) return <div>빠이</div>;

  return (
    <>
      <SideBar />
      <MainContainer>
        <DetailCard>
          <CardTitle>차량 상세보기</CardTitle>

          <CarImageArea>
            {car.carImage ? (
              <img
                src={car.carImage}
                alt="차량 이미지"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            ) : (
              "이미지 없음"
            )}
          </CarImageArea>

          <InfoSection>
            <SectionTitle>차량 소개</SectionTitle>
            <InfoText>{car?.carContent}</InfoText>
          </InfoSection>

          <SpecGrid>
            <SpecItem>
              <SpecLabel>배터리</SpecLabel>
              <SpecValue>{car?.battery}%</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>주행가능 거리</SpecLabel>
              <SpecValue>{car?.carDriving}km</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>차종</SpecLabel>
              <SpecValue>{car?.carSize}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>좌석</SpecLabel>
              <SpecValue>{car?.carSeet}</SpecValue>
            </SpecItem>
          </SpecGrid>

          <ReviewSection>
            <SectionTitle>이용자 후기</SectionTitle>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewItem key={review.reviewNo}>
                  <ReviewHeader>
                    <ReviewHeaderContent>
                      <ReviewerName>{review.userName}</ReviewerName>
                      <ReviewDate>{review.createDate}</ReviewDate>
                    </ReviewHeaderContent>

                    {/* 로그인한 사용자와 리뷰 작성자가 같을 때만 버튼 표시 */}
                    {auth?.userNo && String(auth.userNo) === String(review.reviewWriter) && (
                      <ReviewActionButtons>
                        <EditButton>수정</EditButton>
                        <DeleteButton>삭제</DeleteButton>
                      </ReviewActionButtons>
                    )}
                  </ReviewHeader>
                  <ReviewText>{review.reviewContent}</ReviewText>
                </ReviewItem>
              ))
            ) : (
              <EmptyReviewMessage>아직 작성된 리뷰가 없습니다.</EmptyReviewMessage>
            )}
          </ReviewSection>

          <ReservationButton onClick={() => navi(`/cars/${carId}/reserve`)}>
            차량 예약하기
          </ReservationButton>
        </DetailCard>
      </MainContainer>
    </>
  );
};

export default CarsDetail;