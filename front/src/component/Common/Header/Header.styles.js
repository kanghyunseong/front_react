import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100;
  height: 150px;
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
  width: 150px;
  height: 150px;
  padding-left: 10%;

    @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    padding-left: 5%;
  }

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    padding-left: 3%;
  }
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Frame = styled.nav`
  display: flex;
  align-items: center;
  gap: 100px;
  flex: 1;
  justify-content: flex-end;
  padding-right: 10%;

    @media (max-width: 768px) {
    gap: 40px;
    padding-right: 5%;
  }

  @media (max-width: 480px) {
    gap: 20px;
    padding-right: 3%;
  }
`;

export const NavItem = styled.a`
  color: #ffffff;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 51.8px;
  text-align: center;
  text-shadow: 0px 4px 4px #00000040;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.3s;
  line-height: 32px;

  &:hover {
    opacity: 0.8;
  }

    @media (max-width: 768px) {
    font-size: 18px;
    line-height: 30px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 24px;
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
  font-family: "Inter-SemiBold", Helvetica;
  font-weight: 600;
  letter-spacing: 0;
  text-align: center;
  text-shadow: 0px 4px 4px #00000040;
  white-space: nowrap;
  text-decoration: none;
  font-size: 25px;
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
