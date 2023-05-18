import React, { useState, useEffect } from "react";
import { EditContent, DeleteButton } from "./Diaries.styles";
import {
  EditContainer,
  ModalTopNavContainer,
} from "../common/ModalWindow.styles";
import { UserInfo, EditTitle } from "./DiaryComment.style";
import { DeleteContent, CommentBox } from "./DiaryComment.style";
import { Divider } from "@mui/material";
import { Comment } from "../../types/group";
import { getClubDetailApi } from "../../apis/clubApi";
import { deleteCommentApi } from "../../apis/commentApi";
import close from "../../assets/modal/close.png";
import { Club } from "../../types/group";

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
  const [clubData, setClubData] = useState<Club | null>(null);
  useEffect(() => {
    const currentUrl: string = window.location.href;

    const code = currentUrl.split(`/group/`)[1];
    async function fetchData() {
      try {
        const data = await getClubDetailApi(code);
        setClubData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [comment]);

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
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EditTitle>댓글 삭제하기</EditTitle>
        </div>
        <div
          style={{
            height: "25px",
            width: "25px",
            border: "none",
          }}
        ></div>
      </ModalTopNavContainer>

      <UserInfo style={{ padding: "10px" }}>
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
          </div>
          <h3>{new Date(comment.writeDate).toLocaleString()}</h3>
        </CommentBox>
      </UserInfo>
      <Divider style={{ border: "solid 2px #BFDBFE" }} />
      <EditContent>
        <div style={{ textAlign: "center", marginBlock: "3px" }}>
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
