import React, { useState } from "react";
import { BiLeftArrowCircle } from "react-icons/bi";
import { EditContent, DeleteButton } from "./Diaries.styles";
import {
  EditContainer,
  ModalTopNavContainer,
} from "../common/ModalWindow.styles";
import { UserInfo } from "./DiaryComment.style";
import { timeAgo } from "./GroupDetailFunction";
import { DeleteContent } from "./DiaryComment.style";
import { Divider } from "@mui/material";
import { Comment } from "../../types/group";
import { CommentDelete } from "./groupdetailapis/groupdetailapis";
interface CommentDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  comment: Comment;
}
export default function DeleteComment({
  comment,
  onClose,
}: CommentDeleteProps) {
  const [commentState, setCommentState] = useState(comment.text);
  const closeCommentModal = () => {
    onClose();
  };

  const handleDeleteComment = () => {
    CommentDelete(comment.id);
    onClose();
  };
  return (
    <EditContainer>
      <ModalTopNavContainer
        style={{
          display: "flex",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <BiLeftArrowCircle onClick={closeCommentModal} />
        <div>댓글 삭제하기</div>
        <div></div>
      </ModalTopNavContainer>

      <UserInfo style={{ padding: "15px" }}>
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
            <h2 style={{ fontWeight: "bold" }}>{comment.writer.nickname}</h2>
            <h3
              style={{
                marginLeft: "0.2rem",
                color: "gray",
                fontSize: "0.75rem",
              }}
            >
              {timeAgo(comment.writeDate)}
            </h3>
          </div>
        </div>
      </UserInfo>
      <Divider style={{ border: "solid 2px #BFDBFE" }} />
      <EditContent>
        <div style={{ textAlign: "center", marginBlock: "5px" }}>
          <p>댓글 삭제하기</p>
        </div>
        <p>다음 댓글을 삭제하시겠습니까?</p>
        <DeleteContent>{commentState}</DeleteContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DeleteButton onClick={handleDeleteComment}>댓글 삭제</DeleteButton>
        </div>
      </EditContent>
    </EditContainer>
  );
}
