import { api } from "./axiosConfig";
import Swal from "sweetalert2";

// 대댓글 작성

const postReplyApi = (commentId: number, reply: string) => {
  const data = {
    commentId: commentId,
    text: reply,
  };

  return api
    .post(`api/diaries/comments/replies`, data, { withCredentials: true })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "postReplyApi 오류가 발생했어요.",
      });
      return err;
    });
};

// 대댓글 삭제

const deleteReplyApi = (commentId: number, replyId: number) => {
  return api
    .delete(`/api/diaries/comments/${commentId}/replies/${replyId}`, {
      withCredentials: true,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: "deleteReplyApi 오류가 발생했어요.",
      });
      return err;
    });
};

export { postReplyApi, deleteReplyApi };
