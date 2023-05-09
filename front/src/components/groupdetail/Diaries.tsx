import React, { useState, useEffect } from "react";
import { WideButton } from "./Diaries.styles";
import { MdLibraryAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DiaryBox from "./DiaryBox";
import { Club } from "../../types/group";

const clubDetailJson = require("../../components/groupdetail/clubDetail.json");

export default function Diaries() {
  const [groupDetail, setGroupDetail] = useState<Club | null>(null);
  const navigate = useNavigate();

  // 그룹 디테일(ClubDetail) 가져오기
  useEffect(() => {
    const Club = clubDetailJson as Club;
    setGroupDetail(Club);
  }, []);

  useEffect(() => {
    console.log(groupDetail?.clubDetail);
    console.log(groupDetail?.clubDetail.diaryList);
  }, [groupDetail]);
  return (
    <div>
      <WideButton onClick={() => navigate("/write")}>
        <MdLibraryAdd color="blue" size={32} />
        <h1>일기 작성하기</h1>
      </WideButton>
      <br />
      {/* async & await하는 순간 수정할 것*/}
      {groupDetail && groupDetail.clubDetail.diaryList && (
        <DiaryBox diaryList={groupDetail.clubDetail.diaryList} />
      )}
    </div>
  );
}
