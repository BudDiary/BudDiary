import axios from "axios";
// import { getCookie} from './cookie';
// import { getCookie, setCookie } from 'typescript-cookie'

// 로그인된 사용자
const BASE_URL = "http://localhost:8080";
// const BASE_URL = "http://3.35.197.93:8080";
// const BASE_URL = "http://172.31.144.1:8080";
// const BASE_URL = "http://192.168.100.175:8080";


axios.defaults.baseURL = BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    
  }
});

const formApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

// fastApi
const fastApi = axios.create({
  baseURL: BASE_URL,
});

// 카카오톡 로그인
const REDIRECT_URI = "http://localhost:3000/login/oauth2/code/kakao";
const KAKAO_AUTH_URL = `http://localhost:8080/oauth2/authorize/kakao?redirect_uri=${REDIRECT_URI}`;
const kakaoApi = axios.create({
  baseURL: KAKAO_AUTH_URL,
});

export { axios, api, formApi, kakaoApi,fastApi, KAKAO_AUTH_URL, authApi};