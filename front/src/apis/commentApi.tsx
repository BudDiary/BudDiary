import { api } from "./axiosConfig";
import Swal from "sweetalert2";

// 댓글 작성

const postCommentApi = (diaryId: number, text: string) => {
  const data = {
    diaryId,
    text,
  };

  return api
    .post("/api/diaries/comments", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("댓글입력", data);
      console.log(err);
      return err;
    });
};

// 댓글 삭제

const deleteCommentApi = (diaryId: number, commentId: number) => {
  return api
    .delete(`/api/diaries/${diaryId}/comments/${commentId}`, {
      withCredentials: true,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "deleteCommentApi 오류가 발생했어요.",
      });
      return err;
    });
};

export { postCommentApi, deleteCommentApi };
