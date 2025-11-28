import React, { useState } from "react";
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
} from "react-icons/fa";

const SideBar = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 

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

  return (
    <S.SideBarContainer>
      <S.LogoArea>
        <h2>Share EV</h2>
      </S.LogoArea>

      <S.Menu>
        <S.MenuItem
          $active={location.pathname === "/admin"}
          onClick={() => handleNavigation("/admin")}
        >
          <FaHome /> <span>Home</span>
        </S.MenuItem>

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
            <li
              onClick={() =>
                handleNavigation("/admin/enviroments/enviromentsUserRanking")
              }
            >
              User Ranking
            </li>
          </S.SubMenu>
        )}

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
    </S.SideBarContainer>
  );
};

export default SideBar;
