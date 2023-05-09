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
  const minRows = 1;
  const maxRows = 5;
  const { value, scrollHeight } = event.target;
  const rows =
    Math.ceil((scrollHeight - textareaLineHeight) / textareaLineHeight) + 1;
  const rowsToShow = rows >= maxRows ? maxRows : rows;
  const newHeight = rowsToShow * textareaLineHeight;
  setHeight(`${newHeight}px`);
};

export const handleCommentBlur = (
  event: React.FocusEvent<HTMLTextAreaElement>,
  setCommentState: React.Dispatch<React.SetStateAction<string>>
) => {
  setCommentState(event.target.value);
};
