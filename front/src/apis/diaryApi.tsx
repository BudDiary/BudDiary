import { api } from "./axiosConfig";
import Swal from 'sweetalert2';

const getDateDiaryListAPI = (date: string, email: string) => {
  return api
    .get(`/api/diaries?date=${date}&username=${email}`)
    .then((res) => {
      return res.data.diaryList
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