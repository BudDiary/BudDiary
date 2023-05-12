import React, { useEffect, useState } from "react";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import Recommended from "../../components/group/Recommended";
import MyTab from "../../components/group/MyTab";
import { getMyClubListApi } from "../../apis/clubApi";
import useMember from "../../hooks/memberHook";
import navimg from "../../assets/subnav/GroupDiary.jpg";
import TypeIt from "typeit-react";

export default function GroupPage() {
  const { memberData } = useMember();
  const username = memberData.username;

  const [pluralList, setPluralList] = useState<string[]>([]);
  const [doubleList, setDoubleList] = useState<string[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMyClubListApi(username);
        setPluralList(data.pluralList);
        setDoubleList(data.doubleList);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [username]);

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
        <br />
        <MyTab />
      </PageContainer>
    </>
  );
}
