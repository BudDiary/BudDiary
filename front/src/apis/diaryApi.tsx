import { formApi, api, sentimentApi } from "./axiosConfig";
import Swal from "sweetalert2";

// 다이어리 작성 API
const postTodayDiaryApi = (payload: any) => {
  return formApi
    .post(`/api/diaries`, payload, { withCredentials: true })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err, "postTodayDiaryApi 오류");
      Swal.fire({
        icon: "error",
        text: "postTodayDiaryApi 오류",
      });
    });
};

// 특정 날짜 다이어리 리스트 조회
const getDateDiaryListApi = (date: string) => {
  return api
    .get(`/api/diaries?date=${date}`, { withCredentials: true })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err, "getDateDiaryListApi 오류");
      Swal.fire({
        icon: "error",
        text: "getDateDiaryListApi 오류",
      });
    });
};

// 다이어리 디테일
const getDiaryDetailApi = (payload: number) => {
  return api
    .get(`/api/diaries/${payload}`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err, "getDateDiaryListAPI 오류");
      Swal.fire({
        icon: "error",
        text: "getDateDiaryListAPI 오류",
      });
    });
};

// 다이어리 삭제
const deleteDiaryApi = (diary_id: number) => {
  return api
    .delete(`/api/diaries/${diary_id}`, { withCredentials: true })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "deleteDiaryApi 오류",
      });
    });
};

// 다이어리 스티커 추가
const patchDiaryStickerApi = (payload: any) => {
  return api
    .get(`/api/diaries/stickers`, payload)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err, "patchDiaryStickerApi 오류");
      Swal.fire({
        icon: "error",
        text: "patchDiaryStickerApi 오류",
      });
    });
};

const postSentimentApi = (payload: any) => {
  return sentimentApi
    .post(`/`, payload)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err, "postSentimentApi 오류");
      Swal.fire({
        icon: "error",
        text: "postSentimentApi 오류",
      });
    });
};

export {
  postTodayDiaryApi,
  getDateDiaryListApi,
  getDiaryDetailApi,
  deleteDiaryApi,
  patchDiaryStickerApi,
  postSentimentApi,
};
