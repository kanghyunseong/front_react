import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081",
});

// 응답 인터셉터: 응답을 받기 전 가로채기
instance.interceptors.response.use(
  (response) => response, // 성공하면 그대로 통과
  (error) => {
    // 에러 발생 시 공통 처리
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login"; // 강제 이동
      } else if (status === 500) {
        alert("서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.");
      } else {
        alert(error.response.data.message || "오류가 발생했습니다.");
      }
    }
    return Promise.reject(error); // 컴포넌트의 catch로 에러를 넘김
  }
);

export default instance;
