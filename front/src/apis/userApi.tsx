import { api } from "./axiosConfig";


const kakaoSignUpApi = (payload: string) => {
  console.log('카카오톡 로그인에 들어옴', payload)
    return api.get(`/${payload}`)
    .then((res) => {
        console.log(res, '아 성공이요')
      })
      .catch((err) => {
        console.log(err, '아 실패용')
      });
}


export { kakaoSignUpApi };