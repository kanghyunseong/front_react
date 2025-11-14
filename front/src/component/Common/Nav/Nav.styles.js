import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NavTitle = styled.h3`
  font-size: 40px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 25px;
  opacity: 0.9;
  transition: opacity 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;
