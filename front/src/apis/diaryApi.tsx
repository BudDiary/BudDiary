import { api } from "./axiosConfig";
import Swal from 'sweetalert2';

const getDateDiaryListAPI = (payload: string) => {
  return api
    .get(`diaries?date=${payload}`)
    .then((res) => {
      console.log(res)
      // return res.data
    })
    .catch((err) => {
      console.log(err, 'getDateDiaryListAPI 오류')
      Swal.fire({
        icon: 'error',
        text: 'getDateDiaryListAPI 오류'
      })
    });
};



export {
  getDateDiaryListAPI,
};