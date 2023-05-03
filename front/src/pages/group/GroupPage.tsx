import React from "react";
import { PageContainer } from "../../components/common/Page.styles";
import { SubNavContainer } from "../mypage/MypagePage.styles";
import Recommended from "../../components/group/Recommended";
import MyTab from "../../components/group/MyTab";

export default function GroupPage() {
  return (
    <>
    <SubNavContainer>나의 그룹</SubNavContainer>
    <PageContainer>
      <Recommended />
      <br />
      <MyTab/>
    </PageContainer>
    </>
  );
}
