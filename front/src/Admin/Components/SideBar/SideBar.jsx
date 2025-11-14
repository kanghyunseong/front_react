import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 라우터 훅 추가
import * as S from "./SideBar.styles";
import {
  FaHome,
  FaCar,
  FaUsers,
  FaLeaf,
  FaComments,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const SideBar = () => {
  const navigate = useNavigate(); // 이동 함수
  const location = useLocation(); // 현재 경로 확인용 (선택 사항)

  // 드롭다운 상태 관리
  const [activeMenu, setActiveMenu] = useState({
    cars: true, // 개발 편의를 위해 기본적으로 열어둠 (나중에 false로 변경 가능)
    community: false,
    environments: false,
    users: false,
  });

  const toggleMenu = (menu) => {
    setActiveMenu({ ...activeMenu, [menu]: !activeMenu[menu] });
  };

  // 페이지 이동 핸들러
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <S.SideBarContainer>
      <S.LogoArea>
        <h2>Share EV</h2>
      </S.LogoArea>

      <S.Menu>
        {/* Home -> 대시보드 */}
        <S.MenuItem
          $active={location.pathname === "/admin"}
          onClick={() => handleNavigation("/admin")}
        >
          <FaHome /> <span>Home</span>
        </S.MenuItem>

        {/* Cars Dropdown */}
        <S.MenuItem onClick={() => toggleMenu("cars")}>
          <div className="title">
            <FaCar /> <span>Cars</span>
          </div>
          {activeMenu.cars ? <FaChevronUp /> : <FaChevronDown />}
        </S.MenuItem>

        {activeMenu.cars && (
          <S.SubMenu>
            <li onClick={() => handleNavigation("/admin/cars/overview")}>
              Overview
            </li>
            <li onClick={() => handleNavigation("/admin/cars/reservation")}>
              Reservation
            </li>
            <li onClick={() => handleNavigation("/admin/cars/registration")}>
              Registration
            </li>
            <li onClick={() => handleNavigation("/admin/cars/settings")}>
              Settings
            </li>
          </S.SubMenu>
        )}

        {/* Community Dropdown */}
        <S.MenuItem onClick={() => toggleMenu("community")}>
          <div className="title">
            <FaComments /> <span>Community</span>
          </div>
          {activeMenu.community ? <FaChevronUp /> : <FaChevronDown />}
        </S.MenuItem>
        {activeMenu.community && (
          <S.SubMenu>
            <li
              onClick={() => handleNavigation("/admin/community/declaration")}
            >
              Community Declaration
            </li>
            <li
              onClick={() =>
                handleNavigation("/admin/community/comment/declaration")
              }
            >
              Comment Declaration
            </li>
            <li
              onClick={() =>
                handleNavigation("/admin/community/notice/noticeWrite")
              }
            >
              Notice Write
            </li>
            <li onClick={() => navigate("/admin/community/notice/noticeList")}>
              Notice List
            </li>
          </S.SubMenu>
        )}

        {/* Environments Dropdown */}
        <S.MenuItem onClick={() => toggleMenu("environments")}>
          <div className="title">
            <FaLeaf /> <span>Environments</span>
          </div>
          {activeMenu.environments ? <FaChevronUp /> : <FaChevronDown />}
        </S.MenuItem>
        {activeMenu.environments && (
          <S.SubMenu>
            <li
              onClick={() =>
                handleNavigation("/admin/enviroments/enviromentsVisualization")
              }
            >
              Enviroments Visualization
            </li>
            <li>User Ranking</li>
          </S.SubMenu>
        )}

        {/* Users Dropdown */}
        <S.MenuItem onClick={() => toggleMenu("users")}>
          <div className="title">
            <FaUsers /> <span>Users</span>
          </div>
          {activeMenu.users ? <FaChevronUp /> : <FaChevronDown />}
        </S.MenuItem>
        {activeMenu.users && (
          <S.SubMenu>
            <li>Users Overviews</li>
          </S.SubMenu>
        )}
      </S.Menu>
    </S.SideBarContainer>
  );
};

export default SideBar;
