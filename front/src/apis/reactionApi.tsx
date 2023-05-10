import { api } from "./axiosConfig";
import Swal from "sweetalert2";

// 리액션 등록
const postReactionApi = (
  diaryId: number,
  memberUsername: string,
  actionType: string
) => {
  const data = {
    diaryId,
    memberUsername,
    actionType,
  };
  return api
    .post(`api/diaries/reactions`, data)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log("이모티콘 선택", diaryId, memberUsername, actionType);
      Swal.fire({
        icon: "error",
        text: "postReactionApi 오류가 발생했어요.",
      });
      console.log(err);
      return err;
    });
};

// 리액션 삭제
const deleteReactionApi = (
  diaryId: number,
  actionId: number,
  username: string
) => {
  return api
    .delete(`/{diaryId}/reactions/{actionId}/{username}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log("이모티콘 삭제", diaryId, actionId, username);
      Swal.fire({
        icon: "error",
        text: "deleteReactionApi 오류가 발생했어요.",
      });
      return err;
    });
};

export { postReactionApi, deleteReactionApi };
