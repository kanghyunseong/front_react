import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  StyledSidebar,
  StyledSidebarHeader,
  StyledSidebarNav,
  StyledSidebarButton,
  StyledSidebarLogoBox,
  StyledSideHeaderButton,
} from "./SideBar.styles.js";
import { AuthContext } from "../../../context/AuthContext.jsx";

const SideBar = () => {
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  //console.log(auth.userId);
  return (
    <StyledSidebar>
      <StyledSidebarHeader>
        <StyledSideHeaderButton>
          <StyledSidebarLogoBox>EV</StyledSidebarLogoBox>
          <span style={{ fontWeight: "bold", color: "#1f2937" }}>Share EV</span>
          <span style={{ fontWeight: "bold", color: "#666666ff" }}>
            {auth.userName}
          </span>
          {auth.provider && (
            <span
              style={{
                fontSize: "0.7em",
                fontWeight: "normal",
                marginLeft: 4,
                color:
                  auth.provider === "naver"
                    ? "#03C75A"
                    : auth.provider === "kakao"
                    ? "#FEE500"
                    : "#000000",
              }}
            >
              {auth.provider}
            </span>
          )}
        </StyledSideHeaderButton>
      </StyledSidebarHeader>

      <StyledSidebarNav>
        <StyledSidebarButton onClick={() => navi("/members/detail")}>
          <span>프로필</span>
        </StyledSidebarButton>

        <StyledSidebarButton
          onClick={() =>
            auth.provider ? null : navi("/members/detail/changePwd")
          }
          disabled={!!auth.provider} // provider가 존재하면 비활성화
        >
          <span>비밀번호 변경</span>
        </StyledSidebarButton>

        <StyledSidebarButton onClick={() => navi("/members/detail/update")}>
          <span>회원 수정</span>
        </StyledSidebarButton>

        <StyledSidebarButton
          onClick={() =>
            auth.provider ? null : navi("/members/detail/delete")
          }
          disabled={!!auth.provider}
        >
          <span>회원 탈퇴</span>
        </StyledSidebarButton>
      </StyledSidebarNav>
    </StyledSidebar>
  );
};

export default SideBar;
