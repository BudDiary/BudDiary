import React from "react";
import { WideButton } from "./Diaries.styles";
import { MdLibraryAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DiaryBox from "./DiaryBox";
import { Diary } from "../../types/group";

interface DiaryBoxProps {
  diaryList?: Diary[];
}

export default function Diaries({ diaryList }: DiaryBoxProps) {
  const navigate = useNavigate();

  return (
    <div>
      <WideButton onClick={() => navigate("/write")}>
        <MdLibraryAdd color="blue" size={32} />
        <h1>일기 작성하기</h1>
      </WideButton>
      <br />
      {diaryList && <DiaryBox diaryList={diaryList} />}
    </div>
  );
}
