import axios from "axios";

const api = axios.create({
  baseURL: window.ENV.API_URL,
});
  
// 요청 인터셉터: 토큰 자동 첨부
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;  
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 공통 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // 네트워크 오류 등
      alert("서버와 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const message = data?.message;

    if (status === 401) {
      alert(message || "세션이 만료되었습니다. 다시 로그인해주세요.");
      // 토큰 정리 (선택)
      localStorage.removeItem("accessToken");
      // 로그인 페이지로 이동
      window.location.href = "/members/login";
    } else if (status === 403) {
      alert(message || "접근 권한이 없습니다.");
    } else if (status === 404) {
      alert(message || "요청하신 자원을 찾을 수 없습니다.");
    } else if (status >= 500) {
      alert(message || "서버 내부 오류가 발생했습니다.");
    } else {
      alert(message || "요청 처리 중 오류가 발생했습니다.");
    }

    return Promise.reject(error);
  }
);

export default api;
