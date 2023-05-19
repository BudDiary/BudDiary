import { api } from "./axiosConfig";
import Swal from "sweetalert2";

type ActionType = "LIKED" | "SURPRISED" | "SAD" | "ANGRY" | "BEST";

// 리액션 등록
const postReactionApi = (diaryId: number, actionType: ActionType) => {
  const data = {
    diaryId,
    actionType,
  };

  return api
    .post(`api/diaries/reactions`, data, { withCredentials: true })
    .then((res) => {
      return res;
    })

    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "postReactionApi 오류가 발생했어요.",
      });

      return err;
    });
};

// 리액션 삭제
const deleteReactionApi = (diaryId: number, actionId: number) => {
  return api
    .delete(`/api/diaries/${diaryId}/reactions/${actionId}`, {
      withCredentials: true,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "deleteReactionApi 오류가 발생했어요.",
      });
      return err;
    });
};

export { postReactionApi, deleteReactionApi };
