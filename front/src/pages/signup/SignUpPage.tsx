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
      const response = await kakaoSignUpApi(code)
      // 처음 가입한 사람이면 signup 으로 보내고, 아니면 메인페이지로
      if (response.newBe === true ) {
        navigate('/signup-info')
      } else {
        navigate('/')
      }
    }
    fetchData();
  }, []);
  return (
    <div>SignUpPage</div>
  )
}
