import { api } from "./axiosConfig";
import Swal from 'sweetalert2';

// 스티커 등록
const postReactionApi = ( payload: any ) => {
    return api.post(`api/diaries/reactions`, payload,  { withCredentials: true })
    .then((res) => {
        console.log(res)
        return res.data;
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: 'postReactionApi 오류가 발생했어요.'
        })
        console.log(err)
        return err;
      });
}

// 모든 스티커 조회
const deleteReactionApi = (diarynumber: number, reactionnumber: number) => {
    return api.delete(`api/diaries/${diarynumber}/reactions/${reactionnumber}`, { withCredentials: true })
    .then((res) => {
      console.log(res)
      return res.data;
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: 'deleteReactionApi 오류가 발생했어요.'
        })
        return err;
      });
}


export { postReactionApi, deleteReactionApi};