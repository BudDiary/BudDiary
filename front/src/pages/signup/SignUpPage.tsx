import React, {useEffect} from 'react'
import { kakaoSignUpApi } from '../../apis/userApi';
// import { getCookie } from '../../apis/cookie';

export default function SignUpPage() {
  useEffect(() => {
    async function fetchData() {
      const currentUrl: string = window.location.href;
      const code = currentUrl.split('localhost:3000/')[1];
      // console.log(code)
      kakaoSignUpApi(code)
    }
    fetchData();
  }, []);
  return (
    <div>SignUpPage</div>
  )
}
