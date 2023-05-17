import React from "react";
import { DiaryItemContainer, DiaryTypeBox } from "./WrittenDiaryItem.styles";
import { Divider } from "@mui/material";
import { BiLinkExternal } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  type: string;
  club: string | null;
  pics: any;
  content: string;
  date: any;
  negative: number;
  positive: number;
}

export default function WrittenDiaryItem(diary: Props) {
  const navigate = useNavigate();
  return (
    <DiaryItemContainer>
      <DiaryTypeBox>
        {diary.type === "PERSONAL" ? "비밀일기" : `${diary.club}그룹일기`}
      </DiaryTypeBox>
      <div>{new Date(diary.date).toLocaleString()}</div>
      <Divider style={{ border: "solid 1px #BFDBFE", marginBlock: "10px" }} />
      <div className="grid-cols-2">
        <div>{diary.pics}</div>
        <div className="min-h-[200px] pt-2 px-4">{diary.content}</div>
      </div>

      <div>{diary.negative}</div>
      <div>{diary.positive}</div>
      <div className="flex justify-end sm:mr-10">
        <button
          className="font-berry flex"
          onClick={() => navigate(`/decorate/${diary.id}`)}
        >
          다꾸 페이지 보러가기
          <BiLinkExternal className="my-auto ml-1" />
        </button>
      </div>
    </DiaryItemContainer>
  );
}
