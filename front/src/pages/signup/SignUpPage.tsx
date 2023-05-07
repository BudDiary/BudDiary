import React, {useEffect} from 'react'
import { kakaoSignUpApi } from '../../apis/userApi';
// import { getCookie } from '../../apis/cookie';
// import { authApi } from '../../apis/axiosConfig';

export default function SignUpPage() {
  useEffect(() => {
    async function fetchData() {
      const currentUrl: string = window.location.href;
      const code = currentUrl.split('localhost:3000/')[1];
      // const code1 = new URL(window.location.href).searchParams.get("code");
      // console.log(code1)
      await kakaoSignUpApi(code)
    }
    fetchData();
  }, []);
  // useEffect(() => {
  //   async function fetchData() {
  //     const code = new URL(window.location.href).searchParams.get("code");
  //     console.log(code);
  //     const ACCESS_TOKEN = await kakaoSignUpApi(code);
  //     authApi.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`;
  //   }
  //   fetchData();
  // }, []);
  return (
    <div>SignUpPage</div>
  )
}
