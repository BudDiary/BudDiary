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
import EmojiPicker from "./emoji/EmojiPicker";
import EmojiCount from "./emoji/EmojiCount";
import { timeAgo } from "./GroupDetailFunction";

type Props = {
  diaryId: number;
};

export default function DiaryComment({ diaryId }: Props) {
  const [commentText, setCommentText] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [showEmojiPopup, setShowEmojiPopup] = useState(false);

  const handleCommentSubmit = () => {
    console.log(commentText);
    setCommentText("");
  };

  const handleEmojiSelect = (emoji: string) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(
        selectedEmojis.filter((selected) => selected !== emoji)
      );
    } else {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
    setShowEmojiPopup(false);
  };
  const filteredComments = CommentList.filter(
    (comment) => comment.diaryId === diaryId
  );

  return (
    <CommentWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            position: "relative",
          }}
        >
          <EmojiCount emojis={selectedEmojis} />
          <BasicButton onClick={() => setShowEmojiPopup((prev) => !prev)}>
            +😀
          </BasicButton>
        </div>
        {showEmojiPopup && (
          <EmojiPicker
            onSelect={handleEmojiSelect}
            selectedEmojis={selectedEmojis}
          />
        )}
      </div>

      <p style={{ fontWeight: "bold" }}>댓글 {filteredComments.length}</p>
      {filteredComments.map((comment) => (
        <UserInfo key={comment.id}>
          <div>
            <img src={comment.userImage} alt="프로필" />
          </div>
          <div
            style={{
              width: "55%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <h2 style={{ fontWeight: "bold" }}>{comment.member_name}</h2>
              <h3
                style={{
                  marginLeft: "0.5rem",
                  color: "gray",
                  fontSize: "0.75rem",
                }}
              >
                {timeAgo(comment.update_at)}
              </h3>
              <button>
                <h3 style={{ color: "#ABC4FF" }}>수정하기</h3>
              </button>
              <button>
                <h3 style={{ color: "#FB557C" }}>삭제하기</h3>
              </button>
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
