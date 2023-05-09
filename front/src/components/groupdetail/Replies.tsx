import React, { useState } from "react";
import { BasicButton } from "./Diaries.styles";
import ReplyEdit from "./ReplyEdit";
import DeleteReply from "./ReplyDelete";
import {
  UserInfo,
  InputSet,
  InputBox,
  CommentWrapper,
} from "./DiaryComment.style";
import { CreateReply } from "./groupdetailapis/groupdetailapis";
import { EditButton, DeleteButton } from "../common/Button.styles";
import { userdummy } from "../mypage/userdummy";

import { timeAgo } from "./GroupDetailFunction";
import { Reply } from "../../types/group";
interface RepliesProps {
  replies: Reply[];
  commentId: number;
}

export default function Replies({ replies, commentId }: RepliesProps) {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);

  // 대댓글 작성
  const handleReplySubmit = async () => {
    console.log("답글 요청", replyText, commentId, userdummy.username);
    try {
      const response = await CreateReply(
        replyText,
        commentId,
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
      <button
        onClick={() => setShowReply(!showReply)}
        style={{
          fontSize: "12px",
          fontWeight: "700",
          marginBlock: "10px",
          color: "#ABC4FF",
        }}
      >
        {replyButtonText}
      </button>
      {showReply && (
        <div style={{ width: "160%" }}>
          {replies.map((reply) => (
            <UserInfo key={reply.id}>
              <div>
                <img src={reply.writer.profilePath ?? ""} alt="프로필" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <h2 style={{ fontWeight: "bold" }}>
                    {reply.writer.nickname}
                  </h2>
                  <h3
                    style={{
                      marginLeft: "0.5rem",
                      color: "gray",
                      fontSize: "0.75rem",
                    }}
                  >
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
                <p>{reply.text}</p>
              </div>
            </UserInfo>
          ))}
          <InputSet>
            <InputBox
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <BasicButton
              onClick={handleReplySubmit}
              style={{ fontSize: "12px" }}
            >
              댓글달기
            </BasicButton>
          </InputSet>
        </div>
      )}
    </CommentWrapper>
  );
}
