import { api } from "./axiosConfig";


const userSignUpApi = () => {
    return api.post('주소')
    .then((res) => {
        console.log(res, '아 성공이요')
      })
      .catch((err) => {
        console.log(err, '아 실패용')
      });
}


export { userSignUpApi };