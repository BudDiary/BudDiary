import React, { useState } from "react";
import { BasicButton } from "./Diaries.styles";
import Reply from "./Reply";
import {
  InputBox,
  UserInfo,
  InputSet,
  CommentWrapper,
} from "./DiaryComment.style";

export default function DiaryComment() {
  const [showReply, setShowReply] = useState(false);
  const [commentText, setCommentText] = useState("");

  const toggleShowReply = () => setShowReply(!showReply);

  const handleCommentSubmit = () => {
    console.log(commentText);
    setCommentText("");
  };

  const replyButtonText = showReply ? "▲ 닫기" : `▼ {}개의 답글 보기`;

  return (
    <CommentWrapper>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <p>😀 1</p>
        <BasicButton>+😀</BasicButton>
      </div>

      <p>댓글 {}</p>
      <UserInfo>
        <div>
          <img src="{user.profile}" alt="프로필" />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <h2>멤버 2</h2>
            <h3
              style={{
                marginLeft: "0.5rem",
                color: "gray",
                fontSize: "0.75rem",
              }}
            >
              2023. 5. 2. 12:20:00
            </h3>
          </div>
          <p>댓글이 들어갈 장소입니다.</p>
        </div>
      </UserInfo>
      <CommentWrapper>
        <button>답글쓰기</button>
        <button onClick={toggleShowReply}>{replyButtonText}</button>
        {showReply && <Reply />}
      </CommentWrapper>
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
