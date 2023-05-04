import React from "react";
import { PageContainer } from "../../components/common/Page.styles";
import { SubNavContainer } from "../mypage/MypagePage.styles";
import {
  DetailPageContainer,
  DiariesContainer,
  GroupInfoContainer,
} from "./GroupDetailPage.styles";
import GroupInfo from "../../components/groupdetail/GroupInfo";
import Diaries from "../../components/groupdetail/Diaries";
import groupData from "../../components/groupdetail/groupInfo.json";

export default function GroupDetailPage() {
  const subNavStyle = {
    background: `url(${groupData.thumbnailUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
    fontWeight: "bold",
  };

  return (
    <>
      <SubNavContainer style={subNavStyle}>
        {groupData.clubName}
      </SubNavContainer>
      <PageContainer>
        <DetailPageContainer>
          <DiariesContainer>
            <Diaries />
          </DiariesContainer>
          <GroupInfoContainer>
            <GroupInfo />
          </GroupInfoContainer>
        </DetailPageContainer>
      </PageContainer>
    </>
  );
}
