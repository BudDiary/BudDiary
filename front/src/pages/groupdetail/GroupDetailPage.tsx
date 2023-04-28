import React from "react";
import { PageContainer } from "../../components/common/Page.styles";
import { SubNavContainer } from "../mypage/MypagePage.styles";
import { DetailPageContainer, DiariesContainer, GroupInfoContainer } from "./GroupDetailPage.styles";
import GroupInfo from "../../components/groupdetail/GroupInfo";

export default function GroupDetailPage() {
  return (
    <>
      <SubNavContainer>{}뭔 그룹</SubNavContainer>
      <PageContainer>
        <DetailPageContainer>
          <DiariesContainer>일기들</DiariesContainer>
          <GroupInfoContainer>
            <GroupInfo />
          </GroupInfoContainer>
        </DetailPageContainer>
      </PageContainer>
    </>
  );
}
