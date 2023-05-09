import { api, formApi } from "./axiosConfig";
import Swal from 'sweetalert2';

// 스티커 등록
const postDiarySticker = ( payload: any ) => {
    return formApi.post(`api/stickers`, payload,  { withCredentials: true })
    .then((res) => {
        console.log(res)
        return res.data;
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: 'postDiarySticker 오류가 발생했어요.'
        })
        return err;
      });
}

// 모든 스티커 조회
const getAllStickers = () => {
    return api.get(`api/stickers`, { withCredentials: true })
    .then((res) => {
      console.log(res)
      return res.data;
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: 'getAllStickers 오류가 발생했어요.'
        })
        return err;
      });
}

// 내가 가진 스티커 조회
const getMyStickers = ( payload: string ) => {
  return api.get(`api/stickers/mine?username=${payload}`, { withCredentials: true })
  .then((res) => {
      console.log(res)
      return res.data;
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        text: 'getMyStickers 오류'
      })
      return err;
    });
}

export { postDiarySticker, getAllStickers, getMyStickers };