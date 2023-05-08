// 임시적으로 이곳에 저장 => (작업 끝나는대로 apis 로 옮길 것)

// Base_URL
const BASE_URL = "http://localhost:8080/";

// 일기 삭제 api
export const DiaryDelete = (diaryId: number) => {
  fetch(`${BASE_URL}api/diaries/${diaryId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
      } else {
        throw new Error("다이어리를 삭제할 수 없습니다.");
      }
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

//---------------------------------------------------------- 댓글

// 댓글 작성 api
export const CreateComment = (
  text: string,
  diaryId: number,
  username: string
) => {
  fetch(`${BASE_URL}api/diaries/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text,
      diaryId: diaryId,
      username: username,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // 댓글 작성 성공
      } else {
        throw new Error("댓글 작성에 실패하였습니다.");
      }
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
      console.log("실패", text, diaryId, username);
    });
};

// 댓글 삭제 api
export const DeleteComment = (commentId: number) => {
  fetch(`${BASE_URL}api/diaries/comments/${commentId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
      } else {
        throw new Error("댓글을 삭제할 수 없습니다.");
      }
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

// 댓글 수정

//---------------------------------------------------------- 대댓글

// 대댓글 작성
export const CreateReply = (
  text: string,
  commentId: number,
  username: string
) => {
  fetch(`${BASE_URL}api/diaries/comments/replies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text,
      commentId: commentId,
      username: username,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // 댓글 작성 성공
      } else {
        throw new Error("댓글 작성에 실패하였습니다.");
      }
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
      console.log("실패", text, commentId, username);
    });
};

// 대댓글 삭제

export const DeleteReply = (replyId: number) => {
  fetch(`${BASE_URL}api/diaries/comments/replies/${replyId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
      } else {
        throw new Error("댓글을 삭제할 수 없습니다.");
      }
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};
// 대댓글 수정

// 이모티콘 추가

export const sendEmojiReaction = async (
  diaryId: number,
  memberUsername: string,
  actionType: string
) => {
  try {
    console.log("이모티콘", diaryId, memberUsername, actionType);
    const response = await fetch(`${BASE_URL}api/diaries/reactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        diaryId: diaryId,
        memberUsername: memberUsername,
        actionType: actionType,
      }),
    });
    if (!response.ok) {
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
    const response = await fetch(
      `${BASE_URL}api/diaries/reactions/${actionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          diaryId: diaryId,
          memberUsername: memberUsername,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to cancel emoji reaction");
    }
  } catch (error) {
    console.error(error);
  }
};
