import React, { useState } from "react";
import { BasicButton, EditContent } from "./Diaries.styles";
import {
  EditContainer,
  ModalTopNavContainer,
} from "../common/ModalWindow.styles";
import { UserInfo } from "./DiaryComment.style";
import { timeAgo } from "./GroupDetailFunction";
import close from "../../assets/modal/close.png";
import {
  InputBox,
  InputSet,
  CommentBox,
  CommentError,
  EditTitle,
} from "./DiaryComment.style";
import {
  handleCommentChange,
  handleCommentBlur,
  handleCheckComment,
} from "./GroupDetailFunction";
import { Reply } from "../../types/group";
import { Divider } from "@mui/material";
interface ReplyEditProps {
  isOpen: boolean;
  onClose: () => void;
  reply: Reply;
}

export default function ReplyEdit({ reply, onClose }: ReplyEditProps) {
  const [commentState, setCommentState] = useState(reply.text);
  const [height, setHeight] = useState("33px");
  const [checkComment, setCheckComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const closeCommentModal = () => {
    onClose();
  };

  return (
    <EditContainer>
      <ModalTopNavContainer>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EditTitle>답글 수정하기</EditTitle>
        </div>
        <div
          style={{
            height: "25px",
            width: "25px",
            border: "none",
            marginRight: "10px",
          }}
        ></div>
      </ModalTopNavContainer>
      <UserInfo style={{ padding: "20px" }}>
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
      <Divider style={{ border: "solid 2px #BFDBFE" }} />
      <EditContent>
        <EditTitle>답글 수정하기</EditTitle>
        <InputSet>
          <InputBox
            key={commentState}
            defaultValue={commentState}
            onChange={(e) => {
              handleCommentChange(e, setHeight);
              handleCheckComment(e, setCheckComment, setError);
            }}
            onBlur={(e) => handleCommentBlur(e, setCommentState)}
            style={{ height }}
          />
          <BasicButton style={{ fontSize: "12px" }}>댓글달기</BasicButton>
        </InputSet>
        {error && <CommentError>{error}</CommentError>}
      </EditContent>
    </EditContainer>
  );
}
