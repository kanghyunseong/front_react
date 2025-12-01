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
import logo from "../../../assets/adminLogo.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Header = () => {
  const { auth, logout } = useContext(AuthContext);

  const isLogin = !!auth?.userId; // id로 로그인 되어있는지 체크
  const isAdmin = auth?.role?.includes("ADMIN");
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
          <NavItem onClick={() => navi("/boards/notices")}>커뮤니티</NavItem>
          <ButtonWrapper>
            {isLogin ? (
              <>
                {isAdmin && (
                  <>
                    <ButtonText onClick={() => navi("/admin")}>
                      관리자페이지
                    </ButtonText>
                    <ButtonText2>/</ButtonText2>
                  </>
                )}

                <ButtonText onClick={() => navi("/members/myinfo")}>
                  내정보
                </ButtonText>
                <ButtonText2>/</ButtonText2>
                <ButtonText onClick={logout}>로그아웃</ButtonText>
              </>
            ) : (
              <>
                <ButtonText onClick={() => navi("/members/login")}>
                  로그인
                </ButtonText>
                <ButtonText2>/</ButtonText2>
                <ButtonText onClick={() => navi("/members/join")}>
                  회원가입
                </ButtonText>
              </>
            )}
          </ButtonWrapper>
        </Frame>
      </StyledHeader>
    </>
  );
};

export default Header;
