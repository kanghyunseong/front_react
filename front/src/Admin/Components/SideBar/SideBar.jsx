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

  const currentUserName = auth?.userName || "Guest Admin";
  const currentUserRole = auth?.role || "ADMIN";

  // 메뉴 열림 상태 관리
  const [openMenus, setOpenMenus] = useState({
    cars: location.pathname.includes("/cars"),
    community: location.pathname.includes("/community"),
    environments: location.pathname.includes("/enviroments"),
    users: location.pathname.includes("/user"),
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    if (window.confirm("관리자 페이지에서 로그아웃 하시겠습니까?")) {
      if (logout) logout();
      navigate("/");
    }
  };

  const handleNavi = () => {
    if (window.confirm("관리자 페이지에서 메인 페이지로 이동하시겠습니까?")) {
      navigate("/");
    }
  };

  const isParentActive = (pathPart) => location.pathname.includes(pathPart);

  return (
    <S.SideBarContainer>
      <S.LogoArea>
        <h2>Share EV</h2>
      </S.LogoArea>

      <S.UserInfoArea>
        <FaUserCircle size={32} color="#4F46E5" />
        <div className="user-details">
          <span className="user-name">{currentUserName}</span>
          <span className="user-role">{currentUserRole}</span>
        </div>
      </S.UserInfoArea>

      <S.Menu>
        <S.MenuItem
          $active={location.pathname === "admin"}
          onClick={() => handleNavigation("/admin")}
        >
          <div className="title">
            <FaHome /> <span>Dashboard</span>
          </div>
        </S.MenuItem>

        <S.MenuItem
          $active={isParentActive("/cars")}
          onClick={() => toggleMenu("/cars")}
        >
          <div className="title">
            <FaCar /> <span>Cars</span>
          </div>
          {openMenus.cars ? (
            <FaChevronUp size={12} />
          ) : (
            <FaChevronDown size={12} />
          )}
        </S.MenuItem>
        {openMenus.cars && (
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

        <S.MenuItem
          $active={isParentActive("/community")}
          onClick={() => toggleMenu("/community")}
        >
          <div className="title">
            <FaComments /> <span>Community</span>
          </div>
          {openMenus.community ? (
            <FaChevronUp size={12} />
          ) : (
            <FaChevronDown size={12} />
          )}
        </S.MenuItem>
        {openMenus.community && (
          <S.SubMenu>
            <li
              onClick={() => handleNavigation("/admin/community/declaration")}
            >
              Declaration
            </li>
            <li
              onClick={() =>
                handleNavigation("/admin/community/comment/declaration")
              }
            >
              Comments
            </li>
            <li onClick={() => navigate("/admin/community/notice/noticeList")}>
              Notice
            </li>
          </S.SubMenu>
        )}

        <S.MenuItem
          $active={isParentActive("/enviroments")}
          onClick={() => toggleMenu("environments")}
        >
          <div className="title">
            <FaLeaf /> <span>Environments</span>
          </div>
          {openMenus.environments ? (
            <FaChevronUp size={12} />
          ) : (
            <FaChevronDown size={12} />
          )}
        </S.MenuItem>
        {openMenus.environments && (
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

        <S.MenuItem
          $active={isParentActive("/user")}
          onClick={() => toggleMenu("users")}
        >
          <div className="title">
            <FaUsers /> <span>Users</span>
          </div>
          {openMenus.users ? (
            <FaChevronUp size={12} />
          ) : (
            <FaChevronDown size={12} />
          )}
        </S.MenuItem>
        {openMenus.users && (
          <S.SubMenu>
            <li onClick={() => handleNavigation("/admin/user/userOverview")}>
              User Overview
            </li>
          </S.SubMenu>
        )}
      </S.Menu>

      <S.LogoutButton onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Exit Admin Mode</span>
      </S.LogoutButton>
      <S.LogoutButton onClick={handleNavi}>
        <FaSignOutAlt />
        <span>Exit Admin Page</span>
      </S.LogoutButton>
    </S.SideBarContainer>
  );
};

export default SideBar;
