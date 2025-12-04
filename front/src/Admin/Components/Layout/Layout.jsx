import React from "react";
import SideBar from "../SideBar/SideBar";
import * as S from "./Layout.styles";
import { Outlet } from "react-router-dom"; // 라우터 사용 시 필요, 없으면 children 처리

const Layout = ({ children }) => {
  return (
    <S.LayoutContainer>
      <SideBar />
      <S.MainContent>{children}</S.MainContent>
    </S.LayoutContainer>
  );
};

export default Layout;
