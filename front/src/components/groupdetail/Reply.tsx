import React, { useState } from "react";
import { BasicButton } from "./Diaries.styles";
import ReplyEdit from "./ReplyEdit";
import {
  UserInfo,
  InputSet,
  InputBox,
  CommentWrapper,
} from "./DiaryComment.style";
import { CreateReply, DeleteReply } from "./groupdetailapis/groupdetailapis";
import { EditButton, DeleteButton } from "../common/Button.styles";
import { userdummy } from "../mypage/userdummy";
import ReplyList from "./ReplyData.json";
import { timeAgo } from "./GroupDetailFunction";
type Props = {
  commentId: number;
};

export default function Reply({ commentId }: Props) {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);

  // 대댓글 작성
  const handleReplySubmit = async () => {
    console.log("답글 요청", replyText, commentId, userdummy.nickname);
    try {
      const response = await CreateReply(
        replyText,
        commentId,
        userdummy.nickname
      );
      // console.log(response);
      setReplyText("");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 대댓글 삭제

  const handleDeleteReply = async (reply: number) => {
    console.log(commentId);
    try {
      await DeleteReply(commentId);
      // 댓글 삭제 성공
    } catch (error) {
      console.error(error);
    }
  };

  // 대댓글 수정 모달
  const [replyUpdate, setReplytUpdate] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState<number | null>(null);
  const showUpdateModal = (commentId: number) => {
    setSelectedReplyId(commentId);
    setReplytUpdate(true);
  };
  const handleCloseModal = () => {
    setReplytUpdate(false);
  };

  const filterReplies = ReplyList.filter(
    (reply) => reply.commentId === commentId
  );

  const replyButtonText = showReply
    ? "▲ 닫기"
    : filterReplies.length > 0
    ? `▼ ${filterReplies.length}개의 답글 보기`
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
          {filterReplies.map((reply) => (
            <UserInfo key={reply.id}>
              <div>
                <img src={reply.userImage} alt="프로필" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <h2 style={{ fontWeight: "bold" }}>{reply.nickname}</h2>
                  <h3
                    style={{
                      marginLeft: "0.5rem",
                      color: "gray",
                      fontSize: "0.75rem",
                    }}
                  >
                    {timeAgo(reply.update_at)}
                  </h3>
                  {replyUpdate && selectedReplyId === reply.id && (
                    <ReplyEdit
                      key={reply.id}
                      reply={reply}
                      onClose={handleCloseModal}
                    />
                  )}
                  {userdummy.nickname === reply.nickname && (
                    <EditButton
                      style={{ fontSize: "12px" }}
                      onClick={() => showUpdateModal(reply.id)}
                    >
                      수정
                    </EditButton>
                  )}
                  {userdummy.nickname === reply.nickname && (
                    <DeleteButton
                      style={{ fontSize: "12px" }}
                      onClick={() => handleDeleteReply(reply.id)}
                    >
                      삭제
                    </DeleteButton>
                  )}
                </div>
                <p>{reply.reply}</p>
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
