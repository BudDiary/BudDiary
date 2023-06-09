import { api, fastApi, formApi } from "./axiosConfig";
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
const postDoubleClubApi = (payload: string) => {
  return api
    .post(
      `api/clubs/double`,
      { targetName: payload },
      { withCredentials: true }
    )
    .then((res) => {
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
const getMyClubListApi = () => {
  return api
    .get(`api/clubs`, { withCredentials: true })
    .then((res) => {
      return res.data.myClubList;
    })
    .catch((err) => {
      // Swal.fire({
      //   icon: "error",
      //   text: "getMyClubListApi 오류가 발생했어요.",
      // });
      return err;
    });
};

const postRecommendBySurveyApi = (payload: any) => {
  return fastApi
    .post(`/fastapi/recommend/survey`, payload, { withCredentials: true })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      // Swal.fire({
      //   icon: "error",
      //   text: "postRecommendBySurveyApi 오류가 발생했어요.",
      // });
      return err;
    });
};

// 클럽 디테일 조회

const getClubDetailApi = (clubId: string) => {
  return api
    .get(`api/clubs/${clubId}`, { withCredentials: true })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "getClubDetailApi 오류가 발생했어요.",
      });
      return err;
    });
};

const PostRecommendBykeyWordApi = (payload: any) => {
  return fastApi
    .post(`/fastapi/recommend/keyword2`, payload, { withCredentials: true })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      // Swal.fire({
      //   icon: "error",
      //   text: "PostRecommendBykeyWordApi 오류가 발생했어요.",
      // });
      return err;
    });
};

const PostApproveInvitationApi = (clubId: string) => {
  const data = {
    clubId,
  };
  console.log(clubId);
  return api
    .post(`api/clubs/invitation`, data, { withCredentials: true })
    .then((res) => {
      return res;
    })

    .catch((err) => {
      Swal.fire({
        icon: "warning",
        text: "이미 참여하고 있는 그룹입니다",
      });

      return err;
    });
};

export {
  postPluralClubApi,
  postDoubleClubApi,
  getMyClubListApi,
  getClubDetailApi,
  postRecommendBySurveyApi,
  PostRecommendBykeyWordApi,
  PostApproveInvitationApi,
};
