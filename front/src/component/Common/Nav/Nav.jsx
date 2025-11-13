import styled from "styled-components";
import { NavContainer, NavLink, NavTitle } from "./Nav.styles";

const Nav = () => {
  return (
    <NavContainer>
      <NavTitle>서비스 목록</NavTitle>
      <NavLink href="/cars/searchList">차량 찾기</NavLink>
      <NavLink href="/support">충전소</NavLink>
      <NavLink href="/community">커뮤니티</NavLink>
    </NavContainer>
  );
};

export default Nav;
