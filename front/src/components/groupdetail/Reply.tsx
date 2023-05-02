import React, { useState } from "react";
import { BasicButton } from "./Diaries.styles";
import { UserInfo, InputSet, InputBox } from "./DiaryComment.style";
export default function Reply() {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    // TODO: 입력한 댓글 내용을 전달하는 로직 구현
    console.log(commentText);
    setCommentText("");
  };
  return (
    <div>
      <div>
        <UserInfo>
          <div>
            <img src="{user.profile}" alt="프로필" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <h2>멤버 1</h2>
              <h3
                style={{
                  marginLeft: "0.5rem",
                  color: "gray",
                  fontSize: "0.75rem",
                }}
              >
                2023. 5. 2. 12:21:00
              </h3>
            </div>
            <p>답글이 들어가는 자리입니다.</p>
          </div>
        </UserInfo>
        <InputSet>
          <InputBox
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <BasicButton onClick={handleCommentSubmit}>댓글 달기</BasicButton>
        </InputSet>
      </div>
    </div>
  );
}
