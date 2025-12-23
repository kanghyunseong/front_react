import axios from "axios";
const API = window.ENV?.API_URL;
export const reqObj = {
  getList: (url) => axios.get(`${API}${url}`).then((res) => res.data.data),
  create: (url, obj, file) => {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
      formData.append(key, obj[key]);
    });
    if (file) formData.append("file", file);
    return axios
      .post(`${API}${url}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  },
  put: (url, id) => {
    axios.put(`${API}${url}/${id}`).then((res) => res.data);
  },
  delete: (url, pk) =>
    axios.delete(`${API}${url}/${pk}`).then((res) => res.data),
};
