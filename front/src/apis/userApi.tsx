import { api } from "./axiosConfig";
import Swal from 'sweetalert2';

const kakaoSignUpApi = (payload: string | null) => {
  console.log('카카오톡 로그인에 들어옴', payload)
    return api.get(`${payload}`, { withCredentials: true })
    .then((res) => {
        console.log(res, '아 성공이요')
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


export { kakaoSignUpApi };