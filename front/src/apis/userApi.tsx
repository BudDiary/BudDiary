import { kakaoApi } from "./axiosConfig";


const kakaoSignUpApi = () => {
    return kakaoApi.get('/')
    .then((res) => {
        console.log(res, '아 성공이요')
      })
      .catch((err) => {
        console.log(err, '아 실패용')
      });
}


export { kakaoSignUpApi };