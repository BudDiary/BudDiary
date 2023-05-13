import React, { useState } from "react";
import { EditContent, DeleteButton } from "./Diaries.styles";
import {
  EditContainer,
  ModalTopNavContainer,
} from "../common/ModalWindow.styles";
import { UserInfo, EditTitle } from "./DiaryComment.style";
import { DeleteContent, CommentBox } from "./DiaryComment.style";
import { Divider } from "@mui/material";
import { Comment } from "../../types/group";
import { deleteCommentApi } from "../../apis/commentApi";
import close from "../../assets/modal/close.png";

interface CommentDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  comment: Comment;
  diaryId: number;
}
export default function DeleteComment({
  comment,
  diaryId,
  onClose,
}: CommentDeleteProps) {
  const [commentState, setCommentState] = useState(comment.text);
  const closeCommentModal = () => {
    onClose();
  };

  const handleDeleteComment = () => {
    deleteCommentApi(diaryId, comment.id);
    onClose();
  };
  return (
    <EditContainer>
      <ModalTopNavContainer
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={close}
            alt=""
            onClick={closeCommentModal}
            style={{
              height: "25px",
              width: "25px",
              border: "none",
              marginLeft: "10px",
            }}
          />
        </div>
        <EditTitle>댓글 삭제하기</EditTitle>
        <div
          style={{
            height: "25px",
            width: "25px",
            border: "none",
            marginRight: "15px",
          }}
        ></div>
      </ModalTopNavContainer>

      <UserInfo>
        <div>
          <img src={comment.writer.profilePath ?? ""} alt="프로필" />
        </div>
        <CommentBox>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <h2>{comment.writer.nickname}</h2>
            <h3>{new Date(comment.writeDate).toLocaleString()}</h3>
          </div>
        </CommentBox>
      </UserInfo>
      <Divider style={{ border: "solid 2px #BFDBFE" }} />
      <EditContent>
        <div style={{ textAlign: "center", marginTop: "5px" }}>
          <EditTitle>댓글 삭제하기</EditTitle>
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
