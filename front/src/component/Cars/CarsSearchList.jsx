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
  LoadMoreButton
} from "./CarsSearchList.style";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CarsSearchList = () => {
  const navi = useNavigate();
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/cars?page=${currentPage}`)
      .then((response) => {
        const newCars = response.data;

        if (!newCars || newCars.length === 0) {
          setHasMore(false);
          return;
        }

        setCars((prevCars) => [...prevCars, ...newCars]);

        if (newCars.length < 4) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.['error-message'];

        if (errorMessage?.includes('조회된') || errorMessage?.includes('없습니다')) {
          setHasMore(false);  
        } else {
          setErrMsg(errorMessage || '오류가 발생했습니다');
          console.log(err);
        }
      });
  }, [currentPage]);

  const increasePage = () => {
    setCurrentPage((page) => page + 1);
  };

  return (
    <>
      <SideBar />
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
          </StatsCard>
        </TopSection>

        <BottomSection>
          <SectionTitle>차량 목록</SectionTitle>

          {/* 에러가 있으면 에러 메시지를 보여주고, 없으면 차량 목록을 보여줌 */}
          {errMsg ? (
            <div
              style={{
                padding: '20px',
                textAlign: 'center',
                color: '#d32f2f',
                backgroundColor: '#ffebee',
                borderRadius: '8px',
                marginTop: '20px',
                fontWeight: 'bold'
              }}
            >
              ⚠️ {errMsg}
            </div>
          ) : (
            <>
              <CarGrid>
                {cars.map((car) => (
                  <CarCard key={car.carId}>
                    <CarImageArea>
                      {car.carImage ? (
                        <img
                          src={car.carImage}
                          alt="차량 이미지"
                          style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                        />
                      ) : (
                        "이미지 없음"
                      )}
                    </CarImageArea>
                    <CarInfo>
                      <CarName>{car.carName}</CarName>
                      <CarDetail></CarDetail>
                      <CarDetail>주행 가능 거리 : {car.carDriving}km</CarDetail>
                    </CarInfo>
                    <CarBattery>
                      <BatteryLabel>배터리</BatteryLabel>
                      <BatteryValue>{car.battery}%</BatteryValue>
                    </CarBattery>
                    <DetailButton onClick={() => navi(`/cars/${car.carId}`)}>
                      상세 보기
                    </DetailButton>
                  </CarCard>
                ))}
              </CarGrid>

              {hasMore && (
                <LoadMoreButton onClick={increasePage}>
                  더보기
                </LoadMoreButton>
              )}
            </>
          )}
        </BottomSection>
      </MainContainer>
    </>
  );
};
export default CarsSearchList;
