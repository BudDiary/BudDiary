import { api, formApi } from "./axiosConfig";
import Swal from "sweetalert2";

// 모든 스티커 조회
const getAllStickersApi = () => {
  return api
    .get(`api/stickers`, { withCredentials: true })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "getAllStickers 오류가 발생했어요.",
      });
      return err;
    });
};

// 스티커 구매
const postBuyDiaryStickerApi = (id: number, count: number) => {
  return api
    .post(
      `api/stickers/${id}`,
      {
        stickerId: id,
        count: count,
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res, "잘삼?");
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// 내가 가진 스티커 조회
const getMyStickersApi = () => {
  return api
    .get(`api/stickers/mine`, { withCredentials: true })
    .then((res) => {
      console.log(res.data.myStickerList);
      return res.data.myStickerList;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "getMyStickers 오류",
      });
      return err;
    });
};

export { postBuyDiaryStickerApi, getAllStickersApi, getMyStickersApi };
