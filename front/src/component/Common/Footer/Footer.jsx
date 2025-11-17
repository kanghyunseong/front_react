import HeaderLogo from "../../../assets/HeaderLogo.png";
import Nav from "../Nav/Nav";
import {
  FooterContainer,
  FooterContent,
  BrandSection,
  Logo,
  CarIcon,
  BrandName,
  Description,
  Copyright,
  LogoImage,
} from "./Footer.styles";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <BrandSection>
          <Logo>
            <CarIcon>
              <LogoImage src={HeaderLogo} alt="ShareEV" />
            </CarIcon>
          </Logo>
          <Description>
            전기차를 더 쉽고 저렵하게 이용할 수 있도록
            <br />
            최고의 공유 서비스를 제공합니다.
            <br />
            함께 만드는 지속가능한 미래.
          </Description>
        </BrandSection>

        <Nav />
      </FooterContent>

      <Copyright>© 2025 EV Community. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
