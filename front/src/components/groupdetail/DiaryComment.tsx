import React, { useState } from "react";
import { BasicButton } from "./Diaries.styles";
import Replies from "./Replies";
import CommentEdit from "./CommentEdit";
import DeleteComment from "./DeleteComment";
import {
  InputBox,
  UserInfo,
  InputSet,
  CommentWrapper,
} from "./DiaryComment.style";
import { CreateComment } from "./groupdetailapis/groupdetailapis";
import { handleCommentChange, handleCommentBlur } from "./GroupDetailFunction";
import { EditButton, DeleteButton } from "../common/Button.styles";

import { userdummy } from "../mypage/userdummy";
import EmojiPicker from "./emoji/EmojiPicker";
import EmojiCount from "./emoji/EmojiCount";
import { timeAgo } from "./GroupDetailFunction";
import { Divider } from "@mui/material";
import { Comment } from "../../types/group";

interface CommentProps {
  commentList: Comment[];
  diaryId: number;
}

export default function DiaryComment({ commentList, diaryId }: CommentProps) {
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [height, setHeight] = useState("35px");

  // 댓글 수정 & 삭제 모달
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const showUpdateModal = (commentId: number) => {
    setSelectedCommentId(commentId);
    setCommentUpdate(true);
  };

  const [commentDelete, setCommentDelete] = useState(false);

  const showDeleteModal = (commentId: number) => {
    setSelectedCommentId(commentId);
    setCommentDelete(true);
  };

  const handleCloseModal = () => {
    setCommentUpdate(false);
    setCommentDelete(false);
  };

  // 댓글 작성

  const handleCommentSubmit = async () => {
    console.log("댓글 요청", commentText, diaryId, userdummy.nickname);
    setHeight("35px");
    try {
      const response = await CreateComment(
        commentText,
        diaryId,
        userdummy.nickname
      );
      setCommentText("");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 이모티콘 추가 제거

  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [showEmojiPopup, setShowEmojiPopup] = useState(false);

  const handleSelectEmoji = (emoji: string) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter((e) => e !== emoji));
    } else {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  // const filteredComments = CommentList.filter(
  //   (comment) => comment.diaryId === diaryId
  // );

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
            onSelect={handleSelectEmoji}
            selectedEmojis={selectedEmojis}
            diaryId={diaryId}
          />
        )}
      </div>

      <p style={{ fontWeight: "bold" }}>댓글 {commentList.length}</p>
      {commentList
        .slice(0, showAllComments ? commentList.length : 2)
        .map((comment) => (
          <UserInfo key={comment.id}>
            <div>
              <img src={comment.writer.profilePath ?? ""} alt="프로필" />
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
                <h2 style={{ fontWeight: "bold" }}>
                  {comment.writer.nickname}
                </h2>
                <h3
                  style={{
                    marginLeft: "0.5rem",
                    color: "gray",
                    fontSize: "0.75rem",
                  }}
                >
                  {timeAgo(comment.writeDate)}
                </h3>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  {commentUpdate && selectedCommentId === comment.id && (
                    <CommentEdit
                      key={comment.id}
                      comment={comment}
                      isOpen={false}
                      onClose={handleCloseModal}
                    />
                  )}
                  {commentDelete && selectedCommentId === comment.id && (
                    <DeleteComment
                      key={comment.id}
                      comment={comment}
                      isOpen={false}
                      onClose={handleCloseModal}
                    />
                  )}
                  {/* {userdummy.nickname}은 나중에 users.user_id 등으로 교체할 것 */}
                  {userdummy.nickname === comment.writer.nickname && (
                    <EditButton
                      style={{ fontSize: "12px" }}
                      onClick={() => showUpdateModal(comment.id)}
                    >
                      수정
                    </EditButton>
                  )}
                  {userdummy.nickname === comment.writer.nickname && (
                    <DeleteButton
                      style={{ fontSize: "12px" }}
                      onClick={() => showDeleteModal(comment.id)}
                    >
                      삭제
                    </DeleteButton>
                  )}
                </div>
              </div>
              <p>{comment.text}</p>
              <Replies
                key={comment.id}
                commentId={comment.id}
                replies={comment.replies}
              />
            </div>
          </UserInfo>
        ))}
      <Divider />
      {commentList.length > 2 && (
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              fontSize: "12px",
              fontWeight: "700",
              marginBlock: "10px",
              color: "#ABC4FF",
            }}
            onClick={() => setShowAllComments((prev) => !prev)}
          >
            {showAllComments ? "▲ 닫기" : "▼ 전체 댓글 보기"}
          </button>
        </div>
      )}
      <InputSet>
        <InputBox
          key={commentText}
          defaultValue={commentText}
          onChange={(e) => handleCommentChange(e, setHeight)}
          onBlur={(e) => handleCommentBlur(e, setCommentText)}
          style={{ height }}
        />
        <BasicButton onClick={handleCommentSubmit} style={{ fontSize: "12px" }}>
          댓글달기
        </BasicButton>
      </InputSet>
    </CommentWrapper>
  );
}
