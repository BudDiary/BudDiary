import axios from "axios";

// 로그인된 사용자
const BASE_URL = "http://172.19.236.180:8080/api";

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
// 카카오톡 로그인
const REDIRECT_URI = "http://localhost:3000/login/oauth2/code/kakao";
// const KAKAO_API_KEY = 'c20864e836acea814d3687543c21c103'
// const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}`;
const KAKAO_AUTH_URL = `http://localhost:8080/oauth2/authorize/kakao?redirect_uri=${REDIRECT_URI}`;
const kakaoApi = axios.create({
  baseURL: KAKAO_AUTH_URL,
});

export { axios, api, kakaoApi, KAKAO_AUTH_URL };
