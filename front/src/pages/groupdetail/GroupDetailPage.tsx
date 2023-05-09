import React, { useState, useEffect } from "react";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import {
  DetailPageContainer,
  DiariesContainer,
  GroupInfoContainer,
} from "./GroupDetailPage.styles";
import GroupInfo from "../../components/groupdetail/GroupInfo";
import Diaries from "../../components/groupdetail/Diaries";
import { GetClubData } from "../../components/groupdetail/groupdetailapis/groupdetailapis";
import { Club } from "../../types/group";
const clubDetailJson = require("../../components/groupdetail/clubDetail.json");

const GroupDetailPage = () => {
  const [scrollY, setScrollY] = useState(0);

  const [groupDetail, setGroupDetail] = useState<Club | null>(null);
  const [clubData, setClubData] = useState<Club | null>(null);

  const clubId = "club_key";

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

  useEffect(() => {
    const Club = clubDetailJson as Club;
    setGroupDetail(Club);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const subNavStyle = {
    backgroundImage: `url(${groupDetail?.clubDetail.myclubList.thumbnailUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
    fontWeight: "bold",
  };

  return (
    <>
      {groupDetail?.clubDetail.myclubList.clubName && (
        <SubNavContainer style={subNavStyle}>
          {groupDetail?.clubDetail.myclubList.clubName}
        </SubNavContainer>
      )}
      <PageContainer>
        <DetailPageContainer>
          <DiariesContainer>
            <Diaries />
          </DiariesContainer>
          <GroupInfoContainer style={{ position: "relative" }}>
            <div></div>
            <GroupInfo
              myclubList={groupDetail?.clubDetail.myclubList}
              memberList={groupDetail?.clubDetail.memberList}
              style={{ position: "absolute", top: `${scrollY - 20}px` }}
            />
          </GroupInfoContainer>
        </DetailPageContainer>
      </PageContainer>
    </>
  );
};

export default GroupDetailPage;
