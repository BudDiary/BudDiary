// 임시적으로 이곳에 저장 => (작업 끝나는대로 apis 로 옮길 것)
import axios from "axios";

// Base_URL
const BASE_URL = "http://localhost:8080/";

// 일기 삭제 api

export const DiaryDelete = async (diaryId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}api/diaries/${diaryId}`);
    console.log(response);
  } catch (error) {
    console.error(error);
    throw new Error("다이어리를 삭제할 수 없습니다.");
  }
};

// 전체 데이터 가져오기

export const GetClubData = async (clubId: string) => {
  try {
    console.log("전달", clubId);
    const response = await axios.get(`${BASE_URL}/api/clubs/${clubId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("그룹의 데이터를 가져올 수 없습니다.");
  }
};

//---------------------------------------------------------- 댓글
export const CreateComment = async (
  text: string,
  diaryId: number,
  username: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}api/diaries/comments`,
      {
        text: text,
        diaryId: diaryId,
        username: username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      // 댓글 작성 성공
    } else {
      throw new Error("댓글 작성에 실패하였습니다.");
    }
    console.log(response);
  } catch (error) {
    console.error(error);
    console.log("댓글 작성", text, diaryId, username);
  }
};

// 댓글 삭제 api
export const CommentDelete = (commentId: number) => {
  axios
    .delete(`${BASE_URL}api/diaries/comments/${commentId}`)
    .then((response) => {
      if (response.status === 200) {
        // 댓글 삭제 성공
      } else {
        throw new Error("댓글을 삭제할 수 없습니다.");
      }
      console.log(response);
    })
    .catch((error) => {
      console.log("댓글 삭제", commentId);
      console.error(error);
    });
};

// 댓글 수정

//---------------------------------------------------------- 대댓글

// 대댓글 작성
export const CreateReply = async (
  text: string,
  commentId: number,
  username: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}api/diaries/comments/replies`,
      {
        text: text,
        commentId: commentId,
        username: username,
      }
    );
    if (response.status === 200) {
    } else {
      throw new Error("댓글 작성에 실패하였습니다.");
    }
    console.log(response);
  } catch (error) {
    console.error(error);
    console.log("대댓글 작성", text, commentId, username);
  }
};

// 대댓글 삭제

export const ReplyDelete = (replyId: number) => {
  axios
    .delete(`${BASE_URL}api/diaries/comments/replies/${replyId}`)
    .then((response) => {
      if (response.status === 200) {
        // 댓글 삭제 성공
      } else {
        throw new Error("댓글을 삭제할 수 없습니다.");
      }
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
      console.log("답글 삭제", replyId);
    });
};
// 대댓글 수정

// ----------------------------------------------------------------------이모티콘
// 이모티콘 추가
export const sendEmojiReaction = async (
  diaryId: number,
  memberUsername: string,
  actionType: string
) => {
  try {
    console.log("이모티콘", diaryId, memberUsername, actionType);
    const response = await axios.post(`${BASE_URL}api/diaries/reactions`, {
      diaryId: diaryId,
      memberUsername: memberUsername,
      actionType: actionType,
    });
    if (response.status < 200 || response.status >= 300) {
      throw new Error("Failed to send emoji reaction");
    }
  } catch (error) {
    console.error(error);
  }
};

// 이모티콘 제거

export const cancelReaction = async (
  diaryId: number,
  memberUsername: string,
  actionId: number
) => {
  try {
    console.log("이모티콘 취소", diaryId, memberUsername, actionId);
    const response = await axios.delete(
      `${BASE_URL}api/diaries/reactions/${actionId}`,
      {
        data: {
          diaryId: diaryId,
          memberUsername: memberUsername,
        },
      }
    );
    if (response.status === 204) {
      console.log("Emoji reaction canceled");
    } else {
      throw new Error("Failed to cancel emoji reaction");
    }
  } catch (error) {
    console.error(error);
  }
};
