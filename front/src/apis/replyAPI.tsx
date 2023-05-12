import { api, formApi } from "./axiosConfig";
import Swal from "sweetalert2";

// 대댓글 작성

const postReplyApi = (commentId: number, reply: string, username: string) => {
  const data = {
    commentId: commentId,
    text: reply,
    username: username,
  };

  return api
    .post(`api/diaries/comments/replies`, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log("댓글입력", data);
      Swal.fire({
        icon: "error",
        text: "postReplyApi 오류가 발생했어요.",
      });
      return err;
    });
};

// 대댓글 삭제

const deleteReplyApi = (
  commentId: number,
  replyId: number,
  username: string
) => {
  return api
    .delete(`/api/diaries/comments/${commentId}/replies/${replyId}/${username}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      console.log("댓글삭제", commentId, replyId, username);
      Swal.fire({
        icon: "error",
        text: "deleteReplyApi 오류가 발생했어요.",
      });
      return err;
    });
};

export { postReplyApi, deleteReplyApi };
