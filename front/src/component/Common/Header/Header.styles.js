import styled, { keyframes } from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  height: 200px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1),
    rgb(76, 157, 126),
    rgba(6, 76, 95, 1)
  );
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  color: white;
  font-size: 37px;
  font-weight: 600;

  @media (max-width: 768px) {
    height: 100px;
    font-size: 24px;
  }

  @media (max-width: 480px) {
    height: 80px;
    font-size: 18px;
  }
`;

export const IconLogo = styled.div`
  position: absolute;
  top: 20px;
  left: 40px;
  width: 150px;
  height: 150px;
  z-index: 1000;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    top: 15px;
    left: 20px;
  }

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    top: 10px;
    left: 20px;
  }
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Frame = styled.nav`
  position: absolute;
  top: 60px;
  right: 20%;
  display: flex;
  align-items: center;
  gap: 100px;
  z-index: 1000;

  @media (max-width: 768px) {
    gap: 40px;
    right: 15%;
    top: 60px;
  }

  @media (max-width: 480px) {
    gap: 20px;
    right: 10%;
    top: 60px;
  }
`;

export const NavItem = styled.a`
  color: #ffffff;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 37px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 51.8px;
  text-align: center;
  text-shadow: 0px 4px 4px #00000040;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.3s;
  line-height: 140%;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    font-weight: 700;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    font-weight: 700;
  }
`;

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Title = styled.div`
  margin-top: 0px;
  height: 400px;
  margin-top: 0px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1),
    rgb(76, 157, 126),
    rgba(6, 76, 95, 1)
  );
`;

export const MainTitle = styled.h1`
  font-family: "Inter", Helvetica;
  height: 150px;
  padding-top: 30px;
  font-weight: 700;
  font-size: 64px;
  line-height: 140%;
  letter-spacing: 0%;
  color: #ffffff;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  animation: ${fadeInUp} 2s ease-out;
  width: 100%;
  flex: 0.2.5;

  @media (max-width: 768px) {
    font-size: 40px;
    margin-top: 40px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
    margin-top: 30px;
  }
`;

export const SubTitle = styled.p`
  font-family: "Inter", Helvetica;
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0%;
  color: #ffffff;
  text-align: center;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  animation: ${fadeInUp} 2s ease-out 0.3s both;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8bd4e182;
  border-radius: 50px;
  padding: 17px 39px;
  cursor: pointer;
  border: none;
  gap: 10px;
`;

export const ButtonText = styled.a`
  color: #ffffff;
  font-family: "Inter", Helvetica;
  font-weight: 600;
  font-size: 37px;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: center;
  text-shadow: 0px 4px 4px #00000040;
  white-space: nowrap;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ButtonText2 = styled.span`
  color: #ffffff;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 0;
  text-align: center;
  text-shadow: 0px 4px 4px #00000040;
  white-space: nowrap;
  line-height: 30px;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 22px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 18px;
  }
`;
