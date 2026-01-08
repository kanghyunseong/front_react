import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import SideBar from "../Common/Sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import {
  MainContainer,
  FormCard,
  FormTitle,
  FormSubtitle,
  CarInfoSection,
  CarImageArea,
  CarName,
  FormGroup,
  Label,
  Textarea,
  CharCount,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  CarDetailInfo,
  CarDetailItem,
} from "./CarsReviewForm.style";
import { axiosAuth, axiosPublic } from "../../api/reqService";

const CarsReviewForm = () => {
  const { carId } = useParams();
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const [car, setCar] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  const maxLength = 500;
  const [searchParams] = useSearchParams();
  const reservationNo = searchParams.get("reservationNo");

  // 차량 정보 가져오기
  useEffect(() => {
    // axios
    //   .get(`${apiUrl}/cars/${carId}`)
    axiosPublic.getList(`/api/cars/${carId}`)
      .then((result) => {
        console.log(result);
        setCar(result.data[0]);
      })
      .catch((err) => {
        console.log(err);
        alert("차량 정보를 불러오는데 실패했습니다.");
      });
  }, [carId]);

  // 리뷰 제출
  const handleSubmit = () => {
    if (!reviewContent.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    if (reviewContent.length > maxLength) {
      alert(`리뷰는 최대 ${maxLength}자까지 작성할 수 있습니다.`);
      return;
    }

    // axios
    //   .post(
    //     `${apiUrl}/reviews`,
    //     {
    //       refCarId: carId,
    //       reservationNo: reservationNo,
    //       reviewContent: reviewContent,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${auth.accessToken}`,
    //       },
    //     }
    //   )
    axiosAuth
      .createJson("/api/reviews", {
        refCarId: carId,
        reservationNo: reservationNo,
        reviewContent: reviewContent,
      })
      .then((result) => {
        console.log(result);
        alert("리뷰가 등록되었습니다.");
        navi(`/cars/${carId}`);
      })
      .catch((err) => {
        console.log(err);
        alert("리뷰 등록에 실패했습니다.");
      });
  };

  // 취소
  const handleCancel = () => {
    if (
      reviewContent.trim() &&
      !confirm("작성 중인 내용이 있습니다. 취소하시겠습니까?")
    ) {
      return;
    }
    navi(`/cars/${carId}`);
  };

  if (!car) return <div>로딩중...</div>;

  return (
    <>
      <SideBar />
      <MainContainer>
        <FormCard>
          <FormTitle>차량 이용 후기 작성</FormTitle>
          <FormSubtitle>
            차량 이용은 어떠셨나요? 소중한 후기를 남겨주세요.
          </FormSubtitle>

          <CarInfoSection>
            <CarImageArea>
              {car.carImage ? (
                <img
                  src={car.carImage}
                  alt="차량 이미지"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                "이미지 없음"
              )}
            </CarImageArea>
            <CarName>차량 정보</CarName>
            <CarDetailInfo>
              <CarDetailItem>
                <span>차량명:</span> {car.carName}
              </CarDetailItem>
              <CarDetailItem>
                <span>차량 크기:</span> {car.carSize}
              </CarDetailItem>
              <CarDetailItem>
                <span>좌석 수:</span> {car.carSeet}
              </CarDetailItem>
              <CarDetailItem>
                <span>차량 설명:</span> {car.carContent}
              </CarDetailItem>
            </CarDetailInfo>
          </CarInfoSection>

          <FormGroup>
            <Label>이용 후기</Label>
            <Textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="차량 이용 후기를 자유롭게 작성해주세요.&#10;- 차량의 상태는 어떠셨나요?&#10;- 운전 중 불편한 점은 없으셨나요?&#10;- 다른 이용자분들께 추천하고 싶으신가요?"
              maxLength={maxLength}
            />
            <CharCount>
              {reviewContent.length} / {maxLength}
            </CharCount>
          </FormGroup>

          <ButtonGroup>
            <CancelButton onClick={handleCancel}>취소</CancelButton>
            <SubmitButton
              onClick={handleSubmit}
              disabled={!reviewContent.trim()}
            >
              리뷰 등록
            </SubmitButton>
          </ButtonGroup>
        </FormCard>
      </MainContainer>
    </>
  );
};

export default CarsReviewForm;
