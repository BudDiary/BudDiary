import React, { useState, useEffect } from "react";
import { WideButton } from "./Diaries.styles";
import { MdLibraryAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DiaryBox from "./DiaryBox";
import { Club } from "../../types/group";
import { GetClubData } from "./groupdetailapis/groupdetailapis";
const clubDetailJson = require("../../components/groupdetail/clubDetail.json");

export default function Diaries() {
  const [groupDetail, setGroupDetail] = useState<Club | null>(null);
  const navigate = useNavigate();

  // 그룹 디테일(ClubDetail) 가져오기
  // 일단 서버 연결되면 코드 상태보고 한번만 호출할 수 있도록 하기
  useEffect(() => {
    const Club = clubDetailJson as Club;
    setGroupDetail(Club);
  }, []);

  // 데이터 들어오나? (확인용)
  // useEffect(() => {
  //   console.log(groupDetail?.clubDetail);
  //   console.log(groupDetail?.clubDetail.diaryList);
  // }, [groupDetail]);

  // 그룹 디테일(ClubDetail) 가져오기
  // 일단 서버 연결되면 코드 상태보고 한번만 호출할 수 있도록 하기

  const [clubData, setClubData] = useState<Club | null>(null);
  const clubId = "club_key2";

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetClubData(clubId);
        setClubData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    console.log(clubData);
  }, [clubId]);

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
