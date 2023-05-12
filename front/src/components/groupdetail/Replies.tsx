import React, { useState } from "react";
import { BasicButton } from "./Diaries.styles";
import ReplyEdit from "./ReplyEdit";
import DeleteReply from "./ReplyDelete";
import {
  UserInfo,
  InputSet,
  InputBox,
  CommentWrapper,
  ExpansionButton,
  CommentError,
  CommentBox,
} from "./DiaryComment.style";

import { postReplyApi } from "../../apis/replyAPI";
import { EditButton, DeleteButton } from "../common/Button.styles";
import { userdummy } from "../mypage/userdummy";
import {
  handleReplyBlur,
  handleCheckReply,
  handleCommentChange,
} from "./GroupDetailFunction";
import { timeAgo } from "./GroupDetailFunction";
import { Reply } from "../../types/group";
interface RepliesProps {
  replies: Reply[];
  commentId: number;
}

export default function Replies({ replies, commentId }: RepliesProps) {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [height, setHeight] = useState("35px");
  const [checkReply, setCheckReply] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 대댓글 작성
  const handleReplySubmit = async () => {
    if (!replyText || error) {
      return;
    }
    try {
      const response = await postReplyApi(
        commentId,
        replyText,
        userdummy.username
      );

      // console.log(response);
      setReplyText("");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 대댓글 수정 삭제 모달
  const [replyUpdate, setReplyUpdate] = useState(false);
  const [replyDelete, setReplyDelete] = useState(false);

  const [selectedReplyId, setSelectedReplyId] = useState<number | null>(null);
  const showUpdateModal = (commentId: number) => {
    setSelectedReplyId(commentId);
    setReplyUpdate(true);
  };
  const showDeleteModal = (commentId: number) => {
    setSelectedReplyId(commentId);
    setReplyDelete(true);
  };
  const handleCloseModal = () => {
    setReplyUpdate(false);
    setReplyDelete(false);
  };

  const replyButtonText = showReply
    ? "▲ 닫기"
    : replies.length > 0
    ? `▼ ${replies.length}개의 답글 보기`
    : "▼ 답글 입력";
  return (
    <CommentWrapper>
      <ExpansionButton onClick={() => setShowReply(!showReply)}>
        {replyButtonText}
      </ExpansionButton>
      {showReply && (
        <div style={{ width: "160%" }}>
          {replies.map((reply) => (
            <UserInfo key={reply.id}>
              <div>
                <img src={reply.writer.profilePath ?? ""} alt="프로필" />
              </div>
              <CommentBox>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    width: "100%",
                  }}
                >
                  <h2>{reply.writer.nickname}</h2>
                  <h3 style={{ marginInline: "8px" }}>
                    {timeAgo(reply.writeDate)}
                  </h3>
                  {replyUpdate && selectedReplyId === reply.id && (
                    <ReplyEdit
                      key={reply.id}
                      isOpen={false}
                      reply={reply}
                      onClose={handleCloseModal}
                    />
                  )}
                  {replyDelete && selectedReplyId === reply.id && (
                    <DeleteReply
                      key={reply.id}
                      isOpen={false}
                      commentId={commentId}
                      reply={reply}
                      onClose={handleCloseModal}
                    />
                  )}
                  {userdummy.nickname === reply.writer.nickname && (
                    <EditButton
                      style={{ fontSize: "12px" }}
                      onClick={() => showUpdateModal(reply.id)}
                    >
                      수정
                    </EditButton>
                  )}
                  {userdummy.nickname === reply.writer.nickname && (
                    <DeleteButton
                      style={{ fontSize: "12px" }}
                      onClick={() => showDeleteModal(reply.id)}
                    >
                      삭제
                    </DeleteButton>
                  )}
                </div>
                <div style={{ width: "145%" }}>
                  <p>{reply.text}</p>
                </div>
              </CommentBox>
            </UserInfo>
          ))}
          <InputSet>
            <InputBox
              key={replyText}
              defaultValue={replyText}
              onChange={(e) => {
                handleCommentChange(e, setHeight);
                handleCheckReply(e, setCheckReply, setError);
              }}
              onBlur={(e) => handleReplyBlur(e, setReplyText)}
              style={{ height }}
            />

            <BasicButton
              onClick={handleReplySubmit}
              style={{ fontSize: "12px" }}
            >
              댓글달기
            </BasicButton>
          </InputSet>
          {error && <CommentError>{error}</CommentError>}
        </div>
      )}
    </CommentWrapper>
  );
}
