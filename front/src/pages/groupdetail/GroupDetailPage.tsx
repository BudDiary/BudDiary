import React, { useState, useEffect } from "react";
import {
  PageContainer,
  DetailSubNavContainer,
} from "../../components/common/Page.styles";
import {
  DetailPageContainer,
  DiariesContainer,
  GroupInfoContainer,
} from "./GroupDetailPage.styles";
import GroupInfo from "../../components/groupdetail/GroupInfo";
import { userdummy } from "../../components/mypage/userdummy";
import Diaries from "../../components/groupdetail/Diaries";
import { getClubDetailApi } from "../../apis/clubApi";
import { Club } from "../../types/group";
const clubDetailJson = require("../../components/groupdetail/clubDetail.json");

const GroupDetailPage = () => {
  const [scrollY, setScrollY] = useState(100);
  const [groupDetail, setGroupDetail] = useState<Club | null>(null);
  const [clubData, setClubData] = useState<Club | null>(null);
  const clubId = "club_key";

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClubDetailApi(clubId, userdummy.username);
        setClubData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [clubId]);

  useEffect(() => {
    const Club = clubDetailJson as Club;
    setGroupDetail(Club);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const newY = Math.max(window.scrollY, 120);
      setScrollY(newY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const subNavStyle = {
    backgroundImage: `url(${groupDetail?.clubDetail.clubInfo.thumbnailUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
    fontWeight: "bold",
  };

  return (
    <>
      {groupDetail?.clubDetail.clubInfo.clubName && (
        <DetailSubNavContainer style={subNavStyle}>
          {groupDetail?.clubDetail.clubInfo.clubName}
        </DetailSubNavContainer>
      )}
      <PageContainer>
        <DetailPageContainer>
          <DiariesContainer>
            <Diaries />
          </DiariesContainer>
          <GroupInfoContainer style={{ position: "relative" }}>
            <GroupInfo
              clubInfo={groupDetail?.clubDetail.clubInfo}
              memberList={groupDetail?.clubDetail.memberList}
              style={{ position: "absolute", top: `${scrollY - 100}px` }}
            />
          </GroupInfoContainer>
        </DetailPageContainer>
      </PageContainer>
    </>
  );
};

export default GroupDetailPage;
