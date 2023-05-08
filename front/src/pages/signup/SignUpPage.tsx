import React, {useEffect} from 'react'
import { kakaoSignUpApi } from '../../apis/userApi';
// import { REDIRECT_URI } from '../../apis/axiosConfig';
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const currentUrl: string = window.location.href;
      const code = currentUrl.split('localhost:3000/')[1];
      // console.log(code)
      const response = await kakaoSignUpApi(code)
      console.log(response)
      if (response.newBe === true ) {
        navigate('/login/oauth2/code/kakao')
      }
    }
    fetchData();
  }, []);
  return (
    <div>SignUpPage</div>
  )
}
