import { useNavigate } from "react-router-dom";
import {
  StyledSidebar,
  StyledSidebarHeader,
  StyledSidebarNav,
  StyledSidebarButton,
  StyledSidebarLogoBox,
  StyledSideHeaderButton,
} from "./SideBar.styles.js";

const SideBar = () => {
  const navi = useNavigate();
  return (
    <StyledSidebar>
      <StyledSidebarHeader>
        <StyledSideHeaderButton>
          <StyledSidebarLogoBox>EV</StyledSidebarLogoBox>
          <span style={{ fontWeight: "bold", color: "#1f2937" }}>Share EV</span>
          <span style={{ fontWeight: "bold", color: "#666666ff" }}>
            사용자 아이디
          </span>
        </StyledSideHeaderButton>
      </StyledSidebarHeader>

      <StyledSidebarNav>
        <StyledSidebarButton onClick={() => navi("/members/detail")}>
          <span>프로필</span>
        </StyledSidebarButton>

        <StyledSidebarButton onClick={() => navi("/members/detail/changePwd")}>
          <span>비밀번호 변경</span>
        </StyledSidebarButton>

        <StyledSidebarButton onClick={() => navi("/members/detail/update")}>
          <span>회원 수정</span>
        </StyledSidebarButton>

        <StyledSidebarButton onClick={() => navi("/members/detail/delete")}>
          <span>회원 탈퇴</span>
        </StyledSidebarButton>
      </StyledSidebarNav>
    </StyledSidebar>
  );
};

export default SideBar;
