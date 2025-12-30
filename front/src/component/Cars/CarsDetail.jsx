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
import ReviewChangeModal from "./ReviewChangeModal";

const CarsDetail = () => {
  const { auth } = useContext(AuthContext);
  const { carId } = useParams();
  const navi = useNavigate();
  const [car, setCar] = useState(null);
  const [load, isLoad] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  // 차량 정보 가져오기
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/cars/${carId}`)
      .then((result) => {
        console.log(result);
        setCar(result.data[0]);
        isLoad(true);
      })
      .catch((err) => {
        console.log(err);
         alert(err.response.data["error-message"]);
         navi("/cars/searchList")
      });
  }, [carId, refresh]);

  // 리뷰 가져오기
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/reviews/${carId}`)
      .then((result) => {
        console.log(result);
        setReviews(result.data);
        isLoad(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [carId, refresh]);

  // 리뷰 수정하기
  const reviewUpdate = (updatedData) => {
    axios
      .put(`${apiUrl}/api/reviews`, updatedData, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((result) => {
        console.log(result);
        alert("리뷰변경을 성공했습니다.");
        setModalOpen(false);
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
        alert("리뷰변경을 실패했습니다.");
      });
  }


  // 리뷰 삭제하기
  const reviewDelete = (reviewNo) => {
    if (!confirm("리뷰를 삭제하시겠습니까?")) return;
    axios
      .delete(`${apiUrl}/api/reviews/${reviewNo}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((result) => {
        console.log(result);
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      })
  }

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
                <ReviewItem key={review?.reviewNo}>
                  <ReviewHeader>
                    <ReviewHeaderContent>
                      <ReviewerName>{review?.userName}</ReviewerName>
                      <ReviewDate>{review?.createDate}</ReviewDate>
                    </ReviewHeaderContent>

                    {/* 로그인한 사용자와 리뷰 작성자가 같을 때만 버튼 표시 */}
                    {auth.userNo === String(review?.reviewWriter) && (
                      <ReviewActionButtons>
                        <EditButton onClick={() => {
                          setSelectedReview(review);
                          setModalOpen(true);
                        }}>수정</EditButton>
                        <DeleteButton onClick={() => {
                          reviewDelete(review?.reviewNo);
                        }}>삭제</DeleteButton>
                      </ReviewActionButtons>
                    )}
                  </ReviewHeader>
                  <ReviewText>{review?.reviewContent}</ReviewText>
                </ReviewItem>
              ))
            ) : (
              <EmptyReviewMessage>아직 작성된 리뷰가 없습니다.</EmptyReviewMessage>
            )}
          </ReviewSection>

          <ReservationButton onClick={() => navi(`/cars/$/api{carId}/reserve`)}>
            차량 예약하기
          </ReservationButton>
        </DetailCard>

        <ReviewChangeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          review={selectedReview}
          onConfirm={reviewUpdate}
        />
      </MainContainer>
    </>
  );
};

export default CarsDetail;