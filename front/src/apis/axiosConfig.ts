import axios from "axios";

// 로그인된 사용자
const BASE_URL = "주소뭐야";

axios.defaults.baseURL = BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// api.interceptors.request.use(
//   (request) => {
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { axios, api };
