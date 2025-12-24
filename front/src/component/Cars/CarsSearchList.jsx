import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  LoadMoreButton,
} from "./CarsSearchList.style";
import { axiosPublic } from "../../api/reqService";

const CarsSearchList = () => {
  const navi = useNavigate();
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [mains, setMains] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [randomCar, setRandomCar] = useState(null);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";
  // 메인페이지 정보 가져오기
  useEffect(() => {
    axios
      .get(`${apiUrl}/main`)
      .then((res) => {
        setMains(res.data.data);
        // popularCars 배열에서 랜덤으로 하나 선택
        if (res.data.popularCars && res.data.popularCars.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * res.data.popularCars.length
          );
          setRandomCar(res.data.data.popularCars[randomIndex]);
        }
      })
      .catch((err) => {
        console.error("메인 정보 로드 실패:", err);
      });
  }, []);

  // 차량 목록 가져오기
  useEffect(() => {
    setIsLoading(true);
    // axios
    //   .get(`${apiUrl}/cars?page=${currentPage}`)
    axiosPublic.getList(`/cars?page=${currentPage}`)
      .then((response) => {
        console.log(response);
        
        const newCars = response.data;
      

        if (!newCars || newCars.length === 0) {
          setHasMore(false);
          return;
        }

        setCars((prevCars) => {
          const existingIds = new Set(prevCars.map((car) => car.carId));
          const uniqueNewCars = newCars.filter(
            (car) => !existingIds.has(car.carId)
          );
          return [...prevCars, ...uniqueNewCars];
        });

        if (newCars.length < 4) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.["error-message"];

        if (
          errorMessage?.includes("조회된") ||
          errorMessage?.includes("없습니다")
        ) {
          setHasMore(false);
        } else {
          setErrMsg(errorMessage || "오류가 발생했습니다");
          console.error("차량 목록 로드 실패:", err);
        }
      })
      .finally(() => {
        setIsLoading(false);
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
            <ProfileImageArea>
              {randomCar?.carImage ? (
                <img
                  src={randomCar.carImage}
                  alt={`${randomCar.carName} 이미지`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                  }}
                />
              ) : null}
            </ProfileImageArea>
            <ProfileSubtitle>
              오늘 전기차를 확인하세요!
              <br />
              지역 / 차량을 선택해 예약하세요.
            </ProfileSubtitle>
          </ProfileCard>

          <StatsCard>
            {mains ? (
              <>
                <StatItem>
                  <StatLabel>전체 차량</StatLabel>
                  <StatValue>{mains.countCars || 0} 대</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>대여중인 차량</StatLabel>
                  <StatValue>{mains.countRentalCars || 0} 건</StatValue>
                </StatItem>
              </>
            ) : (
              <>
                <StatItem>
                  <StatLabel>전체 차량</StatLabel>
                  <StatValue>-- 대</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>예약 건수</StatLabel>
                  <StatValue>-- 건</StatValue>
                </StatItem>
              </>
            )}
          </StatsCard>
        </TopSection>

        <BottomSection>
          <SectionTitle>차량 목록</SectionTitle>

          {errMsg ? (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                color: "#d32f2f",
                backgroundColor: "#ffebee",
                borderRadius: "8px",
                marginTop: "20px",
                fontWeight: "bold",
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
                          alt={`${car.carName} 이미지`}
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
                    <CarInfo>
                      <CarName>{car.carName}</CarName>
                      <CarDetail>주행 가능 거리: {car.carDriving}km</CarDetail>
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

              {isLoading && (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  로딩 중...
                </div>
              )}

              {hasMore && !isLoading && (
                <LoadMoreButton onClick={increasePage}>더보기</LoadMoreButton>
              )}
            </>
          )}
        </BottomSection>
      </MainContainer>
    </>
  );
};

export default CarsSearchList;
