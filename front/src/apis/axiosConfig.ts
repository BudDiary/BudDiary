import { getCookie, setCookie } from './cookie';
import axios from "axios";


// 로그인된 사용자
const BASE_URL = "http://localhost:8080";

axios.defaults.baseURL = BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});


const authApi = axios.create({

  baseURL: BASE_URL,
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    // "Access-Control-Allow-Origin": '*',
    // 'Access-Control-Allow-Credentials':"true",
  }

});
authApi.interceptors.request.use(
  (request) => {
    // const oauth2_auth_request = getCookie('oauth2_auth_request');
    // console.log(oauth2_auth_request, "oauth2_auth_request")
    // const redirect_uri = getCookie('redirect_uri');
    // console.log(redirect_uri, "redirect_uri")
    // // request.headers.Cookie = `redirect_uri=${redirect_uri}`
    // if (oauth2_auth_request && redirect_uri) {
    //   console.log(oauth2_auth_request, "와!")
    //   request.headers.Cookie = `redirect_uri=${redirect_uri}`
    // }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);
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

export { axios, api, authApi, kakaoApi, KAKAO_AUTH_URL, REDIRECT_URI };