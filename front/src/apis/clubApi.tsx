import { api, formApi } from "./axiosConfig";
import Swal from "sweetalert2";

// 다수 클럽 생성
const postPluralClubApi = (payload: any) => {
  return formApi
    .post(`api/clubs/plural`, payload, { withCredentials: true })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "postPluralClubApi 오류가 발생했어요.",
      });
      console.log(err);
      return err;
    });
};

// 1:1 클럽 생성
const postDoubleClubApi = (payload: any) => {
  return api
    .post(`api/clubs/double`, payload, { withCredentials: true })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "postDoubleClubApi 오류가 발생했어요.",
      });
      console.log(err, "postDoubleClubApi오류");
      return err;
    });
};

// 내가 속한 클럽 조회
const getMyClubListApi = (payload: string) => {
  return api
    .get(`api/clubs?username=${payload}`, { withCredentials: true })
    .then((res) => {
      console.log(res.data.myClubList);
      return res.data.myClubList;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "getMyClubListApi 오류가 발생했어요.",
      });
      return err;
    });
};

// 클럽 디테일 조회

const getClubDetailApi = (clubId: string, username: string) => {
  return api
    .get(`api/clubs/${clubId}/${username}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      // Swal.fire({
      //   icon: "error",
      //   text: "getClubDetailApi 오류가 발생했어요.",
      // });
      return err;
    });
};

export {
  postPluralClubApi,
  postDoubleClubApi,
  getMyClubListApi,
  getClubDetailApi,
};
