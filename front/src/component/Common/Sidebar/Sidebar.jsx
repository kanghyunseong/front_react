import { useNavigate } from "react-router-dom";
import {
  StyledSidebar,
  StyledSidebarHeader,
  StyledSidebarNav,
  StyledSidebarButton,
  StyledSidebarLogoBox,
  StyledSideHeaderButton,
} from "./Sidebar.style.js";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";

const SideBar = () => {
  const {auth} = useContext(AuthContext);
  const navi = useNavigate();
  return (
    <StyledSidebar>
      <StyledSidebarHeader>
        <StyledSideHeaderButton>
          <StyledSidebarLogoBox>EV</StyledSidebarLogoBox>
          <span style={{ fontWeight: "bold", color: "#1f2937" }}>Share EV</span>
          <span style={{ fontWeight: "bold", color: "#666666ff"}}>
            {auth.userName}
          </span>
        </StyledSideHeaderButton>
      </StyledSidebarHeader>

      <StyledSidebarNav>
        <StyledSidebarButton onClick={() => navi("/cars/searchList")}>
          <span>차량 목록보기</span>
        </StyledSidebarButton>
        <StyledSidebarButton onClick={() => navi("/cars/reserves/searchList")}>
          <span>예약 내역 변경 / 취소</span>
        </StyledSidebarButton>
        <StyledSidebarButton onClick={() => navi("/cars/reserves/detail")}>
          <span>이용 기록</span>
        </StyledSidebarButton>
      </StyledSidebarNav>
    </StyledSidebar>
  );
};

export default SideBar;
