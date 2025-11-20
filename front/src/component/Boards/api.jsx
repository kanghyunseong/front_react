import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
});

// 요청마다 자동으로 토큰 실어 보내기
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;