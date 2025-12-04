import styled, { keyframes } from "styled-components";

export const Body = styled.main`
  width: 100%;
  height: 1600px;
`;
export const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(to right, #52b788, #4a9d9c);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 120px;
`;

//카드
export const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 0 5%;
  margin-top: -100px;
  margin-left: -50px;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    margin-top: -80px;
    margin-left: 0;
  }
`;
export const Reason = styled.div`
  color: #262626;
  margin-top: 30px;
  font-size: 67px;
  align-items: right;
  justify-content: center;
  line-height: 140%;
  text-align: center;
`;
//개별 카드
export const StatsCard = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 40px 50px;
  min-width: 250px;
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 15px 40px rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    min-width: 200px;
    padding: 30px 40px;
  }

  @media (max-width: 480px) {
    min-width: 150px;
    padding: 25px 30px;
  }
`;

//숫자
export const StatsNumber = styled.h2`
  font-family: "Inter", Helvetica;
  font-weight: 900;
  font-size: 48px;
  color: #207054;
  text-align: center;
  margin: 0 0 15px 0;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

// 설명 텍스트 스타일
export const StatsLabel = styled.p`
  font-family: "Inter", Helvetica;
  font-weight: 700;
  font-size: 18px;
  color: black;
  text-align: center;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
export const ExplanationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 100px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const ExplanationCard = styled.div`
  display: flex;
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 30px 40px;
  min-width: 250px;
  max-width: 300px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-width: 200px;
    padding: 25px 30px;
  }

  @media (max-width: 480px) {
    min-width: 150px;
    padding: 20px 25px;
  }
`;
export const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  font-size: 40px;
`;
export const CardTitle = styled.h3`
  font-family: "Inter", Helvetica;
  font-weight: 700;
  font-size: 20px;
  color: #262626;
  margin: 0 0 15px 0;
`;
export const CardDescription = styled.p`
  font-family: "Inter", Helvetica;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
  margin: 0;
`;
export const CarCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin-top: 200px;
  padding: 0px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;
export const CarExplationCard = styled.div`
  display: flex;
  background-color: #f5f5f5;
  border-radius: 30px;
  min-width: 400px;
  max-width: 100%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-width: 200px;
    padding: 25px 30px;
  }

  @media (max-width: 480px) {
    min-width: 150px;
    padding: 20px 25px;
  }
`;
export const CarImage = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 30px 30px 0px 0px;
`;
export const CarName = styled.div`
  font-size: 20px;
  margin: 0 auto;
  line-height: 80px;
`;
export const CarReservation = styled.button`
  font-size: 15px;
  margin-right: 40px;
  height: 40px;
  margin-top: 20px;
  width: 70px;
  border-radius: 10px;

  border: none;
  &:hover {
    cursor: pointer;
    background-color: white;
  }
`;

export const CarImg = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 30px 30px 0px 0px;
`;
export const CarExplain = styled.div`
  display: flex;
  background-color: #d9d9d9;
  border-radius: 0px 0px 30px 30px;
  width: 100%;
  height: 80px;
  margin: auto;
`;
