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
