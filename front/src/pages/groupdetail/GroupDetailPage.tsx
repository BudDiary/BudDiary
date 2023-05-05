import React from "react";
import { PageContainer, SubNavContainer } from "../../components/common/Page.styles";
import {
  DetailPageContainer,
  DiariesContainer,
  GroupInfoContainer,
} from "./GroupDetailPage.styles";
import GroupInfo from "../../components/groupdetail/GroupInfo";
import Diaries from "../../components/groupdetail/Diaries";

export default function GroupDetailPage() {
  return (
    <>
      <SubNavContainer>그룹 이름</SubNavContainer>
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
