import { useState, useInsertionEffect, createContext, useEffect } from "react";
export const AuthContext = createContext();
// 요 컨텍스트를 통해 인증관련 데이터를 하위 컴포넌트에 전달함
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userNo: null,
    userId: null,
    userName: null,
    phone: null,
    email: null,
    birthDay: null,
    accessToken: null,
    refreshToken: null,
    role: null,
    isAuthenticated: false,
  });
  useEffect(() => {
    const userNo = localStorage.getItem("userNo");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const role = localStorage.getItem("role");
    const phone = localStorage.getItem("phone");
    const email = localStorage.getItem("email");
    const birthDay = localStorage.getItem("birthDay");
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    if (
      accessToken &&
      refreshToken &&
      userNo &&
      userName &&
      role &&
      phone &&
      email &&
      birthDay
    ) {
      setAuth({
        userNo,
        userId,
        userName,
        role,
        phone,
        email,
        birthDay,
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    }
  }, []);
  // 로그인에 성공했을 때 수행할 함수
  const login = (
    accessToken,
    refreshToken,
    userNo,
    userName,
    userId,
    role,
    phone,
    email,
    birthDay
  ) => {
    setAuth({
      userNo,
      userName,
      userId,
      role,
      phone,
      email,
      birthDay,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
    localStorage.setItem("userNo", userNo);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);
    localStorage.setItem("birthDay", birthDay);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);
  };
  const logout = () => {
    setAuth({
      userNo: null,
      userName: null,
      userId: null,
      phone: null,
      email: null,
      birthDay: null,
      accessToken: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("userNo");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("phone");
    localStorage.removeItem("email");
    localStorage.removeItem("birthDay");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.");
    window.localStorage.href = "/";
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};