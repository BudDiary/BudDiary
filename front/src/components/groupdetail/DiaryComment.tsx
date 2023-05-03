import React, { useState } from "react";
import { BasicButton } from "./Diaries.styles";
import Reply from "./Reply";
import {
  InputBox,
  UserInfo,
  InputSet,
  CommentWrapper,
} from "./DiaryComment.style";
import CommentList from "./CommentList.json";
type Props = {
  diaryId: number;
};

export default function DiaryComment({ diaryId }: Props) {
  // const [showReply, setShowReply] = useState(false);
  const [commentText, setCommentText] = useState("");

  // const toggleShowReply = () => setShowReply(!showReply);

  const handleCommentSubmit = () => {
    console.log(commentText);
    setCommentText("");
  };

  const filteredComments = CommentList.filter(
    (comment) => comment.diary_id === diaryId
  );

  return (
    <CommentWrapper>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <p>😀 1</p>
        <BasicButton>+😀</BasicButton>
      </div>

      <p style={{ fontWeight: "bold" }}>댓글 {filteredComments.length}</p>
      {filteredComments.map((comment) => (
        <UserInfo key={comment.id}>
          <div>
            <img src={comment.userImage} alt="프로필" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <h2>{comment.member_name}</h2>
              <h3
                style={{
                  marginLeft: "0.5rem",
                  color: "gray",
                  fontSize: "0.75rem",
                }}
              >
                {comment.update_at}
              </h3>
            </div>
            <p>{comment.comment}</p>
            <Reply key={comment.id} commentId={comment.id} />
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
    </CommentWrapper>
  );
}
