import { useEffect, useState } from "react";
import {
  Body,
  CarCardContainer,
  CardDescription,
  CardIcon,
  CardTitle,
  CarExplain,
  CarExplationCard,
  CarImage,
  CarImg,
  CarName,
  CarReservation,
  ExplanationCard,
  ExplanationContainer,
  Reason,
  StatsCard,
  StatsContainer,
  StatsLabel,
  StatsNumber,
} from "./Home.styles";
import { useNavigate } from "react-router-dom";
import { MainTitle, SubTitle, Title } from "../Header/Header.styles";
import { axiosPublic } from "../../../api/reqService";

const Home = () => {
  const navi = useNavigate();
  const [countMembers, setCountMembers] = useState("");
  const [countCars, setCountCars] = useState("");
  const [countReservation, setCountReservation] = useState("");
  const [popularCars, setPopularCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleReserve = (carId) => {
    navi(`/cars/${carId}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const response = await axios.get(`${apiUrl}/main`);
        const response = await axiosPublic.getList("/api/main");

        console.log(response.data);

        // API 응답 구조에 맞게 수정하세요
        setCountMembers(response.data.countMembers);
        setCountCars(response.data.countCars);
        setCountReservation(response.data.countReservation);
        setPopularCars(response.data.popularCars);
        console.log(countCars);
        console.log(countMembers);
        console.log(countReservation);
        console.log(popularCars);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <>
      <Body>
        <Title>
          <MainTitle>원하는 전기차를 빌리고 공유하세요</MainTitle>
          <SubTitle>
            함께 나눈는 친환경 모빌리티로 지구를 지키고 더 나은 미래를
            만들어가세요
          </SubTitle>
        </Title>
        <StatsContainer>
          <StatsCard>
            <StatsNumber>{countMembers}</StatsNumber>
            <StatsLabel>회원 수</StatsLabel>
          </StatsCard>
          <StatsCard>
            <StatsNumber>{countCars}</StatsNumber>
            <StatsLabel>차량 수</StatsLabel>
          </StatsCard>
          <StatsCard>
            <StatsNumber>{countReservation}</StatsNumber>
            <StatsLabel>예약 수</StatsLabel>
          </StatsCard>
        </StatsContainer>
        <Reason>왜?Share EV인가요?</Reason>
        <ExplanationContainer>
          <ExplanationCard>
            <CardIcon>🚗</CardIcon>
            <CardTitle>다양한 차량</CardTitle>
            <CardDescription>
              소형부터 대형 SUV까지 원하는 전기차를 자유롭게 선택하세요
            </CardDescription>
          </ExplanationCard>
          <ExplanationCard>
            <CardIcon>🎁</CardIcon>
            <CardTitle>무료대여</CardTitle>
            <CardDescription>
              커뮤니티 회원들과 무료로 차량을 나누고 함께 성장 하세요
            </CardDescription>
          </ExplanationCard>
          <ExplanationCard>
            <CardIcon>🌍</CardIcon>
            <CardTitle>환경 보호</CardTitle>
            <CardDescription>
              공유를 통해 탄소 배출을 줄이고 지속 가능한 미래를 만들어요
            </CardDescription>
          </ExplanationCard>
        </ExplanationContainer>
        <CarCardContainer>
          {popularCars.map((car, index) => (
            <CarExplationCard key={index}>
              <CarImage>
                <CarImg src={car.carImage} alt={car.name || "차량"} />
              </CarImage>
              <CarExplain>
                <CarName>{car.carName || "⚡비야디 중형전기차 씰"}</CarName>
                <CarReservation onClick={() => handleReserve(car.carId)}>
                  예약하기
                </CarReservation>
              </CarExplain>
            </CarExplationCard>
          ))}
        </CarCardContainer>
      </Body>
    </>
  );
};

export default Home;
