import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BasicButton } from "./Diaries.styles";
import { ModalContainer, ModalTopNavContainer } from "../common/Modal.styles";
import { UserInfo } from "./DiaryComment.style";
import { timeAgo } from "./GroupDetailFunction";
import { InputBox, InputSet } from "./DiaryComment.style";
import { handleCommentChange, handleCommentBlur } from "./GroupDetailFunction";
interface CommentEditProps {
  comment: {
    id: number;
    diaryId: number;
    nickname: string;
    userImage: string;
    update_at: string;
    comment: string;
  };
  onClose: () => void;
}

export default function CommentEdit(props: CommentEditProps) {
  const [commentState, setCommentState] = useState(props.comment.comment);
  const [height, setHeight] = useState("30px");
  const closeCommentModal = () => {
    props.onClose();
  };

  return (
    <ModalContainer>
      <ModalTopNavContainer>
        <BiArrowBack onClick={closeCommentModal} />
      </ModalTopNavContainer>

      <UserInfo style={{ padding: "20px" }}>
        <div>
          <img src={props.comment.userImage} alt="프로필" />
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
            <h2 style={{ fontWeight: "bold" }}>{props.comment.nickname}</h2>
            <h3
              style={{
                marginLeft: "0.5rem",
                color: "gray",
                fontSize: "0.75rem",
              }}
            >
              {timeAgo(props.comment.update_at)}
            </h3>
          </div>
        </div>
      </UserInfo>
      <div>
        <p>댓글 수정하기</p>
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
