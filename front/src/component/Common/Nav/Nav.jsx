import styled from "styled-components";
import { NavContainer, NavLink, NavTitle } from "./Nav.styles";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navi = useNavigate();
  return (
    <NavContainer>
      <NavTitle>서비스 목록</NavTitle>
      <NavLink onClick={() => navi("/cars/searchList")}>차량 찾기</NavLink>
      <NavLink onClick={() => navi("/support")}>충전소</NavLink>
      <NavLink onClick={() => navi("/community")}>커뮤니티</NavLink>
    </NavContainer>
  );
};

export default Nav;
