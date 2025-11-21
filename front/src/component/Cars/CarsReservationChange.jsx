import { 
  PageContainer,
  MainContainer,
  PageTitle,
  ReservationList,
  ReservationCard,
  CardContent,
  ImagePlaceholder,
  ReservationInfo,
  ReservationTitle,
  InfoList,
  InfoText,
  ButtonGroup,
  ReturnButton,
  ModifyButton,
  CancelButton
} from "../Cars/CarsReservationChange.style"
import SideBar from "../Common/Sidebar/Sidebar";

const CarsReservationChange = () => {
  const reservations = [
    {
      id: 1,
      title: '현대 아이오닉 5',
      startDate: '2025-11-12 14:00',
      endDate: '2025-11-19 14:00',
      reservationNum: '#A20251112',
      location: '서울시 종로구 세종대로 110',
      status: 'returned'
    },
    {
      id: 2,
      title: '기아 EV6',
      startDate: '2025-11-19 14:00',
      endDate: '2025-11-19 14:00',
      reservationNum: '#20251113',
      location: '서울시 종로구 세종대로 110',
      status: 'active'
    }
  ];

  return (
    <>
    <SideBar />    
      <MainContainer>
        <PageTitle>예약 내역</PageTitle>
        
        <ReservationList>
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id}>
              <CardContent>
                <ImagePlaceholder>이미지</ImagePlaceholder>
                
                <ReservationInfo>
                  <ReservationTitle>{reservation.title}</ReservationTitle>
                  
                  <InfoList>
                    <InfoText>이용 시간 : {reservation.startDate} ~ {reservation.endDate}</InfoText>
                    <InfoText>예약번호 : {reservation.reservationNum}</InfoText>
                    <InfoText>반납 위치 : {reservation.location}</InfoText>
                  </InfoList>
                  
                  <ButtonGroup>
                    {reservation.status === 'returned' ? (
                      <ReturnButton>반납하기</ReturnButton>
                    ) : (
                      <>
                        <ModifyButton>예약 변경 하기</ModifyButton>
                        <CancelButton>예약 취소 하기</CancelButton>
                      </>
                    )}
                  </ButtonGroup>
                </ReservationInfo>
              </CardContent>
            </ReservationCard>
          ))}
        </ReservationList>
      </MainContainer>
    </>
  );
}

export default CarsReservationChange;