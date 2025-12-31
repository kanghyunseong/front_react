import axios from "axios";

const API = window.ENV?.API_URL || "http://localhost:8081";

// 1. 공통 인스턴스 설정
const axiosAuthInstance = axios.create({
  baseURL: API,
});

axiosAuthInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const axiosPublicInstance = axios.create({
  baseURL: API,
});

/**
 * [알맹이 추출용 함수]
 * 서버 응답의 ResponseData 구조에서 실제 data 필드만 반환합니다.
 */
const unwrap = (res) =>
  res.data?.data !== undefined ? res.data.data : res.data;
// --------------------------------------------------------
// 2. 인증 필요한 요청 (axiosAuth)
// --------------------------------------------------------
export const axiosAuth = {
  // [구조 A] 전체 응답이 필요한 경우 (기존 방식 유지)
  // 결과: { message: "...", data: [...], success: "..." }
  getList: (url) => axiosAuthInstance.get(url).then((res) => ({ ...res.data })),
  // [구조 B] 데이터 알맹이만 바로 필요한 경우 (대시보드 KPI 등)
  // 결과: [ ... ] 또는 { totalActiveUsers: 21, ... }
  getActual: (url) => axiosAuthInstance.get(url).then(unwrap),
  // 생성 (FormData 지원 + 전체 응답 반환)

  createJson: (url, obj) => {
    return axiosAuthInstance.post(url, obj, {headers: { "Content-Type": "application/json" },})
    .then((res) => ({...res.data}));
  },

  create: (url, obj, file) => {
    const formData = new FormData();
    if (obj) Object.keys(obj).forEach((key) => formData.append(key, obj[key]));
    if (file) formData.append("file", file);
    return axiosAuthInstance
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => ({ ...res.data }));
  },
  // 수정 (PUT)
  put: (url, data = {}) =>
    axiosAuthInstance.put(url, data).then((res) => ({ ...res.data })),

  putReserve: (url, data = {}) =>
    axiosAuthInstance.put(url, data, {headers: { "Content-Type": "application/json" }}).then((res) => ({...res.data})),

  // 삭제 (DELETE)
  delete: (url, pk) =>
    axiosAuthInstance
      .delete(pk ? `${url}/${pk}` : url)
      .then((res) => ({ ...res.data })),

  post: (url, data = {}) =>
    axiosAuthInstance.post(url, data).then((res) => ({ ...res.data })),
};

// --------------------------------------------------------
// 3. 인증 불필요 요청 (axiosPublic)
// --------------------------------------------------------
export const axiosPublic = {
  getList: (url) =>
    axiosPublicInstance.get(url).then((res) => ({ ...res.data })),
  getActual: (url) => axiosPublicInstance.get(url).then(unwrap),

  post: (url, data) =>
    axiosPublicInstance.post(url, data).then((res) => ({ ...res.data })),

  create: (url, obj, file) => {
    const formData = new FormData();
    if (obj) Object.keys(obj).forEach((key) => formData.append(key, obj[key]));
    if (file) formData.append("file", file);
    return axiosPublicInstance
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => ({ ...res.data }));
  },

};
