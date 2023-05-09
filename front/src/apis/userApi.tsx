import { api, formApi } from "./axiosConfig";
import Swal from 'sweetalert2';

const kakaoSignUpApi = (payload: string | null) => {
  console.log('카카오톡 로그인에 들어옴', payload)
    return api.get(`${payload}`, { withCredentials: true })
    .then((res) => {
        return res.data;
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: '로그인 과정에서 오류가 발생했어요.'
        })
        return err;
      });
}

// 회원가입 
const firstSignUpApi = (payload: any) => {
  console.log('회원가입 들어옴?', payload)
    return formApi.post(`api/members/signup`, payload)
    .then((res) => {
        return res.data;
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: '회원가입 프사업로드, 닉네임 설정 과정에서 오류가 발생했어요.'
        })
        return err;
      });
}


export { kakaoSignUpApi, firstSignUpApi };