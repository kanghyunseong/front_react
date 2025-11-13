import { StyledSidebar,StyledSidebarHeader,StyledSidebarNav, StyledSidebarButton,StyledSidebarLogoBox, StyledSideHeaderButton} from './Sidebar.style.js';


const SideBar = () => {
    return (
        <StyledSidebar>
          <StyledSidebarHeader>
            <StyledSideHeaderButton>
            <StyledSidebarLogoBox>EV</StyledSidebarLogoBox>
            <span style={{fontWeight: 'bold', color: '#1f2937'}}>Share EV</span>
            <span style={{fontWeight: 'bold', color: '#1f2937'}}>사용자 이름</span>
            </StyledSideHeaderButton>
          </StyledSidebarHeader>
          
          <StyledSidebarNav>
            <StyledSidebarButton>
              <span>차량 목록보기</span>
            </StyledSidebarButton>
            <StyledSidebarButton>
              <span>차량 예약</span>
            </StyledSidebarButton>
            <StyledSidebarButton>
              <span>예약 변경 / 취소</span>
            </StyledSidebarButton>
            <StyledSidebarButton>
              <span>이용 기록</span>
            </StyledSidebarButton>
          </StyledSidebarNav>
        </StyledSidebar>
    );
}

export default SideBar;