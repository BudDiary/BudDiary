import React, { Dispatch, SetStateAction } from "react";
import { WideButton } from "./Diaries.styles";
import { MdLibraryAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DiaryBox from "./DiaryBox";
import { Diary, Info, Club } from "../../types/group";

interface DiaryBoxProps {
  setClubData: Dispatch<SetStateAction<Club | null>>;
  diaryList?: Diary[];
  clubInfo?: Info;
}

export default function Diaries({
  setClubData,
  diaryList,
  clubInfo,
}: DiaryBoxProps) {
  const navigate = useNavigate();

  return (
    <>
      <WideButton onClick={() => navigate("/write")}>
        <MdLibraryAdd color="blue" size={32} />
        <h1>일기 작성하기</h1>
      </WideButton>
      <br />
      {diaryList && (
        <DiaryBox
          diaryList={diaryList}
          clubInfo={clubInfo}
          setClubData={setClubData}
        />
      )}
    </>
  );
}
