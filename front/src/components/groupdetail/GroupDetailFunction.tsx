import * as Yup from "yup";

export function timeAgo(timestamp: string) {
  const time = Date.parse(timestamp);
  const now = Date.now();
  const diff = now - time;

  if (diff < 1000 * 60) {
    const seconds = Math.floor(diff / 1000);
    return `${seconds}초 전`;
  } else if (diff < 1000 * 60 * 60) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}분 전`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days}일 전`;
  }
}

export const handleCommentChange = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  setHeight: React.Dispatch<React.SetStateAction<string>>
) => {
  const textareaLineHeight = 24;
  const maxRows = 6;
  const { value, scrollHeight } = event.target;
  const rows =
    Math.ceil((scrollHeight - textareaLineHeight) / textareaLineHeight) + 1;
  const rowsToShow = rows >= maxRows ? maxRows : rows;
  const newHeight = rowsToShow * textareaLineHeight;
  setHeight(`${newHeight}px`);
};

export const handleCheckComment = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  setCheckComment: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const value = event.target.value;
  const commentSchema = Yup.object().shape({
    text: Yup.string()
      .min(1, "댓글을 입력해주세요.")
      .max(200, "200자 이내로 작성해주세요."),
  });

  commentSchema
    .validate({ text: value })
    .then(() => {
      if (value.length <= 200) {
        setCheckComment(value);
        setError(null);
      } else {
        setCheckComment("");
        setError("200자 이내로 작성해주세요.");
        window.alert("200자가 넘었습니다.");
      }
    })
    .catch((error) => {
      setCheckComment(value);
      setError(error.message);
    });
};

export const handleCommentBlur = (
  event: React.FocusEvent<HTMLTextAreaElement>,
  setCommentState: React.Dispatch<React.SetStateAction<string>>
) => {
  setCommentState(event.target.value);
};

export const handleCheckReply = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  setReplyComment: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const value = event.target.value;
  const commentSchema = Yup.object().shape({
    text: Yup.string()
      .required("댓글을 입력해주세요.")
      .max(200, "200자 이내로 작성해주세요."),
  });
  commentSchema
    .validate({ text: value })
    .then(() => {
      setReplyComment(value);
      setError(null);
    })
    .catch((error) => {
      setReplyComment(value);
      setError(error.message);
    });
};

export const handleReplyBlur = (
  event: React.FocusEvent<HTMLTextAreaElement>,
  setReplyText: React.Dispatch<React.SetStateAction<string>>
) => {
  setReplyText(event.target.value);
};
