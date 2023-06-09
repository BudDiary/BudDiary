import axios from "axios";

// import { getCookie} from './cookie';
// import { getCookie, setCookie } from 'typescript-cookie'

// 로그인된 사용자
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
const KAKAO_BASE_URL = `${process.env.REACT_APP_KAKAO_BASE}`;
// const BASE_URL = "http://buddiaryALB-1250245218.ap-northeast-2.elb.amazonaws.com";
const FASTAPI_BASE_URL = `${process.env.REACT_APP_FASTAPI_BASE_URL}`;
// const FASTAPI_BASE_URL = `http://localhost:9000`;
const NAVER_CLOVA_URL = `${process.env.REACT_APP_NAVER_CLOVA_URL}`;
// const BASE_URL = "http://3.35.197.93:8080";
// const BASE_URL = "http://172.31.144.1:8080";
// const BASE_URL = "http://192.168.100.175:8080";
axios.defaults.baseURL = BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});
const apiKakao = axios.create({
  baseURL: KAKAO_BASE_URL,
});

const formApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// fastApi
const fastApi = axios.create({
  baseURL: FASTAPI_BASE_URL,
});

// 카카오톡 로그인
const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT}`;
// const REDIRECT_URI = "http://ec2-3-36-102-176.ap-northeast-2.compute.amazonaws.com/login/oauth2/code/kakao";
const KAKAO_AUTH_URL = `${process.env.REACT_APP_KAKAO_AUTH_URL}${REDIRECT_URI}`;
// const KAKAO_AUTH_URL = `http://buddiaryALB-1250245218.ap-northeast-2.elb.amazonaws.com/oauth2/authorize/kakao?redirect_uri=${REDIRECT_URI}`;
const kakaoApi = axios.create({
  baseURL: KAKAO_AUTH_URL,
});

export { axios, api, formApi, kakaoApi, fastApi, KAKAO_AUTH_URL, apiKakao };
