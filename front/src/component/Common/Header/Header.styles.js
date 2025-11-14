import styled from "styled-components";

export const StyledHeader = styled.header`
  height: 150px;
  background: linear-gradient(
    90deg,
    rgb(94, 151, 76),
    rgb(76, 157, 126),
    rgb(52, 166, 197)
  );
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  color: white;
  font-size: 37px;
  font-weight: 600;
`;

export const IconLogo = styled.div`
  width: 150px;
  height: 150px;
  padding-left: 10%;
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

  &:hover {
    opacity: 0.8;
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
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 36.4px;
  text-align: center;
  text-shadow: 0px 4px 4px #00000040;
  white-space: nowrap;
  text-decoration: none;
`;

export const ButtonText2 = styled.span`
  color: #ffffff;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 36.4px;
  text-align: center;
  text-shadow: 0px 4px 4px #00000040;
  white-space: nowrap;
`;
