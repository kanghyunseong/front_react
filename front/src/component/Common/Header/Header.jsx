import {
  StyledHeader,
  Logo,
  Frame,
  NavItem,
  ButtonWrapper,
  ButtonText,
  ButtonText2,
  IconLogo,
} from "./Header.styles";
import logo from "../../../assets/HeaderLogo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navi = useNavigate();
  return (
    <>
      <StyledHeader>
        <IconLogo>
          <a onClick={() => navi("/")}>
            <Logo src={logo} alt="로고없음" />
          </a>
        </IconLogo>
        <Frame>
          <NavItem onClick={() => navi("/cars/searchList")}>차량찾기</NavItem>
          <NavItem onClick={() => navi("/stations")}>충전소</NavItem>
          <NavItem onClick={() => navi("/boards")}>커뮤니티</NavItem>
          <ButtonWrapper>
            <ButtonText onClick={() => navi("/members/join")}>
              로그인
            </ButtonText>
            <ButtonText2>/</ButtonText2>
            <ButtonText onClick={() => navi("/members/login")}>
              회원가입
            </ButtonText>
          </ButtonWrapper>
        </Frame>
      </StyledHeader>
    </>
  );
};

export default Header;
