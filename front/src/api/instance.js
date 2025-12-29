import axios from "axios";

const instance = axios.create({
  baseURL: window.ENV?.API_URL || "http://localhost:8081",
});

// 요청 인터셉터: 토큰 자동 설정
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 공통 에러 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");

        window.location.href = "/login";
      } else if (status === 500) {
        alert("서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.");
      } else {
        alert(error.response.data.message || "오류가 발생했습니다.");
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
