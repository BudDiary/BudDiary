import React, { useEffect, useState } from "react";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import Recommended from "../../components/group/Recommended";
import RecommendedByKeyword from "../../components/group/RecommendedByKeyword";
import MyTab from "../../components/group/MyTab";
import navimg from "../../assets/subnav/GroupDiary.jpg";
import TypeIt from "typeit-react";
import useMember from "../../hooks/memberHook";

export default function GroupPage() {

  return (
    <>
      <SubNavContainer img={navimg}>
        <TypeIt
          options={{
            strings: ["나의 그룹"],
            cursor: false,
            breakLines: false,
            speed: 100,
          }}
        />
      </SubNavContainer>
      <PageContainer>
        <Recommended />
        <br/>
        <RecommendedByKeyword />
        <MyTab />
      </PageContainer>
    </>
  );
}
