import React, { useState, Dispatch, SetStateAction } from "react";
import { EditContent, DeleteButton } from "./Diaries.styles";
import {
  EditContainer,
  ModalTopNavContainer,
} from "../common/ModalWindow.styles";
import {
  UserInfo,
  DeleteContent,
  CommentBox,
  EditTitle,
} from "./DiaryComment.style";
import { getClubDetailApi } from "../../apis/clubApi";
import { deleteReplyApi } from "../../apis/replyAPI";
import { Divider } from "@mui/material";
import { Reply, Info, Club } from "../../types/group";
import close from "../../assets/modal/close.png";
interface RepliesProps {
  isOpen: boolean;
  reply: Reply;
  commentId: number;
  onClose: () => void;
  clubInfo?: Info;
  setClubData: Dispatch<SetStateAction<Club | null>>;
}
export default function DeleteReply({
  reply,
  commentId,
  clubInfo,
  setClubData,
  onClose,
}: RepliesProps) {
  const [commentState, setCommentState] = useState(reply.text);
  const closeCommentModal = () => {
    onClose();
  };

  const handleDeleteReply = async () => {
    try {
      await deleteReplyApi(commentId, reply.id);
      const data = await getClubDetailApi(clubInfo?.clubUuid ?? "");
      setClubData(data);
      onClose();
    } catch (error) {
      console.error(error);
    }
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
          <EditTitle>답글 삭제하기</EditTitle>
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
          <img src={reply.writer.profilePath ?? ""} alt="프로필" />
        </div>
        <CommentBox>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <h2>{reply.writer.nickname}</h2>
          </div>
          <h3>{new Date(reply.writeDate).toLocaleString()}</h3>
        </CommentBox>
      </UserInfo>
      <Divider style={{ border: "solid 1px #BFDBFE" }} />
      <EditContent>
        <div style={{ textAlign: "center", marginTop: "5px" }}>
          <EditTitle>답글 삭제하기</EditTitle>
        </div>
        <p style={{ marginBottom: "10px" }}>다음 답글을 삭제하시겠습니까?</p>
        <DeleteContent>{commentState}</DeleteContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DeleteButton onClick={handleDeleteReply}>답글 삭제</DeleteButton>
        </div>
      </EditContent>
    </EditContainer>
  );
}
