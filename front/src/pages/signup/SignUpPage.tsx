import React, {useEffect} from 'react'
import { kakaoSignUpApi } from '../../apis/userApi';
// import { REDIRECT_URI } from '../../apis/axiosConfig';
import { useNavigate } from "react-router-dom";
import useMember from '../../hooks/memberHook';
import Swal from 'sweetalert2';
export default function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useMember();
  useEffect(() => {
    async function fetchData() {
      const currentUrl: string = window.location.href;
      const code = currentUrl.split('ec2-3-36-102-176.ap-northeast-2.compute.amazonaws.com/')[1];
      // const code = currentUrl.split('localhost:3000/')[1];
      const response = await kakaoSignUpApi(code)
      console.log(response)
      // 처음 가입한 사람이면 signup 으로 보내고, 아니면 메인페이지로
      if (response.newBe === true ) {
        navigate('/signup-info', {state:response})
      } else if (response.newBe === false) {
        // 이미 가입된 사용자이면
        login(response)
        // if (response.)
        Swal.fire({
          icon: 'success',
          text: '로그인 성공!'
        })
        navigate('/')
        
      } else {
        console.log(response)
      }
    }
    fetchData();
  }, []);
  return (
    <div>SignUpPage</div>
  )
}
