import axios from "axios";
import {
  MainContainer,
  PageTitle,
  ReservationList,
  ReservationCard,
  CardContent,
  ImagePlaceholder,
  ReservationInfo,
  InfoList,
  InfoText,
  ButtonGroup,
  ReturnButton,
  ModifyButton,
  CancelButton,
} from "../Cars/CarsReservationChange.style";
import SideBar from "../Common/Sidebar/Sidebar";
import ReservationChangeModal from "./ReservationChangeModal"; // 모달 import 추가
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CarsReservationChange = () => {
  const [reservation, setReservation] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
<<<<<<< HEAD
  const handleReturn = (reservationNo, carId) => {
=======

const handleReturn = (reservationNo, carId) => {
>>>>>>> 56355bf5bcecc4a203a44b67dda988ddc33893ae
    if (!confirm("반납하시겠습니까?")) return;
    const wantsReview = confirm("리뷰를 작성하시겠습니까?");

    // 차량 반납
    axios
<<<<<<< HEAD
      .put(`${apiUrl}/reserve/return`, reservationNo, {
=======
      .put(`${apiUrl}/api/reserve/return`, reservationNo, {
>>>>>>> 56355bf5bcecc4a203a44b67dda988ddc33893ae
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        console.log(result);
        alert("반납 처리가 완료되었습니다.");

        if (wantsReview) {
          navi(`/cars/${carId}/review/write?reservationNo=${reservationNo}`);
        } else {
          setRefresh((prev) => prev + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("반납 처리에 실패했습니다.");
      });
  };

  const handleCancel = (reservationNo) => {
    if (!confirm("예약을 취소하시겠습니까?")) return;
    axios
<<<<<<< HEAD
      .delete(`${apiUrl}/reserve/${reservationNo}`, {
=======
      .delete(`${apiUrl}/api/reserve/${reservationNo}`, {
>>>>>>> 56355bf5bcecc4a203a44b67dda988ddc33893ae
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((result) => {
        console.log(result);
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (updatedData) => {
    axios
<<<<<<< HEAD
      .put(`${apiUrl}/reserve/change`, updatedData, {
=======
      .put(`${apiUrl}/api/reserve/change`, updatedData, {
>>>>>>> 56355bf5bcecc4a203a44b67dda988ddc33893ae
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((result) => {
        console.log(result);
        alert("예약변경을 성공했습니다.");
        setModalOpen(false);
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
        alert("예약변경을 실패했습니다.");
      });
  };

  useEffect(() => {
    axios
<<<<<<< HEAD
      .get(`${apiUrl}/reserve/searchList`, {
=======
      .get(`${apiUrl}/api/reserve/searchList`, {
>>>>>>> 56355bf5bcecc4a203a44b67dda988ddc33893ae
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((result) => {
        console.log(result.data);
        setReservation(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.accessToken, refresh]);

  if (!auth.accessToken) return <div>빠이</div>;
  return (
    <>
      <SideBar />
      <MainContainer>
        <PageTitle>예약 내역</PageTitle>

        <ReservationList>
          {reservation.length === 0 ? (
            <InfoText>예약 내역이 없습니다.</InfoText>
          ) : (
            reservation.map((item) => (
              <ReservationCard key={item.reservation.reservationNo}>
                <CardContent>
                  <ImagePlaceholder>
                    {item.car?.carImage ? (
                      <img
                        src={item.car?.carImage}
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
                  </ImagePlaceholder>

                  <ReservationInfo>
                    <InfoList>
                      <InfoText>
                        이용 시간 : {item.reservation?.startTime} ~{" "}
                        {item.reservation.endTime}
                      </InfoText>
                      <InfoText>
                        예약번호 : {item.reservation?.reservationNo}
                      </InfoText>
                      <InfoText>
                        반납 위치 : {item.reservation?.destination}
                      </InfoText>
                    </InfoList>

                    <ButtonGroup>
                      {item.reservation?.returnStatus === "Y" ? (
                        <InfoText>✓ 반납 완료</InfoText>
                      ) : new Date() >= new Date(item.reservation?.endTime) ? (
                        <ReturnButton
                          onClick={() =>
                            handleReturn(
                              item.reservation?.reservationNo,
                              item.car?.carId
                            )
                          }
                        >
                          반납하기
                        </ReturnButton>
                      ) : (
                        <>
                          <ModifyButton
                            onClick={() => {
                              setSelectedReservation(item.reservation);
                              setModalOpen(true);
                            }}
                          >
                            예약 변경 하기
                          </ModifyButton>
                          <CancelButton
                            onClick={() =>
                              handleCancel(item.reservation?.reservationNo)
                            }
                          >
                            예약 취소 하기
                          </CancelButton>
                        </>
                      )}
                    </ButtonGroup>
                  </ReservationInfo>
                </CardContent>
              </ReservationCard>
            ))
          )}
        </ReservationList>

        <ReservationChangeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          reservation={selectedReservation}
          onConfirm={handleChange}
        />
      </MainContainer>
    </>
  );
};

export default CarsReservationChange;
