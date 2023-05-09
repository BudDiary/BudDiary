import React, { useState } from "react";
import { BiLeftArrowCircle } from "react-icons/bi";
import { BasicButton } from "./Diaries.styles";
import {
  ModalContainer,
  ModalTopNavContainer,
} from "../common/ModalWindow.styles";
import { UserInfo } from "./DiaryComment.style";
import { timeAgo } from "./GroupDetailFunction";
import { InputBox, InputSet } from "./DiaryComment.style";
import { handleCommentChange, handleCommentBlur } from "./GroupDetailFunction";
import { Reply } from "../../types/group";
import { Divider } from "@mui/material";
interface ReplyEditProps {
  isOpen: boolean;
  onClose: () => void;
  reply: Reply;
}

export default function ReplyEdit({ reply, onClose }: ReplyEditProps) {
  const [commentState, setCommentState] = useState(reply.text);
  const [height, setHeight] = useState("35px");
  const closeCommentModal = () => {
    onClose();
  };

  return (
    <ModalContainer>
      <ModalTopNavContainer
        style={{
          display: "flex",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <BiLeftArrowCircle onClick={closeCommentModal} />
        <div>답글 수정하기</div>
        <div></div>
      </ModalTopNavContainer>

      <UserInfo style={{ padding: "20px" }}>
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
                marginLeft: "0.5rem",
                color: "gray",
                fontSize: "0.75rem",
              }}
            >
              {timeAgo(reply.writeDate)}
            </h3>
          </div>
        </div>
      </UserInfo>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              marginBlock: "10px",
            }}
          >
            답글 수정하기
          </p>
          <Divider style={{ border: "solid 2px #BFDBFE", width: "90%" }} />
        </div>
        <InputSet>
          <InputBox
            key={commentState}
            defaultValue={commentState}
            onChange={(e) => handleCommentChange(e, setHeight)}
            onBlur={(e) => handleCommentBlur(e, setCommentState)}
            style={{ height }}
          />
          <BasicButton style={{ fontSize: "12px" }}>댓글달기</BasicButton>
        </InputSet>
      </div>
    </ModalContainer>
  );
}
