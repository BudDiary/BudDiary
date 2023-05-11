import React, { useState, useEffect } from "react";
import { WideButton } from "./Diaries.styles";
import { MdLibraryAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DiaryBox from "./DiaryBox";
import { Club } from "../../types/group";
import { getClubDetailApi } from "../../apis/clubApi";
import { userdummy } from "../mypage/userdummy";
const clubDetailJson = require("../../components/groupdetail/clubDetail.json");

export default function Diaries() {
  const [groupDetail, setGroupDetail] = useState<Club | null>(null);
  const [clubData, setClubData] = useState<Club | null>(null);
  const navigate = useNavigate();
  const clubId = "club_key2";
  const username = userdummy.username;

  useEffect(() => {
    const updatedClubDetailJson = require("../../components/groupdetail/clubDetail.json");
    setGroupDetail(updatedClubDetailJson);

    async function fetchData() {
      try {
        const data = await getClubDetailApi(clubId, username);
        setClubData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [clubId, username]);

  return (
    <div>
      <WideButton onClick={() => navigate("/write")}>
        <MdLibraryAdd color="blue" size={32} />
        <h1>일기 작성하기</h1>
      </WideButton>
      <br />
      {groupDetail?.clubDetail?.diaryList && (
        <DiaryBox diaryList={groupDetail.clubDetail.diaryList} />
      )}
    </div>
  );
}
