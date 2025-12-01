import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./SideBar.styles";
import {
  FaHome,
  FaCar,
  FaUsers,
  FaLeaf,
  FaComments,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import { AuthContext } from "../../../context/AuthContext";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, logout } = useContext(AuthContext);

  const currentUserName = auth?.userName || "Guest";
  const currentUserRole = auth?.role || "USER";

  const [activeMenu, setActiveMenu] = useState({
    cars: false,
    community: false,
    environments: false,
    users: false,
  });

  const toggleMenu = (menu) => {
    setActiveMenu({ ...activeMenu, [menu]: !activeMenu[menu] });
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    navigate("/");
  };

  return (
    <S.SideBarContainer>
      {/* 1. 로고 영역 */}
      <S.LogoArea>
        <h2>Share EV</h2>
      </S.LogoArea>

      {/* 2. 사용자 정보 영역 추가 */}
      <S.UserInfoArea>
        <FaUserCircle size={24} color="#fff" />
        <div className="user-details">
          <span className="user-name">Welcome, {currentUserName}</span>
          <span className="user-role">({currentUserRole})</span>
        </div>
      </S.UserInfoArea>

      {/* 3. 메뉴 영역 */}
      <S.Menu>
        <S.MenuItem
          $active={location.pathname === "/admin"}
          onClick={() => handleNavigation("/admin")}
        >
          <FaHome /> <span>Home</span>
        </S.MenuItem>

        {/* Cars Menu */}
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

        {/* Community Menu */}
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

        {/* Environments Menu */}
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
                handleNavigation("/admin/enviroments/enviromentsUserRanking")
              }
            >
              User Ranking
            </li>
          </S.SubMenu>
        )}

        {/* Users Menu */}
        <S.MenuItem onClick={() => toggleMenu("users")}>
          <div className="title">
            <FaUsers /> <span>Users</span>
          </div>
          {activeMenu.users ? <FaChevronUp /> : <FaChevronDown />}
        </S.MenuItem>
        {activeMenu.users && (
          <S.SubMenu>
            <li onClick={() => handleNavigation("/admin/user/userOverview")}>
              Users Overviews
            </li>
          </S.SubMenu>
        )}
      </S.Menu>

      {/* 4. 뒤로가기/로그아웃 버튼 추가 */}
      <S.LogoutButton onClick={handleLogout}>
        <FaSignOutAlt />
        <span>관리자 페이지 나가기</span>
      </S.LogoutButton>
    </S.SideBarContainer>
  );
};

export default SideBar;
