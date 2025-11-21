import { useState, useInsertionEffect, createContext, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userNo: null,
    userName: null,
    userId: null,
    phone: null,
    email: null,
    birthDay: null,
    accessToken: null,
    refreshToken: null,
    role: null,
    provider: null,
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
    const provider = localStorage.getItem("provider");
    if (
      accessToken &&
      refreshToken &&
      userNo &&
      userName &&
      userId &&
      role &&
      phone &&
      email &&
      birthDay
    ) {
      setAuth({
        userNo,
        userId,
        userName,
        userId,
        role,
        phone,
        email,
        birthDay,
        accessToken,
        provider: provider || null,
        refreshToken,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (
    accessToken,
    refreshToken,
    userNo,
    userName,
    userId,
    role,
    phone,
    email,
    birthDay,
    provider
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
      provider: provider || null,
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
    if (provider) {
      localStorage.setItem("provider", provider);
    }
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
      provider: null,
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
    localStorage.removeItem("provider");
    alert("로그아웃 되었습니다.");
    window.location.href = "/"; //
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
