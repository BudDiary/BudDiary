import React, { useState } from "react";
import { BasicButton } from "./Diaries.styles";
import {
  UserInfo,
  InputSet,
  InputBox,
  CommentWrapper,
} from "./DiaryComment.style";
import ReplyList from "./ReplyData.json";
import { timeAgo } from "./GroupDetailFunction";
type Props = {
  commentId: number;
};

export default function Reply({ commentId }: Props) {
  const [commentText, setCommentText] = useState("");
  const [showReply, setShowReply] = useState(false);

  const handleCommentSubmit = () => {
    console.log(commentText);
    setCommentText("");
  };

  const filterReplies = ReplyList.filter(
    (reply) => reply.comment_id === commentId
  );

  const replyButtonText = showReply
    ? "▲ 닫기"
    : filterReplies.length > 0
    ? `▼ ${filterReplies.length}개의 답글 보기`
    : "답글 입력";
  return (
    <CommentWrapper>
      <BasicButton onClick={() => setShowReply(!showReply)}>
        {replyButtonText}
      </BasicButton>
      {showReply && (
        <div style={{ width: "160%" }}>
          {filterReplies.map((reply) => (
            <UserInfo key={reply.id}>
              <div>
                <img src={reply.userImage} alt="프로필" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <h2 style={{ fontWeight: "bold" }}>{reply.member_name}</h2>
                  <h3
                    style={{
                      marginLeft: "0.5rem",
                      color: "gray",
                      fontSize: "0.75rem",
                    }}
                  >
                    {timeAgo(reply.update_at)}
                  </h3>
                  <button>
                    <h3 style={{ color: "#ABC4FF" }}>수정하기</h3>
                  </button>
                  <button>
                    <h3 style={{ color: "#FB557C" }}>삭제하기</h3>
                  </button>
                </div>
                <p>{reply.reply}</p>
              </div>
            </UserInfo>
          ))}
          <InputSet>
            <InputBox
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <BasicButton onClick={handleCommentSubmit}>댓글 달기</BasicButton>
          </InputSet>
        </div>
      )}
    </CommentWrapper>
  );
}
