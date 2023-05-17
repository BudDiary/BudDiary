import { formApi, api, fastApi } from "./axiosConfig";
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
  console.log(date);
  return api
    .get(`/api/diaries?date=${date}`, { withCredentials: true })
    .then((res) => {
      console.log(res.data.diaryList);
      return res.data.diaryList;
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
const getDiaryDetailApi = (payload: string) => {
  return api
    .get(`/api/diaries/${payload}`)
    .then((res) => {
      console.log(res.data, "일기 잘 들어왔나");
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
  return fastApi
    .post(`/fastapi/sentiment`, payload)
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

const postKeywordApi = (payload: any) => {
  return fastApi
    .post(`/fastapi/keyword`, payload)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err, "postKeywordApi 오류");
      Swal.fire({
        icon: "error",
        text: "postKeywordApi 오류",
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
  postKeywordApi,
};
