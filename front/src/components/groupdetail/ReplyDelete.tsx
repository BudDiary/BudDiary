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
import { ReplyDelete } from "./groupdetailapis/groupdetailapis";
import { Divider } from "@mui/material";
import { Reply } from "../../types/group";
interface RepliesProps {
  isOpen: boolean;
  reply: Reply;
  onClose: () => void;
}
export default function DeleteReply({ reply, onClose }: RepliesProps) {
  const [commentState, setCommentState] = useState(reply.text);
  const closeCommentModal = () => {
    onClose();
  };

  const handleDeleteReply = () => {
    ReplyDelete(reply.id);
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
        <div>답글 삭제하기</div>
        <div></div>
      </ModalTopNavContainer>

      <UserInfo style={{ padding: "15px" }}>
        <div>
          <img src={reply.writer.profilePath ?? ""} alt="프로필" />
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
            <h2 style={{ fontWeight: "bold" }}>{reply.writer.nickname}</h2>
            <h3
              style={{
                marginLeft: "0.2rem",
                color: "gray",
                fontSize: "0.75rem",
              }}
            >
              {timeAgo(reply.writeDate)}
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
          <DeleteButton onClick={handleDeleteReply}>댓글 삭제</DeleteButton>
        </div>
      </EditContent>
    </EditContainer>
  );
}
