import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();
// 요 컨텍스트를 통해 인증관련 데이터를 하위 컴포넌트에 전달함

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    memberId: "dev_admin_id", // (임시 ID)
    memberName: "개발 관리자", // (임시 이름)
    accessToken: "FAKE_ACCESS_TOKEN_FOR_DEV_12345", // (아무 문자열)
    refreshToken: "FAKE_REFRESH_TOKEN", // (아무 문자열)
    role: "ROLE_ADMIN", // (관리자 권한)
    isAuthenticated: true,
  });

  // 자동로그인 구현을 위한 useEffect
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const memberId = localStorage.getItem("memberId");
    const memberName = localStorage.getItem("memberName");
    const role = localStorage.getItem("role");

    if (accessToken && refreshToken && memberId && memberName && role) {
      setAuth({
        memberId,
        memberName,
        accessToken,
        refreshToken,
        role,
        isAuthenticated: true,
      });
    }
  }, []);

  // 로그인에 성공했을 때 수행할 함수
  const login = (memberId, memberName, accessToken, refreshToken, role) => {
    setAuth({
      memberId,
      memberName,
      accessToken,
      refreshToken,
      role,
      isAuthenticated: true,
    });
    localStorage.setItem("memberId", memberId);
    localStorage.setItem("memberName", memberName);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", role);
  };

  // 로그아웃에 성공했을 때 수행할 함수
  const logout = () => {
    setAuth({
      memberId: null,
      memberName: null,
      accessToken: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("memberId");
    localStorage.removeItem("memberName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
