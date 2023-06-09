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
import { deleteDiaryApi } from "../../apis/diaryApi";
import { Divider } from "@mui/material";
import { Diary, Info, Club } from "../../types/group";

import close from "../../assets/modal/close.png";
interface DiaryProps {
  isOpen: boolean;
  diary: Diary;
  diaryId: number;
  clubInfo?: Info;
  setClubData: Dispatch<SetStateAction<Club | null>>;
  onClose: () => void;
}
export default function DiaryDelete({
  diary,
  diaryId,
  clubInfo,
  setClubData,
  onClose,
}: DiaryProps) {
  const [commentState, setCommentState] = useState(diary.text);
  const closeCommentModal = () => {
    onClose();
  };

  const handleDeleteDiary = async () => {
    try {
      await deleteDiaryApi(diaryId);
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
              marginLeft: "10px",
            }}
          />
        </div>
        <EditTitle>일기 삭제하기</EditTitle>
        <div
          style={{
            height: "25px",
            width: "25px",
            border: "none",
            marginLeft: "10px",
          }}
        ></div>
      </ModalTopNavContainer>

      <UserInfo>
        <div>
          <img src={diary.writer.profilePath ?? ""} alt="프로필" />
        </div>
        <CommentBox>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <h2>{diary.writer.nickname}</h2>
          </div>
          <h3>{new Date(diary.writeDate).toLocaleString()}</h3>
        </CommentBox>
      </UserInfo>
      <Divider style={{ border: "solid 1px #BFDBFE" }} />
      <EditContent>
        <div style={{ textAlign: "center", marginTop: "5px" }}>
          <EditTitle>일기 삭제하기</EditTitle>
        </div>
        <p style={{ marginBottom: "10px" }}>다음 일기를 삭제하시겠습니까?</p>
        <DeleteContent>{commentState}</DeleteContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DeleteButton onClick={handleDeleteDiary}>일기 삭제</DeleteButton>
        </div>
      </EditContent>
    </EditContainer>
  );
}
